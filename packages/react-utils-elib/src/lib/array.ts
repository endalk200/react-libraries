/**
 * Returns the first element of an array.
 *
 * @param array
 * @returns Returns the first element of an array or undefined if the array is empty.
 */
export function getFirstItem<T>(array: T[]): T | undefined {
	return array != null && array.length ? array[0] : undefined;
}

/**
 *
 * @param array Returns the last element of an array.
 * @returns Returns the last element of an array or undefined if the array is empty.
 */
export function getLastItem<T>(array: T[]): T | undefined {
	const length = array == null ? 0 : array.length;
	return length ? array[length - 1] : undefined;
}

/**
 * Returns the previous item in an array.
 *
 * @param index {number} The index of the current item.
 * @param array {Array} The array to search.
 * @param loop {boolean} Whether to loop around the array.
 * @returns Returns the previous item in an array.
 */
export function getPrevItem<T>(index: number, array: T[], loop = true): T {
	const prevIndex = getPrevIndex(index, array.length, loop);
	return array[prevIndex];
}

/**
 *
 * @param index Returns the next item in an array.
 * @param array {Array} The array to search.
 * @param loop {boolean} Whether to loop around the array.
 * @returns {any} Returns the next item in an array.
 */
export function getNextItem<T>(index: number, array: T[], loop = true): T {
	const nextIndex = getNextIndex(index, array.length, 1, loop);
	return array[nextIndex];
}

/**
 * Removes an item from an array with the specified index.
 *
 * @param array {Array} The array to search.
 * @param index {number} The index of the item to remove.
 * @returns {Array} Returns the array with the item removed.
 */
export function removeIndex<T>(array: T[], index: number): T[] {
	return array.filter((_, idx) => idx !== index);
}

/**
 * Adds and item at the end of an array.
 * @param array
 * @param item {any} The item to add.
 * @returns {Array} Returns the new array.
 */
export function addItem<T>(array: T[], item: T): T[] {
	return [...array, item];
}

/**
 * Removes an item from an array.
 *
 * @param array {Array} The array to search.
 * @param item {any} The item to remove.
 * @returns {Array} Returns the array with the item removed.
 */
export function removeItem<T>(array: T[], item: T): T[] {
	return array.filter((eachItem) => eachItem !== item);
}

/**
 * Get the next index based on the current index and step.
 *
 * @param currentIndex the current index
 * @param length the total length or count of items
 * @param step the number of steps
 * @param loop whether to circle back once `currentIndex` is at the start/end
 */
export function getNextIndex(currentIndex: number, length: number, step = 1, loop = true): number {
	const lastIndex = length - 1;

	if (currentIndex === -1) {
		return step > 0 ? 0 : lastIndex;
	}

	const nextIndex = currentIndex + step;

	if (nextIndex < 0) {
		return loop ? lastIndex : 0;
	}

	if (nextIndex >= length) {
		if (loop) return 0;
		return currentIndex > length ? length : currentIndex;
	}

	return nextIndex;
}

/**
 * Get's the previous index based on the current index.
 * Mostly used for keyboard navigation.
 *
 * @param index - the current index
 * @param count - the length or total count of items in the array
 * @param loop - whether we should circle back to the
 * first/last once `currentIndex` is at the start/end
 */
export function getPrevIndex(index: number, count: number, loop = true): number {
	return getNextIndex(index, count, -1, loop);
}

/**
 * Converts an array into smaller chunks or groups.
 *
 * @param array the array to chunk into group
 * @param size the length of each chunk
 */
export function chunk<T>(array: T[], size: number): T[][] {
	return array.reduce((rows: T[][], currentValue: T, index: number) => {
		if (index % size === 0) {
			rows.push([currentValue]);
		} else {
			rows[rows.length - 1].push(currentValue);
		}
		return rows;
	}, [] as T[][]);
}

/**
 * Gets the next item based on a search string
 *
 * @param items array of items
 * @param searchString the search string
 * @param itemToString resolves an item to string
 * @param currentItem the current selected item
 */
export function getNextItemFromSearch<T>(
	items: T[],
	searchString: string,
	itemToString: (item: T) => string,
	currentItem: T
): T | undefined {
	if (searchString == null) {
		return currentItem;
	}

	// If current item doesn't exist, find the item that matches the search string
	if (!currentItem) {
		const foundItem = items.find((item) =>
			itemToString(item).toLowerCase().startsWith(searchString.toLowerCase())
		);
		return foundItem;
	}

	// Filter items for ones that match the search string (case insensitive)
	const matchingItems = items.filter((item) =>
		itemToString(item).toLowerCase().startsWith(searchString.toLowerCase())
	);

	// If there's a match, let's get the next item to select
	if (matchingItems.length > 0) {
		let nextIndex: number;

		// If the currentItem is in the available items, we move to the next available option
		if (matchingItems.includes(currentItem)) {
			const currentIndex = matchingItems.indexOf(currentItem);
			nextIndex = currentIndex + 1;
			if (nextIndex === matchingItems.length) {
				nextIndex = 0;
			}
			return matchingItems[nextIndex];
		}
		// Else, we pick the first item in the available items
		nextIndex = items.indexOf(matchingItems[0]);
		return items[nextIndex];
	}

	// a decent fallback to the currentItem
	return currentItem;
}
