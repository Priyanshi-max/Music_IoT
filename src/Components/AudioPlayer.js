// AudioPlayer.js
import React, { useEffect, useRef, useState } from 'react';
import "./AudioPlayer.css" 

const AudioPlayer = ({ playlist, currentTrackIndex, onNextTrack }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      onNextTrack();
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [onNextTrack]);

  useEffect(() => {
    const audio = audioRef.current;

    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;

    if (playlist.length > 0 && currentTrackIndex >= 0 && currentTrackIndex < playlist.length) {
      audio.src = URL.createObjectURL(playlist[currentTrackIndex]);
      audio.currentTime = currentTime;
      setIsPlaying(true);
    }
  }, [playlist, currentTrackIndex]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleSeek = (e) => {
    const seekTime = e.target.value;
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  return (
    <div className="audio-player-container">
      <audio ref={audioRef} />
      <div className="controls">
        <button onClick={handlePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
        <input
          type="range"
          value={currentTime}
          max={duration || 0}
          onChange={handleSeek}
          className="seek-bar"
        />
        <div className="time">
          <span>{formatTime(currentTime)}</span> / <span>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
