import Vue from 'vue';
// `Nuxt` doesn't respect `exports` field in `package.json` and implicitly
// transform `import` to `require`, thats why where is defined full path
// and `.cjs` extension.
import { vuePlugin } from '@morev/v-bem-transformer/dist/vue.cjs';

Vue.use(vuePlugin(<%= JSON.stringify(options, null, 2) %>));
