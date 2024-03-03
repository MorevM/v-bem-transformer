import { mergeObjects } from '@morev/utils';
import { bemClassnames } from '@morev/bem-classnames';
import { getCurrentInstance } from 'vue';
import { defaultOptions } from './_defaults';
import type { Options } from './types';

export const useBemFactory = (userOptions: Partial<Options>) => {
	const options = mergeObjects(defaultOptions, userOptions) as Required<Options>;
	const bem = bemClassnames(options.bemOptions);

	return (name = '') => {
		const instance = getCurrentInstance();

		return bem(
			name
			/* @ts-expect-error -- May be any property within a component */
			|| instance?.type[options.priorityBlockName] || instance?.type[options.blockName]
			|| instance?.type.__name
			|| options.fallbackBlockName,
		);
	};
};
