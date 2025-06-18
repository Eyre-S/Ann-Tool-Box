import config from "./config";

export function shortcutKeyboardListener (event: KeyboardEvent): void {
	if (event.key === 'F3') {
		event.preventDefault();
		config.dev.show_f5_overlay.v.value = !config.dev.show_f5_overlay.v.value;
	}
}
