import type { Options } from './types';

export const defaultOptions: Options = {
	transformInclude: (id: string) => id.includes('.vue'),
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
};
