
export function clamp<T> (min: T, current: T, max: T): T {
	return (current>max ? max : (current<min ? min : current));
	// return Math.max(min, Math.min(current, max));
}
