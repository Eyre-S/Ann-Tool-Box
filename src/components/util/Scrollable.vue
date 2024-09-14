<script setup lang="ts">

import { useElementHover, useElementSize, useScroll } from '@vueuse/core';
import { logicOr } from '@vueuse/math';
import { computed, ref } from 'vue';


const el_window = ref(null);
const el_content = ref(null);

const window_height = useElementSize(el_window).height;
const content_height = useElementSize(el_content).height;
const scrollable_y = computed(() => content_height.value - window_height.value);
const status = useScroll(el_window);

const scrollable = computed(() => scrollable_y.value > 0);
const window_sizePercent = computed(() => window_height.value / content_height.value);
const scrolling_percent = computed(() => status.y.value / scrollable_y.value);

const el_scrollbar = ref(null);
const el_thumb = ref(null);
const scrollbar_onfocus = useElementHover(el_scrollbar);
const thumb_sizeAbsolute = useElementSize(el_thumb).height;

const show_thumb = logicOr(scrollbar_onfocus, status.isScrolling);

</script>

<template>
	
	<div :class="['scrollable', {'scrolling': status.isScrolling.value }]">
		<div class="scrollable-scrollbar" v-if="scrollable" ref="el_scrollbar">
			<div class="scrollable-track">
				<div class="scrollable-thumb" :class="{show: show_thumb}" ref="el_thumb" :style="{top: `calc(${scrolling_percent*100}% - ${thumb_sizeAbsolute*scrolling_percent}px)`, height: `${window_sizePercent*100}%`}"></div>
			</div>
		</div>
		<div style="position: absolute;" v-if="false">
			<span>{{ content_height }} / {{window_height}} = {{scrollable_y}}</span><br/>
		</div>
		<div class="scrollable-window" ref="el_window">
			<div class="scrollable-content" ref="el_content">
				<slot></slot>
			</div>
		</div>
	</div>
	
</template>

<style lang="less" scoped>

@import "@/assets/css/theme.less";

* {
	box-sizing: border-box;
}

.scrollable {
	
	width: 100%;
	height: 100%;
	
	position: relative;
	
	> .scrollable-window {
		width: 100%;
		height: 100%;
		overflow-y: overlay;
		&::-webkit-scrollbar { display: none; }
	}
	
	> .scrollable-scrollbar {
		
		position: absolute;
		z-index: 800;
		right: 0;
		top: 0;
		bottom: 0;
		display: flex;
		flex-direction: column;
		
		width: 20px;
		padding: 5px;
		
		> .scrollable-track {
			
			flex: 1 1 0;
			position: relative;
			
			> .scrollable-thumb {
				
				position: absolute;
				width: 100%;
				
				border-radius: 10px;
				background-color: @scrollbar-thumb;
				transition: background-color 300ms;
				&.show { background-color: @scrollbar-thumb-onfocus; }
				
			}
			
		}
		
	}
	
}

</style>
