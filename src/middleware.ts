import { NextRequest, NextResponse } from "next/server";

/**
 * Middleware for admin panel authentication
 */
export function middleware(request: NextRequest) {
  // Only protect /admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const authorization = request.headers.get("authorization");

    if (!authorization) {
      return new NextResponse("Authentication required", {
        status: 401,
        headers: {
          "WWW-Authenticate": 'Basic realm="Admin Panel", charset="UTF-8"',
        },
      });
    }

    try {
      const base64Credentials = authorization.split(" ")[1];
      const credentials = Buffer.from(base64Credentials, "base64").toString("utf-8");
      const [username, password] = credentials.split(":");

      const validUsername = process.env.ADMIN_USER || "admin";
      const validPassword = process.env.ADMIN_PASSWORD || "admin123";

      if (username !== validUsername || password !== validPassword) {
        return new NextResponse("Invalid credentials", {
          status: 401,
          headers: {
            "WWW-Authenticate": 'Basic realm="Admin Panel"',
          },
        });
      }
    } catch {
      return new NextResponse("Invalid credentials", {
        status: 401,
        headers: {
          "WWW-Authenticate": 'Basic realm="Admin Panel"',
        },
      });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
