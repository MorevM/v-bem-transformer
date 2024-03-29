import type { BemFunction, ModuleOptions } from '@morev/bem-classnames';

/**
 * The options passed in to `unplugin`.
 */
export type BundlerOptions = {
	/**
	 * Custom predicate function to filter the modules to be transformed.
	 *
	 * @param   id   The module ID.
	 *
	 * @returns      Whether the file should be transformed.
	 *
	 * @default      id.includes('.vue')
	 */
	transformInclude: (id: string) => boolean;

	/**
	 * Name of the directive being transformed.
	 *
	 * @default 'v-bem'
	 */
	directiveName: string;
};

/**
 * The options passed in Vue plugin.
 */
export type PluginOptions = {

	/**
	 * BEM converter options. \
	 * Passed down directly to `@morev/bem-classnames` package.
	 */
	bemOptions: ModuleOptions;

	/**
	 * The name of component method used to generate a classnames. \
	 * This means that the BEM generator function bound to the component can be called via this name,
	 * e.g. `this.b('element') --> .block__element`.
	 *
	 * @default 'b'
	 */
	methodName: string;

	/**
	 * Component property name containing the name of the block in the BEM notation.
	 *
	 * @default 'name'
	 */
	blockName: string;

	/**
	 * The name of the component property containing the name of the block in BEM notation,
	 * taking precedence over `blockName`. Quite rarely used option.
	 *
	 * @default 'block'
	 */
	priorityBlockName: string;

	/**
	 * The block name to be used if the name could not be determined
	 * by `blockName` and `priorityBlockName`.
	 *
	 * @default 'unknown'
	 */
	fallbackBlockName: string;
};

/**
 * The options of Nuxt module.
 */
export type NuxtModuleOptions = BundlerOptions & PluginOptions & {
	/**
	 * The name of auto-registered composable.
	 *
	 * @default 'useBem'
	 */
	composableName: string;
};

export type BemFunctionFactory = (
	/**
	 * Function to create classes according to the BEM methodology for a BEM block with the specified `name`.
	 * If `name` is not specified or `null`, the name of the component where the composable is called will be used (if possible to define).
	 *
	 * @example
	 *   const b = useBem('block');
	 *   b(null); // block
	 *   b('element', { modifier: true }); // block__element block__element--modifier
	 * @example
	 *   <script setup>
	 *     defineOptions({ name: 'the-block' });
	 *
	 *     const b = useBem();
	 *     b('element'); // the-block__element
	 *   </script>
	 *
	 * @param   name   BEM block name.
	 *
	 * @returns        Function to create classes according to the BEM methodology.
	 */
	(name?: string | null) => BemFunction
);

export type ParsedClassDeclaration = {
	/**
	 * The start position of class declaration.
	 */
	start: number;

	/**
	 * The end position of class declaration.
	 */
	end: number;

	/**
	 * The length of class declaration.
	 */
	length: number;

	/**
	 * Full expression within class declaration.
	 */
	expression: string;

	/**
	 * The start position of expression within class declaration.
	 */
	expressionStart: number;

	/**
	 * The end position of expression within class declaration.
	 */
	expressionEnd: number;

	/**
	 * The length of expression within class declaration.
	 */
	expressionLength: number;

	/**
	 * Whether expression is represented as array.
	 */
	isArray: boolean;
};

export type ParsedDirective = {
	/**
	 * Start position of the `v-bem` directive.
	 */
	start: number;

	/**
	 * End position of the `v-bem` directive.
	 */
	end: number;

	/**
	 * The length of the `v-bem` directive.
	 */
	length: number;

	/**
	 * The `element` part in BEM notation.
	 */
	element: string | null;

	/**
	 * The `modifiers` part in BEM notation (raw, joined via space).
	 */
	modifiers: string | null;

	/**
	 * Static classnames to append (joined via space)
	 */
	staticClassnames: string | null;
};
