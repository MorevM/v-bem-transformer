import {
	addAutoImport,
	addPluginTemplate,
	addTemplate,
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
		const FOLDER = 'v-bem-transformer/';
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
			filename: `${FOLDER}/nuxt-plugin.js`,
			options: {
				options,
				isNuxt2: isNuxt2(),
			},
			write: true,
		});

		if (!isNuxt2()) {
			const filename = `${FOLDER}/use-bem.js`;

			const useBemPath = addTemplate({
				filename,
				write: true,
				options,
				getContents: (context) => [
					'// Generated by `@morev/v-bem-transformer`',
					`import { useBemFactory } from '@morev/v-bem-transformer/use-bem-factory';`,
					'',
					`export const useBem = useBemFactory(${JSON.stringify(context.options, null, 2)});`,
				].join('\n'),
			}).dst;

			addAutoImport({ name: 'useBem', as: options.composableName, from: useBemPath });
		}
	},
});
