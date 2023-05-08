<script setup lang="ts">

import P from "@renderer/components/util/page/P.vue";

import AboutTitle from './AboutTitle.vue';
import featured_icon from '@renderer/assets/icon.png'
import AboutVersionTag from './AboutVersionTag.vue';

import app_icon from "@renderer/assets/icon.png";
import { reactive, ref } from 'vue';
import PageCard from '@renderer/components/util/page/PageCard.vue';
import AboutBreadCardUI from './AboutBreadCardUI.vue';
import AboutFooter from './AboutFooter.vue';

const app_version = ref<string>();
window.api.app.getVersion().then(v => app_version.value = v);
const versions = reactive({ ...window.electron.process.versions });

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
		
		<AboutFooter></AboutFooter>
		
	</div>
	
</template>
