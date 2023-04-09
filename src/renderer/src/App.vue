<script setup lang="ts">

import AppCover from './components/AppCover.vue';
import MainContainer from './components/main/MainContainer.vue';
import TitleBar from './components/title-bar/TitleBar.vue';

</script>

<template>
	
	<TitleBar></TitleBar>
	
	<MainContainer></MainContainer>
	
	<AppCover></AppCover>
	
</template>

<style lang="css">

@font-face {
	font-family: 'Alibaba Puhuiti';
	src: url(./assets/font/Alibaba-PuHuiTi-Regular.ttf);
}

#app {
	
	font-family: 'Alibaba Puhuiti', Arial, sans-serif;
	
	color: #2c3e50;
	background-color: #f4f6f8;
	
}

#app {
	
	display: flex;
	flex-direction: column;
	
}

html,
body,
#app {
	
	width: 100vw;
	height: 100vh;
	padding: 0;
	margin: 0;
	
}

</style>
