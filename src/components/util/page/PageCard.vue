<script setup lang="ts">

defineProps<{
	noBg?: boolean,
	noPadding?: boolean
}>()

</script>

<template>
	
	<div :class="['page-card', { 'no-bg': noBg, 'no-padding': noPadding }]">
		<slot></slot>
	</div>
	
</template>

<style lang="less" scoped>

@import "@/assets/css/theme.less";

.page-card {
	
	background: @card-background;
	border-radius: 10px;
	
	padding: 20px;
	
	&.no-bg { background: none }
	&.no-padding { padding: 0px; }
	
}

.page-card + .page-card {
	margin-top: 10px;
}

</style>
