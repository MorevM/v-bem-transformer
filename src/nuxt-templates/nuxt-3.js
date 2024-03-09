import { vuePlugin } from '{{MODULE_NAME}}/vue';
import { defineNuxtPlugin } from '#imports';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(
    vuePlugin({{OPTIONS}})
  );
});
