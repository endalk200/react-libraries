import { useCallback, useState } from "react";

export type InitialState = boolean | (() => boolean);

export type UseToggle = (
	| boolean
	| {
			on: () => void;
			off: () => void;
			toggle: () => void;
	  }
)[];

/**
 * React hook to manage or toggle boolean (on - off) states
 *
 * @param initialState {boolean} the initial boolean state value default to false
 */
export const useToggle = (initialState: InitialState = false): UseToggle => {
	const [value, setValue] = useState(initialState);

	const on = useCallback(() => {
		setValue(true);
	}, []);

	const off = useCallback(() => {
		setValue(false);
	}, []);

	const toggle = useCallback(() => {
		setValue((prev) => !prev);
	}, []);

	return [value, { on, off, toggle }];
};

export default useToggle;
