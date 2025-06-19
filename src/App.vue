<script setup lang="ts">

import { onMounted } from 'vue';

import AppCover from './components/AppCover.vue';
import AppBody from './components/AppBody.vue';
import TitleBar from './components/title-bar/TitleBar.vue';

import config from './config';
import { open_devtools } from './app/app';
import { shortcutKeyboardListener } from './shortcut';

onMounted(() => {
	
	// Add Global Keyboard Shortcuts Manager
	document.addEventListener('keydown', shortcutKeyboardListener);
	
	if (config.dev.enabled.v.value == true && config.dev.open_devtools_on_launch.v.value) {
		open_devtools();
	}
	
});

</script>

<template>
	
	<TitleBar v-if="!config.ui.use_native_frame.v_locked.value" id="window-title"></TitleBar>
	
	<div id="app-body-box">
		<AppBody id="app-body"></AppBody>
	</div>
	
	<AppCover></AppCover>
	
</template>

<style lang="less">

@import "./assets/css/styles.less";
@import "./assets/css/theme.less";

@font-face {
	font-family: 'Alibaba Puhuiti';
	src: url(./assets/font/Alibaba-PuHuiTi-Regular.ttf);
}

#app {
	
	#window-title {
		flex: 0 0 50px;
	}
	
	#app-body-box {
		
		flex: 1 1 0;
		position: relative;
		
		#app-body {
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			overflow: hidden;
		}
		
	}
	
	// width: calc(100vw - @window-outer-size * 2);
	// height: calc(100vh - @window-outer-size * 2);
	block-size: 100dvb;
	inline-size: 100dvi;
	padding: 0;
	margin: 0;
	position: relative;
	z-index: 100;
	
	// border-radius: 20px;
	background: @window-bg;
	// box-shadow: 0 0 20px -10px #888888aa;
	
	display: flex;
	flex-direction: column;
	contain: strict;
	
}

</style>
