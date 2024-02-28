import bemClassnames from '@morev/bem-classnames';
import { mergeObjects } from '@morev/utils';
import { defaultOptions } from './_defaults.js';

export const vuePlugin = (userOptions) => {
	const options = mergeObjects(defaultOptions, userOptions);

	const bem = bemClassnames(options.bemOptions);

	return {
		install(app) {
			app.mixin({
				created() {
					this[options.methodName] = bem(
						this.$options[options.priorityBlockName]
						|| this.$options[options.blockName]
						|| this.$options[options.fallbackBlockName],
					);
				},
			});
		},
	};
};
