<script setup lang="ts">

import I from "@renderer/components/util/I.vue";
import { computed } from "vue";

const props = defineProps<{
	uname: string
	icon: string
	isSpecial?: boolean
	active?: boolean
}>()

const iconStatus = computed(()=> { return {
	'roll': props.isSpecial,
	'roll-on': props.active
}})

</script>

<template>
	
	<div :class="['item-box', { 'sp': isSpecial }]">
		<div class="content">
			<div class="icon-container">
				<I :class="['icon', iconStatus]" :i="icon"></I>
			</div>
			<span v-if="!isSpecial" class="title">{{ uname }}</span>
		</div>
	</div>
	
</template>

<style scoped lang="less">

@import url("sidebar-vars.less");

.item-box {
	
	box-sizing: border-box;
	width: 100%;
	height: @item-size;
	
	border-radius: @border-radiu-level-1;
	
	user-select: none;
	
	&:hover {
		background-color: @item-hover;
	}
	
	&.sp { width: @item-size; }
	&.sp > .content { width: @item-size; }
	
	> .content {
		
		width: @full-width - @content-border-width * 2;
		height: @item-size;
		
		display: flex;
		flex-direction: row;
		align-items: center;
		flex-wrap: nowrap;
		
		color: @text-color;
		
		> .title {
			font-size: @title-font;
			letter-spacing: 0.03em;
			line-height: 1;
			margin-bottom: -0.15em;
		}
		
		> .icon-container {
			
			flex-grow: 0;
			flex-shrink: 0;
			width: @item-size;
			height: @item-size;
			margin-right: 5px;
			
			border-radius: @border-radiu-level-2;
			overflow: hidden;
			display: flex;
			align-items: center;
			justify-content: center;
			
			> .icon {
				
				font-size: @icon-size;
				color: @icon-color;
				
				&.roll {
					
					transition-duration: 300ms ;
					transform: rotate(0);
					&.roll-on {
						transform: rotate(180deg);
					}
					
				}
				
			}
			
		}
		
	}
	
}

</style>
