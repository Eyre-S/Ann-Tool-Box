<script setup lang="ts">

import I from '@renderer/components/util/I.vue';
import { computed } from 'vue';

const props = defineProps<{
	icon?: string,
	name?: string,
	version?: string
}>()

const iconIsNFIcon = computed<boolean>(() => {
	return props.icon != undefined && props.icon.startsWith("nf-");
})

</script>

<template>
	
	<div class="tag version-tag">
		<div class="part titles" v-if="icon || name">
			<I class="icon nf" v-if="icon && iconIsNFIcon" :i="icon"></I>
			<img class="icon img" v-else :src="icon">
			<span class="name">{{ name }}</span>
		</div>
		<div class="part values">
			<span v-if="version" class="version">{{ version }}</span>
			<span v-else class="version unknown">unknown</span>
		</div>
	</div>
	
</template>

<style lang="less" scoped>

@import "@renderer/assets/css/theme.less";

.tag.version-tag {
	
	display: inline-flex;
	
	font-size: 13px;
	border-radius: 6px;
	background-color: @about-version-tag-bg;
	overflow: hidden;
	
	flex-direction: row;
	flex-wrap: nowarp;
	align-items: baseline;
	
	> .part {
		
		padding: 4px 7px;
		border-radius: 6px;
		
		&.titles {
			
			background-color: @about-version-tag-title-bg;
			color: @about-version-tag-title-text;
			
			> .icon {
				
				margin-inline-end: 0.35em;
				
				&.img {
					max-width: 1em;
					max-height: 1em;
				}
				
			}
			
		}
		
		&.values {
			
			font-family: @font-code;
			font-size: 90%;
			color: @about-version-tag-text;
			
			> .version.unknown {
				font-style: italic;
			}
			
		}
		
	}
	
}

</style>
