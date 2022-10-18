import Head from 'next/head'
import Sidebar from "../components/Sidebar";
import Center from "../components/Center";
import {getSession} from "next-auth/react";

export default function Home() {
    return (
        <div className="bg-black h-screen overflow-hidden">
            <Head>
                <title>Spotify 2.0</title>
            </Head>

            <main className="flex">
                <Sidebar/>
                <Center/>
            </main>

            <div>
                {/* Player */}
            </div>
        </div>
    )
}

export const getServerSideProps = async (context) => {
    const session = await getSession(context)

    return {
        props: {
            session
        }
    }
}
