let currentSlide = 0;
let previousEmotionLevel = 50;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const counterDots = document.querySelectorAll('.counter-dot');
const progressBar = document.querySelector('.progress-bar');

// Emotion levels for each slide (0-100, where 50 is neutral)
const emotionLevels = [50, 50, 25, 75, 60, 60, 50, 50, 50, 50, 50, 40, 75, 75, 75, 75, 75, 70, 70, 60, 50, 75, 75, 75, 75, 65, 60, 45, 45, 55, 50, 50, 80, 80, 80, 75, 85, 85];

function updateEmotionMeter(level, showDifference = true) {
    const emotionFillElement = document.getElementById('emotionFill');
    const emotionBulbElement = document.getElementById('emotionBulb');
    const emotionNumberElement = document.getElementById('emotionNumber');
    
    if (!emotionFillElement || !emotionBulbElement || !emotionNumberElement) {
        setTimeout(() => updateEmotionMeter(level), 100);
        return;
    }
    
    const fillHeight = Math.max(level, 0);
    emotionFillElement.style.height = fillHeight + '%';
    
    if (showDifference) {
        const difference = level - previousEmotionLevel;
        
        if (difference !== 0) {
            const sign = difference > 0 ? '+' : '';
            emotionNumberElement.textContent = `${sign}${difference}`;
            emotionNumberElement.classList.add('show');
            
            setTimeout(() => {
                emotionNumberElement.classList.remove('show');
            }, 2000);
        }
    }
    
    // Update previous level for next calculation
    previousEmotionLevel = level;
    
    let fillColor, bulbColor, glowColor;
    
    if (level === 0) {
        fillColor = 'transparent';
        bulbColor = 'radial-gradient(circle at 30% 30%, #666, #444)';
        glowColor = 'rgba(100, 100, 100, 0.2)';
        emotionFillElement.style.boxShadow = 'none';
    } else if (level < 25) {
        fillColor = 'linear-gradient(to top, #f44336 0%, #e57373 100%)';
        bulbColor = 'radial-gradient(circle at 30% 30%, #e57373, #f44336)';
        glowColor = 'rgba(244, 67, 54, 0.4)';
        emotionFillElement.style.boxShadow = `0 -2px 10px ${glowColor}, inset 0 0 5px rgba(255,255,255,0.2)`;
    } else if (level < 50) {
        fillColor = 'linear-gradient(to top, #ff9800 0%, #ffb74d 100%)';
        bulbColor = 'radial-gradient(circle at 30% 30%, #ffb74d, #ff9800)';
        glowColor = 'rgba(255, 152, 0, 0.4)';
        emotionFillElement.style.boxShadow = `0 -2px 10px ${glowColor}, inset 0 0 5px rgba(255,255,255,0.2)`;
    } else if (level < 75) {
        fillColor = 'linear-gradient(to top, #FFC107 0%, #ffeb3b 100%)';
        bulbColor = 'radial-gradient(circle at 30% 30%, #ffeb3b, #FFC107)';
        glowColor = 'rgba(255, 193, 7, 0.4)';
        emotionFillElement.style.boxShadow = `0 -2px 10px ${glowColor}, inset 0 0 5px rgba(255,255,255,0.2)`;
    } else {
        fillColor = 'linear-gradient(to top, #4CAF50 0%, #66BB6A 100%)';
        bulbColor = 'radial-gradient(circle at 30% 30%, #66BB6A, #4CAF50)';
        glowColor = 'rgba(76, 175, 80, 0.4)';
        emotionFillElement.style.boxShadow = `0 -2px 10px ${glowColor}, inset 0 0 5px rgba(255,255,255,0.2)`;
    }
    
    emotionFillElement.style.background = fillColor;
    emotionBulbElement.style.background = bulbColor;
    emotionBulbElement.style.boxShadow = `0 4px 15px ${glowColor}, inset 0 0 8px rgba(255,255,255,0.3), inset -2px -2px 4px rgba(0,0,0,0.2)`;
}

function showSlide(index, direction = 'forward') {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
    
    counterDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
    
    const progress = 1 + (index / (totalSlides - 1)) * 99;
    progressBar.style.width = progress + '%';
    
    updateEmotionMeter(emotionLevels[index], direction === 'forward');
    
    currentSlide = index;
}

function nextSlide() {
    if (currentSlide < totalSlides - 1) {
        showSlide(currentSlide + 1, 'forward');
    }
}

function previousSlide() {
    if (currentSlide > 0) {
        showSlide(currentSlide - 1, 'backward');
    }
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
    } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        previousSlide();
    }
});

// Dot navigation
counterDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
    });
});

// Initialize
updateEmotionMeter(emotionLevels[0]);
previousEmotionLevel = emotionLevels[0]; // Initialize the previous level

// Prevent context menu
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

