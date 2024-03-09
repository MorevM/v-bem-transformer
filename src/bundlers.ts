import { createUnplugin } from 'unplugin';
import { mergeObjects } from '@morev/utils';
import { transformer } from './lib';
import { DEFAULT_BUNDLER_OPTIONS } from './_defaults';
import type { BundlerOptions } from './types';

export const unplugin = createUnplugin((userOptions: Partial<BundlerOptions>) => {
	const options = mergeObjects(DEFAULT_BUNDLER_OPTIONS, userOptions) as Required<BundlerOptions>;

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
