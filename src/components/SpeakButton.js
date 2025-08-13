function SpeakButton({ translated, lang }) {
  const handleSpeak = () => {
    if (!translated || translated.trim() === "") {
      alert("No translation available to speak.");
      return;
    }

    const synth = window.speechSynthesis;
    // Clear any existing speech
    synth.cancel();

    const utter = new SpeechSynthesisUtterance(translated);
    utter.lang = lang || "en-US";
    utter.rate = 1;   
    utter.pitch = 1; 
    utter.volume = 1; 

    
    // utter.onstart = () => console.log("🔊 Speech started");
    // utter.onend = () => console.log("✅ Speech ended");
    // utter.onerror = (e) => console.error("❌ Speech synthesis error:", e);

    // Speak
    synth.speak(utter);

    console.log("SpeakButton received:", translated, lang);
  };

  return (
    <button
      className="speak-btn"
      onClick={handleSpeak}
      disabled={!translated || translated.trim() === ""}
    >
      🔊 Speak Translation
    </button>
  );
}

export default SpeakButton;
