<script setup lang="ts">

import PageCard from '@/components/util/page/PageCard.vue';
import H1 from '@/components/util/page/H1.vue';
import InputButton from '@/components/util/controller/InputButton.vue';
import InputText from '@/components/util/controller/InputText.vue';
import InputNumber from '@/components/util/controller/InputNumber.vue';

interface Item {
	name: string,
	value: number
}

var count = $ref<Item[]>(
	[]
	// [
	// 	{
	// 		name: "一元硬币：厚度版",
	// 		value: 1.9
	// 	},
	// 	{
	// 		name: "一元硬币：高度版",
	// 		value: 30
	// 	},{
	// 		name: "小米 Pro 15.6",
	// 		value: 15.9
	// 	},{
	// 		name: "Lenovo 小新Pro 2023",
	// 		value: 17.5
	// 	},{
	// 		name: "HP 星Pro16 2023",
	// 		value: 17.7
	// 	},{
	// 		name: "MacBook Air 2023",
	// 		value: 11.5
	// 	},{
	// 		name: "MacBook Pro 2023",
	// 		value: 16.8
	// 	},
	// ]
)
const counted = $computed(() => count.filter(item => item.value > 0).sort((a, b) => a.value - b.value))
const count_max_value = $computed(() => {
	var x = 0
	for (const item of counted) {
		if (x < item.value) { x = item.value }
	}
	return x
})
var count_focus_to = $ref<null|Item>(null)

function addOne () {
	count.push({
		name: '',
		value: -1
	})
}

</script>

<template>
	
	<PageCard>
		
		<H1 icon="nf-cod-list_selection">List Compare</H1>
		
	</PageCard>
	
	<PageCard>
		<template v-for="item of count">
			<div class="item-edit">
				<InputText v-model="item.name" placeholder="My Something" />
				<InputNumber v-model="item.value" />
			</div>
		</template>
		<InputButton @click="addOne">+</InputButton>
	</PageCard>
	
	<PageCard>
		<table class="item-shower">
			<template v-for="item of counted">
				<tr class="item"
					:class="{focused: count_focus_to == item}"
					@click="count_focus_to = item"
					>
					<td class="name">{{ item.name }}</td>
					<td class="value-text">{{ item.value }}</td>
					<td class="value-show">
						<div class="value-bar" :style="{width: item.value/count_max_value * 90 + '%'}">
							<span class="value-percentage" v-if="count_focus_to != null">
								{{ Math.trunc(item.value / count_focus_to.value * 100) }}
								<span class="subs"
									v-if="((item.value / count_focus_to.value * 100) % 1).toFixed(2) != '0.00'">
									{{ ((item.value / count_focus_to.value * 100) % 1).toFixed(2).substring(1) }}
								</span>
								<span>%</span>
							</span>
						</div>
					</td>
				</tr>
			</template>
		</table>
	</PageCard>
	
</template>

<style lang="less" scoped>

@import "@/assets/css/theme.less";

.item-edit {
	
	margin-block-end: 1em;
	
	display: flex;
	flex-direction: row;
	gap: 1em;
	
}

.item-shower {
	
	width: 100%;
	border-spacing: 0;
	
	> .item {
		
		--size: 28px;
		--size-text: 12px;
		
		height: var(--size);
		position: relative;
		&.focused::after {
			content: '';
			position: absolute;
			top: 0;
			bottom: 0;
			left: -10px;
			right: -10px;
			background: #4b8adc24;
			border-radius: calc(var(--size-text) * 0.2);
		}
		
		> .name {
			font-size: calc(var(--size-text) * 1.1);
			text-align: right;
			white-space: nowrap;
		}
		
		> .value-text {
			padding-inline-start: calc(var(--size-text) * 0.8);
			font-size: calc(var(--size-text) * 0.9);
			text-align: right;
			white-space: nowrap;
			color: #4b8adc;
		}
		
		> .value-show {
			
			width: 99%;
			padding-inline-start: calc(var(--size-text) * 0.4);
			
			> .value-bar {
				height: calc(var(--size-text) * 1.5);
				display: block;
				background: @window-title-bg;
				border-radius: calc(var(--size-text) * 0.2);
				position: relative;
			
				> .value-percentage {
					position: absolute;
					top: 0;
					bottom: 0;
					left: 100%;
					display: flex;
					align-items: center;
					margin-inline-start: 0.5em;
					font-size: calc(var(--size-text) * 0.9);
					color: #4b8adc;
					> .subs {
						font-size: 0.75em;
						color: lighten(#4b8adc, 20)
					}
				}
			}
			
		}
		
	}
	
}

</style>
