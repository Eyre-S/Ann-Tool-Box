<script setup lang="ts">
import { useCurrentElement, useElementBounding } from '@vueuse/core';
import { ExposedModel } from './SlideSelect.vue';
import { computed, onMounted, reactive } from 'vue';

const props = defineProps<{
	id: string,
	model: ExposedModel,
	default?: boolean
}>();

const el = useCurrentElement();
const elPos = reactive(useElementBounding(el));

function updatePosition() {
	console.log("updating position on sub-item");
	props.model.updatePosition(props.id, elPos);
}

onMounted(() => {
	if (props.default) {
		updatePosition();
	}
})

const isSelected = computed(() => (props.model.current === props.id))

</script>

<template>
	<div class="slide-select-item" :class="{selected: isSelected}" @click="updatePosition">
		<slot>{{ id }}</slot>
	</div>
</template>

<style lang="less" scoped>

.slide-select-item {
	
	position: relative;
	z-index: 10;
	
	padding: 6px 9px;
	box-sizing: border-box;
	
	font-size: 13px;
	color: #6a6a6a;
	transition: color 200ms;
	
	&.selected {
		color: white;
	}
	
}

</style>
