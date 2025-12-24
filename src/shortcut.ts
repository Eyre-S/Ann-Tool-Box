import { useAppConfig } from "@/app/config.ts";

export function shortcutKeyboardListener (event: KeyboardEvent): void {
	if (event.key === 'F3') {
		event.preventDefault();
		const config = useAppConfig();
		config.dev.show_f5_overlay.v.value = !config.dev.show_f5_overlay.v.value;
	}
}
