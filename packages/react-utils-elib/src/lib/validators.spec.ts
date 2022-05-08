import { isValidEmail, isValidURL } from "./validators";

describe("Email validator", () => {
	const validEmail = "validEmail@email.com";
	const invalidEmail = "invalidEmail";

	it("should return boolean values for valid and invalid emails", () => {
		expect(isValidEmail(validEmail)).toBeTruthy();

		expect(isValidEmail(invalidEmail)).toBeFalsy();
	});
});

describe("URL validator", () => {
	const validURLs = ["https://www.google.com", "ftp://ftp/file.txt", "file:///Users/user/Desktop/file.txt"];

	const invalidURLs = ["google.com", "invalid-url"];

	it("should return boolean values for valid and invalid URLs", () => {
		validURLs.forEach((url) => {
			expect(isValidURL(url)).toBeTruthy();
		});

		invalidURLs.forEach((url) => {
			expect(isValidURL(url)).toBeFalsy();
		});
	});
});
