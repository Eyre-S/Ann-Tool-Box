<script setup lang="ts">

import config from "@renderer/config";

</script>

<template>
	
	<template v-if="config.dev.setting_show_debug_info.v.value"><slot></slot></template>
	
</template>
