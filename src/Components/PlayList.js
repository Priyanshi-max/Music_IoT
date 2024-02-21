// Playlist.js
import React from 'react';
import './PlayList.css'; 

const Playlist = ({ playlist, currentTrackIndex, onSelectTrack }) => {
  return (
    <div className="playlist-container">
      <h2 className="playlist-title">Playlist</h2>
      <ul className="playlist-items">
        {playlist.map((track, index) => (
          <li
            key={index}
            className={`playlist-item ${index === currentTrackIndex ? 'active' : ''}`}
            onClick={() => onSelectTrack(index)}
          >
            {track.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Playlist;
