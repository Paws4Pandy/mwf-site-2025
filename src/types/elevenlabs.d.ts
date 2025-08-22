// TypeScript declarations for ElevenLabs ConvAI widget

declare namespace JSX {
  interface IntrinsicElements {
    'elevenlabs-convai': {
      'agent-id'?: string;
      className?: string;
      style?: React.CSSProperties;
    };
  }
}

// Global type for the ElevenLabs widget
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'elevenlabs-convai': {
        'agent-id'?: string;
        className?: string;
        style?: React.CSSProperties;
      };
    }
  }
}

export {};