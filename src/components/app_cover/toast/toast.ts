import { reactive } from "vue";
import { JSX } from "vue/jsx-runtime";

export interface ToastType {
	css_class?: string;
	default_icon?: string;
}

export class ToastTypes {
	
	public static readonly ERROR: ToastType = {
		css_class: "type-error",
		default_icon: "nf-fa-warning",
	}
	
	public static readonly DEV: ToastType = {
		css_class: "type-dev",
		default_icon: "nf-md-ladybug",
	}
	
	public static readonly WARN: ToastType = {
		css_class: "type-warn",
		default_icon: "nf-fa-warning",
	}
	
}

export interface ToastButton {
	icon: string;
	onclick(event: MouseEvent, current_item: Toast): void;
}

export interface ToastDefination {
	
	type?: ToastType;
	
	icon?: string;
	text: string|JSX.Element;
	
	buttons?: ToastButton[];
	checkedButton?: string|null|undefined;
	
	clearTimeout?: number;
	
}

export class Toast {
	
	type?: ToastType;
	
	icon?: string;
	text: string|JSX.Element;
	
	buttons?: ToastButton[];
	checkedButton?: string|null|undefined;
	
	clearTimeout?: number;
	timeout_timer?: number;
	
	public constructor(defination: ToastDefination) {
		
		this.type = defination.type;
		this.icon = defination.icon;
		this.text = defination.text;
		this.buttons = defination.buttons;
		this.checkedButton = defination.checkedButton;
		
		this.clearTimeout = defination.clearTimeout;
		this.timeout_set();
		
	}
	
	public remove_this () {
		list.delete(this);
	}
	
	public timeout_set (): number {
		if (this.clearTimeout !== undefined) {
			if (this.timeout_timer === undefined) {
				this.timeout_timer = setTimeout(() => { this.remove_this() }, this.clearTimeout);
				return this.clearTimeout;
			} else {
				clearTimeout(this.timeout_timer);
				this.timeout_timer = setTimeout(() => { this.remove_this() }, this.clearTimeout);
				return this.clearTimeout;
			}
		}
		return 0;
	}
	
	public timeout_stop () {
		clearTimeout(this.timeout_timer);
		this.timeout_timer = undefined;
	}
	
}

var _next: number = 0;
function cat_id (): number {
	return _next++;
}

const list: Map<Toast, number> = reactive<Map<Toast, number>>(new Map());

function add (toast: ToastDefination) {
	list.set(new Toast(toast), cat_id());
}

export default {
	
	list,
	add,
	types: ToastTypes,
	clear_timeout: {
		short: 1800,
		standard: 3000,
		long: 8000,
		never: 0
	}
	
}
