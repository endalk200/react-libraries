import { useState, useEffect } from "react";

export interface Size {
    width: number | undefined;
    height: number | undefined;
}

/**
 * Returns the height and width of the browser window
 *
 * @returns {object} height and width of the browser window `{height, width}`
 */
export const useWindowSize = (): Size => {
    const [windowSize, setWindowSize] = useState<Size>({
        width: undefined,
        height: undefined
    });

    useEffect(() => {
        // Handler to call on window resize
        const handleResize = () => {
            // Set window width/height to state
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        window.addEventListener("resize", handleResize);

        // Call handler right away so state gets updated with initial window size
        handleResize();

        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return { ...windowSize };
};

export default useWindowSize;
