import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import copy from 'rollup-plugin-copy';

const formats = [
	{ format: 'esm', extension: 'js' },
	{ format: 'cjs', extension: 'cjs' },
];

const files = [
	'index',
	'bundlers',
	'vue',
	'nuxt',
];

const config = files.reduce((a, input) => [
	...a,
	...formats.reduce((b, { format, extension }) => [
		...b, {
			input, format, extension,
		},
	], []),
], []);


export default config.map(({ input, format, extension }) => ({
	input: `./src/${input}.js`,
	external: ['unplugin', '@morev/more-bem-classnames'],
	output: {
		file: `dist/${input}.${extension}`,
		format,
		exports: 'named',
	},
	plugins: [
		commonjs(),
		resolve(),
		terser(),
		copy({
			targets: [
				{ src: 'src/_nuxt-plugin.js', dest: 'dist' },
			],
		}),
	],
}));
