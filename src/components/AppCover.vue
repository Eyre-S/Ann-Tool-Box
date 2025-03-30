<script setup lang="ts">

import { computed } from 'vue';
import { AppCoverController } from './AppCoverController'
import F5OverlayRecord from './app_cover/F5Overlay.Record.vue';

const style = computed(()=>{
	return {
		display: AppCoverController.show.value ? 'block' : 'none'
	}
})

function appCoverClicked () {
	AppCoverController.appCoverClose();
}

</script>

<template>
	
	<Teleport to="#f5-menu">
		<F5OverlayRecord>
			<template #name>App Cover</template>
			<template #value>{{ AppCoverController.show.value ? "show" : "hidden" }}</template>
		</F5OverlayRecord>
	</Teleport>
	
	<div id="app-cover" :style="style" @click="appCoverClicked"></div>
	
</template>

<style lang="css">

#app-cover {
	
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	
	z-index: 800;
	
	background-color: rgba(125, 125, 125, 0);
	
}

</style>
