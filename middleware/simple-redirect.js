import { auth } from "@/plugins/firebase";
import { getUserFromCookie } from "@/helpers";

export default function({ redirect, req, route }) {
  const user = process.server ? getUserFromCookie(req) : auth.currentUser;
  if (user && ["/auth/login", "/auth/register"].includes(route.path)) {
    return redirect("/auth/attest");
  }
}
