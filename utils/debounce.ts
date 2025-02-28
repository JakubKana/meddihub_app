const debounce = (calledFunction: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout;

  return (...args: any[]) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      calledFunction.apply(this, args);
    }, delay);
  };
};

export { debounce };
