<script setup lang="ts">

import H1 from "@/components/util/page/H1.vue";
import PageCard from "@/components/util/page/PageCard.vue"
import ColorPalette from "./ColorPalette.vue";
import SlideSelectItem from "@/components/util/ui/SlideSelectItem.vue";
import SlideSelect from "@/components/util/ui/SlideSelect.vue";
import { computed, ref, useTemplateRef } from "vue";
import P from "@/components/util/page/P.vue";

const type_selector_el = useTemplateRef('type_selector_el');
const paletteType = computed<string|null>(() => (type_selector_el.value?.currentSelect || null));

</script>

<template>
	
	<PageCard>
		
		<H1 icon="nf-fae-palette_color">Color Chooser</H1>
		
	</PageCard>
	
	<PageCard class="color-chooser">
		<SlideSelect v-slot="{ model }" ref="type_selector_el">
			<SlideSelectItem :model="model" id="rgb" default>RGB</SlideSelectItem>
			<SlideSelectItem :model="model" id="hsl">HSL</SlideSelectItem>
		</SlideSelect>
		<template v-if="paletteType == 'rgb'">
			<ColorPalette />
		</template>
		<template v-else>
			<P>Not implemented yet!</P>
		</template>
	</PageCard>
	
</template>

<style lang="less" scoped>

.color-chooser {
	
	& > .slide-select {
		margin-block-end: 2em;
		width: 100%;
		display: flex;
		flex-direction: row;
		& > .slide-select-item {
			flex: 1 1 0;
			text-align: center;
		}
	}
	
}

</style>
