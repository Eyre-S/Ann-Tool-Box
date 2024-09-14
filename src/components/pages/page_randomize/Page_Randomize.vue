<script setup lang="ts">

import PageCard from '@/components/util/page/PageCard.vue';
import H1 from '@/components/util/page/H1.vue';
import InputTextArea from '@/components/util/controller/InputTextArea.vue';
import InputButton from '@/components/util/controller/InputButton.vue';
import I from '@/components/util/I.vue';
import P from '@/components/util/page/P.vue';
import InputNumber from '@/components/util/controller/InputNumber.vue';
import InputText from '@/components/util/controller/InputText.vue';

var input = $ref('Hello, World!');
var input_times = $ref(5);
var separator = $ref('\\n');

var processedInput = $ref('')

type generatingStateType = 'idle' | 'running' | 'ok' | 'failed'
var generatingState = $ref<generatingStateType>('idle')

var generateTask: number|undefined = undefined

async function generateSingle (_input: string): Promise<String> {
	await new Promise(resolve => setTimeout(resolve, 30))
	return _input;
}

async function doGenerate() {
	generatingState = 'running'
	const _input = $$(input).value
	// console.log("input: " + _input)
	const _separator = $$(separator).value
	// console.log("separator: " + _separator)
	var inputCache = ""
	for (var i = 1; i < input_times; i++) {
		inputCache += await generateSingle(_input)
		inputCache += _separator.replace("\\n", "\n")
	} inputCache += await generateSingle(_input)
	processedInput = inputCache
	generatingState = 'ok'
	// console.log("processedInput: " + processedInput)
}

</script>

<template>
	
	<PageCard class="panel-control">
		
		<H1 icon="nf-md-dice_multiple_outline">Randomize</H1>
		
		<InputTextArea class="input-template" v-model="input"></InputTextArea>
		<P class="controller">
			<InputButton @click="doGenerate()" class="btn-generate">Generate</InputButton>
			for
			<InputNumber class="input-times" v-model="input_times" :min="1" :step="1"></InputNumber>
			times, separated by
			<InputText class="input-separator" v-model="separator" placeholder="nothing"></InputText>
		</P>
		
	</PageCard>
	
	<PageCard class="panel-result">
		<P class="status">
			<template v-if="generatingState === 'running'">
				<span class="running"><I i="nf-fa-circle_o_notch"></I>Loading</span>
			</template>
			<template v-else-if="generatingState === 'ok'">
				<span class="ok"><I i="nf-fa-check_circle_o"></I>Ok</span>
			</template>
			<template v-else-if="generatingState === 'failed'">
				<span class="failed"><I i="nf-fa-exclamation_circle"></I>Failed</span>
			</template>
			<template v-else>
				<span class="idle"><I i="nf-md-circle_box"></I>Idle</span>
			</template>
		</P>
		<InputTextArea v-model="processedInput" readonly autosize placeholder="..."></InputTextArea>
	</PageCard>
	
</template>

<style lang="less" scoped>

@import "@/assets/css/theme.less";

.panel-control {
	
	.controller {
		
		display: inline-flex;
		flex-direction: row;
		align-items: center;
		gap: 0.4em;
		
		.input-times {
			
			width: 4em;
			
		}
	}
	
}

.panel-result {
	
	> .status {
		
		font-size: 12px;
		
		margin-block-start: 0;
		> span > ii {
			font-size: 1.3em;
			margin-inline-end: 0.6em;
		}
		
		> .running {
			> ii {
				color: #d0bb6d;
			}
		}
		> .ok {
			> ii {
				color: #63b487;
			}
		}
		> .failed {
			> ii {
				color: #f08585;
			}
		}
		> .idle {
			> ii {
				color: #b6b6b6;
			}
		}
		
	}
	
}

</style>
