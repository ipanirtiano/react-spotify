

const Login = () => {
    const handleClick = () => {
        const client_id = "230fd5bed19e43ee8b1561084017ef20";
        const redirect_uri = "http://localhost:5173/";
        const api_uri = "https://accounts.spotify.com/authorize"
        const scope = [
            "user-read-private",
            "user-read-email",
            "user-modify-playback-state",
            "user-read-playback-state",
            "user-read-currently-playing",
            "user-read-recently-played",
            "user-top-read",
        ]

        window.location.href = `${api_uri}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope.join(" ")}&response_type=token&show_dialog=true`;

    }
    return (
        <div className="container-login">
            <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Black.png" alt="spotify" />
            <button onClick={handleClick}>Connect Spotify</button>
        </div>
    )
}

export default Login
