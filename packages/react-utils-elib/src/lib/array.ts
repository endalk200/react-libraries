/**
 * Returns the first element of an array.
 *
 * @param array
 * @returns Returns the first element of an array or undefined if the array is empty.
 */
export const getFirstItem = <T>(array: T[]): T | undefined => {
	return array != null && array.length ? array[0] : undefined;
};

/**
 *
 * @param array Returns the last element of an array.
 * @returns Returns the last element of an array or undefined if the array is empty.
 */
export const getLastItem = <T>(array: T[]): T | undefined => {
	const length = array == null ? 0 : array.length;
	return length ? array[length - 1] : undefined;
};

/**
 * Returns the previous item in an array.
 *
 * @param {number} index The index of the current item.
 * @param {Array} array The array to search.
 * @param {boolean} loop Whether to loop around the array.
 * @returns Returns the previous item in an array.
 */
export const getPrevItem = <T>(index: number, array: T[], loop = true): T => {
	const prevIndex = getPrevIndex(index, array.length, loop);
	return array[prevIndex];
};

/**
 *
 * @param {number} index Returns the next item in an array.
 * @param {Array} array The array to search.
 * @param {boolean} loop Whether to loop around the array.
 * @returns {T} Returns the next item in an array.
 */
export const getNextItem = <T>(index: number, array: T[], loop = true): T => {
	const nextIndex = getNextIndex(index, array.length, 1, loop);
	return array[nextIndex];
};

/**
 * Removes an item from an array with the specified index.
 *
 * @param {Array} array The array to search.
 * @param {number} index The index of the item to remove.
 * @returns {Array} Returns the array with the item removed.
 */
export const removeIndex = <T>(array: T[], index: number): T[] => {
	return array.filter((_, idx) => idx !== index);
};

/**
 * Adds and item at the end of an array.
 * @param {Array} array
 * @param {unknown} item The item to add.
 * @returns {Array} Returns the new array.
 */
export const addItem = <T>(array: T[], item: T): T[] => {
	return [...array, item];
};

/**
 * Removes an item from an array.
 *
 * @param {Array} array The array to search.
 * @param {unknown} item The item to remove.
 * @returns {Array} Returns the array with the item removed.
 */
export const removeItem = <T>(array: T[], item: T): T[] => {
	return array.filter((eachItem) => eachItem !== item);
};

/**
 * Get the next index based on the current index and step.
 *
 * @param {number} currentIndex the current index
 * @param {number} length the total length or count of items
 * @param {number} step the number of steps
 * @param {boolean} loop whether to circle back once `currentIndex` is at the start/end
 */
export const getNextIndex = (currentIndex: number, length: number, step = 1, loop = true): number => {
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
};

/**
 * Get's the previous index based on the current index.
 * Mostly used for keyboard navigation.
 *
 * @param {number} index - the current index
 * @param {number} count - the length or total count of items in the array
 * @param {boolean} loop - whether we should circle back to the
 * first/last once `currentIndex` is at the start/end
 */
export const getPrevIndex = (index: number, count: number, loop = true): number => {
	return getNextIndex(index, count, -1, loop);
};

/**
 * Converts an array into smaller chunks or groups.
 *
 * @param {Array} array the array to chunk into group
 * @param {number} size the length of each chunk
 */
export const chunk = <T>(array: T[], size: number): T[][] => {
	return array.reduce((rows: T[][], currentValue: T, index: number) => {
		if (index % size === 0) {
			rows.push([currentValue]);
		} else {
			rows[rows.length - 1].push(currentValue);
		}
		return rows;
	}, [] as T[][]);
};

/**
 * Gets the next item based on a search string
 *
 * @param {Array} items array of items
 * @param {String} searchString the search string
 * @param {Function} itemToString resolves an item to string
 * @param currentItem the current selected item
 */
export const getNextItemFromSearch = <T>(
	items: T[],
	searchString: string,
	itemToString: (item: T) => string,
	currentItem: T
): T | undefined | null => {
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

	return null;
};
