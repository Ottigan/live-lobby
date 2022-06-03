import { useEffect, useState } from "react";

export function useDebounce<T>(initialValue: T, msDelay = 500): [T, React.Dispatch<T>, T] {
    const [value, setValue] = useState(initialValue);
    const [debouncedValue, setDebouncedValue] = useState(initialValue);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedValue(value);
        }, msDelay);

        return () => clearTimeout(timeout);
    }, [msDelay, value]);

    return [value, setValue, debouncedValue];
}
