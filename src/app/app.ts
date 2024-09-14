import { app } from "@tauri-apps/api";

export const app_version = await app.getVersion();
export const app_tauri_version = await app.getTauriVersion();

export default {
	app_tauri_version: app_tauri_version,
	app_version: app_version
}
