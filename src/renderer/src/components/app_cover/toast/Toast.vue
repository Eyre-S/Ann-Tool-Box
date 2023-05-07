<script setup lang="ts">

import I from '@renderer/components/util/I.vue';
import { Toast } from './toast';
import { computed } from 'vue';

const props = defineProps<{
	model: Toast
}>()

const showingIcon = computed<string|undefined>(() => {
	return props.model.icon != undefined ? props.model.icon : props.model.type?.default_icon
})

const check_button_show = computed<boolean>(() => {
	return props.model.checkedButton !== null;
})

function on_checked () {
	props.model.remove_this();
}

</script>

<template>
	
	<div :class="['toast-item', model.type?.css_class]">
		<div class="buttons">
			<button v-if="check_button_show" @click="on_checked"><I :i="model.checkedButton == undefined ? 'nf-fa-check' : model.checkedButton"></I></button>
			<button v-for="btn in model.buttons" @click="event => btn.onclick(event, model)"><I :i="btn.icon"></I></button>
		</div>
		<div class="content">{{ model.text }}</div>
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

.toast-item {
	
	border-radius: 8px;
	
	box-sizing: border-box;
	min-width: 200px;
	min-height: 60px;
	max-width: 40vw;
	
	transition: background-color 110ms;
	
	background-color: var(--color-bg-unfocus);
	color: aliceblue;
	&:hover {
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
	
}

</style>
