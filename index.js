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
    distance: '60px',
    duration: 1600,
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