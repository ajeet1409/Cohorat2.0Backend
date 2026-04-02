import React, { useState, useRef } from "react";
import "../style/player.scss";

const Player = ({ song, autoPlayOnSongChange = true }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Toggle play/pause
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Skip forward 5 seconds
  const skipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(
        audioRef.current.currentTime + 5,
        duration
      );
    }
  };

  // Skip backward 5 seconds
  const skipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(
        audioRef.current.currentTime - 5,
        0
      );
    }
  };

  // Update current time
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  // Update duration
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      setCurrentTime(0);
    }
  };

  // Handle progress bar change
  const handleProgressChange = (e) => {
    const newTime = (e.target.value / 100) * duration;
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  // Format time in MM:SS
  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="player">
      {song && (
        <>
          <audio
            ref={audioRef}
            key={song.url}
            src={song.url}
            autoPlay={autoPlayOnSongChange}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => setIsPlaying(false)}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
          
          <div className="player__card">
            <div className="player__summary">
              <div className="player__artwork">
                {song.posterUrl ? (
                  <img src={song.posterUrl} alt={`${song.title ?? "Song"} artwork`} />
                ) : (
                  <div className="player__artwork-placeholder">No artwork</div>
                )}
              </div>

              <div className="player__meta">
                <div className="player__track">{song.title ?? "Untitled"}</div>
                <div className="player__subtitle">
                  {song.artist ?? `${song.mood ?? "Mood"} track`}
                </div>
              </div>

              {song.mood && <span className="player__badge">{song.mood}</span>}
            </div>

            <div className="player__progress">
              <input
                type="range"
                min="0"
                max="100"
                value={duration ? (currentTime / duration) * 100 : 0}
                onChange={handleProgressChange}
                className="player__progress-bar"
              />
              <div className="player__times">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            <div className="player__controls">
              <button className="player__button" onClick={skipBackward}>
                <span className="player__button-icon">⏪</span>
                <span className="player__button-label">-5s</span>
              </button>

              <button
                className="player__button player__button--primary"
                onClick={togglePlayPause}
              >
                <span className="player__button-icon">{isPlaying ? "⏸" : "▶"}</span>
                <span className="player__button-label">{isPlaying ? "Pause" : "Play"}</span>
              </button>

              <button className="player__button" onClick={skipForward}>
                <span className="player__button-icon">⏩</span>
                <span className="player__button-label">+5s</span>
              </button>
            </div>
          </div>
        </>
      )}
      {!song && (
        <div className="player__card">
          <p className="player__subtitle">No song selected</p>
        </div>
      )}
    </div>
  );
};

export default Player;
