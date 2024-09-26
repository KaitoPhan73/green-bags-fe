// custom.d.ts
declare namespace JSX {
    interface IntrinsicElements {
      'dotlottie-player': {
        src: string;
        background?: string;
        speed?: string;
        loop?: boolean;
        autoplay?: boolean;
        [key: string]: any; // For any other attributes
      };
    }
  }
  