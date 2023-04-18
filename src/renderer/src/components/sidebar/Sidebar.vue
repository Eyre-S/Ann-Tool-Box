<script setup lang="ts">

import { computed, ref } from 'vue';
import SidebarItem from './SidebarItem.vue';

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
					icon="nf-md-menu"
					@click="sidebarToggle"></SidebarItem>
			<SidebarItem
					uname="About"
					icon="nf-md-information"
					@click="openAbout"></SidebarItem>
		</div>
	</nav>
	
</template>

<style scoped lang="less">

@import url("./sidebar-vars.less");

#sidebar-container {
	
	box-sizing: border-box;
	height: 100%;
	width: @item-size + @content-border-width * 2;
	transition-duration: @open-transition;
	
}

#sidebar-container.opening {
	width: @full-width;
}

#sidebar-body {
	
	box-sizing: border-box;
	width: 100%;
	height: 100%;
	
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	align-content: stretch;
	padding: @content-border-width;
	
	background-color: @sidebar-base;
	border-radius: @border-radiu-level-0;
	overflow-x: hidden;
	
}

</style>
