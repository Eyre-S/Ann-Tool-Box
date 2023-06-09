<script setup lang="ts">

import PageCard from '@renderer/components/util/page/PageCard.vue';

defineProps<{
	icon: string,
}>()

</script>

<template>
	
	<PageCard no-bg class="about-title">
		
		<img class="featured-icon" :src="icon">
		<h1 class="title"><slot name="title"></slot></h1>
		<p class="description"><slot name="description"></slot></p>
		<p class="versions app"><slot name="versions"></slot></p>
		<p class="versions framework"><slot name="versions-framework"></slot></p>
		
		
	</PageCard>
	
</template>

<style lang="less" scoped>

@import "@renderer/assets/css/theme.less";

.about-title {
	
	text-align: center;
	
	> .featured-icon {
		width: 220px;
	}
	
	color: @about-app-title;
	
	> .title {
		font-size: 20px;
		font-weight: bold;
	}
	
	> .description {
		font-size: 85%;
		opacity: 0.5;
	}
	
	> .versions {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 10px;
		justify-content: center;
	}
	
}

</style>
