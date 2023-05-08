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
	
	user_data: {
		
		openDir: () => void;
		
	}
	
	app: {
		
		getCwd (): Promise<string>;
		getAppPath (): Promise<string>;
		getPath: (name: "home" | "appData" | "userData" | "sessionData" | "temp" | "exe" | "module" | "desktop" | "documents" | "downloads" | "music" | "pictures" | "videos" | "recent" | "logs" | "crashDumps") => Promise<string>;
		getVersion (): Promise<string>;
		
	}
	
	shell: {
		
		openPath (path: string): Promise<string>;
		
	}
	
	clipboard: {
		writeText (text: string): void;
	}
	
}

export const api: ApiInterface = {
	
	app: {
		getCwd() {
			return ipcRenderer.invoke('app:get-cwd');
		},
		getAppPath() {
			return ipcRenderer.invoke('app:get-app-path');
		},
		getPath(name) {
			return ipcRenderer.invoke('app:get-path', name);
		},
		getVersion() {
			return ipcRenderer.invoke("app:get-version");
		},
	},
	
	shell: {
		openPath(path) {
			return ipcRenderer.invoke("shell:open-path", path)
		},
	},
	
	clipboard: {
		writeText(text) {
			ipcRenderer.send("clipboard:write:text", text);
		},
	},
	
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
		
	},
	
	user_data: {
		openDir() {
			ipcRenderer.send('user_data:open_dir');
		},
	}
	
}
