import LibrarySong from './LibrarySong';

const Library = ({
  songs,
  setSongs,
  setCurrentSong,
  isPlaying,
  isLibraryOpen,
  audioRef,
}) => {
  return (
    <div className={`library ${isLibraryOpen ? 'open' : ''}`}>
      <h2>Library</h2>
      <div className='library-songs'>
        {songs.map((song) => (
          <LibrarySong
            songs={songs}
            setSongs={setSongs}
            song={song}
            setCurrentSong={setCurrentSong}
            isPlaying={isPlaying}
            audioRef={audioRef}
            key={song.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
