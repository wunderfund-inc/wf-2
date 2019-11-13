export default function({ store, redirect, route }) {
  const isAuthenticated = () => store.getters["user/userData"];
  const atRoute = url => route.matched.some(record => record.path === url);

  if (
    isAuthenticated &&
    (atRoute("/auth/login") || atRoute("/auth/register"))
  ) {
    return redirect("/u");
  } else if (!store.getters["user/userData"] && atRoute("/u")) {
    return redirect("/auth/login");
  }
}
