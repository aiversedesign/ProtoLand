let currentSlide = 0;
let previousEmotionLevel = 50;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const counterDots = document.querySelectorAll('.counter-dot');
const progressBar = document.querySelector('.progress-bar');

// Emotion levels for each slide (0-100, where 50 is neutral)
const emotionLevels = [50, 50, 25, 25, 25, 20, 20, 20, 20, 25, 20, 15, 30, 25, 35, 35, 35, 30, 75, 75, 80, 80, 80, 75, 65, 65, 35, 35, 60, 70, 70, 60, 55, 45, 75, 60, 60, 70, 75, 75];

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

// Video player controls - Reusable function
function setupVideoControls(videoId, playBtnId, scrubberId, scrubberProgressId, scrubberHandleId) {
    const video = document.getElementById(videoId);
    const playBtn = document.getElementById(playBtnId);
    
    if (!video || !playBtn) return;
    
    const playIcon = playBtn.querySelector('.play-icon');
    const pauseIcon = playBtn.querySelector('.pause-icon');
    const scrubber = document.getElementById(scrubberId);
    const scrubberProgress = document.getElementById(scrubberProgressId);
    const scrubberHandle = document.getElementById(scrubberHandleId);
    
    let isDragging = false;
    
    // Update scrubber progress
    const updateScrubber = () => {
        if (!isDragging && video.duration) {
            const progress = (video.currentTime / video.duration) * 100;
            if (scrubberProgress) scrubberProgress.style.width = progress + '%';
            if (scrubberHandle) scrubberHandle.style.left = progress + '%';
        }
    };
    
    // Update scrubber as video plays
    video.addEventListener('timeupdate', updateScrubber);
    
    // Seek video on scrubber interaction
    const seek = (e) => {
        if (!scrubber) return;
        const rect = scrubber.getBoundingClientRect();
        const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        if (video.duration) {
            const seekTime = pos * video.duration;
            video.currentTime = seekTime;
            const progress = pos * 100;
            if (scrubberProgress) scrubberProgress.style.width = progress + '%';
            if (scrubberHandle) scrubberHandle.style.left = progress + '%';
        }
    };
    
    // Scrubber click
    if (scrubber) {
        scrubber.addEventListener('click', (e) => {
            e.stopPropagation();
            seek(e);
        });
        
        // Scrubber drag
        scrubber.addEventListener('mousedown', (e) => {
            e.stopPropagation();
            isDragging = true;
            seek(e);
        });
        
        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                seek(e);
            }
        });
        
        document.addEventListener('mouseup', () => {
            isDragging = false;
        });
    }

    // Toggle play/pause
    playBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (video.paused) {
            video.play();
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
        } else {
            video.pause();
            playIcon.style.display = 'block';
            pauseIcon.style.display = 'none';
        }
    });
    
    // Update button state when video plays/pauses
    video.addEventListener('play', () => {
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
    });
    
    video.addEventListener('pause', () => {
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
    });
    
    // Click on video to play/pause
    video.addEventListener('click', (e) => {
        e.stopPropagation();
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    });
}

// Initialize video controls
document.addEventListener('DOMContentLoaded', () => {
    // First video
    setupVideoControls('redesignVideo', 'videoPlayBtn', 'videoScrubber', 'videoScrubberProgress', 'videoScrubberHandle');
    
    // Second video
    setupVideoControls('redesignVideo2', 'videoPlayBtn2', 'videoScrubber2', 'videoScrubberProgress2', 'videoScrubberHandle2');
    
    // Third video
    setupVideoControls('redesignVideo3', 'videoPlayBtn3', 'videoScrubber3', 'videoScrubberProgress3', 'videoScrubberHandle3');
});

