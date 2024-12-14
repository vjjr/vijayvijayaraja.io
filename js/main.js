// Popup functionality
function openPopup(popupId) {
    const overlay = document.getElementById('popup-overlay');
    const popup = document.getElementById(popupId);
    
    // First display the elements
    overlay.style.display = 'block';
    popup.style.display = 'block';
    
    // Force a reflow to enable the transition
    void overlay.offsetWidth;
    void popup.offsetWidth;
    
    // Add active class to trigger animations
    overlay.classList.add('active');
    popup.classList.add('active');
    
    document.body.style.overflow = 'hidden';
}

function closePopup() {
    const overlay = document.getElementById('popup-overlay');
    const popups = document.querySelectorAll('.popup');
    
    // Remove active class to trigger closing animations
    overlay.classList.remove('active');
    popups.forEach(popup => {
        popup.classList.remove('active');
    });
    
    // Wait for animations to complete before hiding elements
    setTimeout(() => {
        overlay.style.display = 'none';
        popups.forEach(popup => {
            popup.style.display = 'none';
        });
        document.body.style.overflow = '';
    }, 300); // Match this with the CSS transition duration
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
function sendEmail(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Create mailto URL with form data
    const mailtoUrl = `mailto:vjvijayaraja@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}%0A%0AFrom: ${encodeURIComponent(email)}`;
    
    // Open default email client
    window.location.href = mailtoUrl;
    
    // Clear form
    document.getElementById('emailForm').reset();
}
