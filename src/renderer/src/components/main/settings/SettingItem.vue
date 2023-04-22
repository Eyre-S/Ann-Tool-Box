<script setup lang="ts">

defineProps<{
	group?: string,
	name: string
}>()

</script>

<template>
	
	<div class="setting-item">
		
		<div class="info">
			<span class="title"><span class="group" v-if="group">{{ group }}</span><span class="name">{{ name }}</span></span>
			<span class="description"><slot name="intro"></slot></span>
		</div>
		
		<div class="action-area">
			<slot></slot>
		</div>
		
	</div>
	
</template>

<style lang="less" scoped>

@import "../../../assets/css/theme.less";

.setting-item {
	
	padding: 20px;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	gap: 20px;
	
	> .info { flex: 7 7 0; }
	> .action-area { flex: 3 3 0; }
	
	> .info {
		
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
			font-size: 13.4px;
		
		> .title {
			font-weight: bold;
			color: @setting-title-color;
			> .group {
				font-size: 90%;
				color: @setting-title-group-color;
				&:after { content: ":"; }
				margin-inline-end: 0.25em;
			}
			margin-block-end: 0.1em;
		}
		
		> .description {
			color: @setting-description-color;
			font-size: 12.8px;
		}
		
	}
	
	> .action-area {
		
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		align-items: end;
		justify-content: center;
		
	}
	
}

</style>
