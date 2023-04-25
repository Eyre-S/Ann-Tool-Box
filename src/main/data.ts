import { is } from "@electron-toolkit/utils";
import { app, ipcMain, shell } from "electron";
import path from "path";

const user_data_path = is.dev ? path.join(process.cwd(), "user_data") : path.join(app.getPath("userData"), "user_data");

console.log(`[AnnToolBox] user data path is "${user_data_path}"`)

export default {
	
	user_data_path,
	
	registerRendererIpcs() {
		
		ipcMain.on('user_data:open_dir', () => {
			shell.openPath(user_data_path);
		})
		
	}
	
}
