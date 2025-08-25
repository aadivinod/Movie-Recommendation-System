import { db } from "./firebase";
import {
  addDoc, collection, query, where, getDocs,
  doc, deleteDoc, serverTimestamp, onSnapshot
} from "firebase/firestore";

const wlCol = collection(db, "watchlist");

/** Return array of movieIds */
export async function getWatchlist(userId) {
  const q = query(wlCol, where("userId", "==", userId));
  const snap = await getDocs(q);
  return snap.docs.map(d => d.data().movieId);
}

export async function toggleWatchlist(userId, movieId) {
  const q = query(wlCol,
    where("userId", "==", userId),
    where("movieId", "==", movieId)
  );
  const snap = await getDocs(q);
  if (snap.size) {
    await deleteDoc(doc(db, "watchlist", snap.docs[0].id));
  } else {
    await addDoc(wlCol, { userId, movieId, createdAt: serverTimestamp() });
  }
}

/** Live subscription (optional) */
export function onWatchlist(userId, cb) {
  const q = query(wlCol, where("userId", "==", userId));
  return onSnapshot(q, (snap) => {
    cb(snap.docs.map(d => d.data().movieId));
  });
}
