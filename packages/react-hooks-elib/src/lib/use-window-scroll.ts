import { useEffect, useState } from "react";
import { isBrowser } from "react-utils-elib";

export interface State {
	x: number;
	y: number;
}

export const useWindowScroll = (): State => {
	const [state, setState] = useState<State>(() => ({
		x: isBrowser ? window.pageXOffset : 0,
		y: isBrowser ? window.pageYOffset : 0,
	}));

	useEffect(() => {
		const handleScroll = () => {
			setState((state) => {
				const { pageXOffset, pageYOffset } = window;

				//Check state for change, return same state if no change happened to prevent rerender
				return state.x !== pageXOffset || state.y !== pageYOffset
					? {
							x: pageXOffset,
							y: pageYOffset,
					  }
					: state;
			});
		};

		//We have to update window scroll at mount, before subscription.
		//Window scroll may be changed between render and effect handler.
		handleScroll();

		window.addEventListener("scroll", handleScroll, {
			capture: false,
			passive: true,
		});

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return state;
};

export default useWindowScroll;
