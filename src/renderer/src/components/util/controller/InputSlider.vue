<script setup lang="ts">

import { ref, computed } from 'vue'
import { useMouse, useMousePressed, useElementBounding, whenever } from '@vueuse/core'
import { usePrecision } from '@vueuse/math'
import { clamp } from '@renderer/utils/math'


const props = withDefaults(defineProps<{
	modelValue: number
	min: number
	max: number
	precision?: number
}>(), {
	precision: 0
})

const emit = defineEmits<{
	(e: 'update:modelValue', value: number): void
}>()

const value = computed({
	get() {
		return props.modelValue
	},
	set(value) {
		emit('update:modelValue', value)
	}
})

const valuePercent = computed(() => {
	const result: number = (value.value-props.min) / (props.max-props.min)
	return clamp(0, result, 1)
})

//---

const mouseX = useMouse().x;
const startingX = ref(-1);
const startingValue = ref(-1);

const track = ref<HTMLElement|null>(null);
const tag = ref<HTMLElement|null>(null);

// set everything on dragging start
const on_dragging = useMousePressed({target: tag}).pressed;
var oldOnMouseMove: any = undefined;
whenever(() => on_dragging.value == true, () => {
	startingX.value = mouseX.value;
	startingValue.value = value.value;
	oldOnMouseMove = window.onmousemove;
	window.onmousemove = on_changeProgress;
})
whenever(() => on_dragging.value == false, () => {
	window.onmousemove = oldOnMouseMove;
})

function on_changeProgress () {
	
	/** how many values change on each pixel */
	const i = (props.max - props.min) / (useElementBounding(track).right.value - useElementBounding(track).left.value);
	
	const mouse_changed = mouseX.value - startingX.value;
	const value_todo = startingValue.value + (mouse_changed * i);
	value.value = clamp(props.min, usePrecision(value_todo, props.precision).value, props.max);
	
}

</script>

<template>
	
	<div class="input slider">
		<div class="track">
			<div class="track-sim" ref="track"><div class="tag" ref="tag" :style="{left: `${valuePercent * 100}%`}">{{ value }}</div></div>
			<div class="tag-sim">{{ value }}</div>
		</div>
	</div>
	
</template>

<style lang="less" scoped>

@import "../../../assets/css/theme.less";

.input.slider {
	
	font-size: 12px;
	font-family: @font-code;
	color: @input-text-text;
	line-height: 1;
	
	display: flex;
	flex-wrap: nowrap;
	flex-direction: row;
	width: 100%;
	
	> .track {
		
		height: 1.8em;
		width: 100%;
		border-radius: 0.3em;
		background-color: #ffffff;
		
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		
		> .track-sim {
			
			flex: 1 1 0;
			position: relative;
			
			> .tag {
				
				position: absolute;
				top: 0;
				bottom: 0;
				padding: 0 0.55em;
				
				display: flex;
				align-items: center;
				
				background-color: #c8dcf7;
				color: #558cd3;
				border-radius: 0.3em;
				cursor: move;
				
			}
			
		}
		
		> .tag-sim {
			padding: 0 0.55em;
			flex: 0 0;
			opacity: 0;
		}
		
	}
	
}

</style>
