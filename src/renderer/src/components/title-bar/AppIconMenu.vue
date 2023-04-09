<script setup lang="ts">

import MenuBody from '../util/menu/MenuBody.vue';
import MenuItem from '../util/menu/MenuItem.vue';

const { ipcRenderer } = window.electron;

function openDevTools() {
	ipcRenderer.send('call-dev-tools');
}

</script>

<template>
	<MenuBody>
		<MenuItem uname="Open DevTools" @click="openDevTools()"></MenuItem>
	</MenuBody>
</template>
