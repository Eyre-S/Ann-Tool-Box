<script setup lang="ts">

defineProps<{
	noMargin?: boolean
}>()

</script>

<template>
	
	<p :class="{'no-margin': noMargin}"><slot></slot></p>
	
</template>

<style lang="less" scoped>

@import "../../../assets/css/theme.less";

p {
	margin-inline-start: 1em;
	font-size: 14px;
	color: @pages-element-normal-text;
	&.no-margin {
		margin: 0;
	}
}

</style>
