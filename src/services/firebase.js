// src/services/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const cfg = {
  apiKey: process.env.REACT_APP_FB_API_KEY,
  authDomain: process.env.REACT_APP_FB_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FB_PROJECT_ID,
};

if (!cfg.apiKey) {
  console.warn("Firebase env vars missing. Check .env.local and restart server.");
}

export const app = initializeApp(cfg);
export const db = getFirestore(app);
