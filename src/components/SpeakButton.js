function SpeakButton({ translated, lang }) {
  const handleSpeak = () => {
    if (!translated || translated.trim() === "") {
      alert("No translation available to speak.");
      return;
    }

    const synth = window.speechSynthesis;
    synth.cancel(); // stop any ongoing speech

    let voices = synth.getVoices();

    if (!voices.length) {
      synth.onvoiceschanged = () => {
        voices = synth.getVoices();
        speakNow(translated, lang, voices, synth);
      };
    } else {
      speakNow(translated, lang, voices, synth);
    }
  };

  const speakNow = (text, lang, voices, synth) => {
    const utter = new SpeechSynthesisUtterance(text);

    // Find a voice matching the lang, fallback to first voice if none found
    const matchingVoice = voices.find(v => v.lang.toLowerCase().startsWith(lang.toLowerCase())) || voices[0];

    if (matchingVoice) {
      utter.voice = matchingVoice;
    }
    utter.lang = lang || "en-US";
    utter.rate = 1;
    utter.pitch = 1;
    utter.volume = 1;

    utter.onstart = () => console.log("🔊 Speech started");
    utter.onend = () => console.log("✅ Speech ended");
    utter.onerror = e => console.error("❌ Speech synthesis error:", e.error);

    synth.speak(utter);
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
