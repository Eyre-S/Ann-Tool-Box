import { useAppConfig } from "@/app/config.ts";
import { Component, markRaw } from "vue";

export interface IPageConfigs {
	title: string,
	icon: string,
	debugOnly?: boolean,
	isAfter?: boolean,
	isHome?: boolean,
	isPreview?: boolean,
}

export interface IPageDefinition {
	page: Component,
	config: IPageConfigs
}

export function defineAppPage (page: IPageDefinition): Page {
	return new Page(page.page, page.config.title, page.config);
}

export class Page {
	
	public readonly component: Component;
	public readonly id: string;
	public readonly config: IPageConfigs;
	
	public constructor(component: Component, id: string, config: IPageConfigs) {
		this.component = markRaw(component);
		this.id = id;
		this.config = config;
	}
	
	public isShow (isInAfter: boolean): boolean {
		const config = useAppConfig();
		if (this.config.debugOnly && !config.dev.enabled.v.value) return false;
		if (this.config.isPreview && !config.features.use_preview_features.v.value) return false;
		if (this.config.isAfter) return isInAfter;
		else return !isInAfter;
	}

}
