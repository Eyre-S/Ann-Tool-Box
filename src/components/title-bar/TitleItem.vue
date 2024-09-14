<script setup lang="ts">

defineProps<{
	title: string
	icon?: string
	clickable?: boolean
}>()

</script>

<template>
	
	<div :class="['title-item', { 'clickable': clickable }]">
		<img v-if="icon != null" :src="icon" />
		<span>{{ title }}</span>
	</div>
	
</template>

<style lang="less" scoped>

@import "@/assets/css/theme.less";

.title-item {
	
	height: 30px;
	width: auto;
	padding-left: 0.7rem;
	padding-right: 0.7rem;
	margin-left: 1rem;
	margin-right: 1rem;
	background-color: @window-title-bg;
	border-radius: 6px;
	
	display: flex;
	align-items: center;
	justify-content: center;
	
}

.title-item.clickable:hover {
	background-color: @window-title-bg-onfocus;
}

.title-item > img {
	max-width: 20px;
	max-height: 20px;
	margin-left: -3px;
	margin-right: 5px;
}

.title-item > span {
	color: @window-title-fg;
	font-size: 13px;
	font-weight: bold;
}

</style>
