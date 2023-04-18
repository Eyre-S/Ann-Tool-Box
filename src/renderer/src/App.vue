<script setup lang="ts">

import AppCover from './components/AppCover.vue';
import MainContainer from './components/MainContainer.vue';
import TitleBar from './components/title-bar/TitleBar.vue';

</script>

<template>
	
	<TitleBar></TitleBar>
	
	<MainContainer id="main-container"></MainContainer>
	
	<AppCover></AppCover>
	
</template>

<style lang="less">

@import "./assets/css/styles.less";

@font-face {
	font-family: 'Alibaba Puhuiti';
	src: url(./assets/font/Alibaba-PuHuiTi-Regular.ttf);
}

#app {
	
	width: 100vw;
	height: 100vh;
	padding: 0;
	margin: 0;
	
	display: flex;
	flex-direction: column;
	
}

</style>
