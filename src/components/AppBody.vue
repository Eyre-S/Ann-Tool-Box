<script setup lang="ts">

import Scrollable from './util/Scrollable.vue';
import Sidebar from './sidebar/Sidebar.vue';
import AppCoverToast from './app_cover/toast/AppCover.vue';

import config from "@/config";
import { page_active } from './app-pages';
import F5Overlay from './app_cover/F5Overlay.vue';

</script>

<template>
	
	<Teleport to="body">
		<F5Overlay />
	</Teleport>
	
	<div :class="['app-body', { 'use-native-frame': config.ui.use_native_frame.v_locked.value }]">
		
		<Sidebar class="sidebar"></Sidebar>
		<div class="main-box">
			<template v-if="config.ui.use_custom_scrollbar.v.value">
				<main class="main-body">
					<Scrollable :overflow="{x: 'hidden', y: 'overlay'}">
						<component :is="page_active.component"></component>
					</Scrollable>
				</main>
			</template>
			<template v-else>
				<main class="main-body" style="overflow-y: overlay;">
					<component :is="page_active.component"></component>
				</main>
			</template>
		</div>
		
		<AppCoverToast id="app-cover-toast"></AppCoverToast>
		
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
			
			border-radius: 10px;
			overflow: hidden;
			
		}
	}
	
	position: relative;
	
	#app-cover-toast {
		position: absolute;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
	}
	
}

</style>
