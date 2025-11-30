// Smooth scroll reveal animations
document.addEventListener('DOMContentLoaded', function() {
    
    // Create Intersection Observer for fade-in-up animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all elements with fade-in-up class
    const fadeElements = document.querySelectorAll('.fade-in-up');
    fadeElements.forEach(el => observer.observe(el));

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add stagger effect to list items
    const addStaggerDelay = (selector, baseDelay = 0) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el, index) => {
            el.style.transitionDelay = `${baseDelay + (index * 0.1)}s`;
        });
    };

    // Apply stagger to various elements
    addStaggerDelay('.goal-row', 0.1);
    addStaggerDelay('.flow-card', 0.1);
    addStaggerDelay('.flow-card-compact', 0.1);
    addStaggerDelay('.deliv-row', 0.05);
    addStaggerDelay('.summary-card', 0.1);
    addStaggerDelay('.step-item', 0.1);



    // Progress indicator
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 2px;
        background: black;
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });

    // Add fade-in to logo
    const logo = document.querySelector('.logo-container');
    if (logo) {
        logo.style.animation = 'fadeIn 1s ease-out 0.3s forwards';
        logo.style.opacity = '0';
    }


    // Scroll indicator click handler
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const firstSection = document.querySelector('.goals');
            if (firstSection) {
                firstSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Log console message
    console.log('%c✨ UX Proposal Landing Page', 'font-size: 20px; font-weight: bold; color: black;');
    console.log('%cDesigned with attention to detail', 'font-size: 14px; color: gray;');
});

