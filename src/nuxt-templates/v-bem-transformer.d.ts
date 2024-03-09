import Vue from 'vue';
import type { BemFunction } from '@morev/bem-classnames';

declare module 'vue/types/vue' {
	interface Vue {
		{{METHOD_NAME}}: BemFunction;
	}
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties  {
    {{METHOD_NAME}}: BemFunction
  }
}

export {}