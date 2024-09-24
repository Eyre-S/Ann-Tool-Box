import { TemplateInserting } from "./implements"

export default {
	
	generateRandomOne,
	
}


export class ReturnableIterator {
	
	private currentIndex: number = 0
	private data: string
	
	private stack: number[] = []
	
	public constructor (data: string) {
		this.data = data
	}
	
	public available (): boolean {
		return this.currentIndex < this.data.length
	}
	
	public next (): string | null {
		if (this.available()) {
			const result = this.data[this.currentIndex]
			this.currentIndex++
			return result
		} else {
			return null
		}
	}
	
	public setTag (): void {
		this.stack.push(this.currentIndex)
	}
	
	public revertTag (): boolean {
		const previousIndex = this.stack.pop()
		if (previousIndex !== undefined) {
			this.currentIndex = previousIndex
			return true
		}
		return false
	}
	
	public revokeTag (): boolean {
		const previousIndex = this.stack.pop()
		if (previousIndex !== undefined) {
			return true
		}
		return false
	}
	
}

export class ParseContext {
	public result: string = ""
}

export class EventContext {
	
	public succeed: boolean = false
	
	public setSucceed (): void {
		this.succeed = true
	}
	
}

export interface OnProcessingArticleContextCallback {
	
	onProcessingArticleContext (iterator: ReturnableIterator, parseContext: ParseContext, eventContext: EventContext): void
	
}

const processingArticleContextListeners: OnProcessingArticleContextCallback[] = [
	TemplateInserting
]

async function generateRandomOne (template: string): Promise<string> {
	
	let parseContext: ParseContext = new ParseContext()
	
	const iterator = new ReturnableIterator(template)
	
	while (true) {
		
		if (!iterator.available())
			break
		
		let eventContext = new EventContext()
		
		for (const listener of processingArticleContextListeners) {
			
			iterator.setTag()
			listener.onProcessingArticleContext(iterator, parseContext, eventContext)
			
			if (eventContext.succeed) {
				iterator.revokeTag()
			} else {
				iterator.revertTag()
			}
			
		}
		
		if (!eventContext.succeed) {
			parseContext.result += iterator.next()
		}
		
	}
	
	// await new Promise(resolve => setTimeout(resolve, 1000))
	return parseContext.result;
	
}
