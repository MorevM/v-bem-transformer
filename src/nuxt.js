import { resolve } from 'path';
import { unplugin } from './bundlers.js';

export default function nuxtModule(options) {
	// Webpack 4
	this.extendBuild((config) => {
		config.plugins = config.plugins || [];
		config.plugins.unshift(unplugin.webpack(options));
	});
	// Vite
	this.nuxt.hook('vite:extend', async (vite) => {
		vite.config.plugins = vite.config.plugins || [];
		vite.config.plugins.push(unplugin.vite(options));
	});
	// Plugin
	this.addPlugin({
		src: resolve(__dirname, '_nuxt-plugin.js'),
		fileName: 'v-bem-plugin.js',
		options,
	});
}
