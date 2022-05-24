import copy from "copy-to-clipboard";
import { act, renderHook } from "@testing-library/react-hooks";

import { useClipboard } from "./use-clipboard";

jest.mock("copy-to-clipboard");

jest.useFakeTimers();
jest.spyOn(global, "setTimeout");

const text = "lorem ipsum";

test.each`
	params               | expected
	${100}               | ${100}
	${{ timeout: 2000 }} | ${2000}
	${{}}                | ${1500}
	${0}                 | ${1500}
`("calls setTimeout with proper value", ({ params, expected }) => {
	(copy as jest.Mock).mockReturnValue(true);

	const { result } = renderHook(() => useClipboard(text, params));

	act(() => {
		result.current.onCopy();
	});

	expect(copy).toBeCalledWith(text, {});
	expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), expected);
});
