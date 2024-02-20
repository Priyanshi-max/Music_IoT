// AudioPlayer.js
import React, { useEffect, useRef, useState } from 'react';

const AudioPlayer = ({ playlist, currentTrackIndex, onNextTrack }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      onNextTrack();
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
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

  return (
    <div>
      <audio ref={audioRef} />
      <button onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
    </div>
  );
};

export default AudioPlayer;
