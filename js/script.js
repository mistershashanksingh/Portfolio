// --------------- manu section navbar ------------------
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active')
}

// ---------------scroll section active link--------------

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');


window.onscroll = () => {

    // ---------------scroll section--------------

    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            // action navbar links
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });

        }
    });

    //==============sticky navbar background==============
    let header = document.querySelector('.header');

    header.classList.toggle('sticky', window.scrollY > 100)
    
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active')

};

//---------------color mode(dark & light)--------------

let darkModeIcon = document.querySelector('#darkMode-icon');
let homeImg = document.querySelector('.home-img img');
let isDarkMode = false;

darkModeIcon.onclick = () => {
    isDarkMode = !isDarkMode;
    darkModeIcon.classList.toggle('bx-sun');
    document.body.classList.toggle('dark-mode');
    updateImage();
};

function updateImage() {
    if (isDarkMode) {
        homeImg.src = 'img/developer.svg';
    } else {
        homeImg.src = 'img/developer-dark.svg';
    }
}

// Rest of your code...


//---------------scroll reveal--------------

// Initialize ScrollReveal
const scrollReveal = ScrollReveal({
    reset: true,
    distance: '15px',
    duration: 2700,
    delay: 450,
});

ScrollReveal().reveal('.home-content, .heading, .footer', { origin: 'top' })
ScrollReveal().reveal('.home-img, .about-img, .contact, .skills-row', { origin: 'bottom' })
ScrollReveal().reveal('.home-content h2,', { origin: 'left' })
ScrollReveal().reveal('.education-content, .about-content', { origin: 'right' })

// ___________________readmore content_______________________________

function toggleParagraph() {
    var paragraph = document.querySelector('.expandable-paragraph');
    var button = document.querySelector('.read-more');
  
    if (paragraph.classList.contains('expanded')) {
        paragraph.style.maxHeight = '2rem';
        paragraph.classList.remove('expanded');
        button.classList.remove('expanded');
        button.textContent = 'Read More';
      } else {
        paragraph.style.maxHeight = 'none';
        paragraph.classList.add('expanded');
        button.classList.add('expanded');
        button.textContent = 'Read Less';
      }
  }
  


// _________________________________container typing effect @home__________________________________
const dynamicText = document.querySelector(".second");
const words = ["Grad Student", "Open Source", "Tech Blogging"];

// Variables to track the position and deletion status of the word
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typeEffect = () => {
    const currentWord = words[wordIndex];
    const currentChar = currentWord.substring(0, charIndex);
    dynamicText.textContent = currentChar;
    dynamicText.classList.add("stop-blinking");

    if (!isDeleting && charIndex < currentWord.length) {
        // If condition is true, type the next character
        charIndex++;
        setTimeout(typeEffect, 200);
    } else if (isDeleting && charIndex > 0) {
        // If condition is true, remove the previous character
        charIndex--;
        setTimeout(typeEffect, 100);
    } else {
        // If word is deleted then switch to the next word
        isDeleting = !isDeleting;
        dynamicText.classList.remove("stop-blinking");
        wordIndex = !isDeleting ? (wordIndex + 1) % words.length : wordIndex;
        setTimeout(typeEffect, 1200);
    }
}

typeEffect();

// sub - contact form 
