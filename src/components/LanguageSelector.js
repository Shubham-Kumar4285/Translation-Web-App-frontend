function LanguageSelector({ inputLang, outputLang, setInputLang, setOutputLang }) {
  return (
    <div>
      <label>Input Language: </label>
      <select value={inputLang} onChange={(e) => setInputLang(e.target.value)}>
        <option value="en">English</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
        <option value="hi">Hindi</option>
        <option value="zh">Chinese (Simplified)</option>
        <option value="ar">Arabic</option>
        <option value="ru">Russian</option>
        <option value="pt">Portuguese</option>
        <option value="bn">Bengali</option>
        <option value="ja">Japanese</option>
        <option value="de">German</option>
        <option value="ko">Korean</option>
        <option value="it">Italian</option>
        <option value="tr">Turkish</option>
        <option value="vi">Vietnamese</option>
      </select>
      <label>Output Language: </label>
      <select value={outputLang} onChange={(e) => setOutputLang(e.target.value)}>
        <option value="en">English</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
        <option value="hi">Hindi</option>
        <option value="zh">Chinese (Simplified)</option>
        <option value="ar">Arabic</option>
        <option value="ru">Russian</option>
        <option value="pt">Portuguese</option>
        <option value="bn">Bengali</option>
        <option value="ja">Japanese</option>
        <option value="de">German</option>
        <option value="ko">Korean</option>
        <option value="it">Italian</option>
        <option value="tr">Turkish</option>
        <option value="vi">Vietnamese</option>
      </select>
    </div>
  );
}
export default LanguageSelector;
