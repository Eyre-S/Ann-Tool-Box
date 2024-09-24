import app from "./app/app";
import toast from "./components/app_cover/toast/toast";
import config from "@/config";

const reddems: Array<(credit: string) => Promise<boolean>> = [
	
	//--- test
	// "test"
	async credit => {
		if (credit == "test") {
			toast.add({
				type: toast.types.DEV,
				text: "Reddem success! a test credit for reddem.",
				clearTimeout: toast.clear_timeout.standard
			})
			return true;
		}
		return false;
	},
	
	//--- debug mode
	// "--debug@version"
	async credit => {
		if (credit == `--debug@${app.app_version}`) {
			config.dev.enabled.v.value = true;
			toast.add({
				type: toast.types.DEV,
				text: "Debug mode now enabled.",
				clearTimeout: toast.clear_timeout.standard
			});
			return true;
		}
		return false;
	}
	
]

export async function tryReddem(credit: string) {
	
	var a = 0;
	for (const i of reddems) {
		if (await i(credit)) a++;
	}
	
	if (a == 0) {
		toast.add({
			type: toast.types.ERROR,
			text: "Reddem failed. Is the credit correct?",
			clearTimeout: toast.clear_timeout.standard
		})
	}
	
}
