<script setup lang="ts">

defineProps<{
	href: string
}>()

</script>

<template>
	
	<a :href="href" target="_blank"><slot></slot></a>
	
</template>

<style lang="less" scoped>

@import "../../../assets/css/theme.less";

a {
	color: @pages-element-link-text;
	text-decoration: none;
	&:hover {
		text-decoration: underline;
	}
}

</style>
