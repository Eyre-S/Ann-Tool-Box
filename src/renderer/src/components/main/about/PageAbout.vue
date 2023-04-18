<script setup lang="ts">
</script>

<template>
	
	<div class="page">
		<div class="page-about">
			<div class="icon-box">
				<img class="icon" src="../../../assets/icon.png">
				<p class="title">Ann. ToolBox</p>
				<p class="description">some kind of a toolbox by ANNie.</p>
			</div>
		</div>
	</div>
	
</template>

<style scoped lang="less">

.page {
	// background-color: #eef2f5;
	border-radius: 10px;
}

.page-about {
	
	box-sizing: border-box;
	width: 100%;
	padding: 20px;
	
	.icon-box {
		text-align: center;
		.icon { width: 220px; }
		.title {
			font-size: 20px;
			font-weight: bold;
		}
	}
	
}

</style>
