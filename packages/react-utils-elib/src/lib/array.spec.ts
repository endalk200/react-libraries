import {
	getFirstItem,
	getLastItem,
	getPrevItem,
	getNextItem,
	removeIndex,
	addItem,
	removeItem,
	getNextIndex,
	getPrevIndex,
	chunk,
	getNextItemFromSearch,
} from "./array";

const numberArray = [1, 2, 3, 4, 5, 6, 7, 8];
const stringArray = ["a", "b", "c", "d", "e"];

describe("first or last item queries", () => {
	test("should get first item", () => {
		expect(getFirstItem(numberArray)).toEqual(1);
	});

	test("should get last item", () => {
		expect(getLastItem(stringArray)).toEqual("e");
	});
});

describe("previous item/index queries", () => {
	test("should loop if at the end", () => {
		const currentIndex = 0;
		const result = getPrevItem(currentIndex, numberArray);
		expect(result).toEqual(8);
	});

	test("should get previous item", () => {
		const currentIndex = 5;
		const result = getPrevItem(currentIndex, numberArray);
		expect(result).toEqual(5);
	});

	test("should get previous index given current index", () => {
		expect(getPrevIndex(0, 5)).toEqual(4);
	});
});

describe("remove and add operations", () => {
	test("should remove item at index", () => {
		const result = removeIndex(numberArray, 1);
		expect(result).toEqual([1, 3, 4, 5, 6, 7, 8]);
	});

	test("should add new item to end of array", () => {
		const result = addItem(numberArray, 9);
		expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
	});

	test("should remove item from array", () => {
		const result = removeItem(numberArray, 8);
		expect(result).toEqual([1, 2, 3, 4, 5, 6, 7]);
	});
});

describe("next item or index queries", () => {
	test("should get the next index", () => {
		const currentIndex = 1;
		const result = getNextIndex(currentIndex, numberArray.length);
		expect(result).toEqual(2);
	});

	test("should get the next item based on current index", () => {
		const currentIndex = 1;
		const result = getNextItem(currentIndex, numberArray);
		expect(result).toEqual(3);
	});

	test("should loop index back to the start", () => {
		const currentIndex = 7;
		const result = getNextIndex(currentIndex, numberArray.length);
		expect(result).toEqual(0);
	});
});

describe("chunk array", () => {
	test("should chunk symmetric array into 2 groups", () => {
		const array = [1, 2, 3, 4, 5, 6, 7, 8];
		const result = chunk(array, 4);
		expect(result).toEqual([
			[1, 2, 3, 4],
			[5, 6, 7, 8],
		]);
	});

	test("should chunk non-symmetric array into 2 groups", () => {
		const array = [1, 2, 3, 4, 5, 6, 7];
		const result = chunk(array, 4);
		expect(result).toEqual([
			[1, 2, 3, 4],
			[5, 6, 7],
		]);
	});
});

describe("Get next item from search", () => {
	test("should get next item based on search with string values", () => {
		const array = [{ value: "React" }, { value: "Vue" }, { value: "Svelte" }];
		const currentItem = { value: "React" };
		const result = getNextItemFromSearch(array, "vu", (item) => item.value, currentItem);
		expect(result).toEqual({ value: "Vue" });
	});

	test("should get next item based on search with number values", () => {
		const array = [{ value: 1 }, { value: 2 }, { value: 3 }];
		const currentItem = { value: 2 };
		const result = getNextItemFromSearch(array, "3", (item) => item.value.toString(), currentItem);
		expect(result).toEqual({ value: 3 });
	});

	test("should return null if not found", () => {
		const array = [{ value: "React" }, { value: "Vue" }, { value: "Svelte" }];
		const currentItem = { value: "React" };
		const result = getNextItemFromSearch(array, "an", (item) => item.value, currentItem);
		expect(result).toBeNull();
	});
});
