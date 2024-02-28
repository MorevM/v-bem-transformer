import MagicString from 'magic-string';
import {
	parseTag,
	transformToBemClassnames,
	expressionToArrayNotation,
} from './utils.js';

export const transformer = (source, directiveName) => {
	// No pseudo-directives to transform in source
	if (!source.includes(directiveName)) {
		return { code: source, map: null };
	}

	// Start positions of each tag with `v-bem` directive
	const regex = new RegExp(`<(?:[\\w|-]+)((?!<[a-zA-Z]).)*${directiveName}`, 'gms');
	const vBemMatches = [...source.matchAll(regex)].map(m => m.index);

	const declarations = vBemMatches.map(matchIndex => parseTag(source, directiveName, matchIndex));

	const magicSource = new MagicString(source);
	declarations.forEach(declaration => {
		const { directive, classD } = declaration;
		const bemClassnames = transformToBemClassnames(directive);

		// If there `:class` in the tag, we should remove `v-bem` declaration
		// from the block and transform `:class` to array (if it isn't it yet)
		// and append dynamic part to it
		if (classD) {
			// Remove v-bem first
			magicSource.update(directive.start, directive.end, '');

			const wrappedCall = expressionToArrayNotation(classD, bemClassnames);
			magicSource.update(classD.expressionStart, classD.expressionEnd, wrappedCall);

		// If the `:class` attribute doesn't appear in the tag,
		// just replace `v-bem` with `:class`
		} else {
			const wrappedCall = `:class="${bemClassnames}"`;
			magicSource.update(directive.start, directive.end, wrappedCall);
		}
	});

	return {
		code: magicSource.toString(),
		map: magicSource.generateMap({ hires: true }),
	};
};
