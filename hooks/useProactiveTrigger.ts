
import { useEffect, useRef, RefObject } from 'react';
import { useChat } from './useChat.ts';

export const useProactiveTrigger = (
  targetRef: RefObject<HTMLElement>,
  message: string,
  delay: number = 3000,
): void => {
  const { triggerProactivePrompt } = useChat();
  const triggeredRef = useRef(false);

  useEffect(() => {
    const targetElement = targetRef.current;
    if (!targetElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggeredRef.current) {
          triggeredRef.current = true;
          
          setTimeout(() => {
            triggerProactivePrompt(message);
          }, delay);

          observer.unobserve(targetElement);
        }
      },
      {
        root: null,
        threshold: 0.6,
      }
    );

    observer.observe(targetElement);

    return () => {
      observer.disconnect();
    };
  }, [targetRef, message, delay, triggerProactivePrompt]);
};