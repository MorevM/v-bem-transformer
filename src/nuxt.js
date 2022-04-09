import {
	addPluginTemplate,
	createResolver,
	defineNuxtModule,
	extendViteConfig,
	extendWebpackConfig,
	isNuxt2,
} from '@nuxt/kit';

import { unplugin } from './bundlers.js';
import { defaultOptions } from './_defaults.js';

export default defineNuxtModule({
	meta: {
		name: '@morev/v-bem-transformer',
		configKey: 'vBemTransformer',
		compatibility: {},
	},
	defaults: defaultOptions,
	hooks: {},
	async setup(options, nuxt) {
		const resolver = createResolver(import.meta.url);

		extendWebpackConfig((config) => {
			config.plugins = config.plugins || [];
			config.plugins.unshift(unplugin.webpack(options));
		});

		extendViteConfig((config) => {
			config.plugins = config.plugins || [];
			config.plugins.push(unplugin.vite(options));
		});

		addPluginTemplate({
			src: resolver.resolve('_nuxt-plugin.js'),
			filename: 'v-bem-plugin.js',
			options: {
				options,
				isNuxt2: isNuxt2(),
			},
		});
	},
});
