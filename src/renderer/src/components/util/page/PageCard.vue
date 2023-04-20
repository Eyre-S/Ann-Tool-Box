<script setup lang="ts">

defineProps<{
	noBg?: boolean
}>()

</script>

<template>
	
	<div :class="['page-card', { 'no-bg': noBg }]">
		<slot></slot>
	</div>
	
</template>

<style lang="less" scoped>

@import "../../../assets/css/theme.less";

.page-card {
	
	background: @card-background;
	border-radius: 10px;
	
	padding: 20px;
	
	&.no-bg { background: none }
	
}

.page-card + .page-card {
	margin-top: 10px;
}

</style>
