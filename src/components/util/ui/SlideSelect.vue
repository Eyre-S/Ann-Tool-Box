<script setup lang="ts">
import { useCurrentElement, useElementBounding } from '@vueuse/core';
import { computed, Reactive, reactive, Ref, ref } from 'vue';

export interface PositionMessage {
	top: number;
	left: number;
	width: number;
	height: number;
}

const el = useCurrentElement();
const elPos = reactive(useElementBounding(el));

const subElPos = ref<Reactive<PositionMessage>>({ top: 0, left: 0, width: 0, height: 0});
const currentElKey = ref<string|null>(null);

function updatePosition (key: string, message: Reactive<PositionMessage>) {
	console.log(`selected ${key}`);
	subElPos.value = message;
	currentElKey.value = key;
}

const indicatorParams = computed(() => ({
	width: subElPos.value.width,
	height: subElPos.value.height,
	left: subElPos.value.left - elPos.left,
	top: subElPos.value.top - elPos.top
}));

export interface ExposedModel {
	updatePosition: typeof updatePosition;
	current: string|null
}

defineExpose({
	currentSelect: currentElKey
})

</script>

<template>
	
	<div class="slide-select slide-select-container">
		<div class="indicator" />
		<slot :model="{ updatePosition, current: currentElKey }"></slot>
	</div>
	
</template>

<style lang="less" scoped>

.slide-select-container {
	
	--border-radius: 6px;
	
	border-radius: var(--border-radius);
	background-color: white;
	
	display: flex;
	width: fit-content;
	height: fit-content;
	
	position: relative;
	overflow: hidden;
	
	& > .indicator {
		
		background-color: #c8dcf7;
		border-radius: var(--border-radius);
		
		position: absolute;
		z-index: 0;
		
		transition-property: top,left,width,height;
		transition-duration: 200ms;
		
		top: calc(v-bind('indicatorParams.top') * 1px);
		left: calc(v-bind('indicatorParams.left') * 1px);
		width: calc(v-bind('indicatorParams.width') * 1px);
		height: calc(v-bind('indicatorParams.height') * 1px);
		
	}
	
}

</style>
