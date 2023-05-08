<script setup lang="ts">

import Toast from './Toast.vue';
import toast, { Toast as Def } from './toast';
import config from "@renderer/config";

const def = new Def({
	
	type: toast.types.DEV,
	text: "一个测试用的吐司面包。",
	
	checkedButton: null,
	buttons: [{
		icon: 'nf-fa-question_circle',
		onclick(_event, _current_item) {
			toast.add({
				
				type: toast.types.DEV,
				text: "这是一个测试用的吐司面包。它用于一直显示在界面上以便于调试时调整 Toast 样式等等。它无法通过普通的方式被关闭。",
				clearTimeout: toast.clear_timeout.standard
				
			})
		},
	}]
	
})

</script>

<template>
	
	<div id="app-cover-toast">
		
		<div id="toast-container">
			<Toast :model="def" v-if="config.dev.show_test_toast.v.value"></Toast>
			<TransitionGroup name="list">
				<Toast v-for="[item, uid] of toast.list" :model="item" :key="uid"></Toast>
			</TransitionGroup>
		</div>
		
	</div>
	
</template>

<style lang="less" scoped>

#app-cover-toast {
	
	pointer-events: none;
	
	#toast-container {
		
		pointer-events: none;
		
		position: absolute;
		top: 0; right: 0;
		
		box-sizing: border-box;
		padding: 5px 20px;
		
		display: flex;
		flex-direction: column-reverse;
		flex-wrap: nowrap;
		align-items: self-end;
		justify-content: flex-start;
		overflow: hidden;
		gap: 10px;
		
		> .toast-item {
			pointer-events: all;
		}
		
	}
	
}

.list-move,
.list-enter-active,
.list-leave-active {
	transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
	opacity: 0 !important;
	transform: translateX(50px);
}

// .list-leave-active {
// 	position: absolute;
// }

</style>
