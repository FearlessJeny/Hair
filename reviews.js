import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import {
    getFirestore, collection, addDoc, onSnapshot,
    query, orderBy, serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDekKj4gyCG6-d3slECnuNFkLWr9uWiOLM",
  authDomain: "masterreviews-d377a.firebaseapp.com",
  databaseURL: "https://masterreviews-d377a-default-rtdb.firebaseio.com",
  projectId: "masterreviews-d377a",
  storageBucket: "masterreviews-d377a.firebasestorage.app",
  messagingSenderId: "955941878615",
  appId: "1:955941878615:web:6a9fd56d1b4e62e36b1c12"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const form = document.getElementById("reviewForm");
const list = document.getElementById("reviewsList");

function renderCard({ name, message, rating }) {
    const card = document.createElement("div");
    card.className = "review-card";
    card.innerHTML = `
    <h3>${name}</h3>
    <div class="stars">${"⭐".repeat(rating)}</div>
    <p>${message}</p>
  `;
    list.prepend(card);
}

const reviewsRef = collection(db, "reviews");
const q = query(reviewsRef, orderBy("createdAt", "desc"));
onSnapshot(q, (snap) => {
    list.innerHTML = "";
    snap.forEach(doc => renderCard(doc.data()));
});

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const message = document.getElementById("message").value.trim();
    const rating = Number(form.rating.value || 5);
    if (!name || !message) return;
    await addDoc(reviewsRef, { name, message, rating, createdAt: serverTimestamp() });
    form.reset();
    form.rating.value = 5;
});


