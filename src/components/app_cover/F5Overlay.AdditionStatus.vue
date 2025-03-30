<script setup lang="ts">

import { useFps, useIdle, useNetwork, usePageLeave, useTimestamp } from '@vueuse/core';
import { computed } from 'vue';
import Record from './F5Overlay.Record.vue';


const now = useTimestamp({ interval: 50 })

const fps = useFps()
const networking_status = useNetwork()
const isLeft = usePageLeave()
const { lastActive } = useIdle(1000 * 60 * 5)
const idledFor = computed(() => Math.floor((now.value - lastActive.value) / 1000))

</script>

<template>
	
	<Record>
		<template #name>FPS</template>
		<template #value>{{ fps }}</template>
	</Record>
	<Record>
		<template #name>Network Status</template>
		<template #value>{{ networking_status ? "Online" : "Offline" }}</template>
	</Record>
	<Record>
		<template #name>In App</template>
		<template #value>{{ isLeft ? "Left" : "In" }}</template>
	</Record>
	<Record>
		<template #name>Idle for</template>
		<template #value><code>{{ idledFor }}</code>s</template>
	</Record>
	
</template>

