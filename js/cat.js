class Neko {
    constructor() {
        this.element = document.createElement('div');
        this.element.id = 'neko';
        document.body.appendChild(this.element);
        
        this.x = window.innerWidth / 2;
        this.y = window.innerHeight / 2;
        this.targetX = this.x;
        this.targetY = this.y;
        
        this.state = 'idle';
        this.frameCount = 0;
        this.direction = 'right';
        this.idleTime = 0;
        this.currentIdleAnimation = 'awake';
        this.idleAnimationDuration = 0;
        
        this.states = {
            idle: ['awake.png', 'awake.png'],
            running: {
                up: ['up1.png', 'up2.png'],
                down: ['down1.png', 'down2.png'],
                left: ['left1.png', 'left2.png'],
                right: ['right1.png', 'right2.png'],
                upleft: ['upleft1.png', 'upleft2.png'],
                upright: ['upright1.png', 'upright2.png'],
                downleft: ['downleft1.png', 'downleft2.png'],
                downright: ['downright1.png', 'downright2.png']
            },
            sleeping: ['sleep1.png', 'sleep2.png'],
            scratching: ['scratch1.png', 'scratch2.png'],
            yawning: ['yawn1.png', 'yawn2.png']
        };
        
        this.setupEventListeners();
        this.update();
    }
    
    setupEventListeners() {
        document.addEventListener('mousemove', (e) => {
            this.targetX = e.clientX;
            this.targetY = e.clientY;
            this.idleTime = 0;
            this.currentIdleAnimation = 'awake';
        });
    }
    
    getDirection() {
        const dx = this.targetX - this.x;
        const dy = this.targetY - this.y;
        const angle = Math.atan2(dy, dx);
        const degrees = angle * 180 / Math.PI;
        
        if (Math.abs(dx) < 5 && Math.abs(dy) < 5) return 'idle';
        
        if (degrees >= -22.5 && degrees < 22.5) return 'right';
        if (degrees >= 22.5 && degrees < 67.5) return 'downright';
        if (degrees >= 67.5 && degrees < 112.5) return 'down';
        if (degrees >= 112.5 && degrees < 157.5) return 'downleft';
        if (degrees >= 157.5 || degrees < -157.5) return 'left';
        if (degrees >= -157.5 && degrees < -112.5) return 'upleft';
        if (degrees >= -112.5 && degrees < -67.5) return 'up';
        if (degrees >= -67.5 && degrees < -22.5) return 'upright';
        
        return 'idle';
    }
    
    chooseRandomIdleAnimation() {
        const animations = ['scratching', 'sleeping', 'yawning'];
        return animations[Math.floor(Math.random() * animations.length)];
    }
    
    update() {
        const direction = this.getDirection();
        
        if (direction === 'idle') {
            this.idleTime++;
            if (this.idleTime > 30) { // After about 0.5 seconds of idle
                if (this.currentIdleAnimation === 'awake') {
                    this.currentIdleAnimation = this.chooseRandomIdleAnimation();
                    this.idleAnimationDuration = 0;
                }
                
                this.state = this.currentIdleAnimation;
                this.idleAnimationDuration++;
                
                // Switch back to awake after animation completes
                if (this.idleAnimationDuration > 240) { // 4 seconds per animation
                    this.currentIdleAnimation = 'awake';
                    this.state = 'idle';
                    this.idleAnimationDuration = 0;
                    this.idleTime = 0; // Reset idle time to trigger new animation
                }
            }
        } else {
            this.state = 'running';
            this.direction = direction;
            this.idleTime = 0;
            this.currentIdleAnimation = 'awake';
            this.idleAnimationDuration = 0;
            
            // Move towards target
            const speed = 3;
            const dx = this.targetX - this.x;
            const dy = this.targetY - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance > speed) {
                this.x += (dx / distance) * speed;
                this.y += (dy / distance) * speed;
            } else {
                this.x = this.targetX;
                this.y = this.targetY;
            }
        }
        
        // Update sprite
        this.frameCount++;
        let sprite;
        if (this.state === 'running') {
            const frames = this.states.running[this.direction];
            sprite = frames[Math.floor(this.frameCount / 10) % frames.length];
        } else {
            const frames = this.states[this.state];
            sprite = frames[Math.floor(this.frameCount / 20) % frames.length];
        }
        
        // Update element
        this.element.style.left = `${this.x - 32}px`;
        this.element.style.top = `${this.y - 32}px`;
        this.element.style.backgroundImage = `url('assets/cat/${sprite}')`;
        
        requestAnimationFrame(() => this.update());
    }
}

// Initialize Neko when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new Neko();
});
