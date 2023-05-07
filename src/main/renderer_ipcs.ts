import { app, ipcMain, shell } from "electron";
import data from "./data";
import user_config from "./user/user_config"

export default {
	
	init() {
		
		this.initFor_app();
		
		data.registerRendererIpcs();
		user_config.registerUserConfigIPC();
		
	},
	
	initFor_app() {
		
		ipcMain.handle('app:get-cwd', (_events) => {
			return process.cwd();
		});
		ipcMain.handle('app:get-app-path', (_events) => {
			return app.getAppPath();
		});
		ipcMain.handle('app:get-path', (_events, arg1_name) => {
			return app.getPath(arg1_name);
		});
		ipcMain.handle('app:get-version', (_events) => {
			return app.getVersion();
		})
		
		ipcMain.handle('shell:open-path', (_event, arg1_path) => {
			return shell.openPath(arg1_path);
		})
		
	}
	
}
