import { defineAppPage } from "../page.ts";
import Page_Test from "./Page_List_Comp.vue";

export default defineAppPage({
	
	page: Page_Test,
	
	config: {
		title: "List Compare",
		icon: 'nf-cod-list_selection',
	}
	
})
