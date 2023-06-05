<script setup lang="ts">

defineProps<{
	href: string,
	openBy?: (href: string) => void,
	noColor?: boolean
}>()

</script>

<template>
	
	<a :class="{noColor}"
			target="_blank"
			:href="openBy ? undefined : href"
			@click="openBy ? openBy(href) : undefined"
	><slot>{{ href }}</slot></a>
	
</template>

<style lang="less" scoped>

@import "../../../assets/css/theme.less";

a {
	color: @pages-element-link-text;
	text-decoration: none;
	&:hover {
		text-decoration: underline;
	}
	&.no-color {
		color: inherit
	}
}

</style>
