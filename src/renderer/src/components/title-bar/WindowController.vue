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

<style scoped lang="css">

.window-controller {
	
	--window-controller-button-size: 14px;
	
	--window-controller-buttons-spacing-top: 20px;
	--window-controller-buttons-spacing-side: 15px;
	--window-controller-button-spacing: 10px;
	
	
}

.window-button {
	
	--button-basic: var(--topbar-item-background);
	--button-close: #e18a74;
	--button-maxize: #e7deb0;
	--button-minimal: #b3e2bf;
	
}

.window-button:hover {
	
	--button-basic: var(--topbar-item-background-focused);
	--button-close: #de3318;
	--button-maxize: #d7bd14;
	--button-minimal: #35d05c;
	
}

.window-controller {
	
	width: auto;
	height: 100%;
	
	display: flex;
	flex-direction: row;
	
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
