import { electronApp, optimizer } from "@electron-toolkit/utils";
import { app } from "electron";
import { AppInfo } from "./app-info";

export interface ElectronOnEvents {
	
	onAppReady: (() => void) | undefined;
	
}

export class ElectronApp {
	
	public static init (callback: ElectronOnEvents) {
		
		app.whenReady().then(() => this.onAppReady(callback));
		
		// On macOS it's common to re-create a window in the app when the
		// dock icon is clicked and there are no other windows open.
		// while... I actually do not understand this so i will place it here...
		// ----
		// app.on('activate', function () {
		// 	if (BrowserWindow.getAllWindows().length === 0) createWindow()
		// })
		
	}
	
	private static onAppReady (callback: ElectronOnEvents) {
		
		electronApp.setAppUserModelId(AppInfo.app_windows_id);
		
		app.on('browser-window-created', (_, window) => {
			optimizer.watchWindowShortcuts(window)
		});
		
		// setup close app if all window have closed.
		app.on('window-all-closed', () => {
			if (process.platform !== 'darwin') {
				app.quit()
			}
		});
		
		console.log(">>> Electron App now ready.")
		
		if (callback.onAppReady !== undefined) callback.onAppReady();
		
	}
	
}
