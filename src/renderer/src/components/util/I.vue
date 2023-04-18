<script setup lang="ts">

const props = defineProps<{
	i: string
}>()

const useClass = props.i.startsWith("nf-");

</script>

<template>
	
	<ii v-if="useClass" :class="[i]"></ii>
	<ii v-else>{{ i }}</ii>
	
</template>

<style lang="less">

@import url("@renderer/assets/css/nerd-font.less");

</style>
