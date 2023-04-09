<script setup lang="ts">

defineProps<{
	title: string
	icon?: string
}>()

</script>

<template>
	
	<div class="title-item">
		<img v-if="icon != null" :src="icon" />
		<span>{{ title }}</span>
	</div>
	
</template>

<style lang="css" scoped>

.title-item {
	
	height: 30px;
	width: auto;
	padding-left: 0.7rem;
	padding-right: 0.7rem;
	margin-left: 1rem;
	margin-right: 1rem;
	background-color: #b0c5e0;
	border-radius: 6px;
	
	display: flex;
	align-items: center;
	justify-content: center;
	
}

.title-item:hover {
	background-color: #809ed4;
}

.title-item > img {
	max-width: 20px;
	max-height: 20px;
	margin-left: -3px;
	margin-right: 5px;
}

.title-item > span {
	color: aliceblue;
	font-size: 13px;
	font-weight: bold;
}

</style>
