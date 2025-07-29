    import React, { useState } from "react";
    import { useEffect } from "react";
    import { FaMicrophone } from "react-icons/fa";
    import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
    import { toast } from "react-toastify";


    export default function Speech({setshow,desc}) {
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
    const [text, setText] = useState("");
        const [quote, setQuote] = useState("");

    const handleStart = () => {
        console.log("Start");
        SpeechRecognition.startListening({ continuous: true ,language:"en-In"});
    };

    const handleStop = () => {
        console.log("Stop");
        SpeechRecognition.stopListening()
    };

    const handleReset = () => {
        setText("");
    resetTranscript()
    };

    const handleSave = () => {
    toast.success("Saved!");
        desc((prev) => ({
        ...prev,
        desc: transcript
        }));
        setshow(false)
          resetTranscript()
        SpeechRecognition.stopListening()
    
    };

    const handleClose = () => {
        
        setshow(false);
          resetTranscript()
        SpeechRecognition.stopListening()
    };

    useEffect(() => {
        const getRandomQuote = () => {
        const quoteIdx=Math.floor(Math.random() * quotes.length);
        setQuote(quotes[quoteIdx]);
    

    }
    getRandomQuote()
    },[])
    useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
        toast.error("Speech recognition not supported in this browser");
    }
}, [browserSupportsSpeechRecognition]);
// const checkSpeechSupport = () => {
//     return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
// };
// checkSpeechSupport();
    
    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }
    return (
        <div className="w-full max-w-[500px] min-w-[300px] bg-[#302D2D] text-white p-4 sm:p-6 rounded-xl shadow-xl mx-auto my-4">
        <div className="mb-2">
            <div className="flex justify-between items-center mb-2">
            <h1 className="text-xl sm:text-2xl font-bold">Let ME write for u :-)</h1>
            <button onClick={handleClose}>close</button>
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
        </div>

        <h2 className="font-bold text-md mt-4">WE Start from here</h2>
        <textarea
            className="w-full h-40 mt-2 p-3 rounded-md bg-white text-black resize-none text-sm sm:text-base"
            placeholder="Start speaking..."
            value={transcript}
             readOnly
            
        />

      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-2">
  <button
    onClick={handleStart}
    className="flex items-center justify-center gap-2 w-full sm:w-[120px] bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
  >
    <FaMicrophone /> Start
  </button>
  <button
    onClick={handleStop}
    className="w-full sm:w-[120px] bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
  >
    Stop
  </button>
  <button
    onClick={handleReset}
    className="w-full sm:w-[120px] bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md"
  >
    Reset
  </button>
</div>


        <button
            onClick={handleSave}
            className="w-full mt-4 bg-green-700 hover:bg-green-800 text-white py-2 rounded-md font-semibold"
        >
            Save
        </button>
        </div>
    );
    }
