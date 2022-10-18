import useSpotify from "./useSpotify";
import {useRecoilState} from "recoil";
import {currentTrackIdState} from "../atoms/songAtom";
import {useEffect, useState} from "react";

const useSongInfo = () => {
    const spotifyApi = useSpotify()
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState)
    const [songInfo, setSongInfo] = useState(null)

    useEffect(() => {
        (async function () {
            if (currentTrackId) {
                fetch(
                    `https://api.spotify.com/v1/tracks/${currentTrackId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${spotifyApi.getAccessToken()}`
                        }
                    }
                ).then(res => res.json())
                    .then(data => setSongInfo(data))
            }
        })()
    }, [currentTrackId, spotifyApi])

    return songInfo
}

export default useSongInfo