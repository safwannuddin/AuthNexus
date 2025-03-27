import { type NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  // Allow all access for now, no restrictions
  return NextResponse.next()
}

// Configure routes that use middleware
export const config = {
  matcher: [
    '/dashboard/:path*' // Only apply to dashboard routes
  ]
}