import { existsSync, unlinkSync, mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { addImports, addTemplate, addVitePlugin, defineNuxtModule, isNuxt2, addPlugin, isNuxt3, addTypeTemplate } from '@nuxt/kit';
import { isArray } from '@morev/utils';
import { webpackPlugin, vitePlugin } from './bundlers';
import { DEFAULT_NUXT_OPTIONS } from './_defaults';
import type { NuxtModuleOptions } from './types';

const __dirname = dirname(fileURLToPath(import.meta.url));

const SCOPE = '@local-morev';
const MODULE_NAME = `${SCOPE}/v-bem-transformer`;

const BABEL_PLUGIN_NAME = '@babel/plugin-transform-logical-assignment-operators';

export default defineNuxtModule<NuxtModuleOptions>({
	meta: {
		name: `${MODULE_NAME}/nuxt`,
		configKey: 'vBemTransformer',
		compatibility: {
			nuxt: '>= 2.17.0 || >=3.5.0',
		},
	},
	defaults: () => DEFAULT_NUXT_OPTIONS,
	hooks: {},
	async setup(options, nuxt) {
		// This is necessary because the package uses utilities
		// that use modern syntax and have not been transpiled.
		if (isNuxt2()) {
			nuxt.options.build.transpile.push('@morev/utils', '@morev/bem-classnames', 'ohash', MODULE_NAME);

			/* @ts-expect-error -- Lack of compatibility with Nuxt 2 */
			nuxt.options.build.babel.plugins ??= [];
			/* @ts-expect-error -- Lack of compatibility with Nuxt 2 */
			const doesBabelPluginExists = nuxt.options.build.babel.plugins.some((plugin) => {
				return isArray(plugin)
					? plugin[0] === BABEL_PLUGIN_NAME
					: plugin === BABEL_PLUGIN_NAME;
			});

			/* @ts-expect-error -- Lack of compatibility with Nuxt 2 */
			!doesBabelPluginExists && nuxt.options.build.babel.plugins.push(BABEL_PLUGIN_NAME);
		}

		// `@nuxt/kit` does not call `extendWebpackConfig` since `3.0.0-rc.14` for build with `modern` flag,
		// so there is a workaround to make it work with `modern` flag.
		// Related commit: https://github.com/nuxt/nuxt/commit/5ac9d85a497d6003cbe0c5bbf0e16ef6ea69b46a
		nuxt.hook('webpack:config', (configs) => {
			const relatedConfigs = configs.filter((config) =>
				 ['modern', 'server', 'client'].includes(config.name));

			relatedConfigs.forEach((config) => {
				config.plugins ||= [];
				config.plugins.unshift(webpackPlugin(options));
			});
		});

		// Vite bundler (thankfully) does not require any hacks
		addVitePlugin({ ...vitePlugin(options), enforce: 'pre' });

		// For some reason, if the plugin is registered from the `.nuxt` directory,
		// this causes `vue.runtime.common.prod.js` to be included in addition to `vue.runtime.esm.js`,
		// resulting in a 30kb increase of bundle size.
		// To avoid this, a plugin file is created inside `node_modules` and attached as a plugin.
		const NODE_MODULES_PATH = __dirname.replace(new RegExp(`${SCOPE}.*`), '');
		const PLUGIN_DIRECTORY = join(NODE_MODULES_PATH, '.v-bem-transformer');
		const PLUGIN_PATH = join(PLUGIN_DIRECTORY, `v-bem-transformer.js`);
		const [PLUGIN_CONTENTS, indentationCount] = isNuxt2()
			? [readFileSync(join(__dirname, 'nuxt-templates', 'nuxt-2.js'), { encoding: 'utf-8' }), 1]
			: [readFileSync(join(__dirname, 'nuxt-templates', 'nuxt-3.js'), { encoding: 'utf-8' }), 3];

		// Make sure there is no cache from previous runs.
		try { existsSync(PLUGIN_DIRECTORY) && unlinkSync(PLUGIN_DIRECTORY); } catch {}
		mkdirSync(PLUGIN_DIRECTORY, { recursive: true });

		writeFileSync(
			PLUGIN_PATH,
			PLUGIN_CONTENTS
				.replaceAll('{{MODULE_NAME}}', MODULE_NAME)
				.replaceAll('{{OPTIONS}}', JSON.stringify(options, null, '\t'.repeat(indentationCount))),
		);

		addPlugin(PLUGIN_PATH);

		const typesSource = readFileSync(join(__dirname, 'nuxt-templates', 'v-bem-transformer.d.ts'), { encoding: 'utf8' });
		addTypeTemplate({
			filename: 'types/v-bem-transformer.d.ts',
			getContents: () => typesSource
				.replaceAll('{{METHOD_NAME}}', options.methodName),
		});

		// Registration of composable to work with Composition API.
		const isComposableRegistrationNeeded = isNuxt3()
			// This is how Nuxt itself checks for the presence of `bridge`
			// https://github.com/nuxt/nuxt/blob/2d3f495a7f3f58da91f3026c6430392072f9d834/packages/kit/src/compatibility.ts#L29
			|| (isNuxt2() && (nuxt.options as any).bridge)
			|| options.composableName;

		if (!isComposableRegistrationNeeded) return;

		const composableFilename = `v-bem-transformer/use-bem.ts`;
		const composableSource = readFileSync(join(__dirname, 'nuxt-templates', 'use-bem.ts'), { encoding: 'utf8' });
		const composablePath = addTemplate({
			filename: composableFilename,
			getContents: () => composableSource
				.replaceAll('{{MODULE_NAME}}', MODULE_NAME)
				.replaceAll('{{OPTIONS}}', JSON.stringify(options, null, '\t')),
			write: true,
		}).dst;

		addImports({ name: options.composableName ?? 'useBem', from: composablePath });
	},
});
