import React, { useEffect, useRef, useState } from "react";
import "../style/player.scss";

const formatTime = (time) => {
  if (!time || Number.isNaN(time)) {
    return "0:00";
  }
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  const padded = seconds < 10 ? `0${seconds}` : seconds;
  return `${minutes}:${padded}`;
};

const Player = ({ song, loading = false, autoPlayOnSelect = true }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);

  const hasTrack = Boolean(song?.url);

  useEffect(() => {
    if (!audioRef.current) return;
    const audio = audioRef.current;

    audio.pause();
    audio.currentTime = 0;
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setProgress(0);

    if (!hasTrack) return;

    const handleCanPlay = () => {
      if (!autoPlayOnSelect) return;
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    };

    audio.addEventListener("canplay", handleCanPlay);
    audio.load();

    return () => {
      audio.removeEventListener("canplay", handleCanPlay);
    };
  }, [hasTrack, song?.url, autoPlayOnSelect]);

  const syncProgress = () => {
    if (!audioRef.current) return;
    const { currentTime: time = 0, duration: rawDuration = 0 } =
      audioRef.current;
    setCurrentTime(time);
    setDuration(rawDuration);
    setProgress(rawDuration ? (time / rawDuration) * 100 : 0);
  };

  const togglePlayPause = () => {
    if (!audioRef.current || !hasTrack) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    audioRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));
  };

  const seekBy = (deltaSeconds) => {
    if (!audioRef.current || !hasTrack) return;

    const total = duration || audioRef.current.duration || 0;
    const nextTime = Math.min(
      Math.max(audioRef.current.currentTime + deltaSeconds, 0),
      total || 0,
    );

    audioRef.current.currentTime = nextTime;
    setCurrentTime(nextTime);
    setProgress(total ? (nextTime / total) * 100 : 0);
  };

  const handleProgressChange = (event) => {
    if (!audioRef.current || !hasTrack || !duration) return;
    const value = Number(event.target.value);
    const newTime = (value / 100) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
    setProgress(value);
  };

  const disableControls = !hasTrack || loading;

  return (
    <section className="player">
      <audio
        ref={audioRef}
        src={hasTrack ? song.url : undefined}
        onLoadedMetadata={syncProgress}
        onTimeUpdate={syncProgress}
        onEnded={() => setIsPlaying(false)}
      />

      <div className="player__card">
        <div className="player__summary">
          <div className="player__artwork">
            {song?.posterUrl ? (
              <img src={song.posterUrl} alt={`${song.title ?? "song"} artwork`} />
            ) : (
              <div className="player__artwork-placeholder" aria-hidden="true">
                No Art
              </div>
            )}
          </div>

          <div className="player__meta">
            <p className="player__track">
              {song?.title ?? "No track selected"}
            </p>
            <p className="player__subtitle">
              {song?.mood
                ? `Mood • ${song.mood}`
                : "Scan your emotion to get a recommendation"}
            </p>
          </div>

          {loading && <span className="player__badge">Loading song…</span>}
        </div>

        <div className="player__progress">
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleProgressChange}
            disabled={disableControls || !duration}
            aria-label="Song progress"
          />
          <div className="player__times">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="player__controls">
          <button
            type="button"
            className="player__button"
            onClick={() => seekBy(-5)}
            disabled={disableControls}
            aria-label="Rewind 5 seconds"
          >
            <span className="player__button-icon" aria-hidden="true">
              &lt;&lt;
            </span>
            <span className="player__button-label">-5s</span>
          </button>
          <button
            type="button"
            className="player__button player__button--primary"
            onClick={togglePlayPause}
            disabled={disableControls}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            <span className="player__button-icon" aria-hidden="true">
              {isPlaying ? "II" : ">"}
            </span>
            <span className="player__button-label">
              {isPlaying ? "Pause" : "Play"}
            </span>
          </button>
          <button
            type="button"
            className="player__button"
            onClick={() => seekBy(5)}
            disabled={disableControls}
            aria-label="Forward 5 seconds"
          >
            <span className="player__button-icon" aria-hidden="true">
              &gt;&gt;
            </span>
            <span className="player__button-label">+5s</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Player;
