document.addEventListener('DOMContentLoaded', () => {
    // Theme related code can be added here later if needed
});

class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type() {
        // Current text
        const fullTxt = this.words;

        // If not deleting, add char
        if (!this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        // Insert txt into element
        this.txtElement.innerHTML = this.txt;

        // Initial Type Speed
        let typeSpeed = 50;

        if (this.txt === fullTxt) {
            return; // Stop when done typing
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Init On DOM Load
document.addEventListener('DOMContentLoaded', init);

// Init App
function init() {
    const txtElement = document.getElementById('bio-text');
    if (txtElement) { // Add null check
        const words = "I am Vijay Shrivarshan Vijayaraja, a 12th grader, currently enrolled at Laurel Heights Secondary School, driven by a profound passion for programming, Machine Learning/AI, and web development. In my relentless pursuit of knowledge and skill enhancement, I proudly hold distinctions as one of the youngest Salesforce Administrators and AI Associate certification holders. Moreover, I stand as the youngest individual to be certified in ISC2 certified in CyberSecurity and Google Cybersecurity certification. Beyond certifications, my enthusiasm extends to working on robotics projects, crafting circuit boards, and actively participating in hackathons. I am committed to broadening my expertise in technology and eagerly anticipate applying my skills to real-world projects and challenges.";
        
        // Init TypeWriter
        new TypeWriter(txtElement, words);
    }
}
