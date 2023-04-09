<script setup lang="ts">

import { computed, ref } from 'vue';
import SidebarItem from './SidebarItem.vue';

import iconMenu from "../../../assets/icons/menu.png";
import iconAbout from "../../../assets/icons/about.jpg";

const sidebarIsOpening = ref(true);

const sidebarClass = computed(()=>{
	return {
		opening: sidebarIsOpening.value
	}
})

function sidebarToggle () {
	sidebarIsOpening.value = !sidebarIsOpening.value;
}

function openAbout () {
	alert('TODO ;; this is the About page')
}

</script>

<template>
	
	<nav id="sidebar-container" :class="sidebarClass">
		<div id="sidebar-body">
			<SidebarItem
					uname=""
					:icon="iconMenu"
					@click="sidebarToggle"></SidebarItem>
			<SidebarItem
					uname="About"
					:icon="iconAbout"
					@click="openAbout"></SidebarItem>
		</div>
	</nav>
	
</template>

<style scoped lang="css">

#sidebar-container {
	
	box-sizing: border-box;
	height: 100%;
	width: 50px;
	transition-duration: 300ms;
	
}

#sidebar-container.opening {
	width: 270px;
}

#sidebar-body {
	
	box-sizing: border-box;
	width: 100%;
	height: 100%;
	
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	align-content: stretch;
	padding: 5px;
	
	background-color: #e2e8ef;
	border-radius: 10px;
	overflow-x: hidden;
	
}

</style>
