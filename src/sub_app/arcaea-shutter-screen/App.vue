<script setup lang="ts">

import ArcaeaShutterBox from '@/components/pages/page_arcaea_shutter/ArcaeaShutterBox.vue';
import H1 from '@/components/util/page/H1.vue';
import P from '@/components/util/page/P.vue';

</script>

<template>
	
	<div id="content" data-tauri-drag-region>
		
		<H1>Arcaea Shutter Screen</H1>
		
		<P>...</P>
		
		<ArcaeaShutterBox />
		
	</div>
	
</template>

<style lang="less" scoped>

#content {
	
	background-image: url("@/assets/arcaea/testify.jpg");
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	
	block-size: 100dvb;
	inline-size: 100dvi;
	
}

</style>
