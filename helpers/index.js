import jwtDecode from "jwt-decode";
import cookieParser from "cookieparser";

export function getUserFromCookie(req) {
  if (process.server && process.static) return;
  if (!req.headers.cookie) return;

  if (req.headers.cookie) {
    const parsed = cookieParser.parse(req.headers.cookie);
    const accessTokenCookie = parsed.access_token;
    if (!accessTokenCookie) return;

    const decodedToken = jwtDecode(accessTokenCookie);
    if (!decodedToken) return;

    return decodedToken;
  }
}
