import randoms from "@/utils/randoms";
import { TemplateType } from "../implements";
import { times } from "@/utils/math";

export const MacAddressType: TemplateType = {
	name: "mac",
	generate: () => {
		return times(6, () => times(2, randoms.hex).join("")).join(":")
	}
}

export const IpAddressType: TemplateType = {
	name: "ip",
	generate: () =>
		randoms.one_exec(
			IPv4AddressType.generate,
			IPv6AddressType.generate
		)
}

export const IPv4AddressType: TemplateType = {
	name: "ipv4",
	generate: () => {
		return times(4, () => randoms.in_range(255)).join(".")
	}
}

export const IPv6AddressType: TemplateType = {
	name: "ipv6",
	generate: () => {
		return times(8, () => times(4, randoms.hex).join("")).join(":")
	}
}

export default {
	
	types: [IpAddressType, MacAddressType],
	
}
