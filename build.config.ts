import { execSync } from 'node:child_process';
import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
	clean: true,
	rollup: {
		emitCJS: true,
		inlineDependencies: true,
	},
	declaration: 'compatible',
	entries: [
		'./src/index',
		'./src/vue',
		'./src/nuxt',
		'./src/use-bem-factory',
	],
	externals: ['vue', 'unplugin', '@nuxt/schema', 'esbuild', 'rollup', 'vite'],
	hooks: {
		'build:done': (context) => {
			execSync('cp -a ./src/nuxt-templates/. ./dist/nuxt-templates/');
		},
	},
	failOnWarn: false,
});
