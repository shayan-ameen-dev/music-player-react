import { useState } from "react";

import Song from "./components/Song";
import Player from "./components/Player";

import "./styles/app.scss";

import data from "./data";

function App() {
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="App">
      <Song currentSong={currentSong} />
      <Player
        currentSong={currentSong}
        isPlaying={isPlaying}
        setIsPLaying={setIsPlaying}
      />
    </div>
  );
}

export default App;
