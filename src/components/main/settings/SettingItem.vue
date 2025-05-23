<script setup lang="tsx">

import { ConfigNode } from '@/config';
import { computed, watch } from 'vue';

import DbgOnly from '@/components/util/page/dbg/DbgOnly.vue';
import DbgInfo from '@/components/util/page/dbg/DbgInfo.vue';
import DbgValue from '@/components/util/page/dbg/DbgValue.vue';
import toast from '@/components/app_cover/toast/toast';


const props = defineProps<{
	
	group?: string,
	name: string,
	
	configNodeModule?: ConfigNode<any>,
	restartRequire?: boolean
	
}>()

const isShowTag_modified = computed<boolean>(() => props.configNodeModule?.is_modified.value == true )
const isShowTag_restartRequire = computed<boolean>(() => props.restartRequire && props.configNodeModule?.is_modified_after_load.value==true )
watch(
	isShowTag_restartRequire,
	() => {
		if (isShowTag_restartRequire.value == true) {
			toast.add({
				type: toast.types.WARN,
				text: <><b>已更改 <u>{ props.name }</u></b><br/>这是一个特殊的设置，需要重启 App 以后才能应用变更。</>,
				clearTimeout: toast.clear_timeout.short
			})
		}
	}
)

</script>

<template>
	
	<div class="setting-item">
		
		<div class="info">
			<div class="notice-box">
				<div v-if="isShowTag_modified" @click="configNodeModule?.restore()" class="modified" title="已修改。点击将重设为默认值。"></div>
				<div v-if="isShowTag_restartRequire" class="restart-require" title="需要重启以应用变更。"></div>
			</div>
			<div class="title">
				<span class="group" v-if="group">{{ group }}</span>
				<span class="name">{{ name }}</span>
			</div>
			<div class="description"><slot name="intro"></slot></div>
			<DbgOnly><slot name="debug-info"></slot></DbgOnly>
			<DbgOnly v-if="configNodeModule">
				<DbgInfo>key: <DbgValue>{{ configNodeModule.key }}</DbgValue></DbgInfo>
				<DbgInfo>defaults: <DbgValue>{{ configNodeModule.defaults }}</DbgValue></DbgInfo>
				<DbgInfo>value: <DbgValue>{{ configNodeModule.v.value }}</DbgValue></DbgInfo>
				<DbgInfo>locked: <DbgValue>{{ configNodeModule.v_locked.value }}</DbgValue></DbgInfo>
				<DbgInfo>is_modified: <DbgValue>{{ configNodeModule.is_modified.value }}</DbgValue></DbgInfo>
				<DbgInfo>is_changed_in_session: <DbgValue>{{ configNodeModule.is_modified_after_load.value }}</DbgValue></DbgInfo>
			</DbgOnly>
		</div>
		
		<div class="action-area">
			<slot></slot>
		</div>
		
	</div>
	
</template>

<style lang="less" scoped>

@import "@/assets/css/theme.less";

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
				background-color: @setting-item-notice-bar;
				
				&:hover {
					background-color: @setting-item-notice-bar-onfocus;
				}
				
			}
			
			> .restart-require {
				background-color: @setting-item-notice-warn;
				&:hover { background-color: @setting-item-notice-warn-onfocus; }
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
