import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

// firebase docs assure me it's safe to put this in source control
const firebaseApp = initializeApp({
  apiKey: "AIzaSyDwlZg4F03ug86YidZtCHtqZVYtx1Ca8IA",
  authDomain: "graph-chef.firebaseapp.com",
  projectId: "graph-chef",
  storageBucket: "graph-chef.appspot.com",
  messagingSenderId: "693079689120",
  appId: "1:693079689120:web:3992b5caa0aeb3229dc6c5",
})

export const firebaseAuth = getAuth(firebaseApp)
