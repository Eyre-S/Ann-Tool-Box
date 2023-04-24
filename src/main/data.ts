import { is } from "@electron-toolkit/utils";
import path from "path";

const user_data_path = is.dev ? path.join(process.cwd(), "user_data") : path.join(__dirname, "user_data");

console.log(`[AnnToolBox] user data path is "${user_data_path}"`)

export default {
	
	user_data_path
	
}
