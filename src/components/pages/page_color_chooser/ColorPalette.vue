<script setup lang="ts">

import { useElementSize, useMouseInElement, useMousePressed, watchPausable } from '@vueuse/core';
import { StyleValue, computed, nextTick, ref, watch, watchEffect } from 'vue';
import { clamp } from '@/utils/math';
import F5OverlayRecord from '@/components/app_cover/F5Overlay.Record.vue';
import { HSV2RGB, RGB256ize, renderRGB256 } from '@/utils/color';

/**
 * Picker2d chosen value in x axis, from 0 to 1.
 * 
 * X axis is the horizontal axis of the picker2d, and 0 is the left side.
 * 
 * Convert to color local value as needed.
 */
const c2d_x = ref(0);
/**
 * Picker2d chosen value in y axis, from 0 to 1.
 * 
 * Y axis is the vertical axis of the picker2d, and 0 is the top side.
 * 
 * Convert to color local value as needed.
 */
const c2d_y = ref(0);

/**
 * Slider chosen value, from 0 to 1.
 * 
 * Slider is the vertical axis of the picker2d, and 0 is the top side.
 * 
 * Convert to color local value as needed.
 */
const chooseSlider = ref(0);

// --------

const el_picker2d_indicator = ref<HTMLInputElement|null>(null);
const el_picker2d_box = ref<HTMLInputElement|null>(null);

const el_picker2d_canvas = ref<HTMLCanvasElement|null>(null);

const picker2d_box_size = useElementSize(el_picker2d_box);

/**
 * render the picker2d canvas
 */
function picker2d_render () {
	
	if (!el_picker2d_canvas.value) {
		console.error("Cannot get canvas element of picker2d!");
		return;
	}
	const context = el_picker2d_canvas.value.getContext('2d');
	if (!context) {
		console.error("Cannot get canvas context of picker2d!");
		return;
	}
	
	const width = el_picker2d_canvas.value.width;
	const height = el_picker2d_canvas.value.height;
	const hue = chooseSlider.value;
	
	const image = context.createImageData(width, height);
	const imageData = image.data;
	
	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			const index = (y * width + x) * 4;
			// const calcX = x / (window.devicePixelRatio || 1) / picker2d_box_size.width.value;
			// const calcY = y / (window.devicePixelRatio || 1) / picker2d_box_size.height.value;
			const calcX = x / width;
			const calcY = y / height;
			const saturation = calcX;
			const value = (1 - calcY);
			
			// Convert HSL to RGB
			const {red, green, blue} = RGB256ize(HSV2RGB({hue, saturation, value}));
			
			imageData[index] = red;
			imageData[index + 1] = green;
			imageData[index + 2] = blue;
			imageData[index + 3] = 255; // Alpha
		}
	}
	
	context.putImageData(image, 0, 0);
	
}

watch([ picker2d_box_size.width, picker2d_box_size.height, chooseSlider ], () => { nextTick(() => {
	picker2d_render();
})})

const picker2d_changing = useMousePressed({ target: el_picker2d_box });
const picker2d_mouseIn = useMouseInElement(el_picker2d_box);
const picker2d_x = computed(() => picker2d_box_size.width.value * c2d_x.value);
const picker2d_y = computed(() => picker2d_box_size.height.value * c2d_y.value);

// Listen for mouse choose in picker2d and changes the choose2d
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

const picker2d_picker_style = computed<StyleValue>(() => { return {
	left: picker2d_x.value+'px',
	top: picker2d_y.value+'px',
	backgroundColor: renderRGB256(RGB256ize(HSV2RGB({
		hue: chooseSlider.value,
		saturation: c2d_x.value,
		value: 1 - c2d_y.value
	}))),
}})

// --------

const el_pickerSlider_box = ref<HTMLDivElement|null>(null);
const el_pickerSlider_canvas = ref<HTMLCanvasElement|null>(null);
const el_pickerSlider_indicator = ref<HTMLDivElement|null>(null);

const pickerSlider_box_size = useElementSize(el_pickerSlider_box);

function pickerSlider_render () {
	
	if (!el_pickerSlider_canvas.value) {
		console.error("Cannot get canvas element of pickerSlider!");
		return;
	}
	const context = el_pickerSlider_canvas.value.getContext('2d');
	if (!context) {
		console.error("Cannot get canvas context of pickerSlider!");
		return;
	}
	
	const width = el_pickerSlider_canvas.value.width;
	const height = el_pickerSlider_canvas.value.height;
	
	const saturation = 1;
	const value = 1;
	
	const image = context.createImageData(width, height);
	const imageData = image.data;
	
	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			const index = (y * width + x) * 4;
			const calcY = y / height;
			const hue = calcY;
			
			// Convert HSL to RGB
			const {red, green, blue} = RGB256ize(HSV2RGB({hue, saturation, value}));
			
			imageData[index] = red;
			imageData[index + 1] = green;
			imageData[index + 2] = blue;
			imageData[index + 3] = 255; // Alpha
		}
	}
	
	context.putImageData(image, 0, 0);
	
}
watch([ pickerSlider_box_size.width, pickerSlider_box_size.height ], () => { nextTick(() => {
	pickerSlider_render();
})})

const pickerSlider_changing = useMousePressed({ target: el_pickerSlider_box });
const pickerSlider_mouseIn = useMouseInElement(el_pickerSlider_box);
const pickerSlider_y = computed(() => pickerSlider_box_size.height.value * chooseSlider.value);
// Listen for mouse choose in pickerSlider and changes the chooseSlider
function pickerSlider_change_update () {
	chooseSlider.value = clamp(0, pickerSlider_mouseIn.elementY.value / pickerSlider_box_size.height.value, 1);
}
const pickerSlider_change_effect = watchPausable(() => [pickerSlider_mouseIn.elementY.value], () => {
	pickerSlider_change_update();
})
watchEffect(() => {
	if (pickerSlider_changing.pressed.value) (pickerSlider_change_update(), pickerSlider_change_effect.resume());
	else pickerSlider_change_effect.pause();
})

const pickerSlider_pickerStyle = computed<StyleValue>(() => ({
	top: pickerSlider_y.value+'px',
	backgroundColor: `hsl(${chooseSlider.value * 360}, 100%, 50%)`,
}))

</script>

<template>
	
	<Teleport to="#f5-menu" defer>
		<F5OverlayRecord>
			<template #name>ColorChooser - 2D Picker - X</template><template #value>{{ c2d_x }}</template>
		</F5OverlayRecord>
		<F5OverlayRecord>
			<template #name>ColorChooser - 2D Picker - Y</template><template #value>{{ c2d_y }}</template>
		</F5OverlayRecord>
		<F5OverlayRecord>
			<template #name>ColorChooser - Slider</template><template #value>{{ chooseSlider }}</template>
		</F5OverlayRecord>
	</Teleport>
	
	<div class="color-palette">
		
		<div class="main-picker">
			<div>
				<div class="picker-2d" ref="el_picker2d_box">
					<canvas ref="el_picker2d_canvas" :width="picker2d_box_size.width.value" :height="picker2d_box_size.height.value" />
					<div class="picker" :style="picker2d_picker_style" ref="el_picker2d_indicator"></div>
				</div>
				<div class="picker-slider" ref="el_pickerSlider_box">
					<canvas ref="el_pickerSlider_canvas" :width="pickerSlider_box_size.width.value + 1" :height="pickerSlider_box_size.height.value" />
					<div class="picker" ref="el_pickerSlider_indicator" :style="pickerSlider_pickerStyle"></div>
				</div>
			</div>
		</div>
		
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
			
			display: grid;
			grid-template-rows: 15em;
			grid-template-columns: 15em 1.6em;
			gap: 1.2em;
			
			> .picker-2d, .picker-slider {
				position: relative;
				> canvas, .picker {
					position: absolute;
				}
				> canvas {
					overflow: hidden;
					border-radius: 5px;
				}
				> .picker {
					transform: translate(-50%, -50%);
					width: 0.6em;
					height: 0.6em;
					border-radius: 1em;
					border: 0.2em solid #ffffff;
				}
			}
			
			> .picker-slider {
				> .picker {
					left: 50%;
					width: 120%;
					border-radius: 0.5em;
				}
			}
			
		}
		
	}
	
}

</style>
