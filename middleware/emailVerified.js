import { auth } from "@/plugins/firebase";
import { getUserFromCookie } from "@/helpers";

export default function({ redirect, req }) {
  const user = process.server ? getUserFromCookie(req) : auth.currentUser;
  if (user && !user.emailVerified) redirect("/u");
}
