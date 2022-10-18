import {getToken} from "next-auth/jwt";
import {NextResponse} from "next/server";

export const middleware = async (req) => {
    // Token will exist if user is logged in
    const token = await getToken({req, secret: process.env.JWT_SECRET})
    const {pathname: requestPathname} = req.nextUrl

    if (requestPathname.startsWith('/_next')) return NextResponse.next();

    // Allow the request if the following is true
    // 1. If the token exists
    // 2. If path name includes '/api/auth'
    if (requestPathname.includes('/api/auth') || token) {
        return NextResponse.next()
    }

    // Redirect them to login if they don't have token and are requesting a protected route
    if (!token && requestPathname === '/') {
        // Redirect to '/login'
        const redirectUrl = req.nextUrl.clone()
        redirectUrl.pathname = '/login'
        return NextResponse.redirect(redirectUrl)
    }

    if (!token && requestPathname !== '/login') {
        // Redirect to '/login'
        const redirectUrl = req.nextUrl.clone()
        redirectUrl.pathname = '/login'
        return NextResponse.redirect(redirectUrl)
    }
}