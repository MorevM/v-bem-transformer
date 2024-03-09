import { bemClassnames } from '@morev/bem-classnames';
import { mergeObjects } from '@morev/utils';
import { DEFAULT_PLUGIN_OPTIONS } from './_defaults';
import type { PluginOptions } from './types';

export const vuePlugin = (userOptions?: Partial<PluginOptions>) => {
	const options = mergeObjects(DEFAULT_PLUGIN_OPTIONS, userOptions) as Required<PluginOptions>;

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
