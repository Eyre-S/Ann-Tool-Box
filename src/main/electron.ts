import { electronApp, optimizer } from "@electron-toolkit/utils";
import { app } from "electron";
import { AppInfo } from "./app-info";
import { MainWindow } from "./main-window";

export class ElectronApp {
	
	public static init () {
		
		app.whenReady().then(this.onAppReady);
		
		// On macOS it's common to re-create a window in the app when the
		// dock icon is clicked and there are no other windows open.
		// while... I actually do not understand this so i will place it here...
		// ----
		// app.on('activate', function () {
		// 	if (BrowserWindow.getAllWindows().length === 0) createWindow()
		// })
		
	}
	
	private static onAppReady () {
		
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
		
		MainWindow.createMainWindow();
		
	}
	
}
