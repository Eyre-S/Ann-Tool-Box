<script setup lang="ts">

defineProps<{
	disabled?: boolean
}>()

</script>

<template>
	
	<button :class="['input', 'button', { 'disabled': disabled }]"><slot></slot></button>
	
</template>

<style lang="less" scoped>

@import "../../../assets/css/theme.less";

button.input.button {
	
	padding: 0 15px;
	height: 30px;
	
	background-color: @input-button-bg;
	border: none;
	border-radius: 5px;
	
	color: @input-button-fg;
	font-family: inherit;
	font-weight: 500;
	
	transition: background-color 200ms, padding 200ms;
	
	&:hover:not(.disabled) {
		
		padding: 0 20px;
		background-color: @input-button-bg-onfocus;
		
	}
	
	&.disabled {
		background-color: @input-button-disabled-bg;
		color: @input-button-disabled-fg;
		cursor: not-allowed;
	}
	
}

</style>
