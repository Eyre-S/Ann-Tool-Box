<script setup lang="ts">

import { computed } from 'vue';

const props = defineProps<{
	modelValue
}>()

const emit = defineEmits(['update:modelValue'])

const value = computed({
	get() {
		return props.modelValue
	},
	set(value) {
		emit('update:modelValue', value)
	}
})

</script>

<template>
	
	<div class="input text"><input v-model="value"><div class="marker"></div></div>
	
</template>

<style lang="less" scoped>

@import "../../../assets/css/theme.less";

.input.text {
	
	padding: 6px 9px;
	background-color: @input-text-bg;
	border-radius: 5px;
	font-family: @font-code;
	font-size: 12px;
	color: @input-text-text;
	
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	row-gap: 0.3em;
	
	> input {
		flex: 1 1 0;
		border: none;
		&:focus-visible { outline: none; }
		background: #00000000;
		font-family: inherit;
		font-size: inherit;
		color: inherit;
		padding: 0;
		margin: 0;
	}
	
	> .marker {
		flex: 0 0 0.3em;
		height: 100%;
		background-color: @input-text-marker;
		border-radius: 0.3em;
		transition: background-color 150ms;
	}
	
	> input:focus-visible + .marker {
		background-color: @input-text-marker-onfocus;
	}
	
}

</style>
