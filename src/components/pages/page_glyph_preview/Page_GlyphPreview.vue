<script setup lang="ts">
import { ref } from 'vue';
import PageCard from '@/components/util/page/PageCard.vue';
import H1 from '@/components/util/page/H1.vue';
import P from '@/components/util/page/P.vue';
import InputTextArea from '@/components/util/controller/InputTextArea.vue';
import InputText from '@/components/util/controller/InputText.vue';
import InputButton from '@/components/util/controller/InputButton.vue';
import Icon from '@/components/util/icon/Icon.vue';

const inputText = ref(`我可以吞下玻璃而不伤身体🥰
The quick brown fox jumps over the lazy dog🥺
  —— by ANNIe (cookie) Sukażyo kagurazaka/Satsuki Eyre ⁉️🏳️‍⚧️🪼`);
const glyphs = ref<{ name: string }[]>([
	{ name: 'Alibaba Puhuiti' }
]);

const addGlyph = () => {
	glyphs.value.push({ name: '' });
};

const removeGlyph = (index: number) => {
	glyphs.value.splice(index, 1);
};
</script>

<template>
	
	<PageCard>
		
		<H1 icon="nf-md-format_font">Glyph Preview</H1>
		<P>Enter text and add glyph names to preview how the text looks with different glyphs.</P>
		
		
	</PageCard>
	
	<PageCard>
		
		<P>Preview Text:</P>
		<div class="input-section">
			<InputTextArea
				v-model="inputText"
				placeholder="Enter the texts to preview 🥰 !"
				autosize
			/>
		</div>
		
	</PageCard>
	
	<PageCard v-for="(glyph, index) in glyphs" :key="index">
		
		<div class="glyph-controller">
			<InputText
				v-model="glyph.name"
				placeholder="tofu"
				@keyup.enter="addGlyph"
			/>
			<InputButton @click="removeGlyph(index)"><Icon i="nf-fa-delete"/> Delete</InputButton>
		</div>
		
		<P class="glyph-preview" :class="{ 'no-content': !inputText }">
			<div class="preview-text" :style="{ fontFamily: glyph.name ? `'${glyph.name}', 'tofu', sans-serif` : `'tofu', sans-serif` }"
			>{{ inputText || "No text entered..." }}</div>
		</P>
		
	</PageCard>
	
	<PageCard no-bg class="add-glyph">
		<InputButton @click="addGlyph" icon="i-mdi-plus-circle-outline"><Icon i="nf-fa-plus" /> Add Glyph to Preview</InputButton>
	</PageCard>
	
</template>

<style lang="less" scoped>

@import (reference) '@/assets/css/styles.less';

.glyph-controller {
	display: flex;
	flex-direction: row;
	gap: 10px;
}

.glyph-preview {
	
	background-color: white;
	border-radius: 10px;
	padding: 1.4em 2em;

	&.no-content {
		opacity: 0.5;
	}
	
	> .preview-text {
		white-space: pre;
	}
	
}

</style>
