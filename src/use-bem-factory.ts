import { mergeObjects } from '@morev/utils';
import { bemClassnames } from '@morev/bem-classnames';
import { getCurrentInstance } from 'vue';
import { defaultOptions } from './_defaults';
import type { BemFunctionFactory, Options } from './types';

/**
 * Returns `useBem` composable with pre-defined options. \
 * Assumes registration of a single composable at the project level and its further reuse.
 *
 * @param   userOptions   Module options.
 *
 * @returns               `useBem` composable.
 */
export const useBemFactory = (userOptions: Partial<Options>): BemFunctionFactory => {
	const options = mergeObjects(defaultOptions, userOptions) as Required<Options>;
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
