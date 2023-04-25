<script setup lang="ts">

import { ConfigNode } from '@renderer/config';
import { computed } from 'vue';
import config from '@renderer/config';

const props = defineProps<{
	
	group?: string,
	name: string,
	
	configNodeModule?: ConfigNode<any>,
	restartRequire?: boolean
	
}>()

const is_modified_notice_on = computed<boolean>(() => {
	return props.configNodeModule?.is_modified.value == true;
})

const is_restartRequire_notice_on = computed<boolean>(() => {
	return props.restartRequire == true && props.configNodeModule?.is_modified_after_load.value == true;
})

</script>

<template>
	
	<div class="setting-item">
		
		<div class="info">
			<div class="notice-box">
				<div v-if="is_modified_notice_on" @click="configNodeModule?.restore()" class="modified" title="已修改。点击将重设为默认值。"></div>
				<div v-if="is_restartRequire_notice_on" class="restart-require" title="需要重启以应用变更。"></div>
			</div>
			<div class="title">
				<span class="group" v-if="group">{{ group }}</span>
				<span class="name">{{ name }}</span>
			</div>
			<span class="description"><slot name="intro"></slot></span>
			<div class="config-debug-description" v-if="configNodeModule !== undefined && config.dev.setting_show_debug_info.v.value">
				<span>key: <span class="value">{{ configNodeModule.key }}</span></span><br>
				<span>defaults: <span class="value">{{ configNodeModule.defaults }}</span></span><br>
				<span>value: <span class="value">{{ configNodeModule.v.value }}</span></span><br>
				<span>locked: <span class="value">{{ configNodeModule.v_locked.value }}</span></span><br>
				<span>is_modified: <span class="value">{{ configNodeModule.is_modified.value }}</span></span><br>
				<span>is_changed_in_session: <span class="value">{{ configNodeModule.is_modified_after_load.value }}</span></span><br>
			</div>
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
		
		> .config-debug-description {
			color: #a0b4cd;
			font-family: @font-code;
			font-size: 10px;
			span > .value { color: #7aa1d6; }
		}
		
		position: relative;
		
		> .notice-box {
			
			@notice-height: 32px;
			@notice-width: 4px;
			@notice-whitespace: 4.5px;
			
			position: absolute;
			top: 0;
			left: (0 - 9px);
			transform: translate(-100%, 0);
			width: fit-content;
			height: @notice-height;
			
			display: flex;
			flex-direction: row-reverse;
			flex-wrap: nowrap;
			column-gap: @notice-whitespace;
			
			> * {
				
				width: @notice-width;
				border-radius: @notice-width;
				background-color: #c8dcf7;
				
				&:hover {
					background-color: darken(#c8dcf7, 10%);
				}
				
			}
			
			> .restart-require {
				background-color: #f7bfa7;
				&:hover { background-color: darken(#f7bfa7, 10%); }
			}
			
		}
		
	}
	
	> .action-area {
		
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		gap: 10px;
		align-items: end;
		justify-content: center;
		
	}
	
}

</style>
