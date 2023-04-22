<script setup lang="ts">

import { computed } from 'vue';

const props = defineProps<{
	modelValue: boolean
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
	
	<div :class="['input', 'switcher', { 'active': value }]" @click="value = !value">
		<div class="check-icon"></div>
		<div class="check-empty"></div>
	</div>
	
</template>

<style lang="less" scoped>

@import "../../../assets/css/theme.less";

@switcher-size: 30px;
@switcher-border-radius: 5px;
@switcher-inner-whitespace: 14px;

.input.switcher {
	
	width: 42px;
	height: 28px;
	box-sizing: border-box;
	
	border-radius: @switcher-border-radius;
	background: @input-switcher-main;
	
	transition: all 200ms;
	
	&:hover {
		
		width: 54px;
		
	}
	
	position: relative;
	overflow: hidden;
	
	> .check-icon {
		
		position: absolute;
		top: 0;
		bottom: 0;
		right: 100%;
		left: 0;
		background-color: @input-switcher-onactive;
		border-radius: (@switcher-border-radius);
		
		transition: right 350ms ease-out, left 250ms ease-in-out;
		
	}
	
	&.active > .check-icon {
		right: 0;
		left: @switcher-inner-whitespace;
	}
	
	> .check-empty {
		
		position: absolute;
		top: 0;
		bottom: 0;
		right: 0;
		width: @switcher-inner-whitespace;
		background-color: @input-switcher-onempty;
		border-radius: (@switcher-border-radius);
		
		transition: width 300ms ease-out;
		
	}
	
	&.active > .check-empty {
		width: 0;
	}
	
}

</style>
