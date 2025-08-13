import React, { useState, useRef, useEffect } from "react";
import DualTranscript from "./components/DualTranscript";
import LanguageSelector from "./components/LanguageSelector";
import SpeakButton from "./components/SpeakButton";
import TranslationHistory from "./components/TranslationHistory"; 
import "./App.css";
import logo from "./assets/bg.png";

function App() {
  const [original, setOriginal] = useState("");
  const [translated, setTranslated] = useState("");
  const [inputLang, setInputLang] = useState("en"); // Auto-detected
  const [outputLang, setOutputLang] = useState("es");

  const [listening, setListening] = useState(false);
  const [translating, setTranslating] = useState(false);
  const [history, setHistory] = useState([]);

  const [lastFinalTranscript, setLastFinalTranscript] = useState(""); // store for re-translation
  const recognitionRef = useRef(null);

  const startRecording = () => {
    if (listening) return;

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support Speech Recognition.");
      return;
    }

    const recog = new SpeechRecognition();
    recognitionRef.current = recog;
    recog.lang = "en-US"; // backend will detect actual
    recog.continuous = false;
    recog.interimResults = true;

    recog.onstart = () => {
      setListening(true);
      setOriginal("");
      setTranslated("");
    };

    recog.onresult = (event) => {
      let interimTranscript = "";
      let finalTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }

      setOriginal(finalTranscript + interimTranscript);

      if (finalTranscript.trim()) {
        setLastFinalTranscript(finalTranscript.trim());
        translateAndSave(finalTranscript.trim());
      }
    };

    recog.onerror = (err) => {
      console.error("Speech recognition error:", err);
      setListening(false);
      recognitionRef.current = null;
    };

    recog.onend = () => {
      setListening(false);
      recognitionRef.current = null;
    };

    recog.start();
  };

  const stopRecording = () => {
    if (recognitionRef.current && listening) {
      recognitionRef.current.stop();
      setListening(false);
    }
  };

  const translateAndSave = (text) => {
    setTranslating(true);
    fetch("https://translation-web-app-backend.onrender.com/auto-translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" ,"X-API-KEY": process.env.REACT_APP_API_KEY},
      body: JSON.stringify({ text, target: outputLang }),
    })
      .then((res) => res.json())
      .then((data) => {
        const detectedLang = data.detected || inputLang;
        const transText = data.translated || "Translation failed.";
        setInputLang(detectedLang);
        setTranslated(transText);

        const newEntry = {
          id: Date.now(),
          original: text,
          translated: transText,
          detected: detectedLang,
          target: outputLang,
          timestamp: new Date().toLocaleTimeString(),
        };
        setHistory((prev) => [newEntry, ...prev]);
      })
      .catch((err) => {
        console.error("Translation error:", err);
        setTranslated("Translation failed.");
      })
      .finally(() => {
        setTranslating(false);
        setListening(false);
        recognitionRef.current = null;
      });
  };

  useEffect(() => {
    if (lastFinalTranscript) {
      translateAndSave(lastFinalTranscript);
    }
  }, [outputLang]);

  return (
    <div className="app">

      <div className="app-header">
        <img src={logo} alt="logo" className="header-logo" />
        <h2>Healthcare Translation Web App with Generative AI</h2>
      </div>

      {/* Language selector */}
      <div style={{display:"flex", justifyContent:"center"}}>
        <LanguageSelector
          inputLang={inputLang}
          outputLang={outputLang}
          setInputLang={setInputLang}
          setOutputLang={setOutputLang}
        />
      </div>

      {/* Status indicators */}
      <div className="section">
        {listening && <p>🎙 Listening...</p>}
        {translating && <p>🔄 Translating...</p>}
      </div>

      {/* Control buttons */}
      <div className="section controls">
        <button onClick={startRecording} disabled={listening || translating}>
          🎤 Start Recording
        </button>
        <button onClick={stopRecording} disabled={!listening}>
          ⏹ Stop Recording
        </button>
      </div>

      {/* Live transcript */}
      <div className="section">
        <DualTranscript original={original} translated={translated} />
      </div>

      {/* Speak translated output */}
      <div className="section">
        <SpeakButton translated={translated} lang={outputLang} />
      </div>

      {/* Translation history */}
      <div className="section">
        <TranslationHistory history={history} />
      </div>
    </div>
  );
}

export default App;
