import { ipcRenderer } from "electron";

export interface ApiInterface {
	
	store: {
		
		config: {
			get: (key: string, defaults?: any) => Promise<any>;
			set: (key: string, value: any) => void;
			restore: (key: string) => void;
			// use_native_frame: boolean;
		}
		
	}
	
}

export const api: ApiInterface = {
	
	store: {
		
		config: {
			get: (key: string, defaults?: any): Promise<any> => {
				return ipcRenderer.invoke("store:config:get", key, defaults);
			},
			set: (key: string, value: any): void => {
				ipcRenderer.send('store:config:set', key, value);
			},
			restore: (key: string): void => {
				ipcRenderer.send('store:config:restore', key);
			}
		}
		
	}
	
}
