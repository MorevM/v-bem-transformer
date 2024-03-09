import type { BundlerOptions, NuxtModuleOptions, PluginOptions } from './types';

export const DEFAULT_BUNDLER_OPTIONS: BundlerOptions = {
	transformInclude: (id: string) => id.includes('.vue'),
	directiveName: 'v-bem',
};

export const DEFAULT_PLUGIN_OPTIONS: PluginOptions = {
	bemOptions: {
		delimiters: {
			element: '__',
			modifier: '--',
			modifierValue: '-',
		},
		hyphenate: true,
		namespace: '',
	},
	methodName: 'b',
	blockName: 'name',
	priorityBlockName: 'block',
	fallbackBlockName: 'unknown',
};


export const DEFAULT_NUXT_OPTIONS: NuxtModuleOptions = {
	...DEFAULT_BUNDLER_OPTIONS,
	...DEFAULT_PLUGIN_OPTIONS,
	composableName: 'useBem',
};
