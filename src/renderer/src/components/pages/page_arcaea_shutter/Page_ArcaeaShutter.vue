<script setup lang="ts">

import PageCard from '@renderer/components/util/page/PageCard.vue';
import H1 from '@renderer/components/util/page/H1.vue';
import InputButton from '@renderer/components/util/controller/InputButton.vue';
import { ComponentPublicInstance, StyleValue, computed, ref, watchEffect } from 'vue';

const shutter_width_all = ref(1280);
const shutter_width_left = ref(1216);
const shutter_width_right = ref(425);

const shutter_container = ref<ComponentPublicInstance|null>(null);
const shutter_width = ref(0);
function update_width () {
	if (shutter_container.value) {
		shutter_width.value = shutter_container.value.$el.offsetWidth
	} else {
		shutter_width.value = 0
	}
}
watchEffect(() => {
	update_width();
})
window.onresize = update_width;

const shutter_left_style = computed<StyleValue>(() => { return {
	width: ((shutter_width.value / shutter_width_all.value) * shutter_width_left.value)+"px"
}})

const shutter_right_style = computed<StyleValue>(() => { return {
	width: ((shutter_width.value / shutter_width_all.value) * shutter_width_right.value)+"px"
}})

// ---

const on_transiton = ref(false);

function start () {
	on_transiton.value = true;
}

function stop () {
	on_transiton.value = false;
}

</script>

<template>
	
	<PageCard>
		
		<H1>Arcaea Shutter</H1>
		
		<InputButton @click="start">Start Animation</InputButton>&nbsp;
		<InputButton @click="stop">End Animation</InputButton>
		
	</PageCard>
	
	<PageCard no-padding
			:class="['preview', on_transiton?'on':'off']"
			ref="shutter_container" :custom-status="shutter_width">
		<img class="left" :style="shutter_left_style" src="@renderer/assets/arcaea/shutter_l.png">
		<img class="right" :style="shutter_right_style" src="@renderer/assets/arcaea/shutter_r.png">
	</PageCard>
	
</template>

<style lang="less" scoped>

.preview {
	height: 340px;
	background-image: url("@renderer/assets/arcaea/testify.jpg");
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	
	position: relative;
	overflow: hidden;
	
	> img {
		
		position: absolute;
		transition: transform 800ms;
		
		&.left {
			z-index: 901;
			left: 0;
			transform: translate(-100%);
		}
		
		&.right {
			z-index: 900;
			right: 0;
			transform: translate(100%);
		}
		
	}
	
	&.on > img {
		transform: translate(0%) !important;
	}
	
}

</style>
