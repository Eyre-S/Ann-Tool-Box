<script setup lang="ts">

import { computed, ref } from 'vue';

const props = defineProps<{
	
	modelValue: string,
	
	disabled?: boolean,
	placeholder?: string,
	
	password?: boolean,
	showPassword?: boolean,
	
	maxLength?: number,
	minLength?: number,
	pattern?: RegExp
	
}>()

const emit = defineEmits<{
	(e: 'update:modelValue', value: string): void
}>()

const value = computed({
	get() {
		return props.modelValue
	},
	set(value) {
		emit('update:modelValue', value)
	}
})

const showPassword = ref<boolean>(props.showPassword??false);
function toggleShowPassword () {
	showPassword.value = !showPassword.value;
}

const labelType = computed<'text'|'password'>(() => {
	return (props.password && !showPassword.value) ? 'password' : 'text'
})

</script>

<template>
	
	<div :class="['input', 'text', {'password': password, 'show-password': showPassword}]"><input
		:type="labelType" v-model="value"
		:disabled="disabled" :placeholder="placeholder"
		:pattern="pattern?.source" :minlength="minLength" :maxlength="maxLength"
	><div v-if="!password" class="marker"></div><div v-else class="marker password" @click="toggleShowPassword"><div :class="['show-password', {'on': showPassword}]"></div></div></div>
	
</template>

<style lang="less" scoped>

@import "@renderer/assets/css/theme.less";

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
	}
	
	> .marker {
		flex: 0 0 0.35em;
		// height: 100%;
		background-color: @input-text-marker;
		border-radius: 0.35em;
		transition: background-color 150ms;
		
		&.password {
			
			flex-basis: 0.85em;
			border-radius: 0.25em;
			display: flex;
			align-items: center;
			justify-content: center;
			
			> .show-password {
				width: 0.25em;
				height: 0.55em;
				border-radius: 0.55em;
				background-color: fadeout(@input-text-bg, 20%);
				transition: width 100ms;
				&.on {
					width: 0.55em;
				}
			}
			
		}
		
	}
	
	> input:focus-visible + .marker {
		background-color: @input-text-marker-onfocus;
	}
	
}

</style>
