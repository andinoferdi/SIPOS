import { auth } from "@/auth";

export default auth((request) => {
  if (!request.nextUrl.pathname.startsWith("/dashboard")) {
    return;
  }

  if (request.auth) {
    return;
  }

  const signInUrl = new URL("/signin", request.nextUrl.origin);
  signInUrl.searchParams.set("callbackUrl", request.nextUrl.href);

  return Response.redirect(signInUrl);
});

export const config = {
  matcher: ["/dashboard/:path*"],
};
