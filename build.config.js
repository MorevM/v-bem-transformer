import { execSync } from 'child_process';

export default {
	rollup: {
		emitCJS: true,
	},
	entries: [
		'./src/index',
		'./src/bundlers',
		'./src/vue',
		'./src/nuxt',
	],
	hooks: {
		'build:done': (ctx) => {
			execSync('cp ./src/_nuxt-plugin.js ./dist/_nuxt-plugin.js');
		},
	},
	failOnWarn: false,
};
