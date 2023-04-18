<script setup lang="ts">

import Sidebar from './sidebar/Sidebar.vue';

</script>

<template>
	
	<div class="app-body">
		<Sidebar class="sidebar"></Sidebar>
		<div class="main-box">
			<main class="main-body"></main>
		</div>
	</div>
	
</template>

<style scoped lang="less">

.app-body {
	
	padding: 10px;
	padding-top: 0;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	
	> .sidebar {
		flex-grow: 0;
		flex-shrink: 0;
	}
	
	> .main-box {
		flex: 1 1 0;
		position: relative;
		> .main-body {
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			overflow: hidden;
		}
	}
	
}

</style>
