<script setup lang="ts">

import { useAppConfig } from "@/app/config.ts";
import F5OverlayAdditionStatus from './F5Overlay.AdditionStatus.vue';

const config = useAppConfig();

</script>

<template>
	
	<div class="f5-menu" :class="{ show: config.dev.show_f5_overlay.v.value }" id="f5-menu">
		<F5OverlayAdditionStatus v-if="config.dev.show_f5_overlay.v.value" />
	</div>
	
</template>

<style lang="less" scoped>

@import "@/assets/css/theme.less";

.f5-menu {
	
	position: absolute;
	z-index: 900;
	top: 8px;
	left: 8px;
	pointer-events: none;
	
	display: none;
	&.show {
		display: flex;
	}
	flex-direction: column;
	align-items: flex-start;
	gap: 4px;
	
	
	color: @f5-item-text;
	font-size: 12px;
	
}

</style>
