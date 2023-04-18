<script setup lang="ts">

const { ipcRenderer } = window.electron;

function window_minimal() {
	ipcRenderer.send('window-min');
}

function window_maxize() {
	ipcRenderer.send('window-max');
}

function window_close() {
	ipcRenderer.send('window-exit');
}

</script>

<template>
	<div class="window-controller">
		<button class="window-button minimal" @click="window_minimal"></button>
		<button class="window-button maxize" @click="window_maxize"></button>
		<button class="window-button close" @click="window_close"></button>
	</div>
</template>

<style scoped lang="less">

@import "../../assets/css/theme.less";

.window-controller {
	
	--window-controller-button-size: 14px;
	
	--window-controller-buttons-spacing-top: 10px;
	--window-controller-buttons-spacing-side: 15px;
	--window-controller-button-spacing: 10px;
	
}

.window-button {
	
	--button-basic: @window-button-basic;
	--button-close: @window-button-close;
	--button-maxize: @window-button-maxize;
	--button-minimal: @window-button-minimal;
	
}

.window-button:hover {
	
	--button-basic: @window-button-basic-onfocus;
	--button-close: @window-button-close-onfocus;
	--button-maxize: @window-button-maxize-onfocus;
	--button-minimal: @window-button-minimal-onfocus;
	
}

.window-controller {
	
	box-sizing: border-box;
	width: auto;
	height: 100%;
	
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	
	padding-top: var(--window-controller-buttons-spacing-top);
	padding-right: var(--window-controller-buttons-spacing-side);
	
}

.window-button {
	
	height: var(--window-controller-button-size);
	width: var(--window-controller-button-size);
	margin-left: var(--window-controller-button-spacing);
	background-color: var(--button-basic);
	border-radius: 30px;
	border: 0;
	
}

.window-button.close {
	background-color: var(--button-close);
}

.window-button.maxize {
	background-color: var(--button-maxize);
}

.window-button.minimal {
	background-color: var(--button-minimal);
}

</style>
