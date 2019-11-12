export default function({ store, redirect, route }) {
  if (isAuthenticated && atAuthRoute(route)) {
    return redirect("/u");
  } else if (!isAuthenticated && atUserRoute(route)) {
    return redirect("/auth/login");
  }
}

function isAuthenticated(store) {
  return store.getters["auth/isAuthenticated"];
}

function atUserRoute(route) {
  return route.matched.some(record => record.path === "/u");
}

function atAuthRoute(route) {
  return route.matched.some(record => record.path === "/auth");
}
