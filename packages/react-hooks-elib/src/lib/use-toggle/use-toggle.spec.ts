import { act, renderHook } from "@testing-library/react-hooks";
import { useToggle } from "./use-toggle";

describe("useBoolean", () => {
    it("should be false by default and should toggle boolean values", () => {
        const { result } = renderHook(() => useToggle());

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const [, { on, off, toggle }] = result.current;


        expect(result.current[0]).toBeFalsy();

        act(() => {
            on();
        });

        expect(result.current[0]).toBeTruthy();

        act(() => {
            off();
        });

        expect(result.current[0]).toBeFalsy();

        act(() => {
            toggle();
        });

        expect(result.current[0]).toBeTruthy();
    });

    it("should work with argument provided.", () => {
        const { result } = renderHook(() => useToggle(false));

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const [, { on, off, toggle }] = result.current;

        expect(result.current[0]).toBeFalsy();

        act(() => {
            on();
        });

        expect(result.current[0]).toBeTruthy();

        act(() => {
            off();
        });

        expect(result.current[0]).toBeFalsy();

        act(() => {
            toggle();
        });

        expect(result.current[0]).toBeTruthy();
    });

    it("should work with argument provided from function return.", () => {

        const getArgument = () => false;

        const { result } = renderHook(() => useToggle(getArgument()));

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const [, { on, off, toggle }] = result.current;

        expect(result.current[0]).toBeFalsy();

        act(() => {
            on();
        });

        expect(result.current[0]).toBeTruthy();

        act(() => {
            off();
        });

        expect(result.current[0]).toBeFalsy();

        act(() => {
            toggle();
        });

        expect(result.current[0]).toBeTruthy();
    });
});
