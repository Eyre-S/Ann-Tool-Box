import { reactive } from "vue";

export interface ToastType {
	css_class?: string;
	default_icon?: string;
}

const type_ERROR: ToastType = {
	css_class: "type-error",
	default_icon: "nf-fa-warning",
}

export const ToastTypes = {
	ERROR: type_ERROR
}

export interface ToastButton {
	icon: string;
	onclick(event: MouseEvent, current_item: Toast): void;
}

export interface ToastDefination {
	
	type?: ToastType;
	
	icon?: string;
	text: string;
	
	buttons?: ToastButton[];
	checkedButton?: string|null|undefined;
	
	
}

export class Toast {
	
	type?: ToastType;
	
	icon?: string;
	text: string;
	
	buttons?: ToastButton[];
	checkedButton?: string|null|undefined;
	
	public constructor(defination: ToastDefination) {
		
		this.type = defination.type;
		this.icon = defination.icon;
		this.text = defination.text;
		this.buttons = defination.buttons;
		this.checkedButton = defination.checkedButton;
		
		// setTimeout(() => { this.remove_this(); }, 8000);
		
	}
	
	public remove_this () {
		list.delete(this);
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
	types: ToastTypes
	
}
