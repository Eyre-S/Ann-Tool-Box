import { VueAppInitializer } from "@/window.ts";
import { core } from "@tauri-apps/api";
import { join } from "@tauri-apps/api/path";
import { Ref, computed, ref, inject, InjectionKey } from "vue";

export class ConfigStore {
	
	public static readonly cxtKey = Symbol("ConfigStore") as InjectionKey<ConfigStore>;
	
	public constructor (
		public readonly path: string
	) {}
	
	public static async getFromBackend (): Promise<ConfigStore> {
		const backendPath = await core.invoke<string>("get_config_store");
		return new ConfigStore(
			backendPath
		)
	}
	
	public getPath(): string {
		return this.path;
	}
	
	public async configFile(): Promise<string> {
		return join(this.path, "config.json");
	}
	
}

export class ConfigManager {
	
	public static readonly cxtKey = Symbol("ConfigManager") as InjectionKey<ConfigManager>;
	
	private store: {[index: string]:any} = {}
	
	private constructor (
		public readonly storeFile: string
	) {}
	
	public static async init (store: ConfigStore): Promise<ConfigManager> {
		const self = new ConfigManager(await store.configFile())
		await self.syncRead();
		return self;
	}
	
	public async set <T> (key: string, newValue: T): Promise<void> {
		this.store[key] = newValue
		await this.syncWrite()
	}
	
	public async get <T> (key: string): Promise<T> {
		return this.store[key] as T
	}
	
	public async restore (key: string): Promise<void> {
		this.store[key] = undefined
		await this.syncWrite()
	}
	
	private async syncRead (): Promise<void> {
		await core.invoke("file_read_string", { path: this.storeFile }).then((result) => {
			console.log("read config file content:", result)
			const fileJsonString: string = result as string;
			this.store = JSON.parse(fileJsonString)
		}).catch((e) => {
			console.log("error reading config file", e)
			console.log("not read config file, using default config")
			this.store = {}
		})
	}
	
	private async syncWrite (): Promise<void> {
		const memoryJsonString: string = JSON.stringify(this.store, undefined, "	");
		console.log("writing config: ", memoryJsonString)
		await core.invoke("file_write_string", { path: this.storeFile, fileContent: memoryJsonString })
	}
	
	// ConfigNode factory
	public async config <T> (key: string, defaults: T, init: boolean = true): Promise<ConfigNode<T>> {
		return ConfigNode.config<T>(this, key, defaults, init);
	}
	
}

export class ConfigNode<T> {
	
	private constructor (
		public readonly manager: ConfigManager,
		public readonly key: string,
		public readonly defaults: T,
		private readonly real_value: Ref<T|undefined>,
		private readonly real_value_on_init: Ref<T|undefined>
	) {}
	
	public static async config <T> (manager: ConfigManager, key: string, defaults: T, init: boolean = true): Promise<ConfigNode<T>> {
		const self = new ConfigNode<T>(
			manager,
			key, defaults,
			ref(undefined), ref(undefined)
		)
		if (init) await self.init();
		return self;
	}
	
	public readonly v = computed<T>({
		get: () => { return this.real_value.value === undefined ? this.defaults : this.real_value.value; },
		set: (value) => {
			this.real_value.value = value;
			this.modify(value);
		}
	})
	
	public readonly v_locked = computed<T>(() => {
		return this.real_value_on_init.value === undefined ? this.defaults : this.real_value_on_init.value;
	})
	
	public readonly is_modified = computed<boolean>(() => {
		return this.real_value.value !== undefined;
	})
	
	public readonly is_modified_after_load = computed<boolean>(() => {
		return this.v.value !== this.v_locked.value;
	})
	
	public modify(newValue: T): void {
		this.manager.set(this.key, newValue);
	}
	
	public restore(): T|undefined {
		const before = this.real_value.value;
		this.manager.restore(this.key);
		this.real_value.value = undefined;
		return before;
	}
	
	public async init(): Promise<void> {
		const value = await this.manager.get<T>(this.key);
		this.real_value.value = value;
		this.real_value_on_init.value = value;
	}
	
}

export type AppConfig = Awaited<ReturnType<typeof AppConfig.setup>>;
export namespace AppConfig {
	
	export const cxtKey = Symbol("AppConfig") as InjectionKey<AppConfig>;
	
	export async function setup (manager: ConfigManager) {
		return {
			
			ui: {
				sidebar_auto_expand: await manager.config<boolean>('ui.sidebar-auto-expand', true),
				use_native_frame: await manager.config<boolean>('ui.use-native-frame', false),
				use_custom_scrollbar: await manager.config<boolean>("ui.use-custom-scrollbar", true),
			},
			
			features: {
				use_preview_features: await manager.config<boolean>('features.use-preview-features', false),
			},
			
			dev: {
				enabled: await manager.config<boolean>('dev.enabled', false),
				show_f5_overlay: await manager.config<boolean>('dev.show-f5-overlay', false),
				setting_show_debug_info: await manager.config<boolean>('dev.setting-show-debug-info', false),
				show_session_info: await manager.config<boolean>("dev.show-session-info", false),
				show_test_toast: await manager.config<boolean>("dev.show-test-toast", false),
				open_devtools_on_launch: await manager.config<boolean>("dev.open_devtools_on_launch", false)
			},
			
			__session_status: {
				sidebar: {
					is_open: await manager.config<boolean>("__session_status.sidebar.is_open", false)
				}
			}
			
		}
	}
	
	export const setupForVue: VueAppInitializer = async (app) => {
		const store = await ConfigStore.getFromBackend();
		const configManager = await ConfigManager.init(store);
		const configs = await AppConfig.setup(configManager);
		app.provide(AppConfig.cxtKey, configs);
		app.provide(ConfigStore.cxtKey, store);
		app.provide(ConfigManager.cxtKey, configManager);
	}
	
}

/**
 * Get the app config instance in the current Vue component context.
 * @throws Error if the AppConfig is not provided in the current context.
 */
export function useAppConfig (): AppConfig {
	const config = inject(AppConfig.cxtKey);
	if (config === undefined) {
		throw new Error("AppConfig is not provided under this window!");
	}
	return config;
}
