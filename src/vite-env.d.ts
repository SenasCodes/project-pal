/// <reference types="vite/client" />

declare namespace JSX {
  interface IntrinsicElements {
    "elevenlabs-convai": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        "agent-id": string;
        variant?: string;
        "avatar-orb-color-1"?: string;
        "avatar-orb-color-2"?: string;
        "action-text"?: string;
        "start-call-text"?: string;
        "end-call-text"?: string;
        "listening-text"?: string;
        "speaking-text"?: string;
        "expand-text"?: string;
      },
      HTMLElement
    >;
  }
}
