import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faPause,
  faAngleLeft,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons';

const Player = ({
  songInfo,
  isPlaying,
  playSongHandler,
  dragHandler,
  formatTime,
}) => {
  return (
    <div className='player'>
      <div className='time-controls'>
        <p>{formatTime(songInfo.currentTime)}</p>
        <input
          onChange={dragHandler}
          value={songInfo.currentTime}
          min={0}
          max={songInfo.duration || 0}
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
    </div>
  );
};

export default Player;
