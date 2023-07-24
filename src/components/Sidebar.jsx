import Playlist from "./Playlist"


const Sidebar = () => {
  return (
    <div className="container-sidebar">
      <div className="top-link">
        <div className="logo">
          <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_White.png" alt="" />
        </div>
        <ul>
          <li><span className="material-symbols-outlined">home</span>Home</li>
          <li><span className="material-symbols-outlined">search</span>Search</li>
          <li><span className="material-symbols-outlined">library_music</span>Your Library</li>
        </ul>
      </div>

      <Playlist />
    </div>
  )
}

export default Sidebar
