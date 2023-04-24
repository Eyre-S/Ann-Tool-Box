import Store from 'electron-store';
import data from "../data";
import { ipcMain } from 'electron';

const user_config = new Store({
	
	name: 'config',
	cwd: data.user_data_path,
	
	clearInvalidConfig: false,
	accessPropertiesByDotNotation: false
	
});

export default {
	
	user_config,
	
	registerUserConfigIPC: () => {
		
		ipcMain.on('store:config:set', (_event, arg1_key, arg2_value) => {
			user_config.set(arg1_key, arg2_value);
		})
		ipcMain.handle('store:config:get', (_event, arg1_key, arg2_defaults) => {
			if (arg2_defaults === undefined) return user_config.get(arg1_key);
			else return user_config.get(arg1_key, arg2_defaults);
		})
		ipcMain.on('store:config:restore', (_event, arg1_key) => {
			user_config.delete(arg1_key);
		})
		
	}
	
}
