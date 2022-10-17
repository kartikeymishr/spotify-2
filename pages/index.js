import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Spotify 2.0</title>
      </Head>

      <h1 className="text-3xl font-bold underline">This is a DOPE Spotify 2.0 clone</h1>
    </div>
  )
}
