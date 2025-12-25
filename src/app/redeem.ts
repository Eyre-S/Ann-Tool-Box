import { AppConfig, useAppConfig } from "@/app/config.ts";
import { VueAppInitializer } from "@/window.ts";
import { inject, InjectionKey } from "vue";
import app from "./app";
import toast from "../components/app_cover/toast/toast";


export class RedeemManager {
	
	public static readonly cxtKey = Symbol("RedeemManager") as InjectionKey<RedeemManager>
	
	private redeemItems: RedeemItem<any, any>[] = [
		new RedeemItemTest(),
		new RedeemItemDebugMode()
	];
	
	public async redeem (credit: string): Promise<void> {
		for (const item of this.redeemItems) {
			if (await item.tryRedeem(credit)) return;
		}
		toast.add({
			type: toast.types.ERROR,
			text: "Redeem failed. Is the credit correct?",
			clearTimeout: toast.clear_timeout.standard
		});
	}
	
	public static readonly setupForVue: VueAppInitializer = async (app) => {
		const redeemManager = new RedeemManager();
		app.provide(RedeemManager.cxtKey, redeemManager);
	}
	
}

export abstract class RedeemItem<CC, CA> {
	
	public static readonly RedeemFail = Symbol("RedeemFail");
	public static readonly RedeemUnavailable = Symbol("RedeemUnavailable");
	
	/**
	 * Check credit.
	 *
	 * If credit is valid, return data needed for onSuccess.
	 *
	 * If credit is invalid, return RedeemItem.RedeemFail.
	 * 
	 * @param credit The credit that user inputted.
	 */
	protected abstract checkCredit (credit: string): Promise<CC | typeof RedeemItem.RedeemFail>;
	
	/**
	 * Check availability of this redeem item.
	 * 
	 * If return false, the redeem process will be aborted.
	 * 
	 * @param data The data that checkCredit method spawns.
	 */
	protected abstract checkAvailability (data: CC): Promise<CA | typeof RedeemItem.RedeemUnavailable>
	
	/**
	 * On success callback.
	 *
	 * Return a message to show to user that redeem is succeed.
	 *
	 * If any side effects needed, do it here.
	 * 
	 * @param checkedCredit The data that checkCredit method spawns.
	 * @param checkedAvailability The data that checkAvailability method spawns.
	 */
	protected abstract onSuccess (checkedCredit: CC, checkedAvailability: CA): Promise<string>;
	
	public async tryRedeem (credit: string): Promise<boolean> {
		const credited = await this.checkCredit(credit);
		if (credited === RedeemItem.RedeemFail) return false;
		const availability = await this.checkAvailability(credited);
		if (availability === RedeemItem.RedeemUnavailable) return false;
		const msg = await this.onSuccess(credited, availability);
		toast.add({
			type: toast.types.DEV,
			text: msg,
			clearTimeout: toast.clear_timeout.standard
		});
		return true;
	}
	
}

export class RedeemItemTest extends RedeemItem<null, null> {
	
	protected async checkCredit (credit: string): Promise<null | typeof RedeemItem.RedeemFail> {
		if (credit == "test") {
			return null;
		}
		return RedeemItem.RedeemFail;
	}
	
	protected async checkAvailability (): Promise<null | typeof RedeemItem.RedeemUnavailable> { return null; }
	
	protected async onSuccess (): Promise<string> {
		return "Redeem success! a test credit for redeem.";
	}
	
}

export class RedeemItemDebugMode extends RedeemItem<{}, AppConfig> {
	
	protected async checkCredit (credit: string): Promise<{} | typeof RedeemItem.RedeemFail> {
		if (credit == `--debug@${app.app_version}`) {
			return {};
		}
		return RedeemItem.RedeemFail;
	}
	
	protected async checkAvailability (_: {}): Promise<AppConfig & {} | typeof RedeemItem.RedeemUnavailable> {
		try {   
			return useAppConfig();
		} catch (error) {
			toast.add({
				type: toast.types.ERROR,
				text: "Cannot enable debug mode: Seems that the app config is not available?",
				clearTimeout: toast.clear_timeout.standard
			})
			return RedeemItem.RedeemUnavailable;
		}
	}
	
	protected async onSuccess (_: {}, config: AppConfig): Promise<string> {
		config.dev.enabled.v.value = true;
		return "Debug mode now enabled.";
	}
	
}

export function useRedeemManager (): RedeemManager {
	const self =  inject(RedeemManager.cxtKey);
	if (!self) throw new Error("RedeemManager is not provided under current window.");
	return self;
}
