<script setup lang="ts">

import Toast from './Toast.vue';
import toast from './toast';

</script>

<template>
	
	<div id="app-cover-toast">
		
		<div id="toast-container">
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
	opacity: 0;
	transform: translateX(50px);
}

// .list-leave-active {
// 	position: absolute;
// }

</style>
