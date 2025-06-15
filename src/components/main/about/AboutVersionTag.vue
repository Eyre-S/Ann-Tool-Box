<script setup lang="tsx">

import Badge from '@/components/util/wdiget/Badge.vue';
import { VueNode } from '@/utils/vue';
import { computed } from 'vue';

const props = defineProps<{
	icon?: string,
	name?: string,
	version?: string
}>()

const iconIsNFIcon = computed<boolean>(() => {
	return props.icon != undefined && props.icon.startsWith("nf-");
})

const targetIcon = computed<string|VueNode|undefined>(() => {
	if (props.icon && iconIsNFIcon.value) {
		return props.icon;
	} else if (props.icon) {
		return <img src={props.icon} />;
	}
	return undefined;
})

</script>

<template>
	
	<Badge
		:icon="targetIcon"
		:name="name"
		:value="version"
	/>
	
</template>
