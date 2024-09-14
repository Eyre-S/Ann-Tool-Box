export class RandomizeItem {
	typeName: string
	parameters: any[]
}

export function generateRandom (template: string): string {
	let token: string = ''
	let result: string = ''
	
	for (let char of template) {
		console.log("read " + char)
		result += char
	}
	
	return result;
}
