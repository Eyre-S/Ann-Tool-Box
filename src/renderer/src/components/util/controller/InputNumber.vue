<script setup lang="ts">

import { computed } from 'vue';

const props = defineProps<{
	
	modelValue: number,
	
	disabled?: boolean,
	placeholder?: string,
	unit?: string,
	
	min?: number,
	max?: number,
	step?: number
	
}>()

const emit = defineEmits<{
	(e: 'update:modelValue', value: number): void
}>()

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
	
	<div class="input text"><input
		type="number" v-model="value"
		:disabled="disabled" :placeholder="placeholder"
		:min="min" :max="max" :step="step"
	><span v-if="unit"><small>{{unit}}</small></span><div class="marker"></div></div>
	
</template>

<style lang="less" scoped>

@import "../../../assets/css/theme.less";

.input.text {
	
	font-size: 12px;
	padding: 0.5em 0.75em;
	padding-right: 0.35em;
	background-color: @input-text-bg;
	border-radius: 0.4em;
	font-family: @font-code;
	color: @input-text-text;
	
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	column-gap: 0.3em;
	
	> * {
		flex-grow: 0;
		flex-shrink: 0;
	}
	
	> input {
		flex: 1 1 0;
		border: none;
		width: 100%;
		&:focus-visible { outline: none; }
		background: #00000000;
		font-family: inherit;
		font-size: inherit;
		color: inherit;
		padding: 0;
		margin: 0;
		&::-webkit-inner-spin-button,
		&::-webkit-outer-spin-button {
			appearance: none;
		}
	}
	
	> .marker {
		flex: 0 0 0.35em;
		background-color: @input-text-marker;
		border-radius: 0.35em;
		transition: background-color 150ms;
	}
	
	> input:focus-visible ~ .marker {
		background-color: @input-text-marker-onfocus;
	}
	
}

</style>
