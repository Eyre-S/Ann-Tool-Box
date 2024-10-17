import { Component, defineComponent, ref } from "vue";
import SettingItem from "./SettingItem.vue"
import InputText from "@/components/util/controller/InputText.vue"
import InputTextTsx from "@/components/util/controller/InputTextTsx";
import { bindModelResultTo } from "@/utils/jsx-helper";

export const lists: Component[] = [
	
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
					<InputTextTsx modelValue={testValue.value} onUpdate:modelValue={bindModelResultTo(testValue)}
						password showPassword
						placeholder="Hello, world!" />
			}}</SettingItem>
		</>)
		
	})
	
]
