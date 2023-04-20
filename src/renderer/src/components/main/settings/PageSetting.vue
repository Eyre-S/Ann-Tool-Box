<script setup lang="ts">

import PageCard from '@renderer/components/util/page/PageCard.vue';
import SettingItem from './SettingItem.vue';

</script>

<template>
	
	<div class="page-setting">
		
		<PageCard>
			<div style="text-align: center;">
				<img src="./bread-card-ui.png" style="height: 240px; max-width: 100%;">
				<p>Bread Card UI</p>
			</div>
		</PageCard>
		
		<PageCard>
			
			<h2>系统</h2>
			<SettingItem
				group="system"
				name="Language">
				<template v-slot:intro>应用所使用的语言。<br>它会影响不仅是显示语言，还有任何会用到语言的地方的语言设置。</template>
				<button>a</button>
			</SettingItem>
			
		</PageCard>
		
		<PageCard>
			
			<h2>用户界面</h2>
			<SettingItem
				group="ui"
				name="Display Language">
				<template v-slot:intro>用户界面的语言。<br>影响且仅影响 UI 的显示语言。<br>默认是与应用语言相同。你可以在这里设置一个不同的值。</template>
				<button>a</button>
			</SettingItem>
			<SettingItem
				group="ui"
				name="Theme">
				<template v-slot:intro>用户界面的颜色主题。</template>
				<button>a</button>
			</SettingItem>
			
		</PageCard>
		
	</div>
	
</template>

<style lang="less" scoped>

.page-setting {
	
	> .page-card {
		
		> h2 {
			
			font-size: 19px;
			color: lighten(#000000, 36%);
			padding-left: 1.4em;
			
		}
		
	}
	
}

</style>
