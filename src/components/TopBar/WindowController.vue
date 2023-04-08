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

<style>

.window-controller {
	
	width: auto;
	height: 100%;
	
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-right: 1rem;
	
}

.window-button {
	
	height: 16px;
	width: 16px;
	margin-left: 0.7rem;
	background-color: #b0c5e0;
	border-radius: 30px;
	border: 0;
	
}

#button-exit {
	background-color: #e18a74;
}

#button-exit:hover {
	background-color: #de3318;
}

#button-max {
	background-color: #e7deb0;
}

#button-max:hover {
	background-color: #d7bd14;
}

#button-minimal {
	background-color: #b3e2bf;
}

#button-minimal:hover {
	background-color: #35d05c;
}

</style>
