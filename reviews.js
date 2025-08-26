// import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
// import {
//     getFirestore, collection, addDoc, onSnapshot,
//     query, orderBy, serverTimestamp
// } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// const firebaseConfig = {
//   apiKey: "AIzaSyDekKj4gyCG6-d3slECnuNFkLWr9uWiOLM",
//   authDomain: "masterreviews-d377a.firebaseapp.com",
//   databaseURL: "https://masterreviews-d377a-default-rtdb.firebaseio.com",
//   projectId: "masterreviews-d377a",
//   storageBucket: "masterreviews-d377a.firebasestorage.app",
//   messagingSenderId: "955941878615",
//   appId: "1:955941878615:web:6a9fd56d1b4e62e36b1c12"
// };

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// const form = document.getElementById("reviewForm");
// const list = document.getElementById("reviewsList");

// function renderCard({ name, message, rating }) {
//     const card = document.createElement("div");
//     card.className = "review-card";
//     card.innerHTML = `
//     <h3>${name}</h3>
//     <div class="stars">${"⭐".repeat(rating)}</div>
//     <p>${message}</p>
//   `;
//     list.prepend(card);
// }

// const reviewsRef = collection(db, "reviews");
// const q = query(reviewsRef, orderBy("createdAt", "desc"));
// onSnapshot(q, (snap) => {
//     list.innerHTML = "";
//     snap.forEach(doc => renderCard(doc.data()));
// });

// form.addEventListener("submit", async (e) => {
//     e.preventDefault();
//     const name = document.getElementById("name").value.trim();
//     const message = document.getElementById("message").value.trim();
//     const rating = Number(form.rating.value || 5);
//     if (!name || !message) return;
//     await addDoc(reviewsRef, { name, message, rating, createdAt: serverTimestamp() });
//     form.reset();
//     form.rating.value = 5;
// });



import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js";
import { getDatabase, ref, set, onValue, push } from "https://www.gstatic.com/firebasejs/11.7.1/firebase-database.js";

// Конфигурация Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDekKj4gyCG6-d3slECnuNFkLWr9uWiOLM",
  authDomain: "masterreviews-d377a.firebaseapp.com",
  databaseURL: "https://masterreviews-d377a-default-rtdb.firebaseio.com",
  projectId: "masterreviews-d377a",
  storageBucket: "masterreviews-d377a.firebasestorage.app",
  messagingSenderId: "955941878615",
  appId: "1:955941878615:web:6a9fd56d1b4e62e36b1c12"
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const form = document.getElementById("retroReviewForm");
const display = document.getElementById("retroReviews");

// Обработчик отправки формы
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = form.name.value.trim();
  const review = form.review.value.trim();
  const rating = form.rating.value;

  if (!name || !review || !rating) {
    alert("Пожалуйста, заполните все поля!");
    return;
  }

  const newReview = {
    name,
    review,
    rating,
    timestamp: Date.now()  // Уникальное время для сортировки
  };

  // Запись отзыва в Firebase
  const reviewRef = ref(database, 'reviews');
  try {
    await push(reviewRef, newReview); // Добавляем новый отзыв
    form.reset(); // Сбрасываем форму после успешной отправки
  } catch (error) {
    console.error("Ошибка при добавлении отзыва:", error);
    alert("Не удалось сохранить отзыв. Попробуйте снова.");
  }
});

// Слушаем изменения в базе данных
const reviewRef = ref(database, 'reviews');
onValue(reviewRef, (snapshot) => {
  const data = snapshot.val();
  display.innerHTML = ''; // Очищаем отображение

  if (data) {
    // Сортируем отзывы по времени (от новых к старым)
    const sortedKeys = Object.keys(data).sort((a, b) => data[b].timestamp - data[a].timestamp);
    sortedKeys.forEach((key) => {
      const { name, review, rating } = data[key];
      const entry = document.createElement("div");
      entry.classList.add('review-entry');
      entry.innerHTML = `
        <span class="review-name">${name}:</span>
        <span class="review-text">${review}</span>
        <div class="review-stars">${"★".repeat(rating)}</div>
      `;
      display.appendChild(entry);
    });
  } else {
    display.innerHTML = "<p>Нет отзывов для отображения.</p>";
  }
});




