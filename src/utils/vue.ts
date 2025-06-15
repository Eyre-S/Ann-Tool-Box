import type { JSX } from "vue/jsx-runtime";

export function vueBool (value: boolean | undefined | string): boolean {
	if (value === undefined) {
		return false;
	}
	if (typeof value === 'string') {
		return true;
	}
	return value;
}

export type VueNode = string | JSX.Element

export function isJsxElement (node: any): node is JSX.Element {
	if (typeof node === 'object') {
		return (
			'type' in node &&
			'children' in node &&
			'shapeFlag' in node &&
			'patchFlag' in node
		)
	}
	return false;
}
