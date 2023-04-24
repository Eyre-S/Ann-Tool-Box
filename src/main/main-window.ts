import { BrowserWindow, ipcMain, shell } from "electron";
import path from "path";
import icon from '../../resources/icon.png?asset'
import { is } from "@electron-toolkit/utils";

export interface CreateWindowOptions {
	
	windowOption?: {
		width?: number,
		height?: number,
		nativeFrame?: boolean
	}
	
	beforeCreateWindow?: (() => void);
	afterCreateWindow?: ((window: BrowserWindow) => void);
	onWindowReadyToShow?: ((window: BrowserWindow) => void);
	afterWindowShow?: ((window: BrowserWindow) => void);
	
}

export class MainWindow {
	
	private static window?: BrowserWindow = undefined;
	
	public static get(): BrowserWindow {
		if (this.window == undefined) throw new Error("Main Window have not created yet.");
		return this.window;
	}
	
	public static createMainWindow(option: CreateWindowOptions) {
		
		if (this.window != undefined) {
			throw new Error("Main Window already been created!");
		}
		
		if (option.beforeCreateWindow !== undefined) option.beforeCreateWindow();
		
		// Create the browser window.
		const mainWindow = new BrowserWindow({
			width: option.windowOption?.width,
			height: option.windowOption?.height,
			frame: option.windowOption?.nativeFrame,
			show: false,
			autoHideMenuBar: true,
			icon: icon,
			...(process.platform === 'linux' ? { icon } : {}),
			webPreferences: {
				preload: path.join(__dirname, '../preload/index.js'),
				sandbox: false
			}
		})
		
		mainWindow.on('ready-to-show', () => {
			if (option.onWindowReadyToShow !== undefined) option.onWindowReadyToShow(mainWindow);
			mainWindow.show();
			console.log(">>> Main Window Shown now.")
			if (option.afterWindowShow !== undefined) option.afterWindowShow(mainWindow);
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
		
		console.log(">>> Main Window Created.")
		this.afterWindowCreated(mainWindow);
		if (option.afterCreateWindow !== undefined) option.afterCreateWindow(mainWindow);
		
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
