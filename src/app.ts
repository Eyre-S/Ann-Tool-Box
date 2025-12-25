import App from "@/App.vue";
import { AppConfig } from "@/app/config.ts";
import { RedeemManager } from "@/app/redeem.ts";
import { AppPageController } from "@/components/pages/page-controller.ts";
import { MainWindowPages } from "@/components/pages/pages.ts";
import { AppWindow, VueAppInitializer, WindowInitializer } from "@/window.ts";


export const MAIN_WINDOW_ID = "main";

export class MainWindowInitializer extends WindowInitializer {
	public override async tryInitWindow (label: string): Promise<AppWindow | null> {
		if (label === MAIN_WINDOW_ID) {
			return new MainWindow(label, "Ann Tool Box", App);
		} else {
			return null;
		}
	}
}

export class MainWindow extends AppWindow {
	
	protected override async getExternalInitializers (): Promise<VueAppInitializer[]> {
		return [
			AppConfig.setupForVue,
			RedeemManager.setupForVue,
			AppPageController.getVueAppInitializer(
				await MainWindowPages.initMainPage(),
				await MainWindowPages.initAdditionPageList()
			),
		];
	}
	
}
