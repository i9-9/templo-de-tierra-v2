'use client';

import { useEffect, useRef, ReactNode } from 'react';

interface AnimateOnScrollProps {
  children: ReactNode;
  animationClass: string;
  delay?: number;
  duration?: number;
}

export default function AnimateOnScroll({ 
  children, 
  animationClass, 
  delay = 0,
  duration = 1 
}: AnimateOnScrollProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement;
            element.style.animation = `${animationClass} ${duration}s ease-out ${delay}s forwards`;
            observer.unobserve(element);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [animationClass, delay, duration]);

  return (
    <div ref={elementRef} style={{ opacity: 0 }}>
      {children}
    </div>
  );
} 