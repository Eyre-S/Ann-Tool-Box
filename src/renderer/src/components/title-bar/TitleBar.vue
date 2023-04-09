<script setup lang="ts">

import TitleItem from './TitleItem.vue';
import WindowController from './WindowController.vue';

import icon from '../../assets/icon.png';

</script>

<template>
	
	<div class="title-bar">
		
		<TitleItem title="Ann ToolBox" :icon="icon"></TitleItem>
		<div class="empty"></div>
		<WindowController id="window-controller"></WindowController>
		
	</div>
	
</template>

<style lang="css" scoped>

.title-bar {
	
	width: 100%;
	height: 50px;
	
	display: flex;
	flex-direction: row;
	align-items: center;
	
	user-select: none;
	
}

.empty {
	height: 100%;
	flex: 1;
	-webkit-app-region: drag;
}

#window-controller {
	margin-left: auto;
}

</style>
