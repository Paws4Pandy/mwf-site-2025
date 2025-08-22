// Type definitions for Roam widget
declare global {
  interface Window {
    Roam?: {
      initLobbyEmbed: (config: {
        url: string;
        parentElement: HTMLElement;
        lobbyConfiguration: string;
        theme: string;
        onSizeChange: (width: number, height: number) => void;
      }) => void;
    };
  }
}

export {};