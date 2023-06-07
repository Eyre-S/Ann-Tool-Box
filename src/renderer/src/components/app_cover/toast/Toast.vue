<script setup lang="ts">

import I from '@renderer/components/util/I.vue';

import { Toast } from './toast';
import { StyleValue, computed } from 'vue';

const props = defineProps<{
	model: Toast
}>()

const showingIcon = computed(() => props.model.icon ?? props.model.type?.default_icon )

const isShow_checkButton = computed<boolean>(() => props.model.checkedButton !== null )
function on_checkButton_click () {
	props.model.remove_this();
}

const progress_bar_animationStyle = computed<StyleValue>(() => { return {
	animationDuration: `${props.model.clearTimeout}ms`
}});

function toast_onFocused () {
	props.model.timeout_stop();
}

function toast_onLostFocus () {
	props.model.timeout_set();
}

function get_contentComponent () {
	return props.model.text;
}

</script>

<template>
	
	<div :class="['toast-item', model.type?.css_class]" @mouseenter="toast_onFocused" @mouseleave="toast_onLostFocus">
		
		<div v-if="model.timeout_timer !== undefined" class="progress-bar" :style="progress_bar_animationStyle"></div>
		
		<div class="buttons">
			<button v-if="isShow_checkButton" @click="on_checkButton_click"><I :i="model.checkedButton ?? 'nf-fa-check'"></I></button>
			<button v-for="btn in model.buttons" @click="event => btn.onclick(event, model)"><I :i="btn.icon"></I></button>
		</div>
		
		<div class="content"><component :is="get_contentComponent"></component></div>
		
		<div class="toast-icon" v-if="showingIcon">
			<I :i="showingIcon"></I>
		</div>
		
		<div class="side-end"></div>
		
	</div>
	
</template>

<style lang="less" scoped>

.toast-item {
	--color-bg-unfocus: #c5c5c5;
	--color-bg-focus: #b0b0b0;
	--color-button-text: #e6e6e6;
	--color-button-bg-focus: #939393;
}

.toast-item.type-error {
	--color-bg-unfocus: #f19c9f;
	--color-bg-focus: #eb6f73;
	--color-button-text: #f9cacb;
	--color-button-bg-focus: #d55c60;
}

.toast-item.type-dev {
	--color-bg-unfocus: #aecfff;
	--color-bg-focus: #3091ff;
	--color-button-text: #d9f1ff;
	--color-button-bg-focus: #0048ff;
}

.toast-item {
	
	border-radius: 8px;
	
	box-sizing: border-box;
	min-width: 200px;
	min-height: 60px;
	max-width: 40vw;
	
	transition-property: background-color, opacity;
	transition-duration: 110ms;
	
	background-color: var(--color-bg-unfocus);
	color: aliceblue;
	opacity: 0.8;
	&:hover {
		opacity: 1;
		background-color: var(--color-bg-focus);
	}
	
	display: flex;
	flex-direction: row-reverse;
	flex-wrap: nowrap;
	gap: 10px;
	overflow: hidden;
	> .buttons { flex: 0 0 }
	> .content { flex: 1 1 0 }
	> .toast-icon { flex: 0 0 }
	> .side-end { flex: 0 0 5px; height: 100%; }
	
	> .buttons {
		
		width: 22px;
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		
		> button {
			
			width: 22px;
			flex: 1 1 0;
			
			background-color: inherit;
			border: inherit;
			padding: 3px 0;
			border-radius: 6px;
			color: var(--color-button-text);
			transition: background-color 110ms;
			
			display: flex;
			align-items: center;
			justify-content: center;
			
			&:hover {
				background-color: var(--color-button-bg-focus);
			}
			
		}
		
	}
	
	> .content {
		
		padding: 10px 0;
		font-size: 14px;
		
	}
	
	> .toast-icon {
		padding-top: 12px;
	}
	
	position: relative;
	> .progress-bar {
		
		position: absolute;
		top: 0;
		left: 0;
		right: 100%;
		height: 5px;
		
		background-color: #00000014;
		
		@keyframes progress-bar-left-right {
			from {
				right: 100%;
			}
			to {
				right: 0%;
			}
		}
		
		animation-name: progress-bar-left-right;
		animation-timing-function: linear;
		animation-fill-mode: forwards;
		
	}
	
}


</style>
