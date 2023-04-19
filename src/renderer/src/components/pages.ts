import { reactive, Ref, ref } from "vue";

import PageAbout from "./main/about/PageAbout.vue";
import PageHome from "./main/PageHome.vue"

interface IPageConfigs {
	title?: string,
	icon?: string,
	isAfter?: boolean
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
	PageAbout, 'setting',
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
		icon: "nf-cod-home"
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
