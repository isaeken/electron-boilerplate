export {};

declare global {
  interface Window {
    app: {
      increment: () => void;
      decrement: () => void;
      setValue: (value: number) => void;
      onCountChange: (listener: (count: number) => void) => void;
    };
  }
}

