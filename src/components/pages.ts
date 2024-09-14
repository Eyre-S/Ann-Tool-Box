import { markRaw, reactive, Ref, ref } from "vue";
import config from '../config';

import PageHome from "./main/PageHome.vue"
import PageSetting from "./main/settings/PageSetting.vue"

import Page_IconSheet from "./pages/page_icon_sheet"
import Page_ArcaeaShutter from "./pages/page_arcaea_shutter";
import page_color_chooser from "./pages/page_color_chooser";
import page_test from "./pages/page_test";
import page_randomize from "./pages/page_randomize";
import page_list_comp from "./pages/page_list_comp";

interface IPageConfigs {
	title: string,
	icon: string,
	debugOnly?: boolean,
	isAfter?: boolean,
	isHome?: boolean,
	isPreview?: boolean,
}

export class Page {

	public readonly component: typeof PageHome;
	public readonly id: string;
	public readonly config: IPageConfigs;

	public constructor(component: typeof PageHome, id: string, config: IPageConfigs) {
		this.component = markRaw(component);
		this.id = id;
		this.config = config;
	}
	
	public isShow (isInAfter: boolean): boolean {
		if (this.config.debugOnly && !config.dev.enabled.v.value) return false;
		if (this.config.isPreview && !config.features.use_preview_features.v.value) return false;
		if (this.config.isAfter) return isInAfter;
		else return !isInAfter;
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
	
	new Page(Page_IconSheet.page, 'icon-sheet', Page_IconSheet.config),
	new Page(Page_ArcaeaShutter.Page, 'arcaea-shutter', Page_ArcaeaShutter.config),
	new Page(page_list_comp.page, 'list-comp', page_list_comp.config),
	new Page(page_color_chooser.Page, 'color-chooser', page_color_chooser.config),
	new Page(page_randomize.page, 'randomize', page_randomize.config),
	new Page(page_test.page, 'tests', page_test.config),
	
	// empty
	
	page_settings
	
]);

export const page_active: Ref<Page> = ref(page_home);

export function page_setActive(page: Page) {
	page_active.value = page;
}
