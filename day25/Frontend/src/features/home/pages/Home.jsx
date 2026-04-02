import React, { useMemo, useState } from "react";
import FaceExpression from "../../expression/pages/FaceExpression";
import Player from "../components/Player";
import { useSong } from "../hook/useSong.js";
import "../style/home.scss";

const SUPPORTED_MOODS = ["happy", "sad", "surprised"];


const Home = () => {
  const { song, songs, handleGetSong, loading, selectSong } = useSong();
  const [detectedMood, setDetectedMood] = useState("Detecting...");
  const [lastScanTime, setLastScanTime] = useState(null);

  const formattedMood = useMemo(() => {
    if (!detectedMood || detectedMood === "Detecting...") {
      return "Detecting...";
    }
    return detectedMood.charAt(0).toUpperCase() + detectedMood.slice(1);
  }, [detectedMood]);

  const isSupportedMood = useMemo(() => {
    if (!detectedMood) return false;
    return SUPPORTED_MOODS.includes(detectedMood.toLowerCase());
  }, [detectedMood]);

  const handleExpression = (expression) => {
    if (!expression) return;
    const normalized = expression.trim().toLowerCase();
    if (!normalized) return;

    setDetectedMood(normalized);
    setLastScanTime(new Date());

    if (SUPPORTED_MOODS.includes(normalized)) {
      handleGetSong({ mood: normalized });
    }
  };

  return (
    <main className="home">
      <section className="home__top-grid">
        <section className="home__panel home__panel--left">
          <div className="home__scanner-card">
            <div className="home__scanner-header">
              <div>
                <p className="home__eyebrow">Live Scanner</p>
                <h2>Scan your emotion</h2>
              </div>
              <span className="home__status-chip">
                {detectedMood === "Detecting..." ? "Idle" : "Analyzing"}
              </span>
            </div>

            <div className="home__scanner-widget">
              <FaceExpression onClick={handleExpression} />
            </div>

            <p className="home__hint">
              Tip: look straight into the camera and tap “Detect Expression” to
              refresh your mood reading.
            </p>
          </div>
        </section>

        <section className="home__panel home__panel--right">
          <div className="home__songs-card">
            <div className="home__song-header">
              <div>
                <p className="home__eyebrow">Detected mood</p>
                <h2>{formattedMood}</h2>
              </div>
              <p className="home__scan-time">
                {lastScanTime
                  ? `Updated ${lastScanTime.toLocaleTimeString()}`
                  : "Waiting for first scan"}
              </p>
            </div>

            <p className="home__mood-helper">
              {isSupportedMood
                ? "Here’s something that matches how you feel."
                : "Songs are currently available for happy, sad, or surprised moods."}
            </p>

            <div className="home__song-list-wrapper">
              {loading && <p className="home__song-list--loading">Loading songs...</p>}

              {!loading && songs.length === 0 && (
                <p className="home__song-list--empty">
                  No songs found yet. Detect an expression to load songs.
                </p>
              )}

              {!loading && songs.length > 0 && (
                <ul className="home__song-list">
                  {songs.map((item, index) => {
                    const isActive = song?._id
                      ? song._id === item._id
                      : song?.url === item.url;

                    return (
                      <li key={item._id ?? item.url ?? `${item.title}-${index}`}>
                        <button
                          type="button"
                          className={`home__song-list-item ${isActive ? "is-active" : ""}`}
                          onClick={() => selectSong(item)}
                        >
                          <span className="home__song-list-thumb">
                            {item.posterUrl ? (
                              <img src={item.posterUrl} alt={`${item.title ?? "Song"} artwork`} />
                            ) : (
                              "♪"
                            )}
                          </span>

                          <span className="home__song-list-meta">
                            <span className="home__song-list-title">{item.title ?? "Untitled"}</span>
                            <span className="home__song-list-subtitle">
                              {item.artist ?? `${item.mood ?? "Mood"} track`}
                            </span>
                          </span>

                          <span className="home__song-list-action">Play</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        </section>
      </section>

      <section className="home__bottom-player">
        <Player song={song} loading={loading} autoPlayOnSongChange />
      </section>
    </main>
  );
};

export default Home;
