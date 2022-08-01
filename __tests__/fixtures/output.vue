<!-- eslint-disable vue/attributes-order, vue/html-closing-bracket-spacing, vue/multi-word-component-names, vue/no-undef-components, max-len -->
<template>
	<some-component v-if="someCondition > 0" :class="b(null)">
		<template #test>
			<div :class="b('inner')"></div>
		</template>
		<div v-if="someCondition >= ''" :class="b(null, modifiers)"></div>
		<div :class="b(null, { inline: 'modifiers' })"></div>
		<div :class="b(null, { inline: 'modifiers' })"></div>
		<div
			:class="b(null, {
				formatted: true,
			})"
		></div>

		<div :class="b(null, `static`)"></div>
		<div :class="b(null, modifiers, `static ${dynamic}`)"></div>
		<div :class="b(null, { inline: 'modifiers' }, `static`)"></div>

		<div :class="b(null, `static second`)"></div>
		<div :class="b(null, `static ${dynamicStatic}`)"></div>
		<div :class="b(null, `${dynamicStatic} ${secondDynamicStatic}`)"></div>


		<div :class="b('el')"></div>
		<div :class="b('el', someDynamicMods)"></div>
		<div :class="b('el', { ...some, ...second, third: true })"></div>
		<div :class="b('el', someDynamicMods, `static`)"></div>
		<div :class="b('el', `static another-static strangeStatic`)"></div>
		<div :class="b('el', { some: true, anotherOne: 1 }, `static another-static strangeStatic`)"></div>

		<div
			:class="b('el', {
				some: true,
				anotherOne: 1,
			}, `with-formatting`)"
		></div>

		<div class="static-class" :class="b('static')"></div>

		<div :class="[dynamicClass, b('smth', { test: 1 })]" ></div>
		<div :class="[dynamicClassAsArray, b('smth', { test: 1 })]" ></div>

		<div  :class="[dynamicClass, b('smth', { reverseOrder: 1 })]"></div>
		<div  :class="[dynamicClassAsArray, b('smth', { reverseOrder: 1 }, `static`)]"></div>
	</some-component>
</template>
