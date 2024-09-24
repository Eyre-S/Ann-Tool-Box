
function in_range (max: number) {
	return Math.floor(Math.random() * max);
}

function one<T> (...choices: T[]): T {
	return choices[in_range(choices.length)];
}

function one_exec<T> (...choices: (() => T)[]): T {
	return choices[in_range(choices.length)]();
}

function some<T> (...choices:T[]): T[] {
	var result: T[] = [];
	const number = in_range(choices.length);
	for (var i = 0; i < number; i++) {
		result.push(choices[in_range(choices.length)]);
	}
	return result;
}

function in_chance (chance: number) {
	return Math.random() < chance;
}

function hex (): string {
	return one("1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f");
}

export default {
	in_range,
	one,
	one_exec,
	some,
	in_chance,
	hex
}
