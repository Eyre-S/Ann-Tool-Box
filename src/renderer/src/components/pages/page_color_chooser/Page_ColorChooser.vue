<script setup lang="ts">

import H1 from "@renderer/components/util/page/H1.vue";
import PageCard from "@renderer/components/util/page/PageCard.vue"
import ColorPalette from "./ColorPalette.vue";

</script>

<template>
	
	<PageCard>
		
		<H1 icon="nf-fae-palette_color">Color Chooser</H1>
		
	</PageCard>
	
	<PageCard>
		<ColorPalette></ColorPalette>
	</PageCard>
	
</template>
