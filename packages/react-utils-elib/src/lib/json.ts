export const serializeJSON = <T>(value: T) => {
	try {
		return JSON.stringify(value);
	} catch (error) {
		throw new Error("Failed to serialize the value");
	}
};

export const deserializeJSON = (value: string) => {
	if (value === "undefined") return null;

	try {
		return JSON.parse(value);
	} catch {
		return value;
	}
};
