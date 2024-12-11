// import { NextResponse, NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//     const accessToken = request.cookies.get('accessToken')?.value;
//     const userValue = request.cookies.get('user')?.value;

//     const url = request.nextUrl.clone();
//     const pathname = url.pathname;

//     // Define restricted routes
//     const authRoutes = ['/login', '/register']; // Routes only accessible if NOT logged in
//     const protectedRoutes = ['/profile',]; // Routes only accessible if logged in

//     // Logic for protecting routes
//     // 
//     if (!accessToken || ((accessToken === "logout") && !userValue)) {
//         // User not logged in
//         if (protectedRoutes.some(route => pathname.startsWith(route))) {
//             // Redirect to login if trying to access protected routes
//             return NextResponse.redirect(new URL('/login', request.url));
//         }
//     } else {
//         // User is logged in
//         if (authRoutes.some(route => pathname.startsWith(route))) {
//             // Redirect to profile (or another page) if trying to access auth routes
//             return NextResponse.redirect(new URL('/profile', request.url));
//         }
//     }

//     // Allow access to all other routes
//     return NextResponse.next();
// }

// export const config = {
//     matcher: ['/profile/:path*', '/login', '/register'], // Match these specific routes
// };



import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const accessToken = request.cookies.get('accessToken')?.value;
    const userValue = request.cookies.get('user')?.value;

    const url = request.nextUrl.clone();
    const pathname = url.pathname;

    // Define restricted routes
    const authRoutes = ['/login', '/register']; // Routes for non-logged-in users
    const protectedRoutes = ['/profile']; // Routes for logged-in users

    // If the user is not logged in
    if (!accessToken || accessToken === "logout") {
        if (protectedRoutes.some(route => pathname.startsWith(route))) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    // If the user is logged in
    if (accessToken && accessToken !== "logout") {
        if (authRoutes.some(route => pathname.startsWith(route))) {
            return NextResponse.redirect(new URL('/profile', request.url));
        }
    }

    // Allow access to all other routes
    return NextResponse.next();
}

export const config = {
    matcher: ['/profile/:path*', '/login', '/register'], // Match these specific routes
};
