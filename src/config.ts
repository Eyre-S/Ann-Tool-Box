import { core } from "@tauri-apps/api";
import { Ref, computed, ref } from "vue";

class Store {
	
	private store: {[index: string]:any} = {}
	
	private storeFilePath = "./config.json"
	
	private constructor () {}
	
	public static async init (): Promise<Store> {
		const store = new Store()
		await store.syncRead();
		return store;
	}
	
	public set <T> (key: string, newValue: T): void {
		this.store[key] = newValue
		this.syncWrite()
	}
	
	public async get <T> (key: string): Promise<T> {
		return this.store[key] as T
	}
	
	public restore (key: string): void {
		this.store[key] = undefined
		this.syncWrite()
	}
	
	private async syncRead (): Promise<void> {
		await core.invoke("file_read_string", { path: this.storeFilePath }).then((result) => {
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
		await core.invoke("file_write_string", { path: this.storeFilePath, fileContent: memoryJsonString })
	}
	
}

const store: Store = await Store.init();

export class ConfigNode<T> {
	
	public readonly key: string;
	public readonly defaults: T;
	
	private readonly real_value: Ref<T|undefined>;
	private readonly real_value_on_init: Ref<T|undefined>;
	
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
		store.set(this.key, newValue);
	}
	
	public restore(): T|undefined {
		const before = this.real_value.value;
		store.restore(this.key);
		this.real_value.value = undefined;
		return before;
	}
	
	public constructor(key: string, defaults: T, init: boolean = true) {
		
		this.key = key;
		this.defaults = defaults;
		this.real_value = ref(undefined);
		this.real_value_on_init = ref(undefined);
		
		if (init) this.init();
		
	}
	
	public async init(): Promise<void> {
		const value = await store.get<T>(this.key);
		this.real_value.value = value;
		this.real_value_on_init.value = value;
	}
	
}

export const __session_config = {
	is_open: new ConfigNode<boolean>("__session_status.sidebar.is_open", false)
}

export const defaults = {
	
	ui: {
		sidebar_auto_expand: new ConfigNode<boolean>('ui.sidebar-auto-expand', true),
		use_native_frame: new ConfigNode<boolean>('ui.use-native-frame', false),
		use_custom_scrollbar: new ConfigNode<boolean>("ui.use-custom-scrollbar", true),
	},
	
	features: {
		use_preview_features: new ConfigNode<boolean>('features.use-preview-features', false),
	},
	
	dev: {
		enabled: new ConfigNode<boolean>('dev.enabled', false),
		setting_show_debug_info: new ConfigNode<boolean>('dev.setting-show-debug-info', false),
		show_session_info: new ConfigNode<boolean>("dev.show-session-info", false),
		show_test_toast: new ConfigNode<boolean>("dev.show-test-toast", false),
		open_devtools_on_launch: new ConfigNode<boolean>("dev.open_devtools_on_launch", false)
	},
	
	__session_status: {
		sidebar: {
			is_open: __session_config.is_open
		}
	}
	
}

export default defaults;
