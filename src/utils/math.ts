export function clamp<T> (min: T, current: T, max: T): T {
	return (current>max ? max : (current<min ? min : current));
	// return Math.max(min, Math.min(current, max));
}

export function times <T> (n: number, generator: () => T): T[] {
	return [...new Array(n)].map(generator)
}

export function nearestMultiplied (base: number, target: number): number {
	if (base < 1) return target;
	let curr = base;
	while (true) {
		if (curr + curr < target)
			curr += curr;
		else break;
	}
	return curr;
}

export default {
	clamp,
	times,
	nearestMultiplied
}
