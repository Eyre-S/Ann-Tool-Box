<script setup lang="ts">

import { useAppPageController } from "@/components/pages/page-controller.ts";
import TitleItem from './TitleItem.vue';
import WindowController from './WindowController.vue';
import AppIconMenu from './AppIconMenu.vue';
import I from '../util/I.vue';

import { computed, ref } from 'vue';

import icon from '../../assets/icon.png';
import { AppCoverController } from '../AppCoverController';

const pageController = useAppPageController();
const currentPage = pageController.currentPage;

const showAppIconMenu = ref(false);
const showAppIconMenuStyle = computed(() => { return {
		display: showAppIconMenu.value ? 'block' : 'none'
}})

function setupOpenMenu (): void {
	openMenu();
	AppCoverController.setup(closeMenu);
}

function selfCloseMenu (): void {
	closeMenu();
	AppCoverController.itemClosed();
}

function openMenu (): void {
	showAppIconMenu.value = true;
}

function closeMenu (): void {
	showAppIconMenu.value = false;
}

</script>

<template>
	
	<div class="title-bar" data-tauri-drag-region>
		
		<TitleItem title="Ann. ToolBox" :icon="icon" @click="setupOpenMenu" clickable></TitleItem>
		<div v-if="currentPage.config.isHome !== true" class="separator"><I class="icon" i="nf-fa-chevron_right"></I></div>
		<TitleItem v-if="currentPage.config.isHome !== true" :title="currentPage.config.title"></TitleItem>
		
		<div class="empty" data-tauri-drag-region></div>
		
		<WindowController id="window-controller"></WindowController>
		<AppIconMenu
				:top='50' :left='10'
				:style="showAppIconMenuStyle"
				@click="selfCloseMenu"></AppIconMenu>
		
	</div>
	
</template>

<style lang="less" scoped>

@import "@/assets/css/theme.less";

.title-bar {
	
	width: 100%;
	height: 50px;
	
	display: flex;
	flex-direction: row;
	align-items: center;
	
	user-select: none;
	
	> .separator {
		display: flex;
		align-items: center;
		> .icon {
			color: @window-title-separator-color;
			font-size: 13px;
		}
	}
	
}

.empty {
	height: 100%;
	flex: 1;
	-webkit-app-region: drag;
	cursor: move;
}

#window-controller {
	margin-left: auto;
}

</style>
