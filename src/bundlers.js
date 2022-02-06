import { createUnplugin } from 'unplugin';
import { transformer } from '../lib/transformer';
import { defaultOptions } from './_defaults';

export const unplugin = createUnplugin((userOptions) => {
	const options = { ...defaultOptions, ...userOptions };

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
