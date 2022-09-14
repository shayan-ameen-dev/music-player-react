import { useRef, useState } from 'react';

import Nav from './components/Nav';
import Song from './components/Song';
import Player from './components/Player';
import Library from './components/Library';

import './styles/app.scss';

import data from './data';

function App() {
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);

  const audioRef = useRef(null);

  function playSongHandler() {
    if (!isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    setIsPlaying(!isPlaying);
  }

  function timeUpdateHandler(event) {
    const { currentTime, duration } = event.target;
    setSongInfo({
      ...songInfo,
      currentTime,
      duration,
    });
  }

  function dragHandler(event) {
    const currentTime = event.target.value;
    audioRef.current.currentTime = currentTime;
    setSongInfo({ ...songInfo, currentTime });
  }

  function formatTime(time) {
    if (isNaN(time)) {
      return '0:00';
    } else {
      return (
        Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
      );
    }
  }

  return (
    <div className='app'>
      <Nav isLibraryOpen={isLibraryOpen} setIsLibraryOpen={setIsLibraryOpen} />
      <Song currentSong={currentSong} />
      <Player
        songInfo={songInfo}
        isPlaying={isPlaying}
        playSongHandler={playSongHandler}
        dragHandler={dragHandler}
        formatTime={formatTime}
      />
      <Library
        songs={songs}
        setSongs={setSongs}
        setCurrentSong={setCurrentSong}
        isPlaying={isPlaying}
        isLibraryOpen={isLibraryOpen}
        audioRef={audioRef}
      />
      <audio
        onLoadedMetadata={timeUpdateHandler}
        onTimeUpdate={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
      ></audio>
    </div>
  );
}

export default App;
