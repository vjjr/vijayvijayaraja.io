// Popup functionality
function openPopup(popupId) {
    const popup = document.getElementById(popupId);
    const overlay = document.getElementById('popup-overlay');
    
    if (popup && overlay) {
        popup.style.display = 'block';
        overlay.style.display = 'block';
        setTimeout(() => {
            popup.classList.add('active');
            overlay.classList.add('active');
        }, 10);
    }
}

function closePopup() {
    const activePopup = document.querySelector('.popup.active');
    const overlay = document.getElementById('popup-overlay');
    
    if (activePopup && overlay) {
        activePopup.classList.remove('active');
        overlay.classList.remove('active');
        setTimeout(() => {
            activePopup.style.display = 'none';
            overlay.style.display = 'none';
        }, 300);
    }
}

// Add smooth scrolling to all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Close popup when pressing ESC key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closePopup();
    }
});

// Close popup when clicking outside
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('popup-overlay')) {
        closePopup();
    }
});

// Mobile Menu Toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Email form handling
const form = document.getElementById('emailForm');
const submitButton = document.getElementById('submitButton');
const btnText = submitButton.querySelector('.btn-text');
const btnLoading = submitButton.querySelector('.btn-loading');

form.addEventListener('submit', async function(event) {
    event.preventDefault();
    
    // Show loading state
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline-block';
    submitButton.disabled = true;

    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: {
                'Accept': 'application/json'
            }
        });
        
        const data = await response.json();
        
        if (response.ok) {
            // Show success message
            alert('Message sent successfully!');
            form.reset();
        } else {
            throw new Error(data.error || 'Form submission failed');
        }
    } catch (error) {
        // Show error message
        alert('Failed to send message. Please try again.');
        console.error('Form error:', error);
    }

    // Reset button state
    btnText.style.display = 'inline-block';
    btnLoading.style.display = 'none';
    submitButton.disabled = false;
});

// Mobile menu functionality
function toggleMenu() {
    const menuButton = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    menuButton.classList.toggle('active');
    navLinks.classList.toggle('active');
}

// Form submission handling
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('emailForm');
    const submitButton = document.getElementById('submitButton');
    
    if (form && submitButton) {
        form.addEventListener('submit', (e) => {
            const btnText = submitButton.querySelector('.btn-text');
            const btnLoading = submitButton.querySelector('.btn-loading');
            
            if (btnText && btnLoading) {
                btnText.style.display = 'none';
                btnLoading.style.display = 'inline-block';
                submitButton.disabled = true;
            }
        });
    }
});

// Add scroll event listener for navbar
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        const menuButton = document.querySelector('.mobile-menu');
        const navLinks = document.querySelector('.nav-links');
        menuButton.classList.remove('active');
        navLinks.classList.remove('active');
    });
});
