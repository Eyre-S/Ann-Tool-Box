import toast from "@/components/app_cover/toast/toast";
import { app, core } from "@tauri-apps/api";

export const app_version = await app.getVersion();
export const app_tauri_version = await app.getTauriVersion();

export async function open_devtools (): Promise<void> {
	core.invoke("open_devtools");
}

export function set_devtools (enabled: boolean, window?: string): Promise<void> {
	return core.invoke("set_devtools", { label: window, enable: enabled });
}

export async function relaunch (): Promise<void> {
	return core.invoke("relaunch");
	// toast.add({
	// 	type: toast.types.WARN,
	// 	text: "Relaunch is not implemented yet in Tauri version's app.",
	// 	clearTimeout: toast.clear_timeout.standard
	// })
}

export default {
	
	app_tauri_version,
	app_version,
	
	open_devtools,
	relaunch,
	
}
