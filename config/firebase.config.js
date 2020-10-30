export const firebaseConfig = {
  apiKey: "AIzaSyBOYoxaEM-K8MLGuzPQ68z3rR2d7Hb1v6U",
  authDomain: "wunderfund-server.firebaseapp.com",
  databaseURL: "https://wunderfund-server.firebaseio.com",
  projectId: "wunderfund-server",
  storageBucket: "wunderfund-server.appspot.com",
  messagingSenderId: "222886391134",
  appId: "1:222886391134:web:82469ba2bcaf85037f33cf",
};

export const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be whitelisted in the Firebase Console.
  url: process.env.BASE_URL || "localhost:3000",
  // This must be true.
  handleCodeInApp: true,
};
