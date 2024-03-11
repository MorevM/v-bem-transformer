![Stability of "master" branch](https://img.shields.io/github/actions/workflow/status/MorevM/v-bem-transformer/build.yaml?branch=master)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![Last commit](https://img.shields.io/github/last-commit/morevm/v-bem-transformer)
![Release version](https://img.shields.io/github/v/release/morevm/v-bem-transformer?include_prereleases)
![GitHub Release Date](https://img.shields.io/github/release-date/morevm/v-bem-transformer)
![Keywords](https://img.shields.io/github/package-json/keywords/morevm/v-bem-transformer)

# @morev/v-bem-transformer

Intuitive and performant BEM in Vue files via directive syntax 🛠

✔️ Supports `Vue 2 / 3` both; \
✔️ Supports `Nuxt 2 / 3` both; \
✔️ Provides a composable to use with Composition API; \
✔️ Best BEM practices for single-file-components; \
✔️ Small footprint (1kb gzipped).

## Table of contents

* [What's the point, what does it do?](#whats-the-point-what-does-it-do)
* [Installation](#installation)
* [Usage](#usage)
* [Usage with Nuxt](#usage-with-nuxt)
* [Configuration](#configuration)
* [How does it work](#how-does-it-work)
* [Recipes](#recipes)
* [Known limitations](#known-limitations)

## What's the point, what does it do?

The package helps level out one of [BEM](https://en.bem.info/)'s biggest problems - its verbosity. \
It also allows you to have more confidence that there are no errors in the block name,
and that nothing unnecessary has been added to the component's classes that relate to other components.

Implementation details are described in the ["How does it work"](#how-does-it-work) section,
more examples and recipes are shown in the ["Recipes"](#recipes) section,
here is just a self-explanatory code example:

Using the package, if you provide the code like that...

```vue
<template>
  <div v-bem>
    <div v-bem:header>
      <div v-bem:title="{ size: 'large', wide: true }">
        Some title
      </div>
    </div>
  </div>
</template>

<script setup>
  defineOptions({ name: 'the-block' });
</script>
```

...it will be rendered into the following:

```html
<div class="the-block">
  <div class="the-block__header">
    <div class="
      the-block__title 
      the-block__title--size-large 
      the-block__title--wide
    ">
      Some title
    </div>
  </div>
</div>
```

You can also use variables for modifiers or elements, making it easier than ever to handle states.

## Installation

> [!CAUTION]
> Requirements:
>
> * Node version: `>= 18.0.0`;
> * Nuxt version (if used): `>= 2.17.0 || >= 3.5.0`;
> * Any bundler is required: `vite`, `esbuild`, `webpack`, `rollup` are supported via [unplugin](https://github.com/unjs/unplugin).
>
> **The plugin will not work if you are using a Node or Nuxt version less than the specified ones.**

---

### Using `yarn`

```bash
yarn add @morev/v-bem-transformer
```

---

### Using `npm`

```bash
npm install @morev/v-bem-transformer
```

---

### Using `pnpm`

```bash
pnpm add @morev/v-bem-transformer
```

---

### Using `bun`

```bash
bun add @morev/v-bem-transformer
```

## Usage

> [!Note]
> You may skip this section if you are going to use the module with Nuxt. \
> [Go to "Usage with Nuxt" section](#usage-with-nuxt).


### Step 1: Bundler plugin

First, you need to attach the plugin to your builder (`vite` is used here in the example):

> [!IMPORTANT]
> The plugin SHOULD be the first in the chain to work correctly.

```ts
import { defineConfig } from 'vite';
import pluginVue from '@vitejs/plugin-vue';
import { vitePlugin as pluginVBem } from '@morev/v-bem-transformer';

export default defineConfig({
  plugins: [
    pluginVBem({
      // custom options described below (and also fully typed via TS right here)
    }),
    pluginVue(),
  ],
});
```

The packages provides plugins for `vite`, `rollup`, `webpack` and `esbuild`.

### Step 2: Vue plugin

> [!NOTE]
> This guide illustrates how to use it with `Vue 3`. \
> Connecting to `Vue 2` follows the same algorithm, except for the specifics of installing plugins -
> you need to use `Vue.use()` instead of `app.use()`.

```ts
import { createApp } from 'vue';
import App from './App.vue';

import { vuePlugin as pluginVBem } from '@morev/v-bem-transformer/vue';

const app = createApp(App)
app.use(pluginVBem({
  // custom options described below (and also typed with TS right here)
}));

app.mount('#app');
```

### Step 3: Types for `b()` method (if needed)

If you are going to use the function generating BEM classes directly (quite rarely used to be honest) and you need a type inside a component,
add the following to your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "types": [
      "@morev/v-bem-transformer/types/vue-globals.d.ts"
    ]
  }
}
```

> [!WARNING]
> `vue-globals.d.ts` registers a property named `b`. \
> If you are going to use a different property name - you must provide the appropriate types yourself.

### Step 4: Composable (if needed)

If you need to access BEM generator function within `<script setup>`, you can create you own `useBem` composable this way:

```ts
// ~/composables/use-bem.ts
import { useBemFactory } from '@morev/v-bem-transformer/use-bem-factory';

export const useBem = useBemFactory({
  // custom options described below
});
```

> [!TIP]
> You can find this composable template with typings [here](https://github.com/MorevM/v-bem-transformer/blob/master/src/nuxt-templates/use-bem.ts).


## Usage with Nuxt

The package supports both `Nuxt 2` and `Nuxt 3`. \
Nuxt 2 support without Bridge is slightly limited - the module will not automatically register the `useBem` composable
(but you still can do it yourself, for example if you are using [`@nuxtjs/composition-api`](https://github.com/nuxt-community/composition-api)).

[Install the package](#installation), next add `@morev/v-bem-transformer/nuxt` to the `modules` section of your `nuxt.config`:

```ts
export default defineNuxtConfig({
  modules: [
    '@morev/v-bem-transformer/nuxt',
  ],
  vBemTransformer: {
    // Optional configuration options described below.
  }
});

// ...or using the tuple syntax:
export default defineNuxtConfig({
  modules: [
    ['@morev/v-bem-transformer/nuxt', {
      // Optional configuration options described below.
    }],
  ],
});
```

Using Nuxt 3, no additional steps are required, just start using the `v-bem` directive and composable `useBem` within your components. \
It will be fully typed by default.


## Configuration

All methods have built-in documentation via TS,
source types are available [here](https://github.com/MorevM/v-bem-transformer/blob/master/src/types.ts).

## How does it work

The package works in two steps:

1. Registers a global mixin that provides a [BEM class name generator](https://github.com/MorevM/bem-classnames) bound to each component. \
  You can [check it out here](https://github.com/MorevM/v-bem-transformer/blob/master/src/vue.ts).
1. At build time, using regular expressions, replaces `v-bem` directives with class declarations (preserving existing ones, if any)
that call the method added using the mixin in the previous step:

```html
<!-- Before the transformation -->
<div v-bem>
  <div v-bem:element="{ modifier: true }">
    <div v-bem:inner :class="dynamicClass"></div>
  </div>
</div>

<!-- After the transformation -->
<div :class="b(null)">
  <div :class="b('element', { modifier: true })">
    <div :class="[dynamicClass, b('inner')]"></div>
  </div>
</div>
```

### Why not just use directives?

A directive is a separate entity with its own lifecycle, so using it actually for each DOM element is overkill. \
If we use transformation, we just get class bindings.

Also directives require separate processing at the SSR level, which adds complexity and points of failure (especially in Vue 2).

## Recipes

<details>
  <summary>How to use with static classnames?</summary>
  <br />
  There are two use cases: writing static classes via the directive modifier syntax, or using the native `class` attribute.

  **Input**:

  ```vue
  <template>
    <div v-bem.static.another-static>
      <div v-bem:element class="is-active"></div>
    </div>
  </template>
  
  <script lang="ts" setup>
    defineOptions({ name: 'the-block' });
  </script>
  ```

  **Output**:

  ```html
  <div class="the-block static another-static">
    <div class="the-block__element is-active"></div>
  </div>
  ```

</details>

<details>
  <summary>How to use with dynamic static classnames?</summary>
  <br />
  As well as in the previous case, you have two options: writing via the dynamic directive modifier syntax, or using the native `class` attribute.

  **Input**:

  ```vue
  <template>
    <div v-bem.[dynamicClassBinding]>
      <div v-bem:element :class="dynamicClassBinding"></div>
    </div>
  </template>
  
  <script lang="ts" setup>
    defineOptions({ name: 'the-block' });
    
    const dynamicClassBinding = ref('is-active');
  </script>
  ```

  **Output**:

  ```html
  <div class="the-block static another-static">
    <div class="the-block__element is-active"></div>
  </div>
  ```

</details>

<details>
  <summary>Handling states with dynamic modifier bindings</summary>

  **Input**:

  ```vue
  <template>
    <div v-bem>
      <div v-bem:element="{ active: isActive }"></div>
      <button type="button" @click="isActive = !isActive">Toggle</button>
    </div>
  </template>
  
  <script lang="ts" setup>
    defineOptions({ name: 'the-block' });
    
    const isActive = ref(false);
  </script>
  ```

  **Initial output**:

  ```html
  <div class="the-block">
    <div class="the-block__element"></div>
    <button type="button">Toggle</button>
  </div>
  ```

  **Output after click on the button**:

  ```html
  <div class="the-block">
    <div class="the-block__element the-block__element--active"></div>
    <button type="button">Toggle</button>
  </div>
  ```

  All variables within `v-bem` directive are fully reactive.
</details>

## Known limitations

As the module manipulates the source code via a trivial regular expression, there is no support for JSX/TSX and programmatically created elements
(using Vue's `h()` method for example).

You still can use `useBem()` composable using Composition API and `this.b()` to access `bemFunction`,
but transforming as a directive will only work in Vue files that do not use a custom syntax like `pug`.

<details>
  <summary>How to deal with JSX/TSX using Composition API?</summary>
  <br />

  ```vue
  <script lang="ts" setup>
    defineOptions({ name: 'the-block' });
    
    const $b = useBem();
    
    const render = () => (
      <div class={$b()}>
        <div class={$b('inner-element')}></div>
      </div>
    );
  </script>
  ```

</details>

<details>
  <summary>How to deal with render function using Options API?</summary>
  <br />

  ```vue
  <script lang="ts">
    import { h } from 'vue';
    
    export default {
      name: 'the-block',
      render() {
        return h('div', { class: this.b() }, [
          h('div', { class: this.b('element') }, 'Some content')
        ])
      }
    }
  </script>
  ```

</details>
