<script setup lang="ts">

import I from '@renderer/components/util/I.vue';
import { Icon } from './icon';
import { computed, ref } from 'vue';
import toast from '@renderer/components/app_cover/toast/toast';

const props = defineProps<{
	icon: Icon
}>()

const use_char = ref(false);
const use_class = ref(false);
const use_hex = ref(false);

const current_display = computed(() => {
	if (use_char.value) return props.icon.char;
	if (use_class.value) return `nf-${props.icon.name}`;
	if (use_hex.value) return `\\u${props.icon.code}`;
	return props.icon.name;
})

const current_is_value = computed(() => {
	return use_char.value || use_hex.value || use_class.value
})

function copyToClipboard () {
	const using: string = current_display.value;
	window.api.clipboard.writeText(using);
	toast.add({
		icon: 'nf-md-clipboard_edit',
		text: `成功复制到剪贴板：${using}`,
		clearTimeout: toast.clear_timeout.short
	})
}

</script>

<template>
	
	<div class="icon-preview">
		
		<div class="toolbar">
			<button @click="copyToClipboard" @mouseenter="use_char = true" @mouseleave="use_char = false"><I i="nf-fa-font"></I></button>
			<button @click="copyToClipboard" @mouseenter="use_class = true" @mouseleave="use_class = false"><I i="nf-fa-hashtag"></I></button>
			<button @click="copyToClipboard" @mouseenter="use_hex = true" @mouseleave="use_hex = false"><I i="nf-md-unicode"></I></button>
		</div>
		
		<div class="blank"></div>
		<I class="show" :i="`nf-${icon.name}`"></I>
		<div class="blank"></div>
		<div :class="['info', 'icon-name', { 'current-active': current_is_value }]">{{ current_display }}</div>
		
	</div>
	
</template>

<style lang="less" scoped>

@import "../../../assets/css/theme.less";

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
