import { fetchElement, fetchModifiers, fetchStaticClassnames } from './directive-parts.js';

const isClassDeclaration = (source, iterator) => source.slice(iterator, iterator + 6) === ':class';
const isDirectiveDeclaration = (source, directiveName, iterator) =>
	source.slice(iterator, iterator + directiveName.length) === directiveName;

const parseDirective = (source, directiveName, start) => {
	let [element, modifiers, staticClassnames] = [null, null, null];
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

const parseClassDeclaration = (source, start) => {
	let iterator = start + 6;
	let openingChar = null;
	let [expressionStart, expressionEnd] = [null, null];
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

	const isArray = expression.startsWith('[');

	return {
		start,
		end: iterator,
		length: iterator - start,
		expression,
		expressionStart,
		expressionEnd,
		expressionLength: expressionEnd - expressionStart,
		isArray,
	};
};

export const parseTag = (source, directiveName, index) => {
	let iterator = index;
	let [directive, classD] = [null, null];
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

	return {
		index,
		directive,
		classD,
	};
};

export const transformToBemClassnames = ({ element, modifiers, staticClassnames }) => {
	if (modifiers) {
		modifiers = modifiers.replace(/"/g, '\'');
	}

	return 'b(%element%%modifiers%%staticCLassnames%)'
		.replace('%element%', () => (element ? `${element}, ` : 'null, '))
		.replace('%modifiers%', () => (modifiers ? `${modifiers}, ` : ''))
		.replace('%staticCLassnames%', () => (staticClassnames ? `\`${staticClassnames}\`` : ''))
		.replace(', )', ')');
};

export const expressionToArrayNotation = ({ expression, isArray }, call) => (isArray
	? expression.replace(/]$/, `, ${call}]`)
	: `[${expression}, ${call}]`);
