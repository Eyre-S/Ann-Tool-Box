import toast from "@/components/app_cover/toast/toast";

export function open_syspath (path: string) {
	if (path != undefined)
		1+1
		// TODO: Native call
		// window.api.shell.openPath(path).then((value) => {
		// 	if (value.length > 0) {
		// 		toast.add({ type: toast.types.ERROR, text: `打开文件遇到问题：${value}`, clearTimeout: 8000 })
		// 	}
		// });
	else toast.add({ type: toast.types.ERROR, text: "无法打开文件：路径为空。", clearTimeout: 8000 });
}

export function clipboard_write (text: string) {
	// window.api.clipboard.writeText(text); // TODO: Native call
	toast.add({
		icon: 'nf-md-clipboard_edit',
		text: <>已复制到剪贴板: <br/><small>{text}</small></>,
		clearTimeout: toast.clear_timeout.short
	})
}
