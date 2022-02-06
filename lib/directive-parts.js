const dynamicTransform = (str, isTemplateLiteral = false) => {
	if (str.startsWith('[')) {
		const raw = str.slice(1, -1);
		// eslint-disable-next-line no-autofix/prefer-template
		return isTemplateLiteral ? '${' + raw + '}' : raw;
	}
	return isTemplateLiteral ? str : `'${str}'`;
};

export const fetchElement = (source, index) => {
	let result = '';
	while ((result += source[index++])) {
		if ([undefined, ':', '.', '=', '>', '/', ' ', '\n', '\t'].includes(source[index])) {
			return [dynamicTransform(result), index];
		}
	}
};

export const fetchModifiers = (source, index) => {
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
		) {
			return [result, index];
		}
	}
};

export const fetchStaticClassnames = (source, index) => {
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
			return [result.map(i => dynamicTransform(i, true)).join(' '), index];
		}
	}
};
