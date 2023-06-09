<script setup lang="ts"></script>

<template>
	<div class="menu-item separator"><hr></div>
</template>

<style lang="less">

@import "@renderer/assets/css/theme.less";

.menu-item.separator {
	
	@side-width: 15px;
	
	width: 100%;
	
	> hr {
		
		width: calc(100% - (@side-width*2));
		min-width: 0;
		margin: 2px min(@side-width, 50%);
		
		border: 0;
		height: 1px;
		background-color: @menu-separator;
		
	}
	
}

</style>
