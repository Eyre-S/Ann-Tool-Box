export function clamp<T> (min: T, current: T, max: T): T {
	return (current>max ? max : (current<min ? min : current));
	// return Math.max(min, Math.min(current, max));
}

export function times <T> (n: number, generator: () => T): T[] {
	return [...new Array(n)].map(generator)
}

export default {
	clamp,
	times,
}
