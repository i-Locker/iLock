import { useEffect, useState } from "react";
export default function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);
    // cancel timeout if value changes within the delay period, i.e to prevent value from being constantly updated
    return debouncedValue;
}
