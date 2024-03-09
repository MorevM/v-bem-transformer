import { mergeObjects } from '@morev/utils';
import { bemClassnames } from '@morev/bem-classnames';
import { getCurrentInstance } from 'vue';
import { DEFAULT_PLUGIN_OPTIONS } from './_defaults';
import type { BemFunctionFactory, PluginOptions } from './types';

/**
 * Returns `useBem` composable with pre-defined options. \
 * Assumes registration of a single composable at the project level and its further reuse.
 *
 * @param   userOptions   Module options.
 *
 * @returns               `useBem` composable.
 */
export const useBemFactory = (userOptions: Partial<PluginOptions>): BemFunctionFactory => {
	const options = mergeObjects(DEFAULT_PLUGIN_OPTIONS, userOptions) as Required<PluginOptions>;
	const bem = bemClassnames(options.bemOptions);

	return (name?: string | null) => {
		const instance = getCurrentInstance();

		return bem(
			name
			/* @ts-expect-error -- May be any property within a component */
			// eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
			|| instance?.type[options.priorityBlockName] || instance?.type[options.blockName]
			|| instance?.type.__name
			|| options.fallbackBlockName,
		);
	};
};
