<template>
	<ClickedMenuBody>
		<ClickedMenuItem name="Open DevTools" @click="openDevTools()"></ClickedMenuItem>
	</ClickedMenuBody>
</template>


<script>

import ClickedMenuBody from '../RightClickMenu/ClickedMenuBody.vue';
import ClickedMenuItem from '../RightClickMenu/ClickedMenuItem.vue';

const { ipcRenderer } = window.electron;

export default {
	
	name: "IconsRightClickMenu",
	components: {
		ClickedMenuBody,
		ClickedMenuItem
	},
	
	methods: {
		openDevTools () {
			ipcRenderer.send("call-dev-tools");
		}
	}
	
}

</script>