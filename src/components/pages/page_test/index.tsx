
import { defineAppPage } from "@/components/pages/page.ts";

import Page_Test from './Page_Test.vue';

export default defineAppPage({
	
	page: Page_Test,
	
	config: {
		title: "Tests",
		icon: 'nf-md-test_tube',
		debugOnly: true
	}
	
})
