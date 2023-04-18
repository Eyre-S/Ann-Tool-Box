<script setup lang="ts">

import AppCover from './components/AppCover.vue';
import AppBody from './components/AppBody.vue';
import TitleBar from './components/title-bar/TitleBar.vue';

import { AppWindow } from "./app-window";

</script>

<template>
	
	<TitleBar v-if="!AppWindow.use_native_frame.value" id="window-title"></TitleBar>
	
	<div id="app-body-box">
		<AppBody id="app-body"></AppBody>
	</div>
	
	<AppCover></AppCover>
	
</template>

<style lang="less">

@import "./assets/css/styles.less";

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
	
	width: 100vw;
	height: 100vh;
	padding: 0;
	margin: 0;
	
	display: flex;
	flex-direction: column;
	overflow: hidden;
	
}

</style>
