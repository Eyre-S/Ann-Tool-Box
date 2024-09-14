<script setup lang="ts">

import { Page, page_setActive } from '../pages';
import config from '@/config';
import MenuBody from '../util/menu/MenuBody.vue';
import MenuItem from '../util/menu/MenuItem.vue';
import MenuSeparator from "../util/menu/MenuSeparator.vue";
import PageAbout from '../main/about/PageAbout.vue';
import toast from '../app_cover/toast/toast';

// TODO: Native call
// const { ipcRenderer } = window.electron;

const page_about = new Page(
	PageAbout, 'about',
	{
		title: "About",
		icon: "nf-cod-info",
		isAfter: true
	}
)

function openDevTools() {
	// TODO: Native call
	// ipcRenderer.send('call-dev-tools');
	toast.add({
		type: toast.types.WARN,
		text: "Open Web DevTools is not implemented yet in Tauri version's app.",
		clearTimeout: toast.clear_timeout.standard
	})
}

function relaunch() {
	// TODO: Native call
	// ipcRenderer.send('relaunch');
	toast.add({
		type: toast.types.WARN,
		text: "Relaunch is not implemented yet in Tauri version's app.",
		clearTimeout: toast.clear_timeout.standard
	})
}

</script>

<template>
	<MenuBody>
		
		<MenuItem uname="About" @click="page_setActive(page_about)"></MenuItem>
		
		<MenuSeparator></MenuSeparator>
		<template v-if="config.dev.enabled.v.value">
			<MenuItem uname="Open DevTools" @click="openDevTools()"></MenuItem>
		</template>
		<MenuItem uname="Relaunch" @click="relaunch()"></MenuItem>
		
	</MenuBody>
</template>
