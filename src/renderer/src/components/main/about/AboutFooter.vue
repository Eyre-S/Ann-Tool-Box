<script setup lang="ts">

import PageCard from '@renderer/components/util/page/PageCard.vue';

</script>

<template>
	
	<PageCard no-bg class="footer">
		<p class="copy">MIT License &copy; 2023 Ann. ToolBox</p>
	</PageCard>
	
</template>

<style lang="less" scoped>

.footer {
	
	text-align: center;
	
	color: #4a568b;
	
	> .copy{
		font-size: 85%;
		opacity: 0.5;
	}
	
}

</style>
