import { useState, useEffect, useRef, RefObject } from 'react';

interface Size {
    width: number;
    height: number;
}

const useElementSize = (ref: RefObject<HTMLElement>): Size => {
    const [size, setSize] = useState<Size>({ width: 0, height: 0 });

    useEffect(() => {
        if (!ref.current) return;

        const element = ref.current;
        const resizeObserver = new ResizeObserver(entries => {
        if (entries.length === 0) return;
        const entry = entries[0];
        setSize({
            width: entry.contentRect.width,
            height: entry.contentRect.height,
        });
        });

        resizeObserver.observe(element);

        return () => resizeObserver.unobserve(element);
    }, [ref]);

    return size;
};

export default useElementSize;
