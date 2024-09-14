<script setup lang="ts">

import config from "@/config";

</script>

<template>
	
	<template v-if="config.dev.enabled.v.value && config.dev.setting_show_debug_info.v.value"><slot></slot></template>
	
</template>
