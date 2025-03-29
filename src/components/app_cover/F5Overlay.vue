<script setup lang="ts">

import { useFps } from '@vueuse/core';


const fps = useFps()

</script>

<template>
	
	<div class="f5-tracker">
		<div class="record">
			<span class="name">FPS</span>
			<span class="value">{{ fps }}</span>
		</div>
	</div>
	
</template>

<style lang="less" scoped>

@import "@/assets/css/theme.less";

.f5-tracker {
	
	position: absolute;
	z-index: 500;
	bottom: 10px;
	right: 10px;
	
	color: @f5-item-text;
	font-size: 12px;
	
	> .record {
		
		border-radius: 5px;
		padding: 3px 6px;
		
		background-color: @f5-item-bg;
		opacity: 0.6;
		
		> .name {
			font-weight: bold;
			margin-right: 5px;
			color: @f5-item-text-name;
		}
		
	}
	
}

</style>
