import { useState } from "react";

export default function Home() {
  const [verse, setVerse] = useState("");
  const [data, setData] = useState("");
  const [audioUrl, setAudioUrl] = useState("");

  const analyze = async () => {
    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ verse })
    });
    const json = await res.json();
    setData(json.text);
  };

  const playAudio = async () => {
    const res = await fetch("/api/tts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: data })
    });
    const blob = await res.blob();
    setAudioUrl(URL.createObjectURL(blob));
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>구약 히브리 공부</h1>

      <input
        placeholder="예: Genesis 1:1"
        value={verse}
        onChange={(e) => setVerse(e.target.value)}
        style={{ width: "100%", padding: 10 }}
      />

      <button onClick={analyze} style={{ marginTop: 10 }}>
        📖 원어 분석
      </button>

      {data && (
        <>
          <button onClick={playAudio} style={{ marginTop: 10 }}>
            🔊 발음 듣기
          </button>
          <pre style={{ marginTop: 20 }}>{data}</pre>
          {audioUrl && <audio controls src={audioUrl} />}
        </>
      )}

      <footer style={{ marginTop: 30, fontSize: 12, color: "gray" }}>
        개인 연구용 참고입니다.
      </footer>
    </div>
  );
}
