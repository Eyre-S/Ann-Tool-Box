import { defineAppPage } from "@/components/pages/page.ts";
import Page_Randomize from "./Page_Randomize.vue";

export default defineAppPage({
	
	page: Page_Randomize,
	
	config: {
		title: "Randomize",
		icon: 'nf-md-dice_multiple_outline'
	}
	
})
