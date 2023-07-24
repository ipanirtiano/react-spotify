import Sidebar from './Sidebar'
import Navbar from './Navbar'
import Body from './Body'
import Footer from './Footer'
import { useEffect } from 'react'
import { useStateProvider } from "../utils/StateProvider"
import axios from 'axios'
import { reducerCases } from "../utils/Constants"

const Spotify = () => {
    const [{token}, dispatch] = useStateProvider()

    useEffect(()=> {
        const getUserInfo = async () => {
            const {data} = await axios.get('https://api.spotify.com/v1/me', {
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                }
            })
            
            const userInfo = {
                userId: data.id,
                userUrl: data.external_urls.spotify,
                userName: data.display_name,
            }

            dispatch({type:reducerCases.SET_USER, userInfo})

        }


        getUserInfo()
    },[dispatch, token])



    useEffect(() => {
        const getPlaybackState = async () => {
        const { data } = await axios.get("https://api.spotify.com/v1/me/player", {
            headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
            },
        });
        dispatch({
            type: reducerCases.SET_PLAYER_STATE,
            playerState: data.is_playing,
        });
        };
        getPlaybackState();
    }, [dispatch, token]);


    
    return (
        <div className="container-spotify">
            <div className="spotify-body">
                <Sidebar />
                <div className="body">
                    <Navbar />
                    <div className="body-content">
                        <Body/>
                    </div>
                </div>
            </div>
            <div className="soptify-footer">
                <Footer />
            </div>
        </div>
    )
}

export default Spotify
