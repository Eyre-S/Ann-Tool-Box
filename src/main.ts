import { AppConfig, ConfigManager, ConfigStore } from "@/app/config.ts";
import { RedeemManager } from "@/app/reddem.ts";
import { Component, createApp } from 'vue'
import MainApp from './App.vue'
import ArcaeaShutterScreen from './sub_app/arcaea-shutter-screen/App.vue';
import { webview } from '@tauri-apps/api';

async function main () {
	switch (webview.getCurrentWebview().label) {
		case 'arcaea-shutter-screen':
			await initWindow('Arcaea Shutter Screen', ArcaeaShutterScreen);
			break;
		case 'main':
			await initWindow('Main', MainApp, async (app) => {
				
				// Initialize App global state managers
				const store = await ConfigStore.getFromBackend();
				const configManager = await ConfigManager.init(store);
				const configs = await AppConfig.setup(configManager);
				app.provide(AppConfig.cxtKey, configs);
				app.provide(ConfigStore.cxtKey, store);
				app.provide(ConfigManager.cxtKey, configManager);
				
				// Initialize App Redeem Manager
				const redeemManager = new RedeemManager();
				app.provide(RedeemManager.cxtKey, redeemManager);
				
			});
			break;
		default:
			throw new Error(`Unknown webview label: ${webview.getCurrentWebview().label}`);
	}
}

async function initWindow (
	name: string, rootComponent: Component,
	setupFn: (app: ReturnType<typeof createApp>) => Promise<void> = async () => {}
) {
	const app = createApp(rootComponent);
	await setupFn(app);
	app.mount('#app');
	console.log(`Mounted ${name} app.`);
}

await main();
