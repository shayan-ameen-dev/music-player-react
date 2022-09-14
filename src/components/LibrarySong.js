const LibrarySong = ({
  songs,
  setSongs,
  song,
  setCurrentSong,
  isPlaying,
  audioRef,
}) => {
  function selectSongHandler() {
    setCurrentSong(song);

    const newSongs = songs.map((mapedSong) => {
      if (mapedSong.id === song.id) {
        return {
          ...mapedSong,
          active: true,
        };
      } else {
        return {
          ...mapedSong,
          active: false,
        };
      }
    });

    setSongs(newSongs);

    if (isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          audioRef.current.play();
        });
      }
    }
  }

  return (
    <div
      onClick={selectSongHandler}
      className={`library-song ${song.active ? 'selected' : ''}`}
    >
      <img src={song.cover} alt={song.name} />
      <div className='song-description'>
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
