import { VueApp, VueAppInitializer } from "@/window.ts";
import { inject, InjectionKey, Ref, ref } from "vue";
import { Page } from "./page.ts";


export class AppPageController {
	
	public static readonly cxtKey = Symbol("AppPageController") as InjectionKey<AppPageController>;
	
	private readonly _pages: Page[];
	/**
	 * All registered pages in the application.
	 * 
	 * Can be used to render navigation UI. To register new pages, use {@link registerPage}
	 * method. Unregister a page is not supported yet.
	 * 
	 * The default page (or called initial page) is auto-registered in the constructor.
	 */
	public get pages (): Readonly<Page[]> { return this._pages; }
	
	/**
	 * Currently active page. It may or may not be a part of registered {@link pages}.
	 * 
	 * It is a Vue ref object, so that it can be watched to react to page changes. To modify
	 * this value, use {@link switchTo} method instead.
	 */
	public readonly currentPage: Readonly<Ref<Page>>;
	private readonly _currentPage: Ref<Page>;
	
	public constructor(initialPage: Page) {
		this._pages = [initialPage];
		this._currentPage = ref(initialPage);
		this.currentPage = this._currentPage;
	}
	
	/**
	 * Register a new page into {@link pages}.
	 * 
	 * The registered page will be at the end of the {@link pages} array.
	 * 
	 * @throws Error if a page with the same id is already registered.
	 */
	public registerPage (page: Page) {
		const thisId = page.id;
		if (this._pages.find(p => p.id === thisId)) {
			throw new Error(`Page with id '${thisId}' is already registered.`);
		}
		this._pages.push(page);
	}
	
	/**
	 * Switch {@link currentPage} to the given page.
	 * 
	 * It can be any page object, even not registered in {@link pages}, for convenience of
	 * showing hidden pages or sub-pages. But if a page id is given, it must be a registered
	 * page.
	 * 
	 * @param page A page id or a Page object to switch to. If a page id is given, it must be a
	 *             registered page. If a page object is given, any page object is accepted.
	 *             
	 * @throws Error if a page id is given but not registered.
	 */
	public switchTo (page: Page | string): void {
		if (typeof page === "string") {
			const found = this._pages.find(p => p.id === page);
			if (!found) {
				throw new Error(`Page with id '${page}' is not found in registry.`);
			}
			page = found;
		}
		this._currentPage.value = page;
	}
	
	// Initializer helpers
	
	static async setupPageController (mainPage: Page, additionPages: Page[]): Promise<AppPageController> {
		const controller = new AppPageController(mainPage);
		additionPages.forEach(page => controller.registerPage(page));
		return controller;
	}
	
	static getVueAppInitializer (mainPage: Page, additionPages: Page[]): VueAppInitializer {
		return async (app: VueApp) => {
			const controller = await AppPageController.setupPageController(mainPage, additionPages);
			app.provide(AppPageController.cxtKey, controller);
		}
	}
	
}

export function useAppPageController (): AppPageController {
	const controller = inject(AppPageController.cxtKey);
	if (!controller) {
		throw new Error("AppPageController is not provided in the current context.");
	}
	return controller;
}

export namespace MainWindowPages {
	
}
