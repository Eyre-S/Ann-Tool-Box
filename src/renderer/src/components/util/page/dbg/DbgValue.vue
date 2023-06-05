<script setup lang="ts"></script>

<template>
	
	<span class="dbg-value"><slot></slot></span>
	
</template>

<style lang="less" scoped>

@import "../../../../assets/css/theme.less";

.dbg-value {
	color: @setting-item-debug-description-text;
	font-family: @font-code;
	font-size: 10px;
	color: @setting-item-debug-description-value;
}

</style>
