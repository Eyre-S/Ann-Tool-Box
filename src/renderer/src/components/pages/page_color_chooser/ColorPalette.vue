<script setup lang="ts">

import { useElementSize, useMouseInElement, useMousePressed, watchPausable } from '@vueuse/core';
import { StyleValue, computed, ref, watchEffect } from 'vue';
import { clamp } from '@renderer/utils/math';


const c2d_x = ref(0);
const c2d_y = ref(0);

const picker2d_picker_el = ref<HTMLInputElement|null>(null);
const picker2d_box_el = ref<HTMLInputElement|null>(null);
const picker2d_box_size = useElementSize(picker2d_box_el);
const picker2d_changing = useMousePressed({ target: picker2d_box_el });
const picker2d_mouseIn = useMouseInElement(picker2d_box_el);
const picker2d_x = computed(() => picker2d_box_size.width.value * c2d_x.value);
const picker2d_y = computed(() => picker2d_box_size.height.value * c2d_y.value);
const picker2d_picker_style = computed<StyleValue>(() => { return {
	left: picker2d_x.value+'px',
	top: picker2d_y.value+'px'
}})

function picker2d_change_update () {
	c2d_x.value = clamp(0, picker2d_mouseIn.elementX.value / picker2d_box_size.width.value, 1);
	c2d_y.value = clamp(0, picker2d_mouseIn.elementY.value / picker2d_box_size.height.value, 1);
}
const picker2d_change_effect = watchPausable(() => [picker2d_mouseIn.elementX.value, picker2d_mouseIn.elementY.value], () => {
	picker2d_change_update();
})
watchEffect(() => {
	if (picker2d_changing.pressed.value) (picker2d_change_update(), picker2d_change_effect.resume());
	else picker2d_change_effect.pause();
})

</script>

<template>
	
	<div class="color-palette">
		
		<div class="main-picker">
			<div>
				<div class="picker-2d" ref="picker2d_box_el"><div class="picker" :style="picker2d_picker_style" ref="picker2d_picker_el"></div></div>
				<div class="picker-slider"></div>
			</div>
		</div>
		
		<div class="value-sliders"></div>
		
	</div>
	
</template>

<style lang="less" scoped>

.color-palette {
	
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	
	> .main-picker {
		
		flex: 0 0;
		
		> div {
			
			height: 0;
			padding-bottom: 100%;
			
			> .picker-2d {
				height: 15em;
				width: 15em;
				background: bisque;
				position: relative;
				> .picker {
					position: absolute;
					transform: translate(-50%, -50%);
					width: 0.6em;
					height: 0.6em;
					border-radius: 1em;
					border: 0.2em solid #ffffff;
				}
			}
			
		}
		
	}
	
	> .value-sliders {
		flex: 7 7 0;
	}
	
}

</style>
