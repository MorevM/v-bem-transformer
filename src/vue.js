import bemClassnames from '@morev/more-bem-classnames';
import { defaultOptions } from './_defaults.js';

export const vuePlugin = (userOptions) => {
	const options = { ...defaultOptions, ...userOptions };

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
