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
import app from "@/app/app";
import Badge from "@/components/util/wdiget/Badge.vue";

const app_version = ref<string>(app.app_version);
const versions = reactive({
	tauri: app.app_tauri_version,
})

const credit_reddem_key = ref("");

</script>

<template>
	
	<div class="page-about">
		
		<AboutTitle :icon="featured_icon">
			<template v-slot:title>Ann. ToolBox</template>
			<template v-slot:description>some kind of a toolbox by ANNie.</template>
			<template v-slot:versions>
				<!-- <AboutVersionTag
					:icon="app_icon"
					name="Ann. ToolBox"
					:version="app_version"></AboutVersionTag> -->
				<Badge
					:icon="{ img: true, src: app_icon}"
					name="Ann. ToolBox"
					:value="app_version"
				/>
			</template>
			<template v-slot:versions-framework>
				<!-- <AboutVersionTag
					icon="nf-fa-chain"
					name="Tauri"
					:version="versions.tauri"></AboutVersionTag> -->
				<Badge
					icon="nf-fa-chain"
					name="Tauri"
					:value="versions.tauri"></Badge>
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
