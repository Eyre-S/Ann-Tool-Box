<script setup lang="ts">

import PageCard from '@renderer/components/util/page/PageCard.vue';
import SettingItem from './SettingItem.vue';
import InputButton from '@renderer/components/util/controller/InputButton.vue';
import InputText from '@renderer/components/util/controller/InputText.vue';
import InputSwitcher from '@renderer/components/util/controller/InputSwitcher.vue';
import I from '@renderer/components/util/I.vue';
import A from '@renderer/components/util/page/A.vue';
import DbgInfo from '@renderer/components/util/page/dbg/DbgInfo.vue';
import DbgValue from '@renderer/components/util/page/dbg/DbgValue.vue';

import { computed, reactive, Ref, ref } from 'vue';

import config, { __session_config } from '@renderer/config';
import AboutBreadCardUI from '../about/AboutBreadCardUI.vue';
import toast, { ToastButton } from '@renderer/components/app_cover/toast/toast';
import randoms from '@renderer/utils/randoms';
import { open_syspath } from '@renderer/utils/api';

// ------
// System


function openUserDir () {
	window.api.user_data.openDir();
}

interface appPathNode {
	name: "home" | "appData" | "userData" | "sessionData" | "temp" | "exe" | "module" | "desktop" | "documents" | "downloads" | "music" | "pictures" | "videos" | "recent" | "logs" | "crashDumps"
	value?: string
}
const appPaths: appPathNode[] = reactive([
	{ name: 'home' },
	{ name: 'appData' },
	{ name: 'userData' },
	{ name: 'sessionData' },
	{ name: 'temp' },
	{ name: 'exe' },
	{ name: 'module' },
	{ name: 'desktop' },
	{ name: 'documents' },
	{ name: 'downloads' },
	{ name: 'music' },
	{ name: 'pictures' },
	{ name: 'videos' },
	{ name: 'recent' },
	{ name: 'logs' },
	{ name: 'crashDumps' }
]);
for(const path of appPaths) {
	window.api.app.getPath(path.name).then(v => path.value = v);
}

const app_path = ref<string|undefined>(undefined);
window.api.app.getAppPath().then(v => app_path.value = v)

// ------
// Dev Tools

function openDevTools () {
	window.electron.ipcRenderer.send('call-dev-tools');
}

function dev_toast_used (_event, toast) {
	toast.remove_this();
}

function dev_generateToast () {
	
	toast.add({
		
		type: randoms.one(
			undefined,
			toast.types.ERROR,
			toast.types.DEV,
		),
		icon: randoms.one(
			undefined, undefined, undefined, undefined, undefined, undefined,
			"nf-fa-500px", "nf-fa-500px", "nf-dev-github"
		),
		
		text: randoms.one(
			"一个随机的吐司面包。",
			"这是一个测试用的吐司面包。它用于一直显示在界面上以便于调试时调整 Toast 样式等等。它无法通过普通的方式被关闭。",
			"It seems some problems occurred...",
			"我可以吞下玻璃而不伤身体。",
			"买了一箱，已经在😭了",
			"有个小朋友 Segmentation Fault 了也不知道哪里来的自信，一口咬定是机器的问题。给他换了机器，并且教育了他机器永远是对的。这个小插曲体现了编程的基础教育还有很大的缺憾，使得竞赛选手大多都缺少真正的 “编程” 训练，我看他们对着那长得要命的 if (...dp[a][b][c][d][e][f][n^1]...) 调的真叫一个累，让我不由得想起若干年前某 NOI 金牌选手在某题爆零后对着一行有 20 个括号的代码哭的场景。",
			"显示一条随机样式和随机内容的吐司通知！"
		),
		
		clearTimeout: randoms.one(7000, 7000, 7000, 7000, 7000, 7000, 0, undefined, undefined, 2000, 2000),
		
		buttons: randoms.some<ToastButton>(
			{ icon: "nf-fa-refresh", onclick: dev_toast_used },
			{ icon: "nf-md-message_alert", onclick: dev_toast_used },
			{ icon: "nf-fa-bug", onclick: dev_toast_used },
			{ icon: "nf-fa-cloud_upload", onclick: dev_toast_used },
			{ icon: "nf-md-tools", onclick: dev_toast_used }
		),
		checkedButton: randoms.one(
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			null,
			null,
			null,
			null,
			"nf-fa-close",
			"nf-fa-close",
			"nf-fa-close",
			"nf-fa-close",
			"nf-fa-close",
			"nf-fa-close"
		)
		
	})
}

const iconTestIcon: Ref<string> = ref("nf-fa-500px");

const fontTestText = ref("我可以吞下玻璃而不伤身体。");
const fontTestFontFamily = ref("Consolas");
const fontTestShownStyle = computed(() => { return {
	fontFamily: '"' + fontTestFontFamily.value + '"'
}})

const testSwitcher = ref(false);

function dev_relaunch () {
	window.electron.ipcRenderer.send('relaunch');
}

// ------
// UI

</script>

<template>
	
	<div class="page-setting">
		
		<PageCard>
			
			<h2><I i="nf-fa-gears"></I> 系统</h2>
			<SettingItem
				group="system"
				name="Language">
				<template v-slot:intro>应用所使用的语言。<br>它会影响不仅是显示语言，还有任何会用到语言的地方的语言设置。</template>
				<InputButton disabled>未实现</InputButton>
			</SettingItem>
			<SettingItem
				group="system"
				name="Open User Data Directory">
				<template v-slot:intro>打开程序的用户文件页面。<br>包含用户的配置选项等等。</template>
				<template v-slot:debug-info>
					<DbgInfo>AppPath: <DbgValue><A no-color :href="app_path?app_path:'...'" :open-by="open_syspath"></A></DbgValue></DbgInfo>
					<template v-for="path of appPaths">
						<DbgInfo>{{ path.name }}: <DbgValue><A no-color :href="path.value?path.value:'...'" :open-by="open_syspath"></A></DbgValue></DbgInfo>
					</template>
				</template>
				<InputButton @click="openUserDir">Open user_data</InputButton>
			</SettingItem>
			
		</PageCard>
		
		<PageCard>
			
			<h2><I i="nf-md-dock_window"></I> 用户界面</h2>
			<AboutBreadCardUI>
				<span style="font-size: 13px; color: darkgray;">- Bread Card UI -</span>
			</AboutBreadCardUI>
			<SettingItem
				group="ui"
				name="Display Language">
				<template v-slot:intro>用户界面的语言。<br>影响且仅影响 UI 的显示语言。<br>默认是与应用语言相同。你可以在这里设置一个不同的值。</template>
				<InputButton disabled>未实现</InputButton>
			</SettingItem>
			<SettingItem
				group="ui"
				name="Theme">
				<template v-slot:intro>用户界面的颜色主题。</template>
				<InputButton disabled>未实现</InputButton>
			</SettingItem>
			<SettingItem
				group="ui"
				name="Use Native Title Bar"
				:config-node-module="config.ui.use_native_frame"
				restart-require>
				<template v-slot:intro>使用系统原生的窗口标题栏而不是程序自定义的标题栏。<br>需要重启程序才能生效。</template>
				<InputSwitcher v-model="config.ui.use_native_frame.v.value"></InputSwitcher>
			</SettingItem>
			
		</PageCard>
		
		<PageCard>
			<h2><I i="nf-md-bug"></I> 调试</h2>
			<SettingItem
				group="dev"
				name="Open DevTools">
				<template v-slot:intro>打开 Electron 的网页调试 DevTools。</template>
				<InputButton @click="openDevTools">Open DevTools</InputButton>
			</SettingItem>
			<SettingItem
				group="dev"
				name="Generate Random Toast">
				<template #intro>显示一条随机样式和随机内容的吐司通知<I i="nf-md-arrow_top_right"></I>！</template>
				<InputButton @click="dev_generateToast">toast~</InputButton>
			</SettingItem>
			<SettingItem
				group="dev"
				name="setting: Show Debug Info"
				:config-node-module="config.dev.setting_show_debug_info">
				<template v-slot:intro>显示设置页面的调试信息。<br>调试信息将会在一个设置的说明信息下方，显示这个设置的一系列内部状态变量值。</template>
				<InputSwitcher v-model="config.dev.setting_show_debug_info.v.value"></InputSwitcher>
			</SettingItem>
			<SettingItem
				group="dev"
				name="Test Icon">
				<template v-slot:intro>用于测试图标渲染。<br>在右边的输入框填入一个图标 id，或者是一个字符，看看下面会如何渲染出来。</template>
				<InputText v-model="iconTestIcon"></InputText>
				<div class="shown-box" style="font-size: 15px;"><I :i="iconTestIcon"></I></div>
				<!-- <div style="display: flex; flex-direction: row-reverse; gap: inherit; flex-wrap: warp;"> -->
					<!-- <div class="shown-box" style="font-size: 15px; flex: 0 0; width: fit-content; height: fit-content;"><span>{{ iconTestIcon }}</span></div> -->
					<!-- <div class="shown-box" style="font-size: 15px; flex: 0 0; width: fit-content; height: fit-content;"><I :i="iconTestIcon"></I></div> -->
				<!-- </div> -->
			</SettingItem>
			<SettingItem
				group="dev"
				name="Test Font">
				<template v-slot:intro>用于测试文字渲染。<br>在右边的第一行填入一些文字，第二行填入一个字体名称，看看下面会如何渲染出来。</template>
				<InputText v-model="fontTestText"></InputText>
				<InputText v-model="fontTestFontFamily"></InputText>
				<div class="shown-box" :style="[{ fontSize: '13px'}, fontTestShownStyle]">{{ fontTestText }}</div>
			</SettingItem>
			<SettingItem
				group="dev"
				name="Test Switcher">
				<template v-slot:intro>用于测试开关按钮。<br>当前状态：{{ testSwitcher ? "ON" : "off" }}</template>
				<InputSwitcher v-model="testSwitcher"></InputSwitcher>
			</SettingItem>
			<SettingItem
				group="dev"
				name="Relaunch App">
				<InputButton @click="dev_relaunch">重启！</InputButton>
			</SettingItem>
		</PageCard>
		
		<PageCard v-if="config.dev.setting_show_debug_info.v.value">
			<h2><I i="nf-md-bug"></I> 调试：__session</h2>
			<SettingItem
				group="dev"
				name="Show __Session Information"
				:config-node-module="config.dev.show_session_info">
				<template v-slot:intro>显示配置文件中 __session 段的信息...</template>
				<InputSwitcher v-model="config.dev.show_session_info.v.value"></InputSwitcher>
			</SettingItem>
			<template v-if="config.dev.show_session_info.v.value">
				<SettingItem
					v-for="session_config_item in __session_config"
					group="__session"
					:name="session_config_item.key"
					:config-node-module="session_config_item"></SettingItem>
			</template>
		</PageCard>
		
	</div>
	
</template>

<style lang="less" scoped>

@import "../../../assets/css/theme.less";

.shown-box {
	border-radius: 5px;
	background-color: @input-button-disabled-bg;
	padding: 10px;
}

.page-setting {
	
	> .page-card {
		
		> h2 {
			
			font-size: 19px;
			color: @setting-page-group-title;
			padding-left: 1.4em;
			
		}
		
	}
	
}

</style>
