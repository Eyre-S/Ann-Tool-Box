<script setup lang="ts">

import Sidebar from './sidebar/Sidebar.vue';

import { AppWindow } from '@renderer/app-window';
import { page_active } from './pages';

</script>

<template>
	
	<div :class="['app-body', { 'use-native-frame': AppWindow.use_native_frame.value }]">
		<Sidebar class="sidebar"></Sidebar>
		<div class="main-box">
			<main class="main-body">
				<component :is="page_active.component"></component>
			</main>
		</div>
	</div>
	
</template>

<style scoped lang="less">

.app-body {
	
	padding: 10px;
	padding-top: 0;
	&.use-native-frame { padding-top: 10px; }
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	
	> .sidebar {
		flex-grow: 0;
		flex-shrink: 0;
	}
	
	> .main-box {
		flex: 1 1 0;
		position: relative;
		> .main-body {
			
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			overflow: hidden;
			overflow-y: overlay;
			
			border-radius: 10px;
			
		}
	}
	
}

</style>
