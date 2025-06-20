<script setup lang="ts">

import PageCard from '@/components/util/page/PageCard.vue';
import IconPreview from "./IconPreview.vue";
import AboutVersionTag from "@/components/main/about/AboutVersionTag.vue";
import InputText from '@/components/util/controller/InputText.vue';
import H1 from "@/components/util/page/H1.vue";
import P from "@/components/util/page/P.vue";
import A from "@/components/util/page/A.vue";

import { computed, reactive, Ref, ref, shallowRef, ShallowRef, watch, watchEffect } from 'vue';
import { Icon } from "./icon";
import { refDebounced, templateRef, useElementSize, useElementVisibility, useVirtualList } from '@vueuse/core';

// available icons.
// read from a json which is from NerdFont repositories.
// source: https://github.com/ryanoasis/nerd-fonts/blob/master/glyphnames.json

import icons_metadata from "./glyphnames.json";
import InputButton from '@/components/util/controller/InputButton.vue';
import toast from '@/components/app_cover/toast/toast';
import { nearestMultiplied, times } from '@/utils/math';
import { UseElementVisibility } from '@vueuse/components';

const available_icons: Icon[] = reactive([]);
new Promise(() => {
	for (const key in icons_metadata ) {
		if (key === 'METADATA') continue;
		available_icons.push({
			name: key,
			char: (icons_metadata as any)[key].char,
			code: (icons_metadata as any)[key].code
		})
	}
})

// There's a delayed_input that will change only when the input
// have not changed after 300ms.
//
// it can reduce too much caculated on each character inputed.

const input_apply_delay_ms = 300


// Compute how much icons to show per line.
// This is useful for grid layout, but also for virtual scrolling!
const el_listing = templateRef('el_listing');
const el_listing_size = useElementSize(el_listing);
const itemPerLine = computed(() => Math.floor(el_listing_size.width.value / 140));
const MAX_PAGE_SIZE = 100;
const pageSize = computed(() => nearestMultiplied(itemPerLine.value, MAX_PAGE_SIZE));

// Filter the icons by user input, get the icon list to shows.

const input_id = ref("");
const delayed_input = refDebounced(input_id, input_apply_delay_ms);

const icons_listing = ref<Icon[]>([]);

const defaultsShowingIcons: string[] = [
	"fa-fonticons",
	"md-material_design",
	"weather-night_snow_wind",
	"dev-code",
	"oct-copilot",
	"cod-azure",
	"linux-archlinux",
	"pom-pomodoro_ticking",
	"iec-power",
	"seti-c_sharp"
]

watchEffect(() => {
	
	let icon_listing_temp: Icon[] = []
	
	var filter = delayed_input.value;
	if (filter.startsWith('nf-')) filter = filter.substring(3);
	else if (filter.startsWith('\\u')) filter = filter.substring(2);
	
	for (const icon of available_icons) {
		
		if (filter == '') {
			
			if (defaultsShowingIcons.includes(icon.name)) {
				icon_listing_temp.push(icon);
			}
			
			continue
			
		}
		
		if (
			icon.name.includes(filter) ||
			icon.char === filter ||
			icon.code.startsWith(filter)
		) {
			icon_listing_temp.push(icon);
		}
		
	}
	
	icons_listing.value = icon_listing_temp
	
})

// V-List

const el_vPage = templateRef('el_vPage');
const { height: pageHeight } = useElementSize(el_vPage);

const virtualIcon: Icon = {
	name: 'fa-500px',
	char: '',
	code: 'f26e'
}

const pagedRenderingItems = computed<[Icon[][], Icon[]]>(() => {
	
	let pager: Icon[][] = [];
	const currIcons = icons_listing.value;
	
	for (let i = 0; i < currIcons.length; i += pageSize.value) {
		pager.push(currIcons.slice(i, i + pageSize.value));
	}
	
	const lastPage: Icon[] = pager[pager.length - 1] || [];
	const nonLastPages = pager.slice(0, -1);
	return [nonLastPages, lastPage];
	
});

</script>

<template>
	
	<PageCard>
		
		<H1 icon="nf-md-simple_icons">Icon Sheet</H1>
		
		<P>
			<AboutVersionTag
			icon="nf-oct-smiley"
			name="Nerd Font Icons"
			:version="icons_metadata.METADATA.version"></AboutVersionTag>
			&nbsp;
			<AboutVersionTag
			icon="nf-fa-fonticons"
			name="Font Awesome"
			version="by NerdFonts"></AboutVersionTag>
			&nbsp;
			<AboutVersionTag
			icon="nf-md-material_design"
			name="Material Design Icons"
			version="by NerdFonts"></AboutVersionTag><br>
		</P>
		
		<P>
			在 <A href="https://www.nerdfonts.com/cheat-sheet">Nerd Fonts</A> 中搜寻你想要的图标。Nerd Fonts
			自带有 Font Awesome，Material Design Icons，Octicons，Codicons 等各种你喜欢的图标库的图标支援！
		</P>
		
		<P>
			要注意的是由于 WebView 的限制，一次性加载过多的图标可能导致（严重的）性能问题。我们已经设计了通过每次只加载
			200 个图标的方式以避免这个问题，不过这个问题仍然可能在使用过多次 "Load More" 的情况下出现。
		</P>
		
		<P>
			<AboutVersionTag
			icon="nf-md-simple_icons"
			name="Simple Icons"
			version="13.11.0"></AboutVersionTag>
			将计划在下个版本中加入 <A href="https://simpleicons.org/">Simple Icons</A> 的支持。
		</P>
		
		<div class="blank"></div>
		
		<InputText v-model="input_id" placeholder="nf-fa-500px"></InputText>
		
	</PageCard>
	
	<PageCard no-bg no-padding class="icons-listing" ref="el_listing">
		
		<div class="virtual-page-box">
			<div class="virtual-page icons-listing-page" ref="el_vPage">
				<IconPreview v-for="i of times(pageSize, () => virtualIcon)" :icon="i" />
			</div>
		</div>
		
		<UseElementVisibility
			class="icons-listing-page"
			v-for="[index, page] in pagedRenderingItems[0].entries()" :key="index"
			v-slot="{ isVisible }"
		>
			<!-- <span :vis="isVisible" style="position: absolute; z-index: 100;">{{ index }}</span> -->
			<template v-if="isVisible">
				<IconPreview v-for="i of page" :icon="i"></IconPreview>
			</template>
		</UseElementVisibility>
		
		<div class="icons-listing-page last-page">
			<IconPreview v-for="i of pagedRenderingItems[1]" :icon="i"></IconPreview>
		</div>
		
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
	
	position: relative;
	
	> .virtual-page-box {
		
		position: absolute;
		overflow: hidden;
		width: 100%;
		height: 1px;
		opacity: 0;
		z-index: -1;
		
	}
	
	.icons-listing-page {
		position: relative;
		display: grid;
		grid-template-columns: repeat(v-bind(itemPerLine), 1fr);
		&:not(.virtual-page, .last-page) {
			height: calc(v-bind(pageHeight) * 1px);
		}
		gap: 10px;
		+ .icons-listing-page {
			margin-top: 10px;
		}
	}
	
	.icon-preview {
		width: unset;
	}
	
}

.icon-more {
	
	display: flex;
	justify-content: center;
	align-items: center;
	
}

</style>
