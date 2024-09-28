import { core } from "@tauri-apps/api";
import toast from "@/components/app_cover/toast/toast";
import messages from "./messages";

export function open_in_file_manager (path: string) {
	if (path != undefined && path != null && path.length > 0)
		core.invoke("show_in_folder", { path: path }).then(() => {
			toast.add({ text: messages.filesystem.open_in_file_manager.success(), clearTimeout: toast.clear_timeout.standard });
		}).catch((e) => {
			toast.add({
				type: toast.types.ERROR,
				text: messages.filesystem.open_in_file_manager.error.unknown(e),
				clearTimeout: toast.clear_timeout.long
			});
			console.error("Failed to open from explorer:");
			console.error(e);
		})
	else toast.add({ type: toast.types.ERROR, clearTimeout: toast.clear_timeout.long, text: messages.filesystem.open_in_file_manager.error.empty_path() });
}

export async function to_abs (path: string): Promise<string> {
	return await core.invoke("get_abs_path", { path: path })
}

export function file_write_string (file_path: string, data: string): Promise<void> {
	return core.invoke("file_write_string", { path: file_path, fileContent: data })
}

export function file_read_string (file_path: string): Promise<string> {
	return core.invoke("file_read_string", { path: file_path })
}

export default {
	open_in_file_manager,
	file_write_string,
	file_read_string,
	to_abs
}
