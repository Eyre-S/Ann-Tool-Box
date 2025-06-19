<script setup lang="ts">

import ArcaeaShutterBox from '@/components/pages/page_arcaea_shutter/ArcaeaShutterBox.vue';
import H1 from '@/components/util/page/H1.vue';
import P from '@/components/util/page/P.vue';
import { templateRef, useWindowSize } from '@vueuse/core';
import { computed, onUnmounted, ref, watch } from 'vue';
import shutterScreen, { ShutterScreenControlData, ShutterScreenSyncData } from './shutter-screen';
import { arcaeaShutterController } from '@/components/pages/page_arcaea_shutter';

const windowSize = useWindowSize();
const shutterData = computed<ShutterScreenSyncData>(() => ({
	window: {
		width: windowSize.width.value,
		height: windowSize.height.value
	}
}))
watch([shutterData], () => {
	arcaeaShutterController.event.dataSync.emit(shutterData.value);
})

const shutter = templateRef<InstanceType<typeof ArcaeaShutterBox>|null>('shutter');

const event_open_shutter = shutterScreen.event.openShutter.setListen(() => {
	shutter.value?.set_on();
})
const event_close_shutter = shutterScreen.event.closeShutter.setListen(() => {
	shutter.value?.set_off();
})
const event_timeout_shutter = shutterScreen.event.setShutterTimeout.setListen((ev) => {
	shutter.value?.set_timeout(ev.payload.timeout);
})

const controllerData = ref<ShutterScreenControlData>({
	theme: 'default'
})
const event_syncData = shutterScreen.event.syncData.setListen((ev) => {
	controllerData.value = ev.payload;
});

onUnmounted(() => {
	event_open_shutter.then((unListen) => unListen());
	event_close_shutter.then((unListen) => unListen());
	event_timeout_shutter.then((unListen) => unListen());
	event_syncData.then((unListen) => unListen());
})

</script>

<template>
	
	<div id="content" data-tauri-drag-region>
		
		<H1>Arcaea Shutter Screen</H1>
		
		<P>...</P>
		
		<ArcaeaShutterBox :theme="controllerData.theme" ref="shutter"/>
		
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
