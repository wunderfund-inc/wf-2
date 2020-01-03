import { auth } from "@/plugins/firebase";
import { getUserFromCookie } from "@/helpers";

export default function({ redirect, req, store }) {
  const user = process.server ? getUserFromCookie(req) : auth.currentUser;
  if (!user) redirect("/auth/login");
}
