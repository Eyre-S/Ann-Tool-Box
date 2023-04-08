<template>
	<div class="window-controller">
		<button id="button-minimal" class="window-button" @click="windowMin()"></button>
		<button id="button-max" class="window-button" @click="windowMax()"></button>
		<button id="button-exit" class="window-button" @click="windowExit()"></button>
	</div>
</template>

<script>

const { ipcRenderer } = window.electron;

export default {
	name: "WindowControllers",
	methods: {
		windowExit() {
			ipcRenderer.send('window-exit');
		},
		windowMin() {
			ipcRenderer.send('window-min');
		},
		windowMax() {
			ipcRenderer.send('window-max');
		}
	}
}

</script>

<style scoped>

.window-controller {
	
	--window-controller-button-size: 14px;
	
	--window-controller-buttons-spacing-top: 20px;
	--window-controller-buttons-spacing-side: 15px;
	--window-controller-button-spacing: 10px;
	
	
}

.window-button {
	
	--button-basic: var(--topbar-item-background);
	--button-exit: #e18a74;
	--button-maxize: #e7deb0;
	--button-minimal: #b3e2bf;
	
}

.window-button:hover {
	
	--button-basic: var(--topbar-item-background-focused);
	--button-exit: #de3318;
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

#button-exit {
	background-color: var(--button-exit);
}

#button-max {
	background-color: var(--button-maxize);
}

#button-minimal {
	background-color: var(--button-minimal);
}

</style>
