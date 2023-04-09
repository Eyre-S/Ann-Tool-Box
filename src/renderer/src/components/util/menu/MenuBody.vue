<script setup lang="ts">

import { computed } from '@vue/reactivity';

const props = defineProps<{
	top?: number,
	left?: number
}>()

const menuBodyPosition = computed(() => {
	return {
		top: props.top == null ? 0 : props.top + 'px',
		left: props.left == null ? 0 : props.left + 'px'
	}
})

</script>

<template>
	
	<div class="menu-body" :style="menuBodyPosition">
		<slot></slot>
	</div>
	
</template>

<style scoped lang="css">

.menu-body {
	
	position: absolute;
	
	display: flex;
	flex-direction: column;
	width: fit-content;
	min-width: 200px;
	max-width: 300px;
	
	padding: 2px;
	
	background-color: #ffffff;
	box-shadow: -1px 1px 12px 1px #e3e3e3;
	border-radius: 10px;
	overflow: hidden;
	
}

</style>
