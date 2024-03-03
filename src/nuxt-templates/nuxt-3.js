import { vuePlugin } from '@local-morev/v-bem-transformer/vue';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(
    vuePlugin({{options}})
  );
});
