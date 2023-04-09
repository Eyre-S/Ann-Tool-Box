<script setup lang="ts">

defineProps<{
	uname: String
}>()

</script>

<template>
	<div class="menu-item">
		<span>{{ uname }}</span>
	</div>
</template>

<style scoped lang="css">

.menu-item {
	
	box-sizing: border-box;
	width: 100%;
	border-radius: 10px;
	
	padding: 8px 15px;
	user-select: none;
	
	color: rgb(88, 85, 85);
	font-size: 14px;
	
}

.menu-item:hover {
	background-color: #f6f8fa;
}

</style>
