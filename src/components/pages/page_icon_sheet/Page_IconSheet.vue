<script setup lang="ts">

import PageCard from '@/components/util/page/PageCard.vue';
import IconPreview from "./IconPreview.vue";
import AboutVersionTag from "@/components/main/about/AboutVersionTag.vue";
import InputText from '@/components/util/controller/InputText.vue';
import H1 from "@/components/util/page/H1.vue";
import P from "@/components/util/page/P.vue";
import A from "@/components/util/page/A.vue";

import { computed, reactive, ref } from 'vue';
import { Icon } from "./icon";
import { refDebounced } from '@vueuse/core';

// available icons.
// read from a json which is from NerdFont repositories.
// source: https://github.com/ryanoasis/nerd-fonts/blob/master/glyphnames.json

import icons_metadata from "./glyphnames.json";

const available_icons: Icon[] = reactive([]);
new Promise(() => {
	for (const key in icons_metadata ) {
		if (key === 'METADATA') continue;
		available_icons.push({
			name: key,
			char: icons_metadata[key].char,
			code: icons_metadata[key].code
		})
	}
})

// There's a delayed_input that will change only when the input
// have not changed after 500ms.
//
// it can reduce too much caculated on each character inputed.

const input_id = ref("");
const delayed_input = refDebounced(input_id, 400);

const icons_listing = computed<Icon[]>(() => {
	return available_icons.filter(v => {
		
		var filter = delayed_input.value;
		if (filter.startsWith('nf-')) filter = filter.substring(3);
		else if (filter.startsWith('\\u')) filter = filter.substring(2);
		
		if (filter == '')
			return v.name == 'fa-500px'
		else return (
			v.name.includes(filter) ||
			v.char === filter ||
			v.code.startsWith(filter)
		)
		
	})
})

</script>

<template>
	
	<PageCard>
		
		<H1 icon="nf-md-simple_icons">Icon Sheet</H1>
		
		<P>
			<AboutVersionTag
			icon="nf-md-simple_icons"
			name="Nerd Font Icons"
			:version="icons_metadata.METADATA.version"></AboutVersionTag>
			在 <A href="https://www.nerdfonts.com/cheat-sheet">Nerd Fonts</A> 中搜寻你想要的图标。
		</P>
		
		
		<div class="blank"></div>
		
		<InputText v-model="input_id" placeholder="nf-fa-500px"></InputText>
		
	</PageCard>
	
	<PageCard no-bg no-padding class="icons-listing">
		
		<IconPreview v-for="i of icons_listing" :icon="i"></IconPreview>
		
	</PageCard>
	
</template>

<style lang="less" scoped>

@import "@/assets/css/theme.less";

.blank {
	height: 3em;
}

.input.text {
	
	font-size: 17px;
	
}

.icons-listing {
	
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	gap: 10px;
	
}

</style>
