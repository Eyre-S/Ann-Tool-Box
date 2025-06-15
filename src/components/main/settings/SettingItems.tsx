import { Component, StyleValue, computed, defineComponent, ref } from "vue";
import DbgInfo from "@/components/util/page/dbg/DbgInfo.vue";
import DbgValue from "@/components/util/page/dbg/DbgValue.vue";
import SettingItem from "./SettingItem.vue"
import InputButton from "@/components/util/controller/InputButton.vue"
import InputText from "@/components/util/controller/InputText.vue"
import InputSwitcher from "@/components/util/controller/InputSwitcher.vue";
import I from "@/components/util/I.vue"
import { bindModelResultTo } from "@/utils/jsx-helper";

import css from './SettingItems.module.less'
import { webviewWindow } from "@tauri-apps/api";
import app from "@/app/app";
import files from "@/app/files";
import toast from "@/components/app_cover/toast/toast";
import { gen_randomToast } from "@/components/app_cover/toast/debug-random-toasts";

export const Dev_ComponentTest: Component[] = [
	
	defineComponent(() => {
		const iconName = ref("nf-fa-500px")
		return () => (<>
			<SettingItem
				group="dev"
				name="Test Icon">{{
				intro: () => (<>用于测试图标渲染。<br/>在右边的输入框填入一个图标 id，或者是一个字符，看看下面会如何渲染出来。</>),
				default: () => (<>
					<InputText modelValue={iconName.value} onUpdate:modelValue={bindModelResultTo(iconName)} />
					<div class={[css.shownBox]} style={{fontSize: '15px'}}><I i={iconName.value} /></div>
				</>)
			}}</SettingItem>
		</>)
	}),
	
	defineComponent(() => {
		const text = ref("Hello, world🫠! 我可以吞下玻璃而不伤身体。");
		const fontName = ref("Consolas");
		const fontTestShownStyle = computed(() => ({
			fontFamily: `"${fontName.value}", tofu`
		} satisfies StyleValue))
		return () => (<>
			<SettingItem
				group="dev"
				name="Test Font"
			>{{
				intro: () => (<>用于测试文字渲染。<br/>在右边的第一行填入一些文字，第二行填入一个字体名称，看看下面会如何渲染出来。<br/>文字框同时也是一个密码框，可以用来检查密码框的实现效果。</>),
				default: () => (<>
					<InputText password showPassword modelValue={text.value} onUpdate:modelValue={bindModelResultTo(text)} />
					<InputText modelValue={fontName.value} onUpdate:modelValue={bindModelResultTo(fontName)} />
					<div class={[css.shownBox, 'allow-select']} style={fontTestShownStyle.value}>{ text.value }</div>
				</>)
			}}</SettingItem>
		</>)
	}),
	
	defineComponent(() => {
		const switchStatus = ref(false)
		return () => (<>
			<SettingItem
				group="dev"
				name="Test Switcher">{{
				intro: () => <>用于测试开关按钮。<br/>当前状态：{ switchStatus.value ? "🟢 ON" : "🛑 off" }</>,
				default: () => <><InputSwitcher modelValue={switchStatus.value} onUpdate:modelValue={bindModelResultTo(switchStatus)} /></>
			}}</SettingItem>
		</>)
	}),
	
	defineComponent(() => {
		const testValue = ref("")
		return () => (<>
			<SettingItem
				group="dev"
				name="Test Text Input">{{
				intro: () => <>用于测试文本输入框。<br/>当前状态： { testValue.value }</>,
				default: () =>
					<InputText modelValue={testValue.value} onUpdate:modelValue={bindModelResultTo(testValue)}
						password placeholder="Hello, world!" />
			}}</SettingItem>
			<SettingItem
				group="dev"
				name="Test Text Input (tsx version)">{{
				intro: () => <>用于测试 TSX 版本的文本输入框。<br/>当前状态： { testValue.value }</>,
				default: () =>
					<InputText modelValue={testValue.value} onUpdate:modelValue={bindModelResultTo(testValue)}
						password showPassword
						placeholder="Hello, world!" />
			}}</SettingItem>
		</>)
	})
	
]

export const Dev_FunctionTest: Component[] = [
	
	defineComponent(() => {
		function toastIt () {
			toast.add(gen_randomToast())
		}
		return () => (<>
			<SettingItem
				group="dev"
				name="Generate Random Toast">{{
				intro: () => <>显示一条随机样式和随机内容的吐司通知！<I i="nf-md-arrow_top_right"></I></>,
				default: () => <InputButton onClick={toastIt}>toast~</InputButton>
			}}</SettingItem>
		</>)
	}),
	
	defineComponent(() => {
		const input = ref("");
		const output = ref("...");
		function doConvert () {
			files.to_abs(input.value)
				.then(v => output.value = v)
				.catch(e => output.value = `Error: ${e}`);
		}
		return () => (<>
			<SettingItem
				group="dev"
				name="Test backend - absolutize path">{{
				intro: () => <>测试后端的将路径转换为绝对路径能力。</>,
				default: () => <>
					<InputText placeholder="/path/to/some" modelValue={input.value} onUpdate:modelValue={bindModelResultTo(input)} />
					<InputButton onClick={doConvert}>执行转换</InputButton>
					<DbgInfo>绝对路径：<DbgValue>{output.value}</DbgValue></DbgInfo>
				</>
			}}</SettingItem>
		</>)
	}),
	
	defineComponent(() => {
		function devRelaunch () {
			app.relaunch();
		}
		return () => (<>
			<SettingItem
				group="dev"
				name="Relaunch App"
			>{() => <>
				<InputButton onClick={devRelaunch}>重启！</InputButton>
			</>}</SettingItem>
		</>)
	}),
	
	defineComponent(() => {
		function devEnd () {
			webviewWindow.getCurrentWebviewWindow().close()
		}
		return () => (<>
			<SettingItem
				group="dev"
				name="End App"
			>{() => (<>
				<InputButton onClick={devEnd}>结束程序！</InputButton>
			</>)}</SettingItem>
		</>)
	}),
	
]
