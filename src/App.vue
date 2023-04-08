<template>
	<!-- <img src="./assets/logo.png" /> -->
	<TopBar></TopBar>
</template>

<script>

import TopBar from './components/TopBar/TopBar.vue';

export default {
	name: 'App',
	components: {
		TopBar
	}
}

</script>

<style>
head, body, #app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin: 0;
	padding: 0;
	width: 100vw;
	height: 100vh;
	overflow: hidden;
	background-color: #f4f6f8;
}
</style>
