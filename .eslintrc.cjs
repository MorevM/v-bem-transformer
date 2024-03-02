module.exports = {
	root: true,
	extends: [
		'@morev/eslint-config/base',
		'@morev/eslint-config/preset/vue2',
		'@morev/eslint-config/preset/assistive',
		'@morev/eslint-config/preset/typescript',
	],
	overrides: [
		{ files: '*.cjs', extends: ['@morev/eslint-config/node'] },
		{ files: '*.md', rules: { 'markdownlint/md033': 'off' } },
		// There's an intentional use of different (weird) syntax in the tests here
		{
			files: '__tests__/fixtures/*.vue',
			rules: {
				'vue/attributes-order': 'off',
				'vue/html-closing-bracket-spacing': 'off',
				'vue/multi-word-component-names': 'off',
				'vue/no-undef-components': 'off',
				'@stylistic/js/max-len': 'off',
				'vue/no-bare-strings-in-template': 'off',
				'vue/component-name-in-template-casing': 'off',
			},
		},
	],
	rules: {},
};
