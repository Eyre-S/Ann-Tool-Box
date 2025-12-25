import { ShutterTheme } from "@/components/pages/page_arcaea_shutter/ArcaeaShutterBox.vue";
import App from "@/sub_app/arcaea-shutter-screen/App.vue";
import { TauriEvent } from "@/utils/tauri-helper";
import { AppWindow, VueAppInitializer, WindowInitializer } from "@/window.ts";

export const SHUTTER_SCREEN_ID = "arcaea-shutter-screen";

export class ArcaeaShutterScreenWindowInitializer extends WindowInitializer {
	public override async tryInitWindow (label: string): Promise<AppWindow | null> {
		if (label === SHUTTER_SCREEN_ID) {
			return new ArcaeaShutterScreenWindow(label, "Arcaea Shutter Screen", App);
		} else {
			return null;
		}
	}
}

export class ArcaeaShutterScreenWindow extends AppWindow {
	protected override async getExternalInitializers (): Promise<VueAppInitializer[]> { return []; }
}

export interface ShutterScreenSyncData {
	
	/** The window size of the shutter screen, in px. */
	window: {
		width: number;
		height: number;
	}
	
	// shutter_status: {
	// 	theme: ShutterTheme
	// }
	
}

export interface ShutterScreenControlData {
	
	theme: ShutterTheme;
	
}

export default {
	
	event: {
		
		openShutter: new TauriEvent<undefined>(SHUTTER_SCREEN_ID, 'open-shutter'),
		closeShutter: new TauriEvent<undefined>(SHUTTER_SCREEN_ID, 'close-shutter'),
		setShutterTimeout: new TauriEvent<{ timeout: number }>(SHUTTER_SCREEN_ID, 'set-shutter-timeout'),
		
		syncData: new TauriEvent<ShutterScreenControlData>(SHUTTER_SCREEN_ID, 'sync-data')
		
	}
	
}
