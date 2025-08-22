import React, { useEffect } from 'react';

interface ElevenLabsWidgetProps {
  agentId?: string;
  className?: string;
}

const ElevenLabsWidget: React.FC<ElevenLabsWidgetProps> = ({ 
  agentId = "agent_9901k2fq7cd2earsv68a49vpndf6",
  className = ""
}) => {
  useEffect(() => {
    // Load the ElevenLabs script
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
    script.async = true;
    script.type = 'text/javascript';
    
    script.onload = () => {
      console.log('ElevenLabs Voice Bot loaded successfully');
    };
    
    script.onerror = () => {
      console.error('Failed to load ElevenLabs Voice Bot');
    };

    document.head.appendChild(script);

    // Cleanup function
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <div className={`fixed bottom-8 right-8 z-50 ${className}`}>
      {/* Simple container for the ElevenLabs widget */}
      <div 
        dangerouslySetInnerHTML={{
          __html: `<elevenlabs-convai agent-id="${agentId}"></elevenlabs-convai>`
        }}
      />
    </div>
  );
};

export default ElevenLabsWidget;