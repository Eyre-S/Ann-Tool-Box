import { defineAppPage } from "@/components/pages/page.ts";
import Page_GlyphPreview from './Page_GlyphPreview.vue';

export default defineAppPage({
	
	page: Page_GlyphPreview,
	
	config: {
		title: 'Glyph Preview',
		icon: 'nf-md-format_font'
	}
	
});
