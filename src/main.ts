import { MainWindowInitializer } from "@/app.ts";
import { ArcaeaShutterScreenWindowInitializer } from "@/sub_app/arcaea-shutter-screen/shutter-screen.ts";
import { VueApp, WindowInitializer } from "@/window.ts";
import { createApp } from 'vue'
import { webview } from '@tauri-apps/api';

async function main () {
	
	const currentWindow = webview.getCurrentWebview();
	const windowInitializers: WindowInitializer[] = [
		new MainWindowInitializer(),
		new ArcaeaShutterScreenWindowInitializer(),
	]
	
	let app: VueApp | null = null;
	for (const initializer of windowInitializers) {
		const window = await initializer.tryInitWindow(currentWindow.label);
		if (window) {
			console.log(`Initializing window ${currentWindow.label} as ${window.name}['${window.label}']`);
			if (window.label !== currentWindow.label) {
				throw new Error(`Window label mismatch: expected '${currentWindow.label}', got '${window.label}'`);
			}
			const thisApp = createApp(window.rootComponent);
			await window.vueAppInitializer(thisApp)
			thisApp.mount('#app');
			app = thisApp;
			console.log(`Mounted ${window.name} app.`);
			break;
		}
	}
	
	if (!app) {
		throw new Error(`No window initializer found for window label '${currentWindow.label}'`);
	}
	
}

await main();
