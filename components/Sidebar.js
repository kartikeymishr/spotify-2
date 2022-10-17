import {
    HomeIcon, MagnifyingGlassIcon, BuildingLibraryIcon, HeartIcon, RssIcon, PlusCircleIcon
} from "@heroicons/react/24/outline";


const Sidebar = () => {
    return (
        <div className="text-gray-500 p-5 text-sm border-gray-900">
            <div className="space-y-4">
                <button className="flex items-center space-x-2 hover:text-white">
                    <HomeIcon className="h-5 w-5"/>
                    <p>Home</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <MagnifyingGlassIcon className="h-5 w-5"/>
                    <p>Search</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <BuildingLibraryIcon className="h-5 w-5"/>
                    <p>Your Library</p>
                </button>

                <hr className="border-t-[0.1px] border-gray-900"/>

                <button className="flex items-center space-x-2 hover:text-white">
                    <PlusCircleIcon className="h-5 w-5"/>
                    <p>Create Playlist</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <HeartIcon className="h-5 w-5"/>
                    <p>Liked Songs</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <RssIcon className="h-5 w-5"/>
                    <p>Your Episodes</p>
                </button>

                <hr className="border-t-[0.1px] border-gray-900"/>

                <p className="cursor-pointer hover:text-white">
                    Playlist Name
                </p>
                <p className="cursor-pointer hover:text-white">
                    Playlist Name
                </p>
                <p className="cursor-pointer hover:text-white">
                    Playlist Name
                </p>
                <p className="cursor-pointer hover:text-white">
                    Playlist Name
                </p>
                <p className="cursor-pointer hover:text-white">
                    Playlist Name
                </p>
                <p className="cursor-pointer hover:text-white">
                    Playlist Name
                </p>
                <p className="cursor-pointer hover:text-white">
                    Playlist Name
                </p>
                <p className="cursor-pointer hover:text-white">
                    Playlist Name
                </p>
                <p className="cursor-pointer hover:text-white">
                    Playlist Name
                </p>
                <p className="cursor-pointer hover:text-white">
                    Playlist Name
                </p>
                <p className="cursor-pointer hover:text-white">
                    Playlist Name
                </p>
                <p className="cursor-pointer hover:text-white">
                    Playlist Name
                </p>


            {/*    Playlists*/}
            </div>
        </div>
    )
}

export default Sidebar