import { createUnplugin } from 'unplugin';
import { mergeObjects } from '@morev/utils';
import { transformer } from '../lib/transformer.js';
import { defaultOptions } from './_defaults.js';

export const unplugin = createUnplugin((userOptions) => {
	const options = mergeObjects(defaultOptions, userOptions);

	return {
		name: 'v-bem-transformer',
		transformInclude: options.transformInclude,
		transform: (code) => transformer(code, options.directiveName),
	};
});

export const vitePlugin = unplugin.vite;
export const rollupPlugin = unplugin.rollup;
export const webpackPlugin = unplugin.webpack;
export const esbuildPlugin = unplugin.esbuild;
