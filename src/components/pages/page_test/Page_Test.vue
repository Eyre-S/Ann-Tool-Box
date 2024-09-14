<script setup lang="ts">

import PageCard from '@/components/util/page/PageCard.vue';
import H1 from '@/components/util/page/H1.vue';
import P from '@/components/util/page/P.vue';
import InputButton from '@/components/util/controller/InputButton.vue';
import { reactive } from 'vue';

const count = $ref(0)
const react = reactive($$(count))
const obj = $computed(() => { return count > 0 })

</script>

<template>
	
	<PageCard>
		
		<H1 icon="nf-md-test_tube">Tests</H1>
		
		<InputButton @click="count++"><code>++</code></InputButton>
		&nbsp;
		<InputButton @click="count--"><code>--</code></InputButton><br>
		
		<P>
			count is: {{ count }}<br>
			react count is: {{ react }}<br>
			obj is: {{ obj }}
		</P>
		
	</PageCard>
	
</template>
