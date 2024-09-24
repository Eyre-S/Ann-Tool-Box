import toast from "@/components/app_cover/toast/toast";
import { core } from "@tauri-apps/api";

export function open_syspath (path: string) {
	if (path != undefined)
		core.invoke("show_in_folder", { path: path }).then(() => {
			toast.add({ text: "已在文件管理器中打开。", clearTimeout: 8000 });
		}).catch((e) => {
			toast.add({ type: toast.types.ERROR, text: "无法在文件管理器中打开：未知后端错误。", clearTimeout: 8000 });
			console.error("Failed to open from explorer:");
			console.error(e);
		})
	else toast.add({ type: toast.types.ERROR, text: "无法打开文件：路径为空。", clearTimeout: 8000 });
}
