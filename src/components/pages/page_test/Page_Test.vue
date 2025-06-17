<script setup lang="ts">

import PageCard from '@/components/util/page/PageCard.vue';
import H1 from '@/components/util/page/H1.vue';
import SlideSelect from '@/components/util/ui/SlideSelect.vue';
import SlideSelectItem from '@/components/util/ui/SlideSelectItem.vue';

</script>

<template>
	
	<PageCard>
		
		<H1 icon="nf-md-test_tube">Tests</H1>
		
		<SlideSelect v-slot="{ model }">
			<SlideSelectItem :model="model" id="lesbian">Lesbian</SlideSelectItem>
			<SlideSelectItem :model="model" id="transgender" default>(default) Transgender</SlideSelectItem>
			<SlideSelectItem :model="model" id="nb">Non-Binary</SlideSelectItem>
		</SlideSelect>
		
	</PageCard>
	
</template>
