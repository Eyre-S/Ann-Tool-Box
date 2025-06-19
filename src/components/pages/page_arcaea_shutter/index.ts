import { TauriEvent } from "@/utils/tauri-helper";
import Page_ArcaeaShutter from "./Page_ArcaeaShutter.vue";
import { ShutterScreenSyncData } from "@/sub_app/arcaea-shutter-screen/shutter-screen";

export default {
	
	Page: Page_ArcaeaShutter,
	
	config: {
		title: "Arcaea Shutter Demo",
		icon: "nf-md-cards_diamond_outline"
	}
	
}

export const arcaeaShutterController = {
	event: {
		dataSync: new TauriEvent<ShutterScreenSyncData>('main', 'arcaea-shutter-screen:data-sync')
	}
}
