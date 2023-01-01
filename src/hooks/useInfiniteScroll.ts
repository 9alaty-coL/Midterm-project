import { useEffect, useRef, useState } from 'react';

export const useInfiniteScroll = (action: () => void) => {
  const [lastElement, setLastElement] = useState<HTMLElement | null>(null);
  const observer = useRef(
    new IntersectionObserver(entries => {
      const first = entries[0];
      if (first.isIntersecting) {
        action();
      }
    }),
  );
  useEffect(() => {
    const currentElement = lastElement;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [lastElement]);

  return { setLastElement };
};
