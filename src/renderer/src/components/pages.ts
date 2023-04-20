import { reactive, Ref, ref } from "vue";

import PageHome from "./main/PageHome.vue"
import PageSetting from "./main/settings/PageSetting.vue"

interface IPageConfigs {
	title?: string,
	icon?: string,
	isAfter?: boolean,
	isHome?: boolean
}

export class Page {

	public readonly component: typeof PageHome;
	public readonly id: string;
	public readonly config: IPageConfigs;

	public constructor(component: typeof PageHome, id: string, config: IPageConfigs) {
		this.component = component;
		this.id = id;
		this.config = config;
	}

}

const page_settings: Page = new Page(
	PageSetting, 'setting',
	{
		title: "Settings",
		icon: "nf-cod-settings_gear",
		isAfter: true
	}
);

const page_home: Page = new Page(
	PageHome, 'home',
	{
		title: "Home",
		icon: "nf-cod-home",
		isHome: true
	}
);

export const pages: Array<Page> = reactive([
	page_home,
	// empty
	page_settings
]);

export const page_active: Ref<Page> = ref(page_home);

export function page_setActive(page: Page) {
	page_active.value = page;
}
