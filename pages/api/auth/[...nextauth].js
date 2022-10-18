import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"
import {LOGIN_URL} from "../../../lib/spotify";
import spotifyApi from "../../../lib/spotify";

const refreshAccessToken = async (token) => {
    try {
        spotifyApi.setAccessToken(token.accessToken)
        spotifyApi.setRefreshToken(token.refreshToken)

        const {body: refreshedToken} = await spotifyApi.refreshAccessToken()
        console.log("REFRESHED TOKEN IS", refreshedToken);

        return {
            ...token,
            accessToken: refreshedToken.access_token,
            accessTokenExpires: Date.now + refreshedToken.expires_in * 1000,
            refreshedToken: refreshedToken.refresh_token ?? token.refreshToken
        }
    } catch (error) {
        console.error(error)

        return {
            ...token,
            error: 'RefreshAccessTokenError'
        }
    }
}

export const authOptions = {
    providers: [
        SpotifyProvider({
            clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
            clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
            authorization: LOGIN_URL
        }),
    ],
    secret: process.env.JWT_SECRET,
    pages: {
        signIn: '/login'
    },
    callbacks: {
        async jwt({token, account, user}) {
            // If initial signIn ~
            if (account && user) {
                return {
                    ...token,
                    accessToken: account.access_token,
                    refreshToken: account.refresh_token,
                    username: account.providerAccountId,
                    accessTokenExpires: account.expires_at * 1000 // Convert to ms
                }
            }

            // If coming back to site and access token is still valid
            if (Date.now() < token.accessTokenExpires) {
                console.log("EXISTING TOKEN IS VALID");
                return token
            }

            // Access token has expired
            console.log("TOKEN HAS EXPIRED");
            return await refreshAccessToken(token)
        },

        async session({session, token}) {
            session.user.accessToken = token.accessToken
            session.user.refreshToken = token.refreshToken
            session.user.username = token.username

            return session
        }
    }
}

export default NextAuth(authOptions)