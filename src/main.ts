import { createApp } from 'vue'
import App from './App.vue'
import ArcaeaShutterScreen from './sub_app/arcaea-shutter-screen/App.vue';
import { webview } from '@tauri-apps/api';

if (webview.getCurrentWebview().label === 'arcaea-shutter-screen') {
	const app = createApp(ArcaeaShutterScreen);
	app.mount('#app')
	console.log('Mounted Arcaea Shutter Screen app');
} else {
	const app = createApp(App);
	app.mount('#app');
	console.log('Mounted main app');
}
