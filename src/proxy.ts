import {
  clerkMiddleware,
  createRouteMatcher,
} from '@clerk/nextjs/server'

// 1. Xác định các route cần bảo vệ (Private)
const isProtectedRoute = createRouteMatcher(['/main(.*)'])

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    // Bỏ qua các file tĩnh và internals của Next.js
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Luôn chạy middleware cho API routes
    '/(api|trpc)(.*)',
  ],
}
