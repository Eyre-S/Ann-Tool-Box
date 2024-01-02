<script setup lang="ts">

import I from "@renderer/components/util/I.vue";
import { computed } from "vue";

const props = defineProps<{
	uname: string
	icon: string
	isSpecial?: boolean
	active?: boolean
	flagTestOnly?: boolean
	flagPreviewOnly?: boolean
}>()

const iconStatus = computed(()=> { return {
	'roll': props.isSpecial,
	'roll-on': props.active
}})

</script>

<template>
	
	<div :class="['item-box', { 'sp': isSpecial, 'active': active, 'flag-test': flagTestOnly, 'flag-preview': flagPreviewOnly }]">
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
@import "@renderer/assets/css/theme.less";

.item-box {
	
	box-sizing: border-box;
	width: 100%;
	height: @item-size;
	position: relative;
	
	border-radius: @border-radiu-level-1;
	
	
	// &.active:not(.sp),
	&:hover {
		background-color: @item-hover;
	}
	
	&.sp { width: @item-size; }
	&.sp > .content { width: @item-size; }
	
	&.active:not(.sp) {
		&:before {
			
			content: '';
			position: absolute;
			left: @marker-whitespace;
			top: calc(50% - (@marker-height/2));
			width: @marker-width;
			height: @marker-height;
			border-radius: @marker-width;
			background-color: @sidebar-active-marker;
			
		}
	}
	
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
			position: relative;
			
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
	
	&.flag-test > .content > .icon-container ::after {
		content: '•';
		position: absolute;
		right: 8%;
		top: 8%;
		color: #2385f569;
	}
	
	&.flag-preview > .content > .icon-container ::after {
		content: '•';
		position: absolute;
		right: 8%;
		top: 8%;
		color: #41c24569;
	}
	
}

</style>
