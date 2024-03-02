<template>
	<some-component v-if="someCondition > 0" v-bem>
		<div>v-bem:content</div>
		<div class="static class">v-bem</div>
		<div :class="dynamicClass">v-bem:element</div>
		<div :class="dynamicClass" v-bem>v-bem:element.static="{ modifiers }"</div>
		<template #test>
			<div v-bem:inner></div>
			<img v-bem:image/>
			<img v-bem:image2 />
			<ComponentPascalCase> some content with > and v-bem </ComponentPascalCase>
			<ComponentPascalCase v-bem:foo> some content with > and v-bem </ComponentPascalCase>
		</template>
		<div v-if="someCondition >= ''" v-bem="modifiers"></div>
		<div v-if="someCondition <= ''" v-bem="modifiers"></div>
		<div v-if="someCondition < 123" v-bem="modifiers" ></div>
		<div v-bem="{ inline: 'modifiers' }"></div>
		<div v-bem='{ inline: "modifiers" }'></div>
		<div
			v-bem="{
				formatted: true,
			}"
		></div>

		<div v-bem.static></div>
		<div v-bem.static.[dynamic]="modifiers"></div>
		<div v-bem.static='{ inline: "modifiers" }'></div>

		<div v-bem.static.second></div>
		<div v-bem.static.[dynamicStatic]></div>
		<div v-bem.[dynamicStatic].[secondDynamicStatic]></div>


		<div v-bem:el></div>
		<div v-bem:el="someDynamicMods"></div>
		<div v-bem:el="{ ...some, ...second, third: true }"></div>
		<div v-bem:el.static="someDynamicMods"></div>
		<div v-bem:el.static.another-static.strangeStatic></div>
		<div v-bem:el.static.another-static.strangeStatic="{ some: true, anotherOne: 1 }"></div>

		<div
			v-bem:el.with-formatting="{
				some: true,
				anotherOne: 1,
			}"
		></div>

		<div class="static-class" v-bem:static></div>

		<div :class="dynamicClass" v-bem:smth="{ test: 1 }"></div>
		<div :class="[dynamicClassAsArray]" v-bem:smth="{ test: 1 }"></div>
		<div :class="{ foo: true, bar: dynamic }" v-bem:smth></div>
		<div :class="['static', dynamic]" v-bem:smth></div>

		<div v-bem:smth="{ reverseOrder: 1 }" :class="dynamicClass"></div>
		<div v-bem:smth.static="{ reverseOrder: 1 }" :class="[dynamicClassAsArray]"></div>
	</some-component>
</template>
