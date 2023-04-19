<script setup lang="ts">

import { Page, page_setActive } from '../pages';
import MenuBody from '../util/menu/MenuBody.vue';
import MenuItem from '../util/menu/MenuItem.vue';
import PageAbout from '../main/about/PageAbout.vue';

const { ipcRenderer } = window.electron;

const page_about = new Page(
	PageAbout, 'about',
	{
		title: "About",
		icon: "nf-cod-info",
		isAfter: true
	}
)

function openDevTools() {
	ipcRenderer.send('call-dev-tools');
}

</script>

<template>
	<MenuBody>
		<MenuItem uname="About" @click="page_setActive(page_about)"></MenuItem>
		<MenuItem uname="Open DevTools" @click="openDevTools()"></MenuItem>
	</MenuBody>
</template>
