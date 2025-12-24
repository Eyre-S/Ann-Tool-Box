<script setup lang="ts">

import { useAppConfig } from "@/app/config.ts";


const config = useAppConfig();

</script>

<template>
	
	<template v-if="config.dev.enabled.v.value && config.dev.setting_show_debug_info.v.value"><slot></slot></template>
	
</template>
