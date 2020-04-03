export default function({ store, redirect }) {
  const address = store.getters["user/address"];
  if (Object.values(address).some(el => el === null)) {
    return redirect("/u/profile");
  }
}
