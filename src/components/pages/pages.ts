import PageHome from "@/components/main/PageHome.vue";
import PageSetting from "@/components/main/settings/PageSetting.vue";
import { defineAppPage, Page } from "@/components/pages/page.ts";
import page_arcaea_shutter from "@/components/pages/page_arcaea_shutter";
import page_color_chooser from "@/components/pages/page_color_chooser";
import page_glyph_preview from "@/components/pages/page_glyph_preview";
import page_icon_sheet from "@/components/pages/page_icon_sheet";
import page_list_comp from "@/components/pages/page_list_comp";
import page_randomize from "@/components/pages/page_randomize";
import page_test from "@/components/pages/page_test";


export namespace MainWindowPages {
	
	export async function initMainPage (): Promise<Page> {
		return defineAppPage({
			page: PageHome,
			id: 'home',
			config: {
				title: "Home",
				icon: "nf-cod-home",
				isHome: true
			}
		})
	}
	
	export async function initAdditionPageList (): Promise<Page[]> {
		
		return [
			
			page_icon_sheet,
			page_arcaea_shutter,
			page_list_comp,
			page_glyph_preview,
			
			page_color_chooser,
			page_randomize,
			page_test,
			
			defineAppPage({
				page: PageSetting,
				id: 'setting',
				config: {
					title: "Settings",
					icon: "nf-cod-settings_gear",
					isAfter: true
				}
			})
		
		]
		
	}
	
}
