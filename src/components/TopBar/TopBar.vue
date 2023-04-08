<template>
	<div id="top-bar">
		<DirItem
				item-name="Ann ToolBox" item-logo="/assets/logo.png"
				@click="rightClickMenuToogle()"></DirItem>
		<div class="empty"></div>
		<WindowControllers id="window-controller"></WindowControllers>
		<IconsRightClickMenu
				top="50" left="10"
				:style=" { display: rightCickMenuShow ? 'block' : 'none' }"
				@click="rightClickMenuClicked()"></IconsRightClickMenu>
	</div>
</template>

<script>

import DirItem from './DirItem.vue';
import WindowControllers from './WindowController.vue';
import IconsRightClickMenu from './IconsRightClickMenu.vue';

export default {
	
	name: "TopBar",
	components: {
		DirItem,
		WindowControllers,
		IconsRightClickMenu
	},
	
	data() {
		return {
			rightCickMenuShow: false
		}
	},
	
	methods: {
		rightClickMenuToogle() {
			this.rightCickMenuShow = true;
		},
		rightClickMenuClicked() {
			this.rightCickMenuShow = false;
		}
	}
	
}

</script>

<style scoped>

#top-bar {
	--topbar-item-background: #b0c5e0;
	--topbar-item-background-focused: #809ed4;
}

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
