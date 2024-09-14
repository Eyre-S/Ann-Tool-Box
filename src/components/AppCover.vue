<script setup lang="ts">

import { computed } from 'vue';
import { AppCoverController } from './AppCoverController'

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
	
	<div id="app-cover" :style="style" @click="appCoverClicked"></div>
	
</template>

<style lang="css">

#app-cover {
	
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	
	z-index: 999;
	
	background-color: rgba(125, 125, 125, 0);
	
}

</style>
