// flashcard-backend.js
// Firestore CRUD for Topics and Cards with Subcollections

import { db } from "./firebaseApp";
import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  getDoc,
  getDocs,writeBatch
} from "firebase/firestore";

/**********************************************
 *  FIRESTORE STRUKTÚRA
 *  topics (COLLECTION)
 *    └─ topicId (DOCUMENT)
 *         name: string
 *         └─ cards (SUBCOLLECTION)
 *              └─ cardId (DOCUMENT)
 *                   question
 *                   answer
 *                   
 **********************************************/
// 🔹 TÉMA LÉTREHOZÁSA
export const addTopic = async (name) => {
    try {
        const collectionRef = collection(db, "topics"); 
        await addDoc(collectionRef, {name});
    } catch (error) {
    console.error("Hiba a témakör hozzáadásakor:", error);
    }
}
// Téma + al-collection (cards) törlése
export const deleteTopicWithCards = async (topicId) => {
  try {
    const topicRef = doc(db, "topics", topicId);
    const cardsRef = collection(topicRef, "cards");
    // 1) Lekérjük a kártyákat
    const cardsSnap = await getDocs(cardsRef);
    // 2) Batch törlés a kártyákra
    const batch = writeBatch(db);//a Firestore egyik beépített művelete, amivel több írást / törlést egyetlen tranzakcióban tudsz lefuttatni.Ezért használjuk subcollection törlésére is.
    cardsSnap.forEach((card) => {
      batch.delete(card.ref);
    });
    await batch.commit(); // kártyák törlése kész
    // 3) Maga a témadokumentum törlése
    await deleteDoc(topicRef);
    console.log("Téma és összes kártya törölve:", topicId);
  } catch (error) {
    console.error("Téma törlési hiba:", error);
  }
};
// 🔹 KÁRTYA HOZZÁADÁSA EGY TÉMÁHOZ
export const addCard = async (topicId, card) => {
  try {
    const subColRef = collection(db, "topics", topicId, "cards");
    await addDoc(subColRef, {...card});
  } catch (error) {
    console.error("Kártya létrehozási hiba:", error);
  }
};

// 🔹 EGY KÁRTYA MÓDOSÍTÁSA
export const updateCard = async (topicId, cardId, updatedData) => {
  try {
    const docRef = doc(db, "topics", topicId, "cards", cardId);
    await updateDoc(docRef, {...updatedData});
  } catch (error) {
    console.error("Kártya frissítési hiba:", error);
  }
};

// 🔹 EGY KÁRTYA TÖRLÉSE
export const deleteCard = async (topicId, cardId) => {
  try {
    await deleteDoc(doc(db, "topics", topicId, "cards", cardId));
  } catch (error) {
    console.error("Kártya törlési hiba:", error);
  }
};

/*******************************************************************
 *  EGYSZERI OLVASÁS 
 *******************************************************************/

export const readTopicsOnce = async (setTopics) => {
  try {
    const docRef =collection(db, "topics");
    const snap = await getDocs(docRef);
    setTopics(snap.docs.map((d)=>({ id: d.id, ...d.data() }) ))
  } catch (error) {
    console.error("Téma lekérési hiba:", error);
    return null;
  }
};

export const readCardsOnce = async (topicId,setCards) => {
  try {
    const subColRef = collection(db, "topics", topicId, "cards");
    const snap = await getDocs(subColRef);

    setCards(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
  } catch (error) {
    console.error("Egyszeri kártya lekérési hiba:", error);
    return [];
  }
};
