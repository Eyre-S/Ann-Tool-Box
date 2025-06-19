import { createApp } from 'vue'
import App from './App.vue'
import ArcaeaShutterScreen from './sub_app/arcaea-shutter-screen/App.vue';
import { webview } from '@tauri-apps/api';

if (webview.getCurrentWebview().label === 'arcaea-shutter-screen') {
	createApp(ArcaeaShutterScreen).mount('#app')
	console.log('Mounted Arcaea Shutter Screen app');
} else {
	createApp(App).mount('#app')
	console.log('Mounted main app');
}
