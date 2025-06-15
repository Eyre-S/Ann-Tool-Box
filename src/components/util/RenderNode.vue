<script setup lang="ts">
import { VueNode } from '@/utils/vue';
defineProps<{
  is: VueNode
}>()
</script>
<template>
	<template v-if="typeof is === 'string'">{{ is }}</template>
	<template v-else-if="is" v-bind="$attr"><component :is="is" /></template>
</template>
