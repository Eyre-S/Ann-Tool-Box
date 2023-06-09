<script setup lang="ts"></script>

<template>
	
	<span class="dbg-info"><slot></slot></span>
	
</template>

<style lang="less" scoped>

@import "@renderer/assets/css/theme.less";

.dbg-info {
	color: @setting-item-debug-description-text;
	font-family: @font-code;
	font-size: 10px;
}

</style>
