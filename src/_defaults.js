export const defaultOptions = {
	transformInclude: (id) => id.endsWith('.vue'),
	directiveName: 'v-bem',
	bemOptions: {
		delimiters: {
			element: '__',
			modifier: '--',
			modifierValue: '-',
		},
		hyphenate: true,
		namespace: '',
	},
	methodName: 'b',
	blockName: 'name',
	priorityBlockName: 'block',
	fallbackBlockName: 'unknown',
	composableName: 'useBem',
};
