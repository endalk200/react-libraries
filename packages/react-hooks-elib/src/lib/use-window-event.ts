import { useEffect } from "react";

/**
 * Registers a window event listener in useEffect. Handles cleanup of event listeners.
 * The hook can handle built in events and custom events.
 * @param type type of the event to register, Can be custom events or built in events.
 * @param listener listener function to be called when the event is triggered.
 * @param options
 */
export const useWindowEvent = <K extends string>(
	type: K,
	listener: K extends keyof WindowEventMap
		? (this: Window, ev: WindowEventMap[K]) => void
		: (this: Window, ev: CustomEvent) => void,
	options?: boolean | AddEventListenerOptions
) => {
	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		window.addEventListener(type, listener, options);
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		return () => window.removeEventListener(type, listener, options);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
};
