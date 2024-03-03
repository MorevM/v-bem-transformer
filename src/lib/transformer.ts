import MagicString from 'magic-string';
import { parseTag, transformToBemClassnames, expressionToArrayNotation } from './utils';

/**
 * Transforms the source code (if needed) and returns modified source code
 * with sourcemap (if was transformed) via `magic-string` package.
 *
 * @param   source          The source code.
 * @param   directiveName   The directive name to transform.
 *
 * @returns                 Modified code with sourcemap.
 */
export const transformer = (source: string, directiveName: string) => {
	// No pseudo-directives to transform in the source
	if (!source.includes(directiveName)) return { code: source, map: null };

	// Start positions of each tag with `v-bem` directive
	const regex = new RegExp(`<(?:[\\w|-]+)((?!<[a-zA-Z]).)*${directiveName}`, 'gs');
	const vBemMatches = [...source.matchAll(regex)].map(m => m.index).filter(Boolean);

	const declarations = vBemMatches.map(matchIndex => parseTag(source, directiveName, matchIndex));

	const magicSource = new MagicString(source);
	declarations.forEach(declaration => {
		const { directive, classD } = declaration;
		if (!directive) return;

		// A string containing `bemClassnames` function call.
		const bemClassnames = transformToBemClassnames(directive);

		// If there `:class` in the tag, we should remove `v-bem` declaration
		// from the block and transform `:class` to array (if it isn't it yet)
		// and append the dynamic part to it
		if (classD) {
			// Remove v-bem first
			magicSource.update(directive.start, directive.end, '');

			const wrappedCall = expressionToArrayNotation(classD, bemClassnames);
			magicSource.update(classD.expressionStart, classD.expressionEnd, wrappedCall);

		// If the `:class` attribute doesn't appear in the tag,
		// just replace `v-bem` with `:class` declaration
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
