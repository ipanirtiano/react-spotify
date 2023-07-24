import { useEffect } from "react"
import { useStateProvider } from "../utils/StateProvider"
import axios from "axios"
import { reducerCases } from "../utils/Constants"

const Body = () => {
  const [{ token, selectedPlaylistId, selectedPlaylist }, dispatch] = useStateProvider()
  
  useEffect(() => {
    const getInitialPlaylist = async () => {
      const response = await axios.get(`https://api.spotify.com/v1/playlists/${selectedPlaylistId}`,
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        }
      })

      const selectedPlaylist = {
        id: response.data.id,
        name: response.data.name,
        description: response.data.description.startsWith("<a")
          ? ""
          : response.data.description,
        image: response.data.images[0].url,
        tracks: response.data.tracks.items.map(({ track }) => ({
          id: track.id,
          name: track.name,
          artists: track.artists.map((artist) => artist.name),
          image: track.album.images[2].url,
          duration: track.duration_ms,
          album: track.album.name,
          context_uri: track.album.uri,
          track_number: track.track_number,
        }))
      }
      dispatch({ type: reducerCases.SET_PLAYLIST, selectedPlaylist })
    }

    getInitialPlaylist()
  }, [token, dispatch, selectedPlaylistId]);



  const playTrack = async (
    id,
    name,
    artists,
    image,
    context_uri,
    track_number
  ) => {
    const response = await axios.put(
      `https://api.spotify.com/v1/me/player/play`,
      {
        context_uri,
        offset: {
          position: track_number - 1,
        },
        position_ms: 0,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    if (response.status === 204) {
      const currentPlaying = {
        id,
        name,
        artists,
        image,
      };
      dispatch({ type: reducerCases.SET_PLAYING, currentPlaying });
      dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
    } else {
      dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
    }
  };


  const msToMinutesAndSecond = (ms) => {
    const minutes = Math.floor(ms / 60000)
    const seconds = ((ms % 60000) / 1000).toFixed(0)
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds
  }

  return (
    <div className="container-body">
      {

        selectedPlaylist && (
          <>
            <div className="playlist">
              <div className="image">
                <img src={selectedPlaylist.image} alt="selectted-playlist" />
              </div>
              <div className="details">
                <span className="type">Playlist</span>
                <h1 className="title">{selectedPlaylist.name}</h1>
                <p> {selectedPlaylist.description} </p>
              </div>
            </div>
            <div className="list">
              <div className="header-row">
                <div className="col">
                  <span>#</span>
                </div>
                <div className="col">
                  <span>TITLE</span>
                </div>
                <div className="col">
                  <span>ALBUM</span>
                </div>
                <div className="col">
                  <span className="material-symbols-outlined">schedule</span>
                </div>
              </div>
            </div>
            <div className="tracks">
              {
                selectedPlaylist.tracks.map((
                  {
                    id,
                    name,
                    artists,
                    image,
                    duration,
                    album,
                    context_uri,
                    track_number,
                  }, index) => {
                  return (
                    <div className="row" key={id} onClick={() => 
                      playTrack(
                        id,
                        name,
                        artists,
                        image,
                        context_uri,
                        track_number)}>
                          
                      <div className="col">
                        <span>{index + 1}</span>
                      </div>
                      <div className="col detail">
                        <div className="image-list">
                          <img src={image} alt="track" />
                        </div>
                        <div className="info">
                          <span className="name">{name}</span>
                          <span> {artists} </span>
                        </div>
                      </div>
                      <div className="col">
                        <span> {album} </span>
                      </div>
                      <div className="col">
                        <span> {msToMinutesAndSecond(duration)} </span>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </>
        )
      }
    </div>
  )
}

export default Body
