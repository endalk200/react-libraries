import { renderHook } from "@testing-library/react-hooks";
import useWindowSize from "./use-window-size";

describe("useWindowSize", () => {
    it("should return a number", () => {
        const { result } = renderHook(() => useWindowSize());

        expect(typeof result.current.height).toBe("number");
        expect(typeof result.current.width).toBe("number");
    });
});
