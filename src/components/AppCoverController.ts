
import { Ref, ref } from "vue";

export class AppCoverController {
	
	public static readonly show: Ref<boolean> = ref(false);
	private static itemCallback?: Function = undefined;
	
	public static setup(callback?: Function): void {
		this.show.value = true;
		this.itemCallback = callback;
	}
	
	public static appCoverClose(): void {
		this.show.value = false;
		if (this.itemCallback != undefined) {
			this.itemCallback()
			this.itemCallback = undefined;
		}
	}
	
	public static itemClosed(): void {
		this.show.value = false;
		this.itemCallback = undefined;
	}
	
}
