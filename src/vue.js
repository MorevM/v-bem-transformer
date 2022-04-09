import bemClassnames from '@morev/more-bem-classnames';
import { defaults } from '@morev/helpers';
import { defaultOptions } from './_defaults.js';

export const vuePlugin = (userOptions) => {
	const options = defaults(defaultOptions, userOptions);

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
