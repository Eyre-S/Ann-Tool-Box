<script setup lang="ts">

import PageCard from '@/components/util/page/PageCard.vue';
import ArcaeaShutterBox from './ArcaeaShutterBox.vue';
import H1 from '@/components/util/page/H1.vue';
import P from '@/components/util/page/P.vue';
import InputNumber from '@/components/util/controller/InputNumber.vue';
import InputButton from '@/components/util/controller/InputButton.vue';
import InputSlider from '@/components/util/controller/InputSlider.vue';

import { ref } from 'vue';
import { ShutterTheme } from './ArcaeaShutterBox.vue';
import { useElementSize } from '@vueuse/core';

const shutter = ref<InstanceType<typeof ArcaeaShutterBox>|null>(null);
const shutter_size = useElementSize(shutter)
const shutter_theme = ref<ShutterTheme>();

const shutter_timeout_ms = ref(2000);

function change_theme (theme: ShutterTheme) {
	shutter_theme.value = theme;
	shutter.value?.set_timeout();
}

const preview_height = ref(340);

</script>

<template>
	
	<PageCard>
		
		<H1>Arcaea Shutter - Splash Animation Demo</H1>
		
		<P>Set Theme <small>(current: {{ shutter_theme ?? "default" }})</small></P>
		<div class="button-set">
			<InputButton @click="change_theme(undefined)">default</InputButton>
			<InputButton @click="change_theme('fractureray')">Fracture Ray</InputButton>
			<InputButton @click="change_theme('grievouslady')">Grievous Lady</InputButton>
			<InputButton @click="change_theme('tempestissimo')">Tempestissimo</InputButton>
			<InputButton @click="change_theme('finale')">FINALE</InputButton>
		</div>
		
		
		<P>Animations</P>
		<div class="button-set">
			<InputButton @click="shutter?.set_on()">Start Animation</InputButton>
			<InputButton @click="shutter?.set_off()">End Animation</InputButton>
		</div>
		<P>Timeout Animations</P>
		<div class="button-set">
			<div><InputNumber class="timeout-input" v-model="shutter_timeout_ms" placeholder="0" unit="ms" :step="200" :min="200"></InputNumber></div>
			<InputButton @click="shutter?.set_timeout(shutter_timeout_ms)">Start Timeout</InputButton>
		</div>
		
		<P>Preview Size <small>(width:height = {{ (shutter_size.width.value / shutter_size.height.value).toFixed(1) }}:1)</small></P>
		<div class="button-set">
			<InputSlider v-model="preview_height" :min="100" :max="2000 "></InputSlider>
		</div>
		
	</PageCard>
	
	<ArcaeaShutterBox :style="{height: `${preview_height}px`}" ref="shutter" :theme="shutter_theme"></ArcaeaShutterBox>
	
</template>

<style lang="less" scoped>

.button-set {
	
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	gap: 1em;
	
}

.timeout-input {
	width: 8em;
}

</style>
