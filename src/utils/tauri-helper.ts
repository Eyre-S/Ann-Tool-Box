import { event, window } from "@tauri-apps/api";


export class TauriEvent <T> {
	
	public readonly windowName: string;
	public readonly name: string;
	
	public constructor (windowId: string, name: string) {
		this.windowName = windowId;
		this.name = name;
	}
	
	public emit (payload: T) {
		window.getCurrentWindow().emitTo(this.windowName, this.name, payload)
	}
	
	public setListen (callback: event.EventCallback<T>, options?: event.Options): Promise<event.UnlistenFn> {
		return event.listen(this.name, callback, options)
	}
	
}
