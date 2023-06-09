<script setup lang="ts">

import I from '@renderer/components/util/I.vue';

import { computed, ref } from 'vue';
import { useMouseInElement } from '@vueuse/core';
import { Icon } from './icon';
import { logicNot, logicOr } from '@vueuse/math';
import { clipboard_write } from '@renderer/utils/api';

const props = defineProps<{
	icon: Icon
}>()

const el_useChar = ref<HTMLInputElement|null>(null);
const el_useClass = ref<HTMLInputElement|null>(null)
const el_useHex = ref<HTMLInputElement|null>(null);
const el_useName = ref<HTMLInputElement|null>(null);

const use_char = logicNot(useMouseInElement(el_useChar).isOutside);
const use_class = logicNot(useMouseInElement(el_useClass).isOutside);
const use_hex = logicNot(useMouseInElement(el_useHex).isOutside);
const use_name = logicNot(useMouseInElement(el_useName).isOutside);

const current_display = computed<string>(() => {
	if (use_char.value) return props.icon.char;
	if (use_class.value) return `nf-${props.icon.name}`;
	if (use_hex.value) return `\\u${props.icon.code}`;
	return props.icon.name;
})

const current_is_value = logicOr(use_char, use_hex, use_class, use_name)

function copyToClipboard () {
	clipboard_write(current_display.value);
}

</script>

<template>
	
	<div class="icon-preview">
		
		<div class="toolbar">
			<button @click="copyToClipboard" class="char" ref="el_useChar"><I i="nf-fa-font"></I></button>
			<button @click="copyToClipboard" class="class" ref="el_useClass"><I i="nf-fa-hashtag"></I></button>
			<button @click="copyToClipboard" class="hex" ref="el_useHex"><I i="nf-md-unicode"></I></button>
		</div>
		
		<div class="blank"></div>
		<I class="show" :i="`nf-${icon.name}`"></I>
		<div class="blank"></div>
		<div :class="['info', 'icon-name', { 'current-active': current_is_value }]" ref="el_useName" @click="copyToClipboard">{{ current_display }}</div>
		
	</div>
	
</template>

<style lang="less" scoped>

@import "@renderer/assets/css/theme.less";

.icon-preview {
	
	width: 140px;
	height: 140px;
	border-radius: 10px;
	
	background-color: @card-background;
	
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	overflow: hidden;
	color: @page-icon-sheet-listing-text;
	
	> .blank { height: 23px; }
	
	> ii {
		
		font-size: 40px;
		color: @page-icon-sheet-listing-icon;
		
	}
	
	> .info.icon-name {
		
		font-size: 10px;
		padding: 0 1em;
		max-width: 100%;
		font-family: @font-code;
		text-align: center;
		
		&.current-active {
			color: @page-icon-sheet-listing-value-text;
			text-decoration: underline;
		}
		
	}
	
	position: relative;
	
	&:hover > .toolbar { opacity: 1; }
	> .toolbar {
		
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		
		height: 24px;
		color: @page-icon-sheet-listing-toolbar-button;
		opacity: 0;
		transition: opacity 110ms;
		
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		
		> button {
			
			flex: 1 1 0;
			height: 100%;
			
			background-color: inherit;
			border: inherit;
			padding: 3px 0;
			border-radius: 6px;
			color: inherit;
			transition: background-color 110ms;
			
			display: flex;
			align-items: center;
			justify-content: center;
			
			&:hover {
				background-color: @page-icon-sheet-listing-toolbar-button-onfocus;
			}
			
		}
		
	}
	
}

</style>
