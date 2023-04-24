import { reactive, watch } from "vue";

const store = window.api.store.config;

export class config_names {
	
	public static readonly use_native_frame = 'ui.use-native-frame';
	
}

export const defaults = reactive({
	
	ui: {
		use_native_frame: false,
		use_native_frame_locked: false
	}
	
});

export default defaults;

store.get(config_names.use_native_frame).then((value) => {
	defaults.ui.use_native_frame = value;
	defaults.ui.use_native_frame_locked = value;
});
watch(() => defaults.ui.use_native_frame, (newValue) => {
	store.set(config_names.use_native_frame, newValue);
});
