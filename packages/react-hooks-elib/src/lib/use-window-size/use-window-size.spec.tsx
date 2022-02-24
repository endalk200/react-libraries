import { act, renderHook } from "@testing-library/react-hooks";
import { isBrowser } from "react-utils-elib";
import useWindowSize from "./use-window-size";

const triggerResize = (dimension: "width" | "height", value: number) => {
	if (dimension === "width") {
		(window.innerWidth as number) = value;
	} else if (dimension === "height") {
		(window.innerHeight as number) = value;
	}

	window.dispatchEvent(new Event("resize"));
};

describe("useWindowSize", () => {
	it("should return a number", () => {
		const { result } = renderHook(() => useWindowSize());

		expect(typeof result.current).toBe("object");
		expect(typeof result.current.height).toBe("number");
		expect(typeof result.current.width).toBe("number");
	});

	it("should be definedk", () => {
		expect(useWindowSize).toBeDefined();
	});

	it("should use passed parameters as initial values in case of non-browser use", () => {
		const { result } = renderHook(() => useWindowSize(1, 1));

		expect(result.current.height).toBe(isBrowser ? window.innerHeight : 1);
		expect(result.current.width).toBe(isBrowser ? window.innerWidth : 1);
	});

	it("should re-render after height change on closest RAF", () => {
		const { result } = renderHook(() => useWindowSize());

		act(() => {
			triggerResize("height", 360);
			//   requestAnimationFrame.step();
		});

		expect(result.current.height).toBe(360);

		act(() => {
			triggerResize("height", 2048);
			//   requestAnimationFrame.step();
		});

		expect(result.current.height).toBe(2048);
	});
});
