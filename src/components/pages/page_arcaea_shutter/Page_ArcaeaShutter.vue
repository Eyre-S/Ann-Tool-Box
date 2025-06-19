<script setup lang="ts">

import PageCard from '@/components/util/page/PageCard.vue';
import H1 from '@/components/util/page/H1.vue';
import P from '@/components/util/page/P.vue';
import InputNumber from '@/components/util/controller/InputNumber.vue';
import InputButton from '@/components/util/controller/InputButton.vue';

import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { ShutterTheme } from './ArcaeaShutterBox.vue';
import { templateRef } from '@vueuse/core';
import SlideSelect from '@/components/util/ui/SlideSelect.vue';
import SlideSelectItem from '@/components/util/ui/SlideSelectItem.vue';
import { core } from '@tauri-apps/api';
import toast from '@/components/app_cover/toast/toast';
import { set_devtools } from '@/app/app';
import shutterScreen, { SHUTTER_SCREEN_ID, ShutterScreenSyncData } from '@/sub_app/arcaea-shutter-screen/shutter-screen';
import { arcaeaShutterController } from '.';

function openShutterScreen() {
	core.invoke('open_shutter_screen')
		.then(() => {
			toast.add({
				text: "Shutter screen opened!",
				clearTimeout: toast.clear_timeout.standard,
			})
		}).catch((err: any) => {
			toast.add({
				text: `Failed to open shutter screen: ${err}`,
				clearTimeout: toast.clear_timeout.long,
				type: toast.types.ERROR
			});
		});
}
function closeShutterScreen() {
	core.invoke('close_shutter_screen')
		.then(() => {
			toast.add({
				text: "Shutter screen closed!",
				clearTimeout: toast.clear_timeout.standard,
			})
		}).catch((err: any) => {
			toast.add({
				text: `Failed to close shutter screen: ${err}`,
				clearTimeout: toast.clear_timeout.long,
				type: toast.types.ERROR
			});
		});
}
function openShutterScreenDevTools() {
	set_devtools(true, SHUTTER_SCREEN_ID).then(() => {
		toast.add({
			text: "DevTools for Shutter Screen opened!",
			clearTimeout: toast.clear_timeout.standard,
		});
	}).catch((err: any) => {
		toast.add({
			text: `Failed to open DevTools for Shutter Screen: ${err}`,
			clearTimeout: toast.clear_timeout.long,
			type: toast.types.ERROR
		});
	});
}
function closeShutterScreenDevTools() {
	set_devtools(false, SHUTTER_SCREEN_ID).then(() => {
		toast.add({
			text: "DevTools for Shutter Screen opened!",
			clearTimeout: toast.clear_timeout.standard,
		});
	}).catch((err: any) => {
		toast.add({
			text: `Failed to open DevTools for Shutter Screen: ${err}`,
			clearTimeout: toast.clear_timeout.long,
			type: toast.types.ERROR
		});
	});
}

const shutterScreenData = ref<ShutterScreenSyncData>({
	window: {
		width: 0,
		height: 0
	}
})
const ev_syncData = arcaeaShutterController.event.dataSync.setListen((ev) => {
	shutterScreenData.value = ev.payload;
})

onMounted(() => {
	openShutterScreen();
})

onUnmounted(() => {
	closeShutterScreen();
	ev_syncData.then((unListen) => unListen());
})

// ---------

const el_shutter_select = templateRef('shutter-select');
const shutter_theme = computed<ShutterTheme>(() => (el_shutter_select.value?.currentSelect as ShutterTheme));
watch([shutter_theme], () => {
	shutterScreen.event.syncData.emit({
		theme: shutter_theme.value
	})
})

const shutter_timeout_ms = ref(2000);

async function startShutter() {
	shutterScreen.event.openShutter.emit(undefined);
}

async function endShutter() {
	shutterScreen.event.closeShutter.emit(undefined);
}

async function setShutterTimeout() {
	shutterScreen.event.setShutterTimeout.emit({ timeout: shutter_timeout_ms.value });
}


</script>

<template>
	
	<PageCard>
		
		<H1>Arcaea Shutter - Splash Animation Demo</H1>
		
		<P>Set Theme <small>(current: {{ shutter_theme ?? "default" }})</small></P>
		<div class="button-set">
			<SlideSelect v-slot="{model}" ref="shutter-select">
				<SlideSelectItem :model="model" id="default" default>default</SlideSelectItem>
				<SlideSelectItem :model="model" id="fractureray">Fracture Ray</SlideSelectItem>
				<SlideSelectItem :model="model" id="grievouslady">Grievous Lady</SlideSelectItem>
				<SlideSelectItem :model="model" id="tempestissimo">Tempestissimo</SlideSelectItem>
				<SlideSelectItem :model="model" id="finale">FINALE</SlideSelectItem>
			</SlideSelect>
		</div>
		
		<P>Animations</P>
		<div class="button-set">
			<InputButton @click="startShutter">Start Animation</InputButton>
			<InputButton @click="endShutter">End Animation</InputButton>
		</div>
		<P>Timeout Animations</P>
		<div class="button-set">
			<div><InputNumber class="timeout-input" v-model="shutter_timeout_ms" placeholder="0" unit="ms" :step="200" :min="200"></InputNumber></div>
			<InputButton @click="setShutterTimeout">Start Timeout</InputButton>
		</div>
		
		<P>Preview Shutter Screen <small>(width:height = {{ (shutterScreenData.window.width / shutterScreenData.window.height).toFixed(1) }}:1)</small></P>
		<div class="button-set">
			<InputButton @click="openShutterScreen">Open ShutterScreen</InputButton>
			<InputButton @click="closeShutterScreen">Close ShutterScreen</InputButton>
		</div>
		<div class="button-set">
			<InputButton @click="openShutterScreenDevTools">Open DevTools</InputButton>
			<InputButton @click="closeShutterScreenDevTools">Close DevTools</InputButton>
		</div>
		
	</PageCard>
	
</template>

<style lang="less" scoped>

.button-set {
	
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	gap: 1em;
	
	+ .button-set {
		margin-block-start: 0.6em;
	}
	
}

.timeout-input {
	width: 8em;
}

</style>
