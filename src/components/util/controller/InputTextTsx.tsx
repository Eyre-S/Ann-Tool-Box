import { computed, defineComponent, ref, useModel } from "vue";

import css from "./InputTextTsx.module.less"
import { is, iss } from "@/utils/fp";
import { bindInputResultTo } from "@/utils/jsx-helper";

export default defineComponent({
	
	props: {
		
		disabled: Boolean,
		placeholder: String,
		
		password: Boolean,
		showPassword: Boolean,
		
		maxLength: Number,
		minLength: Number,
		pattern: RegExp,
		
		modelValue: String,
		
	},
	
	emits: {
		'update:modelValue': (_: string): boolean => true
	},
	
	setup: (props) => {
		
		const value = useModel(props, 'modelValue')
		
		const showPassword = ref<boolean>(props.showPassword??false);
		function toggleShowPassword () {
			showPassword.value = !showPassword.value;
		}
		
		const labelType = computed<'text'|'password'>(() => {
			return (props.password && !showPassword.value) ? 'password' : 'text'
		})
		
		return () => (<div class={[css.input, css.text, is(props.password, css.password), is(showPassword.value, css.showPassword)]}>
			
			<input
				type={labelType.value} value={value.value} onInput={bindInputResultTo(value)}
				disabled={props.disabled} placeholder={props.placeholder}
				pattern={props.pattern?.source} minlength={props.minLength} maxlength={props.maxLength}
			></input>
			
			{iss(!props.password,
				<div class={[css.marker]}></div>,
				<div class={[css.marker, css.password]} onClick={toggleShowPassword}>
					<div class={[css.showPassword, is(showPassword.value, css.on)]}></div>
				</div>
			)}
			
		</div>);
		
	}
})
