<script setup lang="ts">

import PageCard from '@renderer/components/util/page/PageCard.vue';
import { computed, ref } from 'vue';

const props = defineProps<{
	theme?: null|'finale'|'fractureray'|'grievouslady'|'tempestissimo'
}>()

const shutter_name_suffix = computed(() => {
	return props.theme==null ? "" : `_${props.theme}`;
});

const shutter_theme_class = computed(() => {
	return props.theme==null ? "theme-default" : `theme-${props.theme}`;
});

const shutter_url = computed(() => { return {
	left: new URL("../../../assets/arcaea/shutter_l" + shutter_name_suffix.value + ".png", import.meta.url).href,
	right: new URL("../../../assets/arcaea/shutter_r" + shutter_name_suffix.value + ".png", import.meta.url).href
}})

const on_transiton = ref(false);

function set_on () {
	on_transiton.value = true;
}

function set_off () {
	on_transiton.value = false;
}

function set_timeout (ms: number = 1500) {
	set_on();
	return setTimeout(set_off, ms);
}

defineExpose({
	set_on,
	set_off,
	set_timeout
})

</script>

<template>
	
	<PageCard no-padding
			:class="['arcaea-shutter-box', on_transiton?'on':'off', shutter_theme_class]"
			ref="shutter_container">
		<img class="left" :src="shutter_url.left">
		<img class="right" :src="shutter_url.right">
	</PageCard>
	
</template>

<style lang="less" scoped>

@import "../../../assets/arcaea/values.less";

.arcaea-shutter-box {
	height: 340px;
	background-image: url("@renderer/assets/arcaea/testify.jpg");
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	
	position: relative;
	overflow: hidden;
	
	--shutter-all: @shutter-default-all;
	--shutter-left: @shutter-default-left;
	--shutter-right: @shutter-default-right;
	
	&.theme-fractureray {
		--shutter-all: @shutter-fractureray-all;
		--shutter-left: @shutter-fractureray-left;
		--shutter-right: @shutter-fractureray-right;
	}
	
	&.theme-grievouslady {
		--shutter-all: @shutter-grievouslady-all;
		--shutter-left: @shutter-grievouslady-left;
		--shutter-right: @shutter-grievouslady-right;
	}
	
	&.theme-tempestissimo {
		--shutter-all: @shutter-tempestissimo-all;
		--shutter-left: @shutter-tempestissimo-left;
		--shutter-right: @shutter-tempestissimo-right;
	}
	
	&.theme-finale {
		--shutter-all: @shutter-finale-all;
		--shutter-left: @shutter-finale-left;
		--shutter-right: @shutter-finale-right;
	}
	
	> img {
		
		position: absolute;
		transition: transform 800ms;
		
		&.left {
			z-index: 901;
			left: 0;
			width: calc(calc(100% / var(--shutter-all)) * var(--shutter-left));
			transform: translate(-100%);
		}
		
		&.right {
			z-index: 900;
			right: 0;
			width: calc(calc(100% / var(--shutter-all)) * var(--shutter-right));
			transform: translate(100%);
		}
		
	}
	
	&.on > img {
		transform: translate(0%) !important;
	}
	
}

</style>
