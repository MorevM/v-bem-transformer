<template>
	<some-component v-if="someCondition > 0" :class="b(null)">
		<div>v-bem:content</div>
		<div class="static class">v-bem</div>
		<div :class="dynamicClass">v-bem:element</div>
		<div :class="[dynamicClass, b(null)]" >v-bem:element.static="{ modifiers }"</div>
		<template #test>
			<div :class="b('inner')"></div>
			<img :class="b('image')"/>
			<img :class="b('image2')" />
			<ComponentPascalCase> some content with > and v-bem </ComponentPascalCase>
			<ComponentPascalCase :class="b('foo')"> some content with > and v-bem </ComponentPascalCase>
		</template>
		<div v-if="someCondition >= ''" :class="b(null, modifiers)"></div>
		<div v-if="someCondition <= ''" :class="b(null, modifiers)"></div>
		<div v-if="someCondition < 123" :class="b(null, modifiers)" ></div>
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
		<div :class="[{ foo: true, bar: dynamic }, b('smth')]" ></div>
		<div :class="['static', dynamic, b('smth')]" ></div>

		<div  :class="[dynamicClass, b('smth', { reverseOrder: 1 })]"></div>
		<div  :class="[dynamicClassAsArray, b('smth', { reverseOrder: 1 }, `static`)]"></div>
	</some-component>
</template>
