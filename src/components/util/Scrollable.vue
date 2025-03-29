<script setup lang="ts">

import { refDebounced, refThrottled, useElementHover, useElementSize, useMouse, usePointerLock, useScroll } from '@vueuse/core';
import { logicOr } from '@vueuse/math';
import { computed, ref, watch } from 'vue';


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
const show_thumb_throttled = refThrottled(show_thumb, 500);
const show_thumb_delayed = refDebounced(show_thumb, 500);
const show_thumb_final = computed(() => {
	return logicOr(show_thumb.value, show_thumb_delayed.value, show_thumb_throttled.value);
});

const { lock, unlock, element } = usePointerLock()
const { x, y } = useMouse({ type: 'movement' })
watch([x, y], ([_, y]) => {
	if (!element.value) return;
	status.y.value += y;
})

</script>

<template>
	
	<div :class="['scrollable', {'scrolling': status.isScrolling.value }]">
		<div class="scrollable-scrollbar" v-if="scrollable" ref="el_scrollbar">
			<div class="scrollable-track" @mousedown.capture="lock" @mouseup="unlock">
				<div class="scrollable-thumb" :class="{show: show_thumb_final.value}" ref="el_thumb" :style="{top: `calc(${scrolling_percent*100}% - ${thumb_sizeAbsolute*scrolling_percent}px)`, height: `${window_sizePercent*100}%`}"></div>
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
	
	<div class="test">
		<span>show thumb raw: {{ show_thumb }}</span><br/>
		<span>show thumb delayed: {{ show_thumb_delayed }}</span><br/>
		<span>show thumb throttled: {{ show_thumb_throttled }}</span><br/>
		<span>show thumb: {{ show_thumb_final }}</span><br/>
	</div>
	
</template>

<style lang="less" scoped>

@import "@/assets/css/theme.less";

.test {
	position: absolute;
	left: 0;
	top: 0;
}

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
