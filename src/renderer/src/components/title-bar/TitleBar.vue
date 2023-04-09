<script setup lang="ts">

import TitleItem from './TitleItem.vue';
import WindowController from './WindowController.vue';
import AppIconMenu from './AppIconMenu.vue';

import { computed, ref } from 'vue';

import icon from '../../assets/icon.png';

const showAppIconMenu = ref(false);

const showAppIconMenuStyle = computed(() => {
	return {
		display: showAppIconMenu.value ? 'block' : 'none'
	}
})

function rightClickMenuToogle(): void {
	showAppIconMenu.value = true;
}

function rightClickMenuClicked(): void {
	showAppIconMenu.value = false;
}

</script>

<template>
	
	<div class="title-bar">
		
		<TitleItem title="Ann ToolBox" :icon="icon" @click="rightClickMenuToogle"></TitleItem>
		<div class="empty"></div>
		<WindowController id="window-controller"></WindowController>
		<AppIconMenu
				top="50" left="10"
				:style="showAppIconMenuStyle"
				@click="rightClickMenuClicked"></AppIconMenu>
		
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
