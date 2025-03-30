<script setup lang="ts"></script>

<template>
	
	<div class="record">
		<span class="name"><slot name="name"></slot></span>
		<span class="value"><slot name="value"></slot></span>
	</div>
	
</template>

<style lang="less" scoped>

@import "@/assets/css/theme.less";

.record {
	
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

</style>
