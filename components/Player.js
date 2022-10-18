import useSpotify from "../hooks/useSpotify";
import {useSession} from "next-auth/react";
import {useRecoilState} from "recoil";
import {currentTrackIdState, isPlayingState} from "../atoms/songAtom";
import {useEffect, useState} from "react";
import useSongInfo from "../hooks/useSongInfo";
import {ArrowsRightLeftIcon, ArrowUturnLeftIcon, SpeakerWaveIcon as VolumeDownIcon} from '@heroicons/react/24/outline'
import {
    ArrowPathIcon, BackwardIcon, PlayCircleIcon,
    PauseCircleIcon, ForwardIcon, SpeakerWaveIcon as VolumeUpIcon
} from '@heroicons/react/24/solid'

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

    const skipToPrevious = () => {
        console.log("Previous Song ... ");
        // TODO: Check if API is working.
        // spotifyApi.skipToPrevious()
    }

    const skipToNext = () => {
        console.log("Next Song ... ");
        // TODO: Check if API is working.
        // spotifyApi.skipToNext()
    }

    const handlePlayPause = () => {
        spotifyApi.getMyCurrentPlaybackState()
            .then(data => {
                if (data.body.is_playing) {
                    spotifyApi.pause()
                    setIsPlaying(false)
                } else {
                    spotifyApi.play()
                    setIsPlaying(true)
                }
            })
    }

    return (
        <div className="h-24 bg-gradient-to-b from-black
                        to-gray-900 text-white grid grid-cols-3
                        text-xs md:text-base px-2 md:px-8">
            <div className="flex items-center space-x-4">
                <img
                    className="hidden md:inline h-10 w-10"
                    src={songInfo?.album?.images?.[0]?.url}
                    alt=""
                />
                <div>
                    <h3>{songInfo?.name}</h3>
                    <p>{songInfo?.artists?.[0]?.name}</p>
                </div>
            </div>

            <div className="flex items-center justify-evenly">
                <ArrowsRightLeftIcon className="button"/>
                <BackwardIcon className="button" onClick={skipToPrevious}/>
                {/*<VolumeUpIcon className="button"/>*/}
                {/*<VolumeDownIcon className="button"/>*/}

                {isPlaying ? (
                        <PauseCircleIcon
                            onClick={handlePlayPause}
                            className="button w-10 h-10"
                        />
                    )
                    : (
                        <PlayCircleIcon
                            onClick={handlePlayPause}
                            className="button w-10 h-10"
                        />
                    )
                }

                <ForwardIcon className="button" onClick={skipToNext}/>
                <ArrowUturnLeftIcon className="button"/>
            </div>
        </div>
    )
}

export default Player