<script setup lang="ts">

import { computed } from 'vue';
import SidebarItem from './SidebarItem.vue';
import { pages, page_setActive, page_active } from '../pages';
import config from '@renderer/config';

const sidebarIsOpening = config.__session_status.sidebar.is_open.v;

const sidebarClass = computed(()=>{ return {
		opening: sidebarIsOpening.value
}})

function sidebarToggle () {
	sidebarIsOpening.value = !sidebarIsOpening.value;
}

</script>

<template>
	
	<div id="sidebar-container">
		<nav id="sidebar-box" :class="sidebarClass">
			<div id="sidebar-body">
				
				<SidebarItem
						uname=""
						icon="nf-md-menu"
						isSpecial :active="sidebarIsOpening"
						@click="sidebarToggle"></SidebarItem>
				
				<template v-for="page of pages">
					<SidebarItem
							v-if="page.isShow(false)"
							:uname="page.config.title"
							:icon="page.config.icon"
							:active="page.id === page_active.id"
							:flagTestOnly="page.config.debugOnly"
							:flagPreviewOnly="page.config.isPreview"
							@click="page_setActive(page)">
					</SidebarItem>
				</template>
				
				<div class="empty"></div>
				
				<template v-for="page of pages">
					<SidebarItem
							v-if="page.isShow(true)"
							:uname="page.config.title"
							:icon="page.config.icon"
							:active="page.id === page_active.id"
							:flagTestOnly="page.config.debugOnly"
							:flagPreviewOnly="page.config.isPreview"
							@click="page_setActive(page)">
					</SidebarItem>
				</template>
				
			</div>
		</nav>
	</div>
	
</template>

<style scoped lang="less">

@import url("./sidebar-vars.less");

#sidebar-container {
	
	@container-margin: 10px;
	
	margin-right: @container-margin;
	height: 100%;
	
}

#sidebar-box {
	
	width: @item-size + @content-border-width * 2;
	height: 100%;
	transition-duration: @open-transition;
	
}

#sidebar-box.opening {
	width: @full-width;
}

#sidebar-body {
	
	box-sizing: border-box;
	width: 100%;
	height: 100%;
	
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	align-content: stretch;
	padding: @content-border-width;
	
	background-color: @sidebar-base;
	border-radius: @border-radiu-level-0;
	overflow-x: hidden;
	
	> .empty {
		width: 100%;
		margin-top: auto;
	}
	
}

</style>
