import { isBrowser } from "./dom";

export type UserAgentBrowser = NonNullable<ReturnType<typeof getUserAgentBrowser>>;

/**
 * A generic function that gets the user agent browser from the window object.
 * @param navigator window.navigator object
 * @returns {string} the user agent browser
 */
export const getUserAgentBrowser = (navigator: Navigator) => {
	const { userAgent: ua, vendor } = navigator;
	const android = /(android)/i.test(ua);

	switch (true) {
		case /CriOS/.test(ua):
			return "Chrome for iOS";
		case /Edg\//.test(ua):
			return "Edge";
		case android && /Silk\//.test(ua):
			return "Silk";
		case /Chrome/.test(ua) && /Google Inc/.test(vendor):
			return "Chrome";
		case /Firefox\/\d+\.\d+$/.test(ua):
			return "Firefox";
		case android:
			return "AOSP";
		case /MSIE|Trident/.test(ua):
			return "IE";
		case /Safari/.test(navigator.userAgent) && /Apple Computer/.test(ua):
			return "Safari";
		case /AppleWebKit/.test(ua):
			return "WebKit";
		default:
			return null;
	}
};

export type UserAgentBrowserResult = ReturnType<typeof userAgentBrowser>;
/**
 * Implementation of getUserAgentBrowser. This will return browser name if running in a browser.
 * @returns {string} Browser name
 */
export const userAgentBrowser = () => {
	if (!isBrowser) return "Not a browser";

	switch (getUserAgentBrowser(window.navigator)) {
		case "Edge":
			return "Edge";
		case "WebKit":
			return "Apple webkit";
		case "Chrome":
			return "Chrome";
		case "Chrome for iOS":
			return "Chrome for iOS";
		case "Firefox":
			return "Firefox";
		case "IE":
			return "IE";
		case "Safari":
			return "Safari";

		default:
			return null;
	}
};

/**
 * Checks if the browser is the same as the given browser.
 * @param {string} browser
 * @returns
 */
export const detectBrowser = (browser: UserAgentBrowser): boolean => {
	if (!isBrowser) return false;

	return getUserAgentBrowser(window.navigator) === browser;
};

export type UserAgentOS = NonNullable<ReturnType<typeof getUserAgentOS>>;

/**
 * Get the user agent operating system.
 * @param navigator window.navigator object
 * @returns {string} the user agent operating system
 */
export const getUserAgentOS = (navigator: Navigator) => {
	const { userAgent: ua, platform } = navigator;

	switch (true) {
		case /Android/.test(ua):
			return "Android";
		case /iPhone|iPad|iPod/.test(platform):
			return "iOS";
		case /Win/.test(platform):
			return "Windows";
		case /Mac/.test(platform):
			return "Mac";
		case /linux/.test(ua):
			return "Linux";
		case /CrOS/.test(ua):
			return "Chrome OS";
		case /Firefox/.test(ua):
			return "Firefox OS";
		default:
			return null;
	}
};

/**
 * Checks if the user agent OS is equal to the given OS.
 * @param {string} os the user agent operating system
 * @returns {boolean} true if the user agent operating system matches the os
 */
export const detectOS = (os: UserAgentOS): boolean => {
	if (!isBrowser) return false;

	return getUserAgentOS(window.navigator) === os;
};

export type UserAgentDeviceType = NonNullable<ReturnType<typeof detectDeviceType>>;

/**
 * Get the device type
 * @param navigator window.navigator object
 * @returns {string} Returns device type. "tablet", "mobile" or "desktop"
 */
export const detectDeviceType = (navigator: Navigator) => {
	const { userAgent: ua } = navigator;

	if (/(tablet)|(iPad)|(Nexus 9)/i.test(ua)) return "Tablet";

	if (/(mobi)/i.test(ua)) return "Phone";

	return "Desktop";
};

/**
 * Detect if the device is touch capable.
 * @returns {boolean} true if the user agent is touch capable device
 */
export const detectTouch = (): boolean => {
	if (!isBrowser) return false;

	return window.ontouchstart === null && window.ontouchmove === null && window.ontouchend === null;
};
