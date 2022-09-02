import { mergeObjects } from '@morev/helpers';
import bemClassnames from '@morev/more-bem-classnames';
import { getCurrentInstance } from 'vue';
import { defaultOptions } from './_defaults.js';

export const useBemFactory = (userOptions) => {
	const options = mergeObjects(defaultOptions, userOptions);
	const bem = bemClassnames(options.bemOptions);

	return (name = '') => {
		const instance = getCurrentInstance();

		return bem(
			name
			|| instance?.type[options.priorityBlockName]
			|| instance?.type[options.blockName]
			|| instance?.type.__name
			|| options.fallbackBlockName,
		);
	};
};
