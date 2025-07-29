import React, { useState, useEffect, useCallback } from "react";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { toast } from "react-toastify";

export default function Speech({ setshow, desc }) {
    const quotes = [
        "Most people do not listen with the intent to understand; they listen with the intent to reply. — Stephen R. Covey",
        "Listening is being able to be changed by the other person. — Alan Alda",
        "When people talk, listen completely. Most people never listen. — Ernest Hemingway",
        "One of the most sincere forms of respect is actually listening to what another has to say. — Bryant H. McGill",
        "To listen well is as powerful a means of communication and influence as to talk well. — John Marshall",
        "The quieter you become, the more you can hear. — Ram Dass",
        "Wisdom is the reward you get for a lifetime of listening when you'd have preferred to talk. — Doug Larson",
        "Listening is often the only thing needed to help someone. — Unknown",
    ];

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    const [quote, setQuote] = useState("");
    const [isSupported, setIsSupported] = useState(false);
    const [permissionGranted, setPermissionGranted] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Check for speech recognition support
    const checkSpeechSupport = useCallback(() => {
        const hasWebkit = 'webkitSpeechRecognition' in window;
        const hasNative = 'SpeechRecognition' in window;
        const isHTTPS = window.location.protocol === 'https:' || window.location.hostname === 'localhost';
        
        return (hasWebkit || hasNative) && isHTTPS;
    }, []);

    // Request microphone permission
    const requestMicrophonePermission = useCallback(async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            stream.getTracks().forEach(track => track.stop()); // Stop the stream immediately
            setPermissionGranted(true);
            return true;
        } catch (error) {
            console.error('Microphone permission denied:', error);
            toast.error("Microphone permission required for speech recognition");
            setPermissionGranted(false);
            return false;
        }
    }, []);

    // Initialize component
    useEffect(() => {
        const initialize = async () => {
            setIsLoading(true);
            
            // Check browser support
            const supported = checkSpeechSupport() && browserSupportsSpeechRecognition;
            setIsSupported(supported);
            
            if (supported) {
                // Request microphone permission
                await requestMicrophonePermission();
            }
            
            // Set random quote
            const quoteIdx = Math.floor(Math.random() * quotes.length);
            setQuote(quotes[quoteIdx]);
            
            setIsLoading(false);
        };

        initialize();
    }, [browserSupportsSpeechRecognition, checkSpeechSupport, requestMicrophonePermission]);

    const handleStart = useCallback(async () => {
        if (!isSupported) {
            toast.error("Speech recognition not supported");
            return;
        }

        if (!permissionGranted) {
            const granted = await requestMicrophonePermission();
            if (!granted) return;
        }

        try {
            console.log("Starting speech recognition...");
            SpeechRecognition.startListening({ 
                continuous: true,
                language: "en-IN", // Fixed language code
                interimResults: true
            });
            toast.info("Started listening... Speak now!");
        } catch (error) {
            console.error('Failed to start speech recognition:', error);
            toast.error("Failed to start speech recognition");
        }
    }, [isSupported, permissionGranted, requestMicrophonePermission]);

    const handleStop = useCallback(() => {
        console.log("Stopping speech recognition...");
        SpeechRecognition.stopListening();
        toast.info("Stopped listening");
    }, []);

    const handleReset = useCallback(() => {
        resetTranscript();
        toast.info("Text cleared");
    }, [resetTranscript]);

    const handleSave = useCallback(() => {
        if (!transcript.trim()) {
            toast.warning("No text to save");
            return;
        }

        toast.success("Saved!");
        desc((prev) => ({
            ...prev,
            desc: transcript
        }));
        setshow(false);
        resetTranscript();
        SpeechRecognition.stopListening();
    }, [transcript, desc, setshow, resetTranscript]);

    const handleClose = useCallback(() => {
        SpeechRecognition.stopListening();
        resetTranscript();
        setshow(false);
    }, [setshow, resetTranscript]);

    // Loading state
    if (isLoading) {
        return (
            <div className="w-full max-w-[500px] min-w-[300px] bg-[#302D2D] text-white p-4 sm:p-6 rounded-xl shadow-xl mx-auto my-4">
                <div className="flex items-center justify-center h-40">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                    <span className="ml-2">Loading...</span>
                </div>
            </div>
        );
    }

    // Unsupported browser
    if (!isSupported) {
        return (
            <div className="w-full max-w-[500px] min-w-[300px] bg-[#302D2D] text-white p-4 sm:p-6 rounded-xl shadow-xl mx-auto my-4">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-xl sm:text-2xl font-bold">Speech Recognition</h1>
                    <button 
                        onClick={handleClose}
                        className="text-gray-400 hover:text-white"
                    >
                        close
                    </button>
                </div>
                <div className="text-center py-8">
                    <FaMicrophoneSlash className="mx-auto text-4xl text-red-500 mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Not Supported</h3>
                    <p className="text-gray-400 mb-4">
                        Speech recognition is not supported in this browser or requires HTTPS.
                    </p>
                    <div className="text-sm text-gray-500">
                        <p>Try using:</p>
                        <ul className="list-disc list-inside mt-2">
                            <li>Chrome or Edge browser</li>
                            <li>HTTPS connection</li>
                            <li>Allow microphone permissions</li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-[500px] min-w-[300px] bg-[#302D2D] text-white p-4 sm:p-6 rounded-xl shadow-xl mx-auto my-4">
            <div className="mb-2">
                <div className="flex justify-between items-center mb-2">
                    <h1 className="text-xl sm:text-2xl font-bold">Let ME write for u :-)</h1>
                    <button 
                        onClick={handleClose}
                        className="text-gray-400 hover:text-white px-2 py-1 rounded"
                    >
                        close
                    </button>
                </div>
                <p className="text-sm text-gray-400 italic">
                    {quote}
                </p>
                {listening && (
                    <div className="flex items-center gap-2 mt-2 animate-pulse text-green-400 font-semibold">
                        <span className="h-2 w-2 rounded-full bg-green-400 animate-ping" />
                        Listening...
                    </div>
                )}
                {!permissionGranted && (
                    <div className="flex items-center gap-2 mt-2 text-yellow-400 text-sm">
                        <span>⚠️</span>
                        Microphone permission required
                    </div>
                )}
            </div>

            <h2 className="font-bold text-md mt-4">We start from here</h2>
            <textarea
                className="w-full h-40 mt-2 p-3 rounded-md bg-white text-black resize-none text-sm sm:text-base"
                placeholder="Click 'Start' and begin speaking..."
                value={transcript}
                readOnly
            />

            <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-2">
                <button
                    onClick={handleStart}
                    disabled={listening || !permissionGranted}
                    className={`flex items-center justify-center gap-2 w-full sm:w-[120px] px-4 py-2 rounded-md font-medium transition-colors ${
                        listening || !permissionGranted
                            ? 'bg-gray-600 cursor-not-allowed'
                            : 'bg-green-600 hover:bg-green-700'
                    } text-white`}
                >
                    <FaMicrophone /> {listening ? 'Recording...' : 'Start'}
                </button>
                <button
                    onClick={handleStop}
                    disabled={!listening}
                    className={`w-full sm:w-[120px] px-4 py-2 rounded-md font-medium transition-colors ${
                        !listening
                            ? 'bg-gray-600 cursor-not-allowed'
                            : 'bg-red-600 hover:bg-red-700'
                    } text-white`}
                >
                    Stop
                </button>
                <button
                    onClick={handleReset}
                    disabled={!transcript}
                    className={`w-full sm:w-[120px] px-4 py-2 rounded-md font-medium transition-colors ${
                        !transcript
                            ? 'bg-gray-600 cursor-not-allowed'
                            : 'bg-yellow-500 hover:bg-yellow-600'
                    } text-white`}
                >
                    Reset
                </button>
            </div>

            <button
                onClick={handleSave}
                disabled={!transcript.trim()}
                className={`w-full mt-4 py-2 rounded-md font-semibold transition-colors ${
                    !transcript.trim()
                        ? 'bg-gray-600 cursor-not-allowed'
                        : 'bg-green-700 hover:bg-green-800'
                } text-white`}
            >
                Save ({transcript.trim().length} characters)
            </button>
        </div>
    );
}