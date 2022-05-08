import { detectDeviceType, detectOS, detectTouch, getUserAgentOS } from "./user-agent";

describe("User agent browser", () => {
	test("Should get user agent OS", () => {
		// This test will fail if the OS that this test is running on is not Linux.
		expect(getUserAgentOS(window.navigator)).toBe("Linux");
	});

	test("Should return boolean value for OS test", () => {
		// This test will fail if the OS that this test is running on is not Linux.
		expect(detectOS("Linux")).toBeTruthy();
	});
});

describe("User agent device type", () => {
	test("Should get desktop", () => {
		// This test will fail if the OS that this test is running on is not Linux.
		expect(detectDeviceType(window.navigator)).toBe("Desktop");
	});

	test("Should return boolean for touch functionality test", () => {
		// This test will fail if the OS that this test is running on is not Linux.
		expect(detectTouch()).toBeFalsy();
	});
});
