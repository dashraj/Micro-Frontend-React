// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const debounce = <F extends (...args: any[]) => any>(func: F, wait: number) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<F>) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func(...args), wait);
  };
};
