import useSpotify from "../hooks/useSpotify";
import {useSession} from "next-auth/react";
import {useRecoilState} from "recoil";
import {currentTrackIdState, isPlayingState} from "../atoms/songAtom";
import {useEffect, useState} from "react";
import useSongInfo from "../hooks/useSongInfo";

const Player = () => {
    const spotifyApi = useSpotify()
    const {data: session} = useSession();
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState)
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
    const [volume, setVolume] = useState(50);

    const songInfo = useSongInfo()

    useEffect(() => {
        if (spotifyApi.getAccessToken() && !currentTrackId) {
            fetchCurrentSong()
            setVolume(50)
        }
    }, [currentTrackId, spotifyApi, session])

    const fetchCurrentSong = () => {
        if (!songInfo) {
            spotifyApi.getMyCurrentPlayingTrack()
                .then(data => {
                    console.log("Now Playing :: ", data.body?.item);
                    setCurrentTrackId(data.body.item.id)

                    spotifyApi.getMyCurrentPlaybackState()
                        .then(data => {
                            setIsPlaying(data.body?.is_playing)
                        })
                })
        }
    }

    return (
        <div className="h-24 bg-gradient-to-b from-black to-gray-900 text-white">
            <div>
                <img
                    className="hidden md:inline h-10 w-10"
                    src={songInfo?.album?.images?.[0]?.url}
                    alt=""
                />
            </div>
            <div>
                <h3>{songInfo?.name}</h3>
                <p>{songInfo?.artists?.[0]?.name}</p>
            </div>
        </div>
    )
}

export default Player