import { Component } from "vue";


export type VueApp = ReturnType<typeof import('vue').createApp>;

export abstract class WindowInitializer {
	
	public abstract tryInitWindow (label: string): Promise<AppWindow | null>;
	
}

export type VueAppInitializer = (app: VueApp) => Promise<void>;

export abstract class AppWindow {
	
	public constructor (
		public readonly label: string,
		public readonly name: string,
		public readonly rootComponent: Component
	) {}
	
	protected abstract getExternalInitializers (): Promise<VueAppInitializer[]>;
	
	public async vueAppInitializer (app: VueApp): Promise<void> {
		for (const callback of await this.getExternalInitializers()) {
			await callback(app);
		}
	};
	
}
