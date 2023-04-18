<script setup lang="ts">

import I from "@renderer/components/util/I.vue";

defineProps<{
	uname: string
	icon: string
}>()

</script>

<template>
	
	<div class="item-box">
		<div class="content">
			<div class="icon-container">
				<I class="icon" :i="icon"></I>
			</div>
			<span class="title">{{ uname }}</span>
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
	
	> .content {
		
		width: @full-width - @content-border-width * 2;
		height: @item-size;
		
		display: flex;
		flex-direction: row;
		align-items: center;
		flex-wrap: nowrap;
		
		color: @text-color;
		
		> .title {
			font-size: 15px;
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
			}
			
		}
		
	}
	
}

</style>
