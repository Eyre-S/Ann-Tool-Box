/**
 * A HSV color value. All values are contained in the set [0, 1].
 */
export interface NormalizedHSV {
	hue: number;
	saturation: number;
	value: number;
}

/**
 * A HSV color value. All values are contained in the set [0, 1].
 */
export interface NormalizedHSL {
	hue: number;
	saturation: number;
	lightness: number;
}

/**
 * A RGB color value. All values are contained in the set [0, 1].
 */
export interface NormalizedRGB {
	red: number;
	green: number;
	blue: number;
}

/**
 * A RGB color value in 8 bit.
 *
 * That means the value of each color is an integer in [0, 255].
 */
export interface RGB256 {
	red: number,
	green: number;
	blue: number;
}

export function RGB256ize (rgb: NormalizedRGB): RGB256 {
	return {
		red: Math.round(rgb.red * 255),
		green: Math.round(rgb.green * 255),
		blue: Math.round(rgb.blue * 255)
	}
}

export function renderRGB256 (rgb: RGB256): string {
	return `rgb(${rgb.red}, ${rgb.green}, ${rgb.blue})`;
}

export function HSL2RGB (hsl: NormalizedHSL): NormalizedRGB {
	const { saturation: s, lightness: l } = hsl;
	const h = hsl.hue * 360;
	function k (n: number): number { return (n + h / 30) % 12; }
	const a = s * Math.min(l, 1 - l);
	function f (n: number): number { return l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1))); }
	return {
		red: f(0),
		green: f(8),
		blue: f(4)
	};
};

export function HSV2RGB(hsv: NormalizedHSV): NormalizedRGB {
	var { hue: h, saturation: s, value: v } = hsv;
    var r: number = 0;
	var g: number = 0;
	var b: number = 0;
	var i, f, p, q, t;
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return { red: r, green: g, blue: b };
}
