import { useState, useEffect } from "react";
import { isBrowser } from "react-utils-elib";

export interface Size {
	width: number;
	height: number;
}

/**
 * Returns the height and width of the browser window
 *
 * @returns {object} height and width of the browser window `{height, width}`
 */
export const useWindowSize = (initialWidth = Infinity, initialHeight = Infinity): Size => {
	const [state, setState] = useState<Size>({
		width: isBrowser ? window.innerWidth : initialWidth,
		height: isBrowser ? window.innerHeight : initialHeight,
	});

	useEffect((): (() => void) | void => {
		if (isBrowser) {
			const handleResize = () => {
				setState({
					width: window.innerWidth,
					height: window.innerHeight,
				});
			};

			window.addEventListener("resize", handleResize);

			return () => {
				window.removeEventListener("resize", handleResize);
			};
		}
	}, []);

	return state;
};

export default useWindowSize;
