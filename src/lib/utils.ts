import type { ArrayOf } from '@morev/utils';
import type { ParsedClassDeclaration, ParsedDirective } from '../types';
import { fetchElement, fetchModifiers, fetchStaticClassnames } from './directive-parts';

/**
 * Checks whether the next characters of the `source`
 * starting with index `iterator` is a Vue `:class` declaration.
 *
 * @param   source     The source code.
 * @param   iterator   Index of the source code to check against.
 *
 * @returns            Whether the next characters are Vue `:class` declaration.
 */
const isClassDeclaration = (source: string, iterator: number) =>
	source.slice(iterator, iterator + 6) === ':class';

/**
 * Checks whether the next characters of the `source`
 * starting with index `iterator` is `v-bem` declaration.
 *
 * @param   source          The source code.
 * @param   directiveName   The name of the directive.
 * @param   iterator        Index of the source code to check against.
 *
 * @returns                 Whether the next characters are `v-bem` directive declaration.
 */
const isDirectiveDeclaration = (source: string, directiveName: string, iterator: number) =>
	source.slice(iterator, iterator + directiveName.length) === directiveName;

/**
 * Extracts a tokens with its metadata from a given `v-bem` declaration.
 *
 * @param   source          The source code.
 * @param   directiveName   The directive name.
 * @param   start           Starting index of the directive declaration.
 *
 * @returns                 Directive declaration split into tokens with its metadata.
 */
const parseDirective = (source: string, directiveName: string, start: number): ParsedDirective => {
	let [element, modifiers, staticClassnames]: ArrayOf<'exactly', 3, string | null> = [null, null, null];
	let iterator = start + directiveName.length - 1;

	const endings = [undefined, '>', '/', ' ', '\t', '\n'];

	while (iterator++) {
		if (source[iterator] === ':') {
			[element, iterator] = fetchElement(source, iterator + 1);
		}
		if (source[iterator] === '.') {
			[staticClassnames, iterator] = fetchStaticClassnames(source, iterator + 1);
		}
		if (source[iterator] === '=') {
			[modifiers, iterator] = fetchModifiers(source, iterator + 1);
		}
		if (endings.includes(source[iterator])) {
			break;
		}
	}

	return {
		start,
		end: iterator,
		length: iterator - start,
		element,
		modifiers,
		staticClassnames,
	};
};

/**
 * Extracts a tokens with its metadata from a given Vue `:class` declaration.
 *
 * @param   source   The source code.
 * @param   start    Starting index of the class declaration.
 *
 * @returns          Class declaration split into tokens with its metadata.
 */
const parseClassDeclaration = (source: string, start: number): ParsedClassDeclaration => {
	let iterator = start + 6;
	let openingChar = null;
	let [expressionStart, expressionEnd]: ArrayOf<'exactly', 2, number> = [iterator, iterator];
	let expression = '';
	const quotes = [`'`, `"`];

	while (iterator++) {
		if (quotes.includes(source[iterator])) {
			if (!openingChar) {
				openingChar = source[iterator];
				expressionStart = ++iterator;
			} else if (openingChar === source[iterator]) {
				expressionEnd = iterator;
				break;
			}
		}
		expression += source[iterator];
	}

	return {
		start,
		end: iterator,
		length: iterator - start,
		expression,
		expressionStart,
		expressionEnd,
		expressionLength: expressionEnd - expressionStart,
		isArray: expression.startsWith('['),
	};
};

/**
 * Parses a tag containing `v-bem` directive into directive and class declarations
 * for future extracting BEM tokens and replacement in a correct place.
 *
 * @param   source          The source (component) code.
 * @param   directiveName   The directive name.
 * @param   index           Starting index of the tag containing `v-bem` directive.
 *
 * @returns                 The end index of the tag, parsed directive and class declarations.
 */
export const parseTag = (source: string, directiveName: string, index: number) => {
	let iterator = index;
	let directive: ParsedDirective | null = null;
	let classD: ParsedClassDeclaration | null = null;
	let wasQuote = false;

	while (iterator++) {
		if ([`'`, '"'].includes(source[iterator])) {
			wasQuote = !wasQuote;
			continue;
		}
		if (isDirectiveDeclaration(source, directiveName, iterator)) {
			directive = parseDirective(source, directiveName, iterator);
			iterator += directive.length;
		}
		if (isClassDeclaration(source, iterator)) {
			classD = parseClassDeclaration(source, iterator);
			iterator += classD.length;
		}
		if (source[iterator] === '>' && !wasQuote) break;
	}

	return { index, directive, classD };
};

/**
 * Transforms a parsed directive to a `bem-classnames` function call for future replacement.
 *
 * @param   directive   Parsed directive.
 *
 * @returns             A string to replace the directive with.
 */
export const transformToBemClassnames = (directive: ParsedDirective) => {
	let { element, modifiers, staticClassnames } = directive;
	modifiers &&= modifiers.replaceAll('"', '\'');

	return 'b(%element%%modifiers%%staticCLassnames%)'
		.replace('%element%', () => (element ? `${element}, ` : 'null, '))
		.replace('%modifiers%', () => (modifiers ? `${modifiers}, ` : ''))
		.replace('%staticCLassnames%', () => (staticClassnames ? `\`${staticClassnames}\`` : ''))
		.replace(', )', ')');
};

/**
 * Wraps an existing `:class=""` declaration to array notation. \
 * It allows to combine `v-bem` directive contets together with manually written classes.
 *
 * @param   classDeclaration   Parsed class declaration.
 * @param   call               `bemFunction` call.
 *
 * @returns                    A string to replace class declaration considering `bemFunction` result.
 */
export const expressionToArrayNotation = (classDeclaration: ParsedClassDeclaration, call: string) => {
	const { isArray, expression } = classDeclaration;
	return isArray
		? expression.replace(/]$/, `, ${call}]`)
		: `[${expression}, ${call}]`;
};
