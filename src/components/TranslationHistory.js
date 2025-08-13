function TranslationHistory({ history }) {
  if (!history.length) return null; 
  return (
    <div className="history-box">
      <h3>📝 Recent Translations</h3>
      <ul>
        {history.map((item, index) => (
          <li key={index} className="history-item">
            <p>
              <strong>🗣 ({item.detected})</strong> {item.original}
            </p>
            <p>
              <strong>🔊 ({item.target || ""})</strong> {item.translated}
            </p>
            <span className="timestamp">{item.timestamp}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TranslationHistory;
