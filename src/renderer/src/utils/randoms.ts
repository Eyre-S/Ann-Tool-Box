
function in_range (max: number) {
	return Math.floor(Math.random() * max);
}

function one<T> (...choices: T[]): T {
	return choices[in_range(choices.length)];
}

function some<T> (...choices:T[]): T[] {
	var result: T[] = [];
	const number = in_range(choices.length);
	for (var i = 0; i < number; i++) {
		result.push(choices[in_range(choices.length)]);
	}
	return result;
}


export default {
	in_range,
	one,
	some
}
