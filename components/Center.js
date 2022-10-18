import {useSession} from "next-auth/react";
import {ChevronDownIcon} from "@heroicons/react/24/outline";
import {useEffect, useState} from "react";
import {shuffle} from "lodash";
import {useRecoilState, useRecoilValue} from "recoil";
import {playlistState, playlistIdState} from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";

const colors = [
    "from-indigo-500",
    "from-blue-500",
    "from-green-500",
    "from-red-500",
    "from-yellow-500",
    "from-pink-500",
    "from-purple-500",
]

const Center = (props) => {
    const spotifyApi = useSpotify()
    const {data: session} = useSession()
    const [color, setColor] = useState(null)
    // Read only value from the Recoil state
    const playlistId = useRecoilValue(playlistIdState)
    const [playlist, setPlaylist] = useRecoilState(playlistState)

    useEffect(() => {
        // Shuffle the Array and pop a value off
        setColor(shuffle(colors).pop())
    }, [playlistId])

    useEffect(() => {
        spotifyApi.getPlaylist(playlistId).then((data) => {
            setPlaylist(data.body)
        }).catch((error) => {
            console.error("Something went wrong", error)
        })
    }, [spotifyApi, playlistId])

    return (
        <div className="flex-grow text-white">
            <header className="absolute top-5 right-8">
                <div className="flex items-center bg-black space-x-3
                            opacity-90 hover:opacity-80 cursor-pointer
                            rounded-full p-1 pr-2">
                    <img className="rounded-full w-10 h-10" src={session?.user?.image} alt=""/>
                    <h2>{session?.user?.name}</h2>
                    <ChevronDownIcon className="h-5 w-5"/>
                </div>
            </header>

            <section className={`flex items-end space-x-7 bg-gradient-to-b 
                            to-black ${color} h-80 text-white p-8`}>
                <img className="h-44 w-44 shadow-2xl" src={playlist?.images?.[0]?.url} alt=""/>
                <div>
                    <p>PLAYLIST</p>
                    <h1 className="text-2xl md:text-3xl xl:text-4xl font-bold">{playlist?.name}</h1>
                </div>
            </section>
        </div>
    )
}

export default Center