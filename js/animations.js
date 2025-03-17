// Loading Screen Handler
class LoadingScreen {
    constructor() {
        this.loadingScreen = document.querySelector('.loading-screen');
        this.loadingStatus = document.querySelector('.loading-status');
        this.loadingProgress = document.querySelector('.loading-progress');
        this.initialized = false;
        this.progressValue = 0;
        
        this.loadingSteps = [
            'Initializing systems...',
            'Loading resources...',
            'Configuring interface...',
            'Preparing animations...',
            'Starting up...'
        ];
        
        this.init();
    }

    init() {
        document.body.classList.add('loading');
        // Start loading automatically
        this.startLoading();
    }

    async startLoading() {
        this.initialized = true;
        
        // Start the progress animation
        for (let i = 0; i <= 100; i++) {
            await this.updateProgress(i);
        }
        
        // Complete loading
        setTimeout(() => {
            this.completeLoading();
        }, 500);
    }

    async updateProgress(progress) {
        return new Promise(resolve => {
            setTimeout(() => {
                this.progressValue = progress;
                this.loadingProgress.style.width = `${progress}%`;
                
                // Update status message based on progress
                const stepIndex = Math.floor((progress / 100) * this.loadingSteps.length);
                if (stepIndex < this.loadingSteps.length) {
                    this.loadingStatus.textContent = this.loadingSteps[stepIndex];
                }
                
                resolve();
            }, 20); // Adjust speed of progress bar here
        });
    }

    completeLoading() {
        this.loadingStatus.textContent = 'Launch complete!';
        
        setTimeout(() => {
            document.body.classList.remove('loading');
            document.body.classList.add('loaded');
            this.loadingScreen.classList.add('fade-out');
            
            setTimeout(() => {
                this.loadingScreen.style.display = 'none';
                initScrollAnimations();
                // Dispatch event to show cat
                document.dispatchEvent(new Event('loadingComplete'));
            }, 500);
        }, 1000);
    }
}

// Initialize animations and loading screen
document.addEventListener('DOMContentLoaded', () => {
    new LoadingScreen();
});

// Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: "0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Function to start observing elements
function initScrollAnimations() {
    // Animate cards
    const cards = document.querySelectorAll('.content-card');
    cards.forEach((card, index) => {
        card.style.setProperty('--animation-order', index);
        observer.observe(card);
    });

    // Animate section titles
    const titles = document.querySelectorAll('.section-title');
    titles.forEach(title => {
        observer.observe(title);
    });
} 