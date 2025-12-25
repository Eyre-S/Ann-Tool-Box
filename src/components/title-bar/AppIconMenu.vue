<script setup lang="ts">

import { useAppConfig } from "@/app/config.ts";
import { useAppPageController } from "@/components/pages/page-controller.ts";
import { Page } from '../pages/page.ts';
import MenuBody from '../util/menu/MenuBody.vue';
import MenuItem from '../util/menu/MenuItem.vue';
import MenuSeparator from "../util/menu/MenuSeparator.vue";
import PageAbout from '../main/about/PageAbout.vue';
import app from '@/app/app';

const config = useAppConfig();
const pageController = useAppPageController();

const page_about = new Page(
	PageAbout, 'about',
	{
		title: "About",
		icon: "nf-cod-info",
		isAfter: true
	}
)

function openDevTools() {
	app.open_devtools();
}

function relaunch() {
	app.relaunch();
}

</script>

<template>
	<MenuBody>
		
		<MenuItem uname="About" @click="pageController.switchTo(page_about)"></MenuItem>
		
		<MenuSeparator></MenuSeparator>
		<template v-if="config.dev.enabled.v.value">
			<MenuItem uname="Open DevTools" @click="openDevTools()"></MenuItem>
		</template>
		<MenuItem uname="Relaunch" @click="relaunch()"></MenuItem>
		
	</MenuBody>
</template>
