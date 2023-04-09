<script setup lang="ts">

const props = defineProps<{
	uname: string
	icon: string
}>()

</script>

<template>
	
	<div class="item-box">
		<div class="content">
			<img :src="props.icon" >
			<span>{{ uname }}</span>
		</div>
	</div>
	
</template>

<style scoped lang="css">

.item-box {
	
	box-sizing: border-box;
	width: 100%;
	height: 40px;
	
	border-radius: 8px;
	
	user-select: none;
	
}

.item-box:hover {
	background-color: #b5bcc536;
}

.item-box > .content {
	
	width: 260px;
	height: 40px;
	
	display: flex;
	flex-direction: row;
	align-items: center;
	flex-wrap: nowrap;
	
}

.item-box > .content > img {
	
	width: 30px;
	height: 30px;
	margin: 5px;
	margin-right: 10px;
	
	border-radius: 5px;
	overflow: hidden;
	
}

</style>
