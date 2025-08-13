import PageHome from "./main/PageHome.vue"
import PageSetting from "./main/settings/PageSetting.vue"

import Page_IconSheet from "./pages/page_icon_sheet"
import Page_ArcaeaShutter from "./pages/page_arcaea_shutter";
import page_color_chooser from "./pages/page_color_chooser";
import page_test from "./pages/page_test";
import page_randomize from "./pages/page_randomize";
import page_list_comp from "./pages/page_list_comp";
import page_glyph_preview from "./pages/page_glyph_preview";

import { reactive, Ref, ref } from "vue";
import { Page } from "./pages";

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
	
	// following are stable features
	new Page(Page_IconSheet.page, 'icon-sheet', Page_IconSheet.config),
	new Page(Page_ArcaeaShutter.Page, 'arcaea-shutter', Page_ArcaeaShutter.config),
	new Page(page_list_comp.page, 'list-comp', page_list_comp.config),
	new Page(page_glyph_preview.page, 'glyph-preview', page_glyph_preview.config),
	
	// following are unstable features
	new Page(page_color_chooser.Page, 'color-chooser', page_color_chooser.config),
	new Page(page_randomize.page, 'randomize', page_randomize.config),
	page_test,
	
	// empty
	
	page_settings
	
]);

export const page_active: Ref<Page> = ref(page_home);

export function page_setActive(page: Page) {
	page_active.value = page;
}
