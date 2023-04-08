<template>
	<div id="top-bar">
		<DirItem item-name="Ann ToolBox" item-logo="/assets/logo.png"></DirItem>
		<div class="empty"></div>
		<WindowControllers id="window-controller"></WindowControllers>
	</div>
</template>

<script>

import DirItem from './DirItem.vue';
import WindowControllers from './WindowController.vue';

export default {
	name: "TopBar",
	components: {
		DirItem,
		WindowControllers
	}
}

</script>

<style>

#top-bar {
	
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
