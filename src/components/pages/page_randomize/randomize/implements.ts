import randoms from "@/utils/randoms";
import { ReturnableIterator, ParseContext, EventContext, OnProcessingArticleContextCallback } from "./template";
import networking from "./templates/networking";

export const TemplateInserting: OnProcessingArticleContextCallback = {

	onProcessingArticleContext (iterator: ReturnableIterator, parseContext: ParseContext, eventContext: EventContext) {
		analyzeTemplateInsert(iterator, parseContext, eventContext)
	},
	
}

export interface TemplateType {
	
	name: string,
	
	generate: () => string
	
}

const templateTypes: TemplateType[] = networking.types

function analyzeTemplateInsert (
	iterator: ReturnableIterator,
	parseContext: ParseContext, eventContext: EventContext
) {
	
	if (iterator.next() !== "{") return;
	if (iterator.next() !== "{") return;
	
	let token = ""
	
	while (true) {
		
		if (!iterator.available())
			break
		
		iterator.setTag()
		
		let c = iterator.next()
		
		if (c === "}" && iterator.next() === "}") {
			iterator.revokeTag()
			break
		}
		
		iterator.revertTag()
		
		token += iterator.next()
		
	}
	
	token = token.trim()
	
	for (const type of templateTypes) {
		if (type.name === token) {
			
			parseContext.result += type.generate()
			eventContext.succeed = true
			return
			
		}
	}
	
}
