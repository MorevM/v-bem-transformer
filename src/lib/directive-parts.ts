/**
 * Wraps expressions that need it into template strings.
 *
 * @param   str                 A string to operate with.
 * @param   isTemplateLiteral   Whether the string is an existing template string literal.
 *
 * @returns                     Conditionally wrapped string.
 */
const dynamicTransform = (str: string, isTemplateLiteral: boolean = false) => {
	if (str.startsWith('[')) {
		return '${' + str.slice(1, -1) + '}'; // eslint-disable-line no-autofix/prefer-template
	}
	return isTemplateLiteral ? str : `'${str}'`;
};

/**
 * Fetches `element` part (in BEM notation) of `v-bem` directive.
 *
 * @param   source   The source code.
 * @param   index    The starting index of the parser.
 *
 * @returns          A tuple containing parsed `element` expression/string
 *                   and the end index for the next parser iterations.
 */
export const fetchElement = (source: string, index: number) => {
	let result = '';
	while ((result += source[index++])) {
		if ([undefined, ':', '.', '=', '>', '/', ' ', '\n', '\t'].includes(source[index])) {
			break;
		}
	}

	return [dynamicTransform(result), index] as const;
};

/**
 * Fetches `modifiers` part (in BEM notation) of `v-bem` directive.
 *
 * @param   source   The source code.
 * @param   index    The starting index of the parser.
 *
 * @returns          A tuple containing parsed `modifiers` expression
 *                   and the end index for the next parser iterations.
 */
export const fetchModifiers = (source: string, index: number) => {
	let result = '';
	const startExpressionChar = source[index++];
	const isJSX = startExpressionChar === '{';
	const endExpressionChar = isJSX ? '}' : startExpressionChar;
	let jsxBracketsNesting = 0;
	while ((result += source[index++])) {
		if (source[index - 1] === '{' && isJSX) jsxBracketsNesting += 1;
		if (source[index - 1] === '}' && isJSX) jsxBracketsNesting -= 1;
		if (
			!source[index]
			|| (source[index] === endExpressionChar && source[index - 1] !== '\\' && !jsxBracketsNesting)
		) break;
	}

	return [result, index] as const;
};

/**
 * Fetches static classnames of `v-bem` directive.
 *
 * @param   source   The source code.
 * @param   index    The starting index of the parser.
 *
 * @returns          A tuple containing static classnames (joined via a space)
 *                   and the end index for the next parser iterations.
 */
export const fetchStaticClassnames = (source: string, index: number) => {
	const result = [];
	let temp = '';
	while ((temp += source[index++])) {
		if (source[index] === '.') {
			result.push(temp);
			temp = '';
			index++;
			continue;
		}
		if ([undefined, '=', '/', '>', ' ', '\n', '\t'].includes(source[index])) {
			result.push(temp);
			break;
		}
	}

	return [result.map(i => dynamicTransform(i, true)).join(' '), index] as const;
};
