import { useState, useEffect, useRef } from 'react';

export const useSpeechRecognition = () => {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      setIsSupported(true);
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.lang = 'en-US';
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
          alert('Microphone access was denied. Please allow microphone access in your browser settings.');
        }
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const startListening = (onResult) => {
    if (!recognitionRef.current || isListening) return;

    recognitionRef.current.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript.trim();
      onResult(transcript);
    };

    try {
      recognitionRef.current.start();
      setIsListening(true);
    } catch (err) {
      console.error("Error starting speech recognition:", err);
      alert("Could not start voice recognition. It might already be active.");
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };

  const toggleListening = (onResult) => {
    if (isListening) {
      stopListening();
    } else {
      startListening(onResult);
    }
  };

  return { isListening, isSupported, toggleListening };
};
