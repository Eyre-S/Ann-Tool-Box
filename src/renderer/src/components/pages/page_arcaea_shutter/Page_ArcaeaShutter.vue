<script setup lang="ts">

import PageCard from '@renderer/components/util/page/PageCard.vue';
import ArcaeaShutterBox from './ArcaeaShutterBox.vue';
import H1 from '@renderer/components/util/page/H1.vue';
import P from '@renderer/components/util/page/P.vue';
import InputNumber from '@renderer/components/util/controller/InputNumber.vue';
import InputButton from '@renderer/components/util/controller/InputButton.vue';

import { ref } from 'vue';

const shutter = ref<InstanceType<typeof ArcaeaShutterBox>|null>(null);
const shutter_theme = ref<null|'finale'|'fractureray'|'grievouslady'|'tempestissimo'>(null);

const shutter_timeout_ms = ref(2000);

function change_theme (theme: null|'finale'|'fractureray'|'grievouslady'|'tempestissimo') {
	shutter_theme.value = theme;
	shutter.value?.set_timeout();
}

const preview_height = ref(340);

</script>

<template>
	
	<PageCard>
		
		<H1>Arcaea Shutter - Splash Animation Demo</H1>
		
		<P>Set Theme <small>(current: {{ shutter_theme?shutter_theme:"default" }})</small></P>
		<div class="button-set">
			<InputButton @click="change_theme(null)">default</InputButton>
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
