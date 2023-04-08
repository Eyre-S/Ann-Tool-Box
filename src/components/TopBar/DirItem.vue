<template>
	<div class="dir-item">
		<img v-if="itemLogo" :src="itemLogo" />
		<span>{{ itemName }}</span>
	</div>
</template>

<script>

import { Url } from 'url';

export default {
	name: "DirItem",
	props: {
		itemName: String,
		itemLogo: Url
	}
}

</script>

<style scoped>

.dir-item {
	--dir-item-background: var(--topbar-item-background);
	--dir-item-background-focused: var(--topbar-item-background-focused);
}

.dir-item {
	
	height: 30px;
	width: auto;
	padding-left: 0.7rem;
	padding-right: 0.7rem;
	margin-left: 1rem;
	margin-right: 1rem;
	background-color: var(--dir-item-background);
	border-radius: 6px;
	
	display: flex;
	align-items: center;
	justify-content: center;
	
}

.dir-item:hover {
	background-color: var(--dir-item-background-focused);
}

.dir-item > img {
	max-width: 20px;
	max-height: 20px;
	margin: -5px;
	margin-left: -2px;
	margin-right: 2px;
}

.dir-item > span {
	color: aliceblue;
	font-size: 13px;
	font-weight: bold;
}

</style>
