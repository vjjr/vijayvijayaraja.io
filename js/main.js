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
