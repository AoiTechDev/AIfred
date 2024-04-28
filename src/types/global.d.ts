// src/types/global.d.ts

// Extend the global Window interface
declare global {
    interface Window {
      SpeechRecognition: typeof SpeechRecognition;
    }
  }
  