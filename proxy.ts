import nextAuthMiddleware from "next-auth/middleware";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function proxy(req: any) {
  return nextAuthMiddleware(req);
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
