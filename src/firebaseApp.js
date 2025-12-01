import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebaseConfig";
import { getFirestore } from "firebase/firestore";

//Létrejön egy Firebase App példány, ami az összes szolgáltatást (auth, database, storage stb.) innen éri el.
const app = initializeApp(firebaseConfig);// a függvény elindítja a Firebase alkalmazást a te projekted beállításaival.

export const db = getFirestore(app);//Firestore adatbázis inicializálása