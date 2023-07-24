import { useEffect } from "react"
import { useStateProvider } from "../utils/StateProvider"
import { reducerCases } from "../utils/Constants"
import axios from "axios"

const CurrentTrack = () => {
    const [{token, currentPlaying}, dispatch] = useStateProvider()
    useEffect(() => {
        const getCurrentTrack = async () => {
            const response = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                }
            });
            console.log(response.data)
            if (response.data !== "") {
                const currentPlaying = {
                id: response.data.item.id,
                name: response.data.item.name,
                artists: response.data.item.artists.map((artist) => artist.name),
                image: response.data.item.album.images[2].url,
                };
                dispatch({ type: reducerCases.SET_PLAYING, currentPlaying });
            } else {
            dispatch({ type: reducerCases.SET_PLAYING, currentPlaying: null });
            }
        }   
        getCurrentTrack()
    }, [dispatch, token])
    return (
        <div className="container-current-track">
            {
                currentPlaying && (
                    <div className="track">
                        <div className="track-image">
                            <img src={currentPlaying.image} alt="currentPlaying" />
                        </div>
                        <div className="track-info">
                            <h4>{currentPlaying.name}</h4>
                            <h6>{currentPlaying.artists.join(", ")}</h6>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default CurrentTrack
