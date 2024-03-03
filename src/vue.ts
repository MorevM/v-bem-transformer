import { bemClassnames } from '@morev/bem-classnames';
import { mergeObjects } from '@morev/utils';
import { defaultOptions } from './_defaults';
import type { Options } from './types';

export const vuePlugin = (userOptions: Options) => {
	const options = mergeObjects(defaultOptions, userOptions);

	const bem = bemClassnames(options.bemOptions);

	return {
		install(app: any) {
			app.mixin({
				created() {
					this[options.methodName] = bem(
						this.$options[options.priorityBlockName]
						|| this.$options[options.blockName]
						|| this.$options[options.fallbackBlockName]
						|| this._?.type.__name,
					);
				},
			});
		},
	};
};
