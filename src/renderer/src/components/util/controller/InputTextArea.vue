<script setup lang="ts">
import { syncRef, useTextareaAutosize } from '@vueuse/core';


const props = defineProps<{
	readonly?: boolean,
	autosize?: boolean,
}>()

const models = defineModels<{
	modelValue: string
}>()

const { textarea, input } = (() => {
	if (props.autosize) return useTextareaAutosize({input: models.modelValue})
	else return { textarea: null, input: (models.modelValue) }
})()

</script>

<template>
	
	<textarea class="input text-area"
		:readonly="readonly"
		ref="textarea"
		v-model="input"
	></textarea>
	
</template>

<style lang="less" scoped>

@import "@renderer/assets/css/theme.less";

textarea.input.text-area {
	
	--font-size: 12.4px;
	
	font-size: var(--font-size);
	font-family: @font-code;
	
	width: 100%;
	height: calc(var(--font-size) * 8);
	border-radius: 0.8em;
	padding-inline: 1.1em;
	padding-block: 0.7em;
	box-sizing: border-box;
	
	resize: none;
	background-color: @input-text-bg;
	border: none;
	&:focus-visible { outline: none; }
	
}

</style>
