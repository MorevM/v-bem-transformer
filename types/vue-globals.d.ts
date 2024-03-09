import Vue from 'vue';
import type { BemFunction } from '@morev/bem-classnames';

declare module 'vue/types/vue' {
	interface Vue {
		b: BemFunction;
	}
}

declare module '@vue/runtime-core' {
	interface ComponentCustomProperties {
		b: BemFunction;
	}
}

export {};
