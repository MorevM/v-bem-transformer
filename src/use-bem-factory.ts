import { mergeObjects } from '@morev/utils';
import { bemClassnames } from '@morev/bem-classnames';
import type { ModuleOptions } from '@morev/bem-classnames';
import { getCurrentInstance } from 'vue';
import { defaultOptions } from './_defaults';
import type { Options } from './types';

export const useBemFactory = (userOptions: Partial<ModuleOptions>) => {
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
