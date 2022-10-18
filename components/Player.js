import useSpotify from "../hooks/useSpotify";
import {useSession} from "next-auth/react";
import {useRecoilState} from "recoil";
import {currentTrackIdState, isPlayingState} from "../atoms/songAtom";
import {useCallback, useEffect, useState} from "react";
import useSongInfo from "../hooks/useSongInfo";
import {ArrowsRightLeftIcon, ArrowUturnLeftIcon, SpeakerWaveIcon as VolumeDownIcon} from '@heroicons/react/24/outline'
import {
    BackwardIcon,
    ForwardIcon,
    PauseCircleIcon,
    PlayCircleIcon,
    SpeakerWaveIcon as VolumeUpIcon
} from '@heroicons/react/24/solid'
import {debounce} from "lodash";

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

    useEffect(() => {
        if (volume > 0 && volume < 100) {
            debouncedAdjustVolume(volume)
        }
    }, [volume])

    const debouncedAdjustVolume = useCallback(debounce((volume) => {
        spotifyApi.setVolume(volume).catch(err => {
            console.error(err);
        })
    }, 500), [])

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

            <div className="flex items-center space-x-4 justify-end">
                <VolumeDownIcon onClick={() => {
                    volume > 0 && setVolume(volume - 10)
                }} className="button"/>
                <input
                    className="w-16 md:w-28"
                    type="range"
                    min={0}
                    max={100}
                    value={volume}
                    onChange={e => setVolume(Number(e.target.value))}
                />
                <VolumeUpIcon onClick={() => {
                    volume < 100 && setVolume(volume + 10)
                }} className="button"/>
            </div>
        </div>
    )
}

export default Player