<script setup lang="ts">

defineProps<{
	uname: String
}>()

</script>

<template>
	<div class="menu-item">
		<span>{{ uname }}</span>
	</div>
</template>

<style scoped lang="less">

@import "@renderer/assets/css/theme.less";

.menu-item {
	
	box-sizing: border-box;
	width: 100%;
	border-radius: 10px;
	
	padding: 8px 15px;
	user-select: none;
	
	color: @menu-item-text-color;
	font-size: 14px;
	
	&:hover {
		background-color: @menu-item-onfocus;
	}
	
}

</style>
