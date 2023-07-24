
import { useStateProvider } from "../utils/StateProvider"
import { reducerCases } from "../utils/Constants"
import axios from "axios"


const PlayerControls = () => {
    const [{playerState, token}, dispatch] = useStateProvider()

    const changeState = async () => {
        const state = playerState ? "pause" : "play"
        await axios.put(`https://api.spotify.com/v1/me/player/${state}`,
        {},
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            }
        })
        dispatch({type:reducerCases.SET_PLAYER_STATE, playerState: !playerState })
    }


    const changeTrack = async (type) => {
        await axios.post(`https://api.spotify.com/v1/me/player/${type}`,
        {},
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            }
        })
        dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });


    
        const response1 = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            }
        });

        if (response1.data !== "") {
            const currentPlaying = {
                id: response1.data.item.id,
                name: response1.data.item.name,
                artists: response1.data.item.artists.map((artist) => artist.name),
                image: response1.data.item.album.images[2].url,
            };
            dispatch({ type: reducerCases.SET_PLAYING, currentPlaying });
            } else {
            dispatch({ type: reducerCases.SET_PLAYING, currentPlaying: null });
            }
        }






    return (
        <div className="container-player-controls">
            <div className="shuffle">
                <span className="material-symbols-outlined">shuffle</span>
            </div>
            <div className="previous">
                <span className="material-symbols-outlined" onClick={() => changeTrack("previous")}>skip_previous</span>
            </div>
            <div className="state">
                {playerState ? <span className="material-symbols-outlined" onClick={changeState }>pause_circle</span> :  <span className="material-symbols-outlined" onClick={changeState }>play_circle</span>}
            </div>
            <div className="next">
                <span className="material-symbols-outlined" onClick={() => changeTrack("next")}>skip_next</span>
            </div>
            <div className="repeate">
                <span className="material-symbols-outlined">replay</span>
            </div>
        </div>
    )
}

export default PlayerControls
