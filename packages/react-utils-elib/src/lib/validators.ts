/**
 * isValidURL: Checks if the given string value is valid URL or not.
 * @param {string} str
 * @returns {boolean}
 */
export const isValidURL = (str: string): boolean =>
	/^(?:\w+:)?\/\/([^\s.]+\.\S{2}|localhost[:?\d]*)\S*$/.test(str);

/**
 * isValidEmail: Validates if the string passed as an argument is valid email address
 * @param {string} payload
 * @returns {boolean}
 */
export const isValidEmail = (payload: string): boolean =>
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
		payload
	);

const isValidPhoneNumber = (payload: string): boolean =>
	/^\+{0,2}([/\-. ])?(\(?\d{0,3}\))?([/\-. ])?\(?\d{0,3}\)?([/\-. ])?\d{3}([/\-. ])?\d{4}/.test(payload);
