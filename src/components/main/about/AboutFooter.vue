<script setup lang="ts">

import PageCard from '@/components/util/page/PageCard.vue';

</script>

<template>
	
	<PageCard no-bg class="footer">
		<p class="copy">MIT License &copy; 2023-2025 Ann. ToolBox</p>
	</PageCard>
	
</template>

<style lang="less" scoped>

@import "@/assets/css/theme.less";

.footer {
	
	text-align: center;
	
	color: @about-app-title;
	
	> .copy{
		font-size: 85%;
		opacity: 0.5;
	}
	
}

</style>
