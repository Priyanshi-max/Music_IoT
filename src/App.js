// App.js
import React, { useState } from 'react';
import './App.css';
import AudioPlayer from './Components/AudioPlayer';
import Playlist from './Components/PlayList';
import UploadForm from './Components/UploadForm';

function App() {
  const [playlist, setPlaylist] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  const handleUpload = (file) => {
    setPlaylist([...playlist, file]);
  };

  const handleNextTrack = () => {
    setCurrentTrackIndex((prevIndex) => prevIndex + 1);
  };

  const handleSelectTrack = (index) => {
    setCurrentTrackIndex(index);
  };

  return (
    <div className="container">
      <h1>Audio Player</h1>
      <div className="upload-form">
        <UploadForm onUpload={handleUpload} />
      </div>
      <div className="audio-player">
        <AudioPlayer
          playlist={playlist}
          currentTrackIndex={currentTrackIndex}
          onNextTrack={handleNextTrack}
        />
      </div>
      <div className="playlist">
        <div className="playlist-header">
          <h2>Playlist</h2>
        </div>
        <Playlist
          playlist={playlist}
          currentTrackIndex={currentTrackIndex}
          onSelectTrack={handleSelectTrack}
        />
      </div>
    </div>
  );
}

export default App;