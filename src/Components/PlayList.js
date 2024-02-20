// Playlist.js
import React from 'react';

const Playlist = ({ playlist, currentTrackIndex, onSelectTrack }) => {
  return (
    <div>
      <h2>Playlist</h2>
      <ul>
        {playlist.map((track, index) => (
          <li key={index}>
            <button
              onClick={() => onSelectTrack(index)}
              style={{ fontWeight: index === currentTrackIndex ? 'bold' : 'normal' }}
            >
              {track.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Playlist;
