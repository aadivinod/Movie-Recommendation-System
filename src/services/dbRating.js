// src/services/dbRating.js
import { db } from "./firebase";
import {
  addDoc, collection, query, where, getDocs,
  serverTimestamp, doc, deleteDoc, onSnapshot
} from "firebase/firestore";

const ratingsCol = collection(db, "ratings");

export async function setRating(userId, movieId, value) {
  const q = query(ratingsCol,
    where("userId", "==", userId),
    where("movieId", "==", movieId)
  );
  const snap = await getDocs(q);
  for (const d of snap.docs) await deleteDoc(doc(db, "ratings", d.id));
  await addDoc(ratingsCol, { userId, movieId, value, createdAt: serverTimestamp() });
}

export async function clearRating(userId, movieId) {
  const q = query(ratingsCol,
    where("userId", "==", userId),
    where("movieId", "==", movieId)
  );
  const snap = await getDocs(q);
  for (const d of snap.docs) {
    await deleteDoc(doc(db, "ratings", d.id));
  }
}

export async function getUserRatings(userId) {
  const q = query(ratingsCol, where("userId", "==", userId));
  const snap = await getDocs(q);
  const out = {};
  snap.forEach(d => { out[d.data().movieId] = d.data().value; });
  return out;
}

export function onRatings(userId, cb) {
  const q = query(ratingsCol, where("userId", "==", userId));
  return onSnapshot(q, (snap) => {
    const out = {};
    snap.forEach(d => { out[d.data().movieId] = d.data().value; });
    cb(out);
  });
}
