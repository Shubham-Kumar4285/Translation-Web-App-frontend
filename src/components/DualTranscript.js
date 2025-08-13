function DualTranscript({ original, translated }) {
  return (
    <div className="dual-transcript">
      <div className="transcript-card original">
        <h3>Original</h3>
        <p>{original || "..."}</p>
      </div>

      <div className="transcript-card translated">
        <h3>Translated</h3>
        <p>{translated || "..."}</p>
      </div>
    </div>
  );
}

export default DualTranscript;
