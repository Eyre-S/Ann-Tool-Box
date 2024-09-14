import toast from "@/components/app_cover/toast/toast";
import { writeHtml, writeImage, writeText, clear, readText, readImage } from "@tauri-apps/plugin-clipboard-manager";
import messages from "./messages";

export default {
	writeText, readText, writeHtml, clear, readImage, writeImage,
	write
}

export function write (text: string) {
	writeText(text);
	toast.add({
		icon: 'nf-md-clipboard_edit',
		text: messages.writeClipboardMessage(text),
		clearTimeout: toast.clear_timeout.short
	})
}
