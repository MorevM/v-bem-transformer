# @morev/v-bem

Someday I'll write it, I promise

## Usage

### With [`Nuxt`](https://nuxtjs.org/)

```js
buildModules: [
  ['@morev/v-bem-transformer/nuxt', {
    directiveName: 'v-bem',
    transformInclude: (id) => id.endsWith('.vue'),
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
  }],
],
```
