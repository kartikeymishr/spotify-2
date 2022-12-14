import {
    BuildingLibraryIcon,
    HeartIcon,
    HomeIcon,
    MagnifyingGlassIcon,
    PlusCircleIcon,
    RssIcon
} from "@heroicons/react/24/outline";
import {useSession} from 'next-auth/react'
import {useEffect, useState} from "react";
import useSpotify from "../hooks/useSpotify";
import {useRecoilState} from "recoil";
import {playlistIdState} from "../atoms/playlistAtom";

const Sidebar = () => {
    const spotifyApi = useSpotify()
    const {data: session, status} = useSession()
    const [playlists, setPlaylists] = useState([])
    const [playlistId, setPlaylistId] = useRecoilState(playlistIdState)

    useEffect(() => {
        if (spotifyApi.getAccessToken()) {
            spotifyApi.getUserPlaylists().then((data) => {
                setPlaylists(data.body.items)
            })
        }
    }, [session, spotifyApi])

    return (
        <div
            className="text-gray-500 p-5 text-xs lg:text-sm border-gray-900
                    overflow-y-scroll h-screen scrollbar-hide
                    sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex">
            <div className="space-y-4">
                <button className="flex items-center space-x-2 hover:text-white pop">
                    <HomeIcon className="h-5 w-5"/>
                    <p>Home</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white pop">
                    <MagnifyingGlassIcon className="h-5 w-5"/>
                    <p>Search</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white pop">
                    <BuildingLibraryIcon className="h-5 w-5"/>
                    <p>Your Library</p>
                </button>

                <hr className="border-t-[0.1px] border-gray-900"/>

                <button className="flex items-center space-x-2 hover:text-white pop">
                    <PlusCircleIcon className="h-5 w-5"/>
                    <p>Create Playlist</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white pop">
                    <HeartIcon className="h-5 w-5"/>
                    <p>Liked Songs</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white pop">
                    <RssIcon className="h-5 w-5"/>
                    <p>Your Episodes</p>
                </button>

                <hr className="border-t-[0.1px] border-gray-900"/>

                {playlists.map(playlist => (
                    <p key={playlist.id}
                       className="cursor-pointer hover:text-white pop"
                       onClick={() => setPlaylistId(playlist.id)}>
                        {playlist.name}
                    </p>
                ))}
            </div>
        </div>
    )
}

export default Sidebar