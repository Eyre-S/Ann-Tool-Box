<script setup lang="ts">

import I from '../I.vue';

defineProps<{
	icon?: string
}>()

</script>

<template>
	
	<h1><I v-if="icon" :i="icon"></I><slot></slot></h1>
	
</template>

<style lang="less" scoped>

@import "@renderer/assets/css/theme.less";

h1 {
	
	color: @pages-title;
	font-size: 24px;
	margin-inline-start: 1em;
	
	> ii {
		margin-inline-end: 0.45em;
	}
	
}

</style>
