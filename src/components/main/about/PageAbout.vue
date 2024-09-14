<script setup lang="ts">

import P from "@/components/util/page/P.vue";
import H1 from "@/components/util/page/H1.vue";

import InputText from "@/components/util/controller/InputText.vue";
import InputButton from "@/components/util/controller/InputButton.vue";

import PageCard from '@/components/util/page/PageCard.vue';
import AboutTitle from './AboutTitle.vue';
import AboutVersionTag from './AboutVersionTag.vue';
import AboutBreadCardUI from './AboutBreadCardUI.vue';
import AboutFooter from './AboutFooter.vue';

import featured_icon from '@/assets/icon.png'
import app_icon from "@/assets/icon.png";

import { reactive, ref } from 'vue';
import { tryReddem } from "@/reddem";

const app_version = ref<string>();
// window.api.app.getVersion().then(v => app_version.value = v);
// const versions = reactive({ ...window.electron.process.versions });
const versions = reactive({
	electron: "not found",
	chrome: "not found",
	node: "not found",
	v8: "not found",
})

const credit_reddem_key = ref("");

</script>

<template>
	
	<div class="page-about">
		
		<AboutTitle :icon="featured_icon">
			<template v-slot:title>Ann. ToolBox</template>
			<template v-slot:description>some kind of a toolbox by ANNie.</template>
			<template v-slot:versions>
				<AboutVersionTag
					:icon="app_icon"
					name="Ann. ToolBox"
					:version="app_version"></AboutVersionTag>
			</template>
			<template v-slot:versions-framework>
				<AboutVersionTag
					icon="nf-md-electron_framework"
					name="Electron"
					:version="versions.electron"></AboutVersionTag>
				<AboutVersionTag
					icon="nf-md-google_chrome"
					name="Chromium"
					:version="versions.chrome"></AboutVersionTag>
				<AboutVersionTag
					icon="nf-md-nodejs"
					name="NodeJS"
					:version="versions.node"></AboutVersionTag>
				<AboutVersionTag
					icon="nf-md-nodejs"
					name="NodeJS v8"
					:version="versions.v8"></AboutVersionTag>
			</template>
		</AboutTitle>
		
		<PageCard>
			<AboutBreadCardUI style="font-size: 14px;">
				<P no-margin>UI Design powered by <AboutVersionTag name="Bread Card UI" version="-"></AboutVersionTag></P>
			</AboutBreadCardUI>
		</PageCard>
		
		<PageCard>
			<H1>Credit Reddem</H1>
			<div class="input-box">
				<InputText v-model="credit_reddem_key" placeholder="XXXX-XXXX-XXXX"></InputText>
				<InputButton @click="tryReddem(credit_reddem_key)">Reddem!</InputButton>
			</div>
		</PageCard>
		
		<AboutFooter></AboutFooter>
		
	</div>
	
</template>

<style scoped>

.input-box {
	display: flex;
	gap: 1em;
}

</style>
