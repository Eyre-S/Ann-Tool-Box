<script setup lang="ts">
import { computed } from 'vue';

export interface NerdIconProps {
	i: string
}

const props = defineProps<NerdIconProps>()

const useClass = computed(() => {
	return props.i.startsWith("nf-");
});

</script>

<template>
	
	<ii v-if="useClass" :class="[i]"></ii>
	<ii v-else>{{ i }}</ii>
	
</template>

<style lang="less">

@import url("@/assets/css/nerd-font.less");

</style>
