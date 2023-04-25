import { is } from "@electron-toolkit/utils";
import { ElectronApp } from "./electron";
import { MainWindow } from "./main-window";
import { user_config } from "./user/user_config";
import renderer_ipcs from "./renderer_ipcs";

ElectronApp.init({
	
	onAppReady: () => {
		
		var use_native_frame = user_config.get('ui.use-native-frame');
		MainWindow.createMainWindow({
			
			windowOption: {
				width: 950,
				height: 560,
				nativeFrame: typeof use_native_frame == 'boolean' ? use_native_frame : undefined
			},
			
			afterCreateWindow: () => {
				
				renderer_ipcs.init();
				
			},
			
			afterWindowShow(window) {
				if (is.dev) window.webContents.openDevTools();
			}
			
		});
		
	}
	
});
