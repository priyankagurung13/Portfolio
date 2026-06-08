// Sticky Header & Active Menu Link
const header = document.querySelector('.header');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar a');
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

window.onscroll = () => {
    // Sticky header
    if (window.scrollY > 50) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }

    // Active link highlighting
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
};

// Mobile Menu Toggle
menuIcon.onclick = () => {
    navbar.classList.toggle('active');
    const icon = menuIcon.querySelector('i');
    if (navbar.classList.contains('active')) {
        icon.classList.remove('bx-menu');
        icon.classList.add('bx-x');
    } else {
        icon.classList.remove('bx-x');
        icon.classList.add('bx-menu');
    }
};

// Close menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('active');
        const icon = menuIcon.querySelector('i');
        icon.classList.remove('bx-x');
        icon.classList.add('bx-menu');
    });
});

// Scroll Reveal Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Stop observing once animated
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with animation classes
document.querySelectorAll('.fade-in, .slide-up').forEach(element => {
    observer.observe(element);
});

document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const form = e.target;
    const data = new FormData(form);

    const res = await fetch('https://formspree.io/f/mykawpej', {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
    });

    if (res.ok) {
        window.location.href = 'thankyou.html';
    } else {
        alert('Something went wrong. Please try again.');
    }
});
