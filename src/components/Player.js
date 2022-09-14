import { useState, useRef } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faPause,
  faAngleLeft,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons';

const Player = ({ currentSong, isPlaying, setIsPLaying }) => {
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });

  const audioRef = useRef(null);

  function playSongHandler(event) {
    if (!isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    setIsPLaying(!isPlaying);
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
    return (
      Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
    );
  }

  return (
    <div className='player'>
      <div className='time-controls'>
        <p>{formatTime(songInfo.currentTime)}</p>
        <input
          onChange={dragHandler}
          value={songInfo.currentTime}
          min={0}
          max={songInfo.duration}
          type='range'
        />
        <p>{formatTime(songInfo.duration)}</p>
      </div>
      <div className='play-controls'>
        {/* Skip Back Icon */}
        <FontAwesomeIcon className='skip-back' size='2x' icon={faAngleLeft} />
        {/* Play Icon */}
        <FontAwesomeIcon
          onClick={playSongHandler}
          className='play'
          size='2x'
          icon={isPlaying ? faPause : faPlay}
        />
        {/* Skip Forward Icon */}
        <FontAwesomeIcon
          className='skip-forward'
          size='2x'
          icon={faAngleRight}
        />
      </div>

      <audio
        onLoadedMetadata={timeUpdateHandler}
        onTimeUpdate={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
      ></audio>
    </div>
  );
};

export default Player;
