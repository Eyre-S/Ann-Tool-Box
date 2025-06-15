<script setup lang="ts">
import ImgIcon, { type ImgIconProps } from './ImgIcon.vue';
import NerdIcon, { NerdIconProps } from './NerdIcon.vue';


export type IconProps =
	{ nerd?: boolean } & NerdIconProps |
	{ img: true } & ImgIconProps

const props = defineProps<IconProps>();

</script>

<template>
	<ImgIcon v-if="'img' in props" v-bind="{...props, ...$attrs}"></ImgIcon>
	<NerdIcon v-else v-bind="{...props, ...$attrs}"></NerdIcon>
</template>
