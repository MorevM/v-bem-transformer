import { createUnplugin } from 'unplugin';
import { mergeObjects } from '@morev/utils';
import { transformer } from './lib';
import { defaultOptions } from './_defaults';
import type { Options } from './types';

export const unplugin = createUnplugin((userOptions: Partial<Options>) => {
	const options = mergeObjects(defaultOptions, userOptions) as Required<Options>;

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
