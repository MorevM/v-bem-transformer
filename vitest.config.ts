import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		watch: false,
		watchExclude: ['**/node_modules/**', '**/dist/**'],
		coverage: {
			enabled: true,
			include: [
				'**/lib/**/*.*',
			],
			provider: 'v8',
		},
	},
});
