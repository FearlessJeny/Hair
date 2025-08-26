// Show NavBar
const nav = document.querySelector('.nav-menu');
const toggle = document.querySelector('.nav-toggle');
toggle.onclick = function () {
    nav.classList.toggle('show-nav')
}

// Remove NavBar
const navLink = document.querySelectorAll('.nav-link')

function linkActive() {
    const navMenu = document.querySelector('.nav-menu')
        navMenu.classList.remove('show-nav')
}
    navLink.forEach(n => n.addEventListener('click', linkActive))

    // Change Active Color
    const linkColor = document.querySelectorAll('.nav-link')
    function colorLink(){
        if(linkColor){
            linkColor.forEach(l => l.classList.remove('active'))
            this.classList.add('active')
        }
    }
    linkColor.forEach(l => l.addEventListener('click', colorLink))





/*=============== SCROLL REVEAL ANIMATION ===============*/

const sr = ScrollReveal({
    origin: 'top',
    distance: '30px',
    duration: 1300,
    delay: 300,
})

sr.reveal(` .gallery-content, .package-cards, .footer`)
sr.reveal(`.home-content`, { delay: 700, distance: '100px', origin: 'right' })
sr.reveal(`.home-img, .btn, pri-card`, { delay: 700, distance: '100px', origin: 'left' })

// sr.reveal(`.logo`, { delay: 1400, distance: '100px', origin: 'bottom', rotate: { z: -90 } })

sr.reveal(`.section-title`, { delay: 200, interval: 100 })
sr.reveal(`.about-description, .pri-card1`, { origin: 'right' })
sr.reveal(`.pri-card`, { origin: 'left' })
sr.reveal(`.about-img`, { interval: 100 })

// sr.reveal(`.gallery-content`, { delay: 700, distance: '100px', origin: 'left' })
// sr.reveal(`.gallery-content  `, { delay: 1400, distance: '100px', origin: 'bottom', rotate: { z: 90 } })
sr.reveal(`.box1, .cardleft `, { origin: 'left' })
sr.reveal(`.box2, .cardright`, { origin: 'right' })



//Change Header Bg When Scrol Down

function scrollHeader() {
    const scrollHeader = document.getElementById('header')
    if(this.scrollY >= 200){
        scrollHeader.classList.add('scroll-header')
    }else{
        scrollHeader.classList.remove('scroll-header')
    }
}

window.addEventListener('scroll', scrollHeader);



// Otzivi

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("reviewForm");
    const list = document.getElementById("reviewsList");
    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

    function renderReviews() {
        list.innerHTML = "";
        reviews.forEach(r => {
            const card = document.createElement("div");
            card.className = "review-card";
            card.innerHTML = `
        <h3>${r.name}</h3>
        <div class="stars">${"⭐".repeat(r.rating)}</div>
        <p>${r.message}</p>
      `;
            list.prepend(card); // новые слева
        });
    }

    form.addEventListener("submit", e => {
        e.preventDefault();
        const name = document.getElementById("name").value.trim();
        const message = document.getElementById("message").value.trim();
        const rating = form.rating.value;

        if (name && message) {
            reviews.unshift({ name, message, rating }); // добавляем в начало
            localStorage.setItem("reviews", JSON.stringify(reviews));
            renderReviews();
            form.reset();
            form.rating.value = 5; // сброс на 5 звёзд
        }
    });

    renderReviews();
});

