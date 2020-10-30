export default function (doc) {
  if (doc.type === "Campaign") {
    return "/preview";
  }
  return "/";
}
