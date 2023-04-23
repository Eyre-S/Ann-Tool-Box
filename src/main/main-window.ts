import { BrowserWindow, ipcMain, shell } from "electron";
import path from "path";
import icon from '../../resources/icon.png?asset'
import { is } from "@electron-toolkit/utils";

export class MainWindow {
	
	private static window?: BrowserWindow = undefined;
	
	public static get(): BrowserWindow {
		if (this.window == undefined) throw new Error("Main Window have not created yet.");
		return this.window;
	}
	
	public static createMainWindow() {
		
		if (this.window != undefined) {
			throw new Error("Main Window already been created!");
		}
		
		// Create the browser window.
		const mainWindow = new BrowserWindow({
			width: 950,
			height: 560,
			frame: false,
			show: false,
			autoHideMenuBar: true,
			icon: icon,
			...(process.platform === 'linux' ? { icon } : {}),
			webPreferences: {
				preload: path.join(__dirname, '../preload/index.js'),
				sandbox: false
			}
		})
		
		this.afterWindowCreated(mainWindow);
		
		mainWindow.on('ready-to-show', () => {
			mainWindow.show();
		})
		
		mainWindow.webContents.setWindowOpenHandler((details) => {
			shell.openExternal(details.url)
			return { action: 'deny' }
		})
		
		// HMR for renderer base on electron-vite cli.
		// Load the remote URL for development or the local html file for production.
		if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
			mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
		} else {
			mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'))
		}
		
		this.window = mainWindow;
		
	}
	
	private static afterWindowCreated (window: BrowserWindow) {
		
		ipcMain.on('window-min', () => {
			window.minimize()
		})
		
		ipcMain.on('window-max', () => {
			if (window.isMaximized()) {
				window.restore()
			} else {
				window.maximize()
			}
		})
		
		ipcMain.on('window-exit', () => {
			window.close()
		})
		
		ipcMain.on('call-dev-tools', () => {
			window.webContents.openDevTools()
		})
		
	}
	
}
