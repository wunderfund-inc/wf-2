import { auth } from "@/plugins/firebase";
import { getUserFromCookie } from "@/helpers";

const masterEmailList = [
  "chiou.kai@gmail.com",
  "justin@wunderfund.co",
  "marvin@wunderfund.co"
];

export default function({ redirect, req }) {
  const user = process.server ? getUserFromCookie(req) : auth.currentUser;
  if (!masterEmailList.includes(user.email)) redirect("/u");
}
