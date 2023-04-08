<template>
	<!-- <img src="./assets/logo.png" /> -->
	<TopBar></TopBar>
</template>

<script>

import TopBar from './components/TopBar/TopBar.vue';

export default {
	
	name: 'App',
	components: {
		TopBar,
	},
	
}

</script>

<style>

@font-face {
	font-family: "Alibaba Puhuiti";
	src: url(./assets/fonts/Alibaba-PuHuiTi-Regular.ttf);
}

head, body, #app {
	font-family: "Alibaba Puhuiti", Arial, sans-serif;
	margin: 0;
	padding: 0;
	width: 100vw;
	height: 100vh;
	overflow: hidden;
	color: #2c3e50;
	background-color: #f4f6f8;
}

</style>
