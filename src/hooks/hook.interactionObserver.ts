
import { RefObject, useEffect, useState } from 'react';

interface UseIntersectionObserverProps {
    onIntersect?: () => void; //Método que puede ser llamado al entrar en contacto
    onExit?: () => void; //Cuando sale de la zona de contacto
    threshold?: number; //Límite de contacto
    root?: Element | null; //Elemento de contacto
    rootMargin?: string; //Margen de contacto
}

const useIntersectionObserver = (ref: RefObject<Element>,
    { onIntersect, onExit, threshold = 0.1, root = null, rootMargin = '0px' }: UseIntersectionObserverProps): boolean => {
        const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);

                    //Si existe un método que se ejecutará al entrar en contacto entonces se lo llama
                    if (onIntersect) {
                        onIntersect();
                    }
                } else {
                    setIsVisible(false);
                    if(onExit){
                        onExit();
                    }
                }
            });
        },
        {
            root,
            rootMargin,
            threshold,
        }
        );

        const currentElement = ref.current;

        if (currentElement) {
            observer.observe(currentElement);
        }

        return () => {
        if (currentElement) {
            observer.unobserve(currentElement);
        }
        };
    }, [ref, onIntersect, onExit, threshold, root, rootMargin]);

    return isVisible;
};

export default useIntersectionObserver;
