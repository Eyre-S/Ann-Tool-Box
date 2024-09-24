import template from "./randomize/template"

export default {
	
	generate,
	
}

export async function generate (articleTemplate: string, inputSeparator: string, times: number): Promise<string> {
	
	console.log(articleTemplate)
	const separatorProcessed = inputSeparator.replace(/\\n/g, "\n")
	const generatingTemplate: string[] = new Array(times).fill(articleTemplate)
	const generatedArticles = await Promise.all(generatingTemplate.map(async (current, _index, _arr) => {
		const currArticle: string = await template.generateRandomOne(current)
		return currArticle
	}))
	const mergedArticles = generatedArticles.join(separatorProcessed)
	return mergedArticles
	
}

