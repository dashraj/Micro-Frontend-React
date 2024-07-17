// src/hooks/useScript.ts
import { useState, useEffect } from 'react';

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.body.appendChild(script);
  });
}

export function useScript(src: string): [boolean, Error | null] {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    loadScript(src)
      .then(() => {
        if (isMounted) {
          setIsLoaded(true);
        }
      })
      .catch(err => {
        if (isMounted) {
          setError(err);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [src]);

  return [isLoaded, error];
}
