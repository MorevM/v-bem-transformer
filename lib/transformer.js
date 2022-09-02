/* eslint-disable no-shadow */
import {
	parseTag,
	replaceBetween,
	transformToBemClassnames,
	expressionToArrayNotation,
} from './utils.js';

export const transformer = (source, directiveName) => {
	// No pseudo-directives to transform in source
	if (!source.includes(directiveName)) return source;

	// Start positions of each tag with v-bem directive
	const regex = new RegExp(`<(?:[\\w|-]+)((?!<[a-zA-Z]).)*${directiveName}`, 'gms');
	const vBemMatches = [...source.matchAll(regex)].map(m => m.index);

	const declarations = vBemMatches.map(matchIndex => parseTag(source, directiveName, matchIndex));

	let lengthDifference = 0;
	declarations.forEach(declaration => {
		const { directive, classD } = declaration;
		const bemClassnames = transformToBemClassnames(directive);

		// If there `:class` in the tag, we should remove `v-bem` declaration
		// from the block and transform `:class` to array (if it isn't it yet)
		// and append dynamic part to it
		if (classD) {
			// Remove v-bem
			const removeVBem = (source, lengthDifference) => {
				source = replaceBetween(
					source,
					directive.start + lengthDifference,
					directive.end + lengthDifference,
					'',
				);
				lengthDifference -= directive.length;

				return [source, lengthDifference];
			};

			const appendToClass = (source, lengthDifference) => {
				const wrappedCall = expressionToArrayNotation(classD, bemClassnames);
				source = replaceBetween(
					source,
					classD.expressionStart + lengthDifference,
					classD.expressionEnd + lengthDifference,
					wrappedCall,
				);
				lengthDifference += wrappedCall.length - classD.expressionLength;

				return [source, lengthDifference];
			};

			if (classD.start > directive.start) {
				[source, lengthDifference] = removeVBem(source, lengthDifference);
				[source, lengthDifference] = appendToClass(source, lengthDifference);
			} else {
				[source, lengthDifference] = appendToClass(source, lengthDifference);
				[source, lengthDifference] = removeVBem(source, lengthDifference);
			}
		// If the `:class` attribute doesn't appear in the tag,
		// just replace `v-bem` with `:class`
		} else {
			const wrappedCall = `:class="${bemClassnames}"`;
			source = replaceBetween(
				source,
				directive.start + lengthDifference,
				directive.end + lengthDifference,
				wrappedCall,
			);
			lengthDifference += wrappedCall.length - directive.length;
		}
	});

	return source;
};
