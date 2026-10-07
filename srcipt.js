// ==========================================
// 1. INISIALISASI AOS (Animate On Scroll)
// ==========================================
AOS.init({
    duration: 800, // Durasi animasi dalam ms
    easing: 'ease-out-cubic', // Jenis animasi
    once: true, // Animasi hanya berjalan sekali saat di-scroll
    offset: 50 // Jarak dari bawah viewport sebelum animasi dimulai
});

// ==========================================
// 2. DARK MODE TOGGLE
// ==========================================
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Cek preferensi tema dari localStorage atau sistem
const currentTheme = localStorage.getItem('theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

if (currentTheme === 'dark') {
    htmlElement.classList.add('dark');
}

themeToggle.addEventListener('click', () => {
    htmlElement.classList.toggle('dark');
    const isDark = htmlElement.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// ==========================================
// 3. NAVBAR SCROLL EFFECT & ACTIVE LINK
// ==========================================
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    // Efek background navbar saat di-scroll
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }

    // Highlight link aktif berdasarkan section yang sedang dilihat
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// ==========================================
// 4. MOBILE HAMBURGER MENU
// ==========================================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    const icon = hamburger.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Tutup menu mobile saat link diklik
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        const icon = hamburger.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
    });
});

// ==========================================
// 5. BACK TO TOP BUTTON
// ==========================================
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.remove('opacity-0', 'invisible');
        backToTopBtn.classList.add('opacity-100', 'visible');
    } else {
        backToTopBtn.classList.add('opacity-0', 'invisible');
        backToTopBtn.classList.remove('opacity-100', 'visible');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==========================================
// 6. FORM VALIDASI & SUBMIT (SIMULASI)
// ==========================================
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Mencegah reload halaman

    // Ambil data form
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validasi sederhana
    if (!name || !email || !message) {
        alert('Mohon isi semua kolom!');
        return;
    }

    // Validasi format email sederhana
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Format email tidak valid!');
        return;
    }

    // Simulasi pengiriman (Ganti dengan logika backend/API asli seperti EmailJS atau Formspree)
    console.log('Data Form:', { name, email, message });
    
    // Tampilkan pesan sukses
    formSuccess.classList.remove('hidden');
    contactForm.reset();

    // Sembunyikan pesan sukses setelah 4 detik
    setTimeout(() => {
        formSuccess.classList.add('hidden');
    }, 4000);
});

// ==========================================
// 7. AUTO UPDATE TAHUN DI FOOTER
// ==========================================
document.getElementById('current-year').textContent = new Date().getFullYear();