import { ipcRenderer } from "electron";

export interface ApiInterface {
	
	store: {
		
		config: {
			get: (key: string, defaults?: any) => Promise<any>;
			set: (key: string, value: any) => void;
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
			// use_native_frame: false
		}
		
	}
	
}
