<script setup lang="ts">

import PageCard from '@/components/util/page/PageCard.vue';
import AboutBreadCardUI from '../about/AboutBreadCardUI.vue';
import SettingItem from './SettingItem.vue';
import InputButton from '@/components/util/controller/InputButton.vue';
import InputSwitcher from '@/components/util/controller/InputSwitcher.vue';
import I from '@/components/util/I.vue';
import A from '@/components/util/page/A.vue';
import DbgInfo from '@/components/util/page/dbg/DbgInfo.vue';
import DbgValue from '@/components/util/page/dbg/DbgValue.vue';

import { UseMouse, UseMouseInElement, UseMousePressed } from '@vueuse/components';

import { reactive, ref } from 'vue';
import config, { __session_config, ConfigStore } from '@/config';
import app from '@/app/app';
import files, { open_in_file_manager } from '@/app/files';

import { Dev_ComponentTest, Dev_FunctionTest } from "./SettingItems"

// ------
// System

interface appPathNode {
	// name: "home" | "appData" | "userData" | "sessionData" | "temp" | "exe" | "module" | "desktop" | "documents" | "downloads" | "music" | "pictures" | "videos" | "recent" | "logs" | "crashDumps"
	name: string,
	value?: string,
	relative_value: string,
	err?: string
}
const appPaths: appPathNode[] = reactive([
	{ name: 'workingDir', relative_value: "./" },
	{ name: 'configDir', relative_value: ConfigStore.defaultFilePath },
	{ name: 'home', relative_value: "~/" },
	// { name: 'appData' },
	// { name: 'userData' },
	// { name: 'sessionData' },
	// { name: 'temp' },
	// { name: 'exe' },
	// { name: 'module' },
	// { name: 'desktop' },
	// { name: 'documents' },
	// { name: 'downloads' },
	// { name: 'music' },
	// { name: 'pictures' },
	// { name: 'videos' },
	// { name: 'recent' },
	// { name: 'logs' },
	// { name: 'crashDumps' }
]);
for (const path of appPaths) {
	files.to_abs(path.relative_value)
		.then(v => path.value = v)
		.catch(v => path.err = v)
}

const pwd = ref<string|undefined>(undefined);
files.to_abs("./").then(v => pwd.value = v)

// ------
// Dev Tools

function openDevTools () {
	app.open_devtools();
}

</script>

<template>
	
	<div class="page-setting">
		
		<PageCard>
			
			<h2 ref="test_ref"><I i="nf-fa-gears"></I> 系统</h2>
			<SettingItem
				group="system"
				name="Language">
				<template #intro>应用所使用的语言。<br>它会影响不仅是显示语言，还有任何会用到语言的地方的语言设置。</template>
				<InputButton disabled>未实现</InputButton>
			</SettingItem>
			<SettingItem
				group="system"
				name="Open User Data Directory">
				<template #intro>打开程序的用户文件页面。<br>包含用户的配置选项等等。</template>
				<template #debug-info>
					<template v-for="path of appPaths">
						<DbgInfo>{{ path.name }}: <DbgValue><A no-color :href="path.value??'...'" :open-by="open_in_file_manager"></A></DbgValue></DbgInfo>
					</template>
				</template>
				<InputButton @click="() => open_in_file_manager(pwd??'...')">Open user_data</InputButton>
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
				<template #intro>用户界面的语言。<br>影响且仅影响 UI 的显示语言。<br>默认是与应用语言相同。你可以在这里设置一个不同的值。</template>
				<InputButton disabled>未实现</InputButton>
			</SettingItem>
			<SettingItem
				group="ui"
				name="Theme">
				<template #intro>用户界面的颜色主题。</template>
				<InputButton disabled>未实现</InputButton>
			</SettingItem>
			<SettingItem
				group="ui"
				name="Auto Expand Sidebar"
				:config-node-module="config.ui.sidebar_auto_expand">
				<template #intro>在鼠标悬浮在侧边栏上的时候自动打开侧边栏。<br>自动打开时不影响手动按下侧边栏按钮让侧边栏常驻打开。<br>如果你遇到了自动打开的侧边栏经常扰乱页面排版的情况，可以选择关闭此选项。</template>
				<InputSwitcher v-model="config.ui.sidebar_auto_expand.v.value"></InputSwitcher>
			</SettingItem>
			<SettingItem
				group="ui"
				name="Auto Expand Sidebar Delay">
				<template #intro>设置当鼠标悬浮侧边栏的时候自动打开侧边栏的延迟时间。<br>如果鼠标在侧边栏上悬浮不超过这个时间，侧边栏不会自动打开。同时，在鼠标从侧边栏移开一段时间之后，侧边栏才会关闭。<br>默认为 150ms。</template>
				<InputButton disabled>暂未实现自定义</InputButton>
			</SettingItem>
			<SettingItem
				group="ui"
				name="Use Native Title Bar"
				:config-node-module="config.ui.use_custom_scrollbar">
				<template #intro>使用深度自定义的页面滚动条。<br>深度自定义的页面滚动条将有更好的滚动时外观，但无法拖动同时或许在更加原生的功能上有欠缺。<br/>如果你使用时遇到了一些问题，推荐关闭此功能回滚到原生滚动条。</template>
				<InputSwitcher v-model="config.ui.use_custom_scrollbar.v.value"></InputSwitcher>
			</SettingItem>
			<SettingItem
				group="ui"
				name="Use Native Title Bar"
				:config-node-module="config.ui.use_native_frame"
				restart-require>
				<template #intro>使用系统原生的窗口标题栏而不是程序自定义的标题栏。<br>需要重启程序才能生效。</template>
				<InputSwitcher v-model="config.ui.use_native_frame.v.value"></InputSwitcher>
			</SettingItem>
			
		</PageCard>
		
		
		<PageCard>
			
			<h2><I i="nf-cod-extensions"></I> 功能</h2>
			<SettingItem
				group="features"
				name="Use Preview Features"
				:config-node-module="config.features.use_preview_features">
				<template #intro>开启预览功能。</template>
				<InputSwitcher v-model="config.features.use_preview_features.v.value"></InputSwitcher>
			</SettingItem>
			
		</PageCard>
		
		<PageCard v-if="config.dev.enabled.v.value">
			<h2><I i="nf-md-bug"></I> 调试</h2>
			<SettingItem
				group="dev"
				name="enabled"
				:config-node-module="config.dev.enabled">
				<template #intro>开启这个部分。</template>
				<InputSwitcher v-model="config.dev.enabled.v.value"></InputSwitcher>
			</SettingItem>
			<SettingItem
				group="dev"
				name="Show F5 Menu"
				:config-node-module="config.dev.show_f5_overlay">
				<template #intro>显示 F3 调试菜单。这将会在 UI 上叠加一个显示层用于显示当前的一些调试用状态信息。<br/>你也可以通过在任何位置按下 F3 来打开或关闭。</template>
				<InputSwitcher v-model="config.dev.show_f5_overlay.v.value"></InputSwitcher>
			</SettingItem>
			<SettingItem
				group="dev"
				name="Open DevTools">
				<template #intro>打开 WebView2 的网页调试 DevTools。</template>
				<InputButton disabled @click="openDevTools">Open DevTools</InputButton>
			</SettingItem>
			<SettingItem
				group="dev"
				name="Open DevTools on App Launches"
				:config-node-module="config.dev.open_devtools_on_launch">
				<template #intro>在启动时就打开网页 DevTools。<br>仅在调试功能开启时有效。</template>
				<InputSwitcher v-model="config.dev.open_devtools_on_launch.v.value"></InputSwitcher>
			</SettingItem>
			<SettingItem
				group="dev"
				name="setting: Show Debug Info"
				:config-node-module="config.dev.setting_show_debug_info">
				<template #intro>显示设置页面的调试信息。<br>调试信息将会在一个设置的说明信息下方，显示这个设置的一系列内部状态变量值。</template>
				<InputSwitcher v-model="config.dev.setting_show_debug_info.v.value"></InputSwitcher>
			</SettingItem>
			<SettingItem
				v-if="config.dev.setting_show_debug_info.v.value"
				group="dev"
				name="Show __Session Information"
				:config-node-module="config.dev.show_session_info">
				<template #intro>显示配置文件中 __session 段的信息...<br>所有的记录session状态的配置信息将会在下面的 Debug: __session 一节列出</template>
				<InputSwitcher v-model="config.dev.show_session_info.v.value"></InputSwitcher>
			</SettingItem>
		</PageCard>
		
		<PageCard v-if="config.dev.enabled.v.value">
			
			<h2><I i="nf-md-bug"></I><I i="nf-ple-lego_block_sideways"></I> 调试：元件测试</h2>
			
			<template v-for="item in Dev_ComponentTest">
				<component :is="item"></component>
			</template>
			<SettingItem
				group="dev"
				name="Test <UseIt>">
				<template #intro>用于测试 VueUse 的功能运作。</template>
				<UseMouse v-slot="{x,y}"><UseMousePressed v-slot="{pressed}"><UseMouseInElement v-slot="{elementX,elementY,isOutside}">
					<div class="shown-box">
						<span>Mouse Position: {{x}}:{{y}}</span><br>
						<span>Pressed: {{ pressed }}</span><br>
						<span>Is in Element: <template v-if="isOutside">not in</template><template v-else>in @ {{elementX}}:{{elementY}}</template></span><br>
					</div>
				</UseMouseInElement></UseMousePressed></UseMouse>
			</SettingItem>
			
		</PageCard>
		
		<PageCard v-if="config.dev.enabled.v.value">
			
			<h2><I i="nf-md-bug"></I><I i="nf-md-ship_wheel" /> 调试：功能测试</h2>
			<template v-for="item in Dev_FunctionTest">
				<component :is="item"></component>
			</template>
			
		</PageCard>
		
		<PageCard v-if="config.dev.enabled.v.value && config.dev.setting_show_debug_info.v.value && config.dev.show_session_info.v.value">
			<h2><I i="nf-md-bug"></I> 调试：__session</h2>
			<SettingItem
				v-for="session_config_item in __session_config"
				group="__session"
				:name="session_config_item.key"
				:config-node-module="session_config_item"></SettingItem>
		</PageCard>
		
	</div>
	
</template>

<style lang="less" scoped>

@import "@/assets/css/theme.less";

.shown-box {
	border-radius: 5px;
	background-color: @input-button-disabled-bg;
	padding: 10px;
	font-size: 13px;
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
