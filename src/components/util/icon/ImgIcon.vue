<script setup lang="ts">

export interface ImgIconProps {
	src: string
}

defineProps<ImgIconProps>();

</script>

<template>
	<img class="icon img-icon" :src="src" />
</template>

<style lang="less" scoped>

.img-icon {
	max-width: 1em;
	max-height: 1em;
}

</style>
