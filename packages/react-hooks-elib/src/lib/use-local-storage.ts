import { useState, useCallback, useEffect } from "react";

import { useWindowEvent } from "./use-window-event";
import { deserializeJSON, serializeJSON } from "react-utils-elib";

interface UseLocalStorage<T> {
	key: string;
	defaultValue?: T;

	/**
	 * Custom local storage event name. The event name used for syncing local
	 * storage values across tabs. Defaults to "local-storage-event"
	 * */
	localStorageEventName?: string;

	/** If set to true, value will be update is useEffect after mount */
	getInitialValueInEffect?: boolean;

	/** Function to serialize value into string to be save in local storage */
	serialize?(value: T): string;

	/** Function to deserialize string value from local storage to value */
	deserialize?(value: string): T;
}

/**
 * React custom hook to work with local storage. The hook provides a way to sync
 * local storage values across tabs and reload the page based on the event.
 */
export const useLocalStorage = <T = string>({
	key,
	localStorageEventName = "local-storage-event",
	defaultValue = undefined,
	getInitialValueInEffect = false,
	deserialize = deserializeJSON,
	serialize = serializeJSON,
}: UseLocalStorage<T>) => {
	const [value, setValue] = useState<T>(
		typeof window !== "undefined" && "localStorage" in window && !getInitialValueInEffect
			? deserialize(window.localStorage.getItem(key) ?? "undefined")
			: ((defaultValue ?? "") as T)
	);

	const setLocalStorageValue = useCallback(
		(val: T | ((prevState: T) => T)) => {
			// Check if the val argument is of type function and call it to get the value
			if (val instanceof Function) {
				setValue((current) => {
					// Call the function that return the new value
					const result = val(current);

					window.localStorage.setItem(key, serialize(result));

					// Dispatch custom event
					window.dispatchEvent(
						new CustomEvent(localStorageEventName, {
							detail: { key, value: val(current) },
						})
					);

					return result;
				});
			} else {
				window.localStorage.setItem(key, serialize(val));

				window.dispatchEvent(
					new CustomEvent(localStorageEventName, {
						detail: { key, value: val },
					})
				);

				setValue(val);
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[key]
	);

	useWindowEvent("storage", (event) => {
		if (event.storageArea === window.localStorage && event.key === key) {
			setValue(deserialize(event.newValue ?? "undefined"));
		}
	});

	useWindowEvent(localStorageEventName, (event) => {
		if (event.detail.key === key) {
			setValue(event.detail.value);
		}
	});

	useEffect(() => {
		if (defaultValue !== undefined && value === undefined) {
			setLocalStorageValue(defaultValue);
		}
	}, [defaultValue, value, setLocalStorageValue]);

	useEffect(() => {
		if (getInitialValueInEffect) {
			setValue(
				deserialize(window.localStorage.getItem(key) ?? "undefined") || ((defaultValue ?? "") as T)
			);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return [value === undefined ? defaultValue : value, setLocalStorageValue] as const;
};
