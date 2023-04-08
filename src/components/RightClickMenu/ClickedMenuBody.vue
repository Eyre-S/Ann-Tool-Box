<template>
	<div class="menu-body" :style="menuBodyPosition">
		<slot></slot>
	</div>
</template>

<script>

export default {
	
	name: "ClickedMenuBody",
	
	props: ['top', 'left'],
	
	data() {
		return {
			menuBodyPosition : {
				top: this.top + 'px',
				left: this.left + 'px'
			}
		}
	}
	
}

</script>

<style scoped>

.menu-body {
	
	position: absolute;
	
	display: flex;
	flex-direction: column;
	width: fit-content;
	min-width: 200px;
	max-width: 300px;
	
	padding: 2px;
	
	background-color: #ffffff;
	box-shadow: -1px 1px 12px 1px #e3e3e3;
	border-radius: 10px;
	overflow: hidden;
	
}

</style>
