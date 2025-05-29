document.addEventListener("DOMContentLoaded", function() {
    // Create cursor elements
    const cursor = document.createElement('div');
    const cursorDot = document.createElement('div');
    cursor.className = 'cursor';
    cursorDot.className = 'cursor-dot';
    document.body.appendChild(cursor);
    document.body.appendChild(cursorDot);

    // Create cursor trails
    const numTrails = 5;
    const trails = [];
    
    for (let i = 0; i < numTrails; i++) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        document.body.appendChild(trail);
        trails.push({
            element: trail,
            x: 0,
            y: 0
        });
    }

    // Initialize typing animation
    const typingTitle = document.querySelector('.typing-title');
    if (typingTitle) {
        const originalText = typingTitle.innerHTML;
        const textContent = originalText.replace(/<[^>]*>/g, '');
        const highlightStart = originalText.indexOf('<span');
        const highlightEnd = originalText.indexOf('</span>') + 7;
        
        typingTitle.textContent = '';
        let charIndex = 0;
        let displayText = '';
        
        function getRandomDelay() {
            return Math.random() * 100 + 50; // Random delay between 50ms and 150ms
        }
        
        function typeTitle() {
            if (charIndex < textContent.length) {
                const currentPos = displayText.length;
                const currentChar = textContent[charIndex];
                
                // If we're at the position where highlight starts
                if (currentPos === highlightStart) {
                    displayText += '<span class="highlight">';
                }
                
                displayText += currentChar;
                
                // If we're at the position where highlight ends
                if (currentPos === highlightEnd - 8) { // -8 to account for </span>
                    displayText += '</span>';
                }
                
                typingTitle.innerHTML = displayText;
                charIndex++;
                
                // Add longer pause after punctuation
                const delay = ['.', '!', '?', ','].includes(currentChar) 
                    ? 200 
                    : getRandomDelay();
                
                setTimeout(typeTitle, delay);
            }
        }
        
        // Start typing after a short delay
        setTimeout(typeTitle, 500);
    }

    let mouseX = 0;
    let mouseY = 0;

    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Animate trails
    function updateTrails() {
        trails.forEach((trail, index) => {
            const ratio = (trails.length - index) / trails.length;
            
            trail.x += (mouseX - trail.x) * (0.2 * ratio);
            trail.y += (mouseY - trail.y) * (0.2 * ratio);
            
            trail.element.style.left = trail.x + 'px';
            trail.element.style.top = trail.y + 'px';
            trail.element.style.opacity = ratio * 0.5;
        });
        
        requestAnimationFrame(updateTrails);
    }
    updateTrails();

    // Cursor hover effects
    document.querySelectorAll('a, button, .skill-box').forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            trails.forEach(trail => {
                trail.element.style.opacity = '0';
            });
        });

        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            trails.forEach((trail, index) => {
                const ratio = (trails.length - index) / trails.length;
                trail.element.style.opacity = ratio * 0.5;
            });
        });
    });

    // Create and append loading animation
    const loadingAnimation = document.createElement('div');
    loadingAnimation.className = 'loading-animation';
    document.body.appendChild(loadingAnimation);

    // Remove loading animation after content loads
    window.addEventListener('load', () => {
        loadingAnimation.style.opacity = '0';
        setTimeout(() => loadingAnimation.remove(), 500);
    });

    const toggleBtn = document.getElementById('toggle-btn');
    const body = document.body;
    const navbar = document.querySelector('.navbar');
    
    // Smooth scroll for navigation links
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

    // Navbar scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add/remove scrolled class for navbar styling
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll
        if (currentScroll > lastScroll && currentScroll > 300) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        lastScroll = currentScroll;
    });

    // Theme toggle with smooth transition
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const currentTheme = localStorage.getItem('theme');
    
    if (currentTheme === 'light') {
        body.classList.add('light-mode');
        body.classList.remove('dark-mode');
        toggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
    } else if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
        body.classList.remove('light-mode');
        toggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        // If no theme is stored, use system preference
        if (prefersDarkScheme.matches) {
            body.classList.add('dark-mode');
            body.classList.remove('light-mode');
            toggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            body.classList.add('light-mode');
            body.classList.remove('dark-mode');
            toggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
        }
    }

    toggleBtn.addEventListener('click', function() {
        // Add transition class for smooth color changes
        document.documentElement.style.setProperty('--transition-speed', '0.3s');
        body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        
        const isDarkMode = body.classList.contains('dark-mode');
        
        if (isDarkMode) {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            toggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            toggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
        }
        
        // Animate the icon
        const icon = toggleBtn.querySelector('i');
        icon.style.transform = 'rotate(360deg)';
        icon.style.transition = 'transform 0.5s ease';
        
        setTimeout(() => {
            icon.style.transform = 'rotate(0deg)';
        }, 500);
        
        // Remove transition after animation completes
        setTimeout(() => {
            document.documentElement.style.setProperty('--transition-speed', '0s');
        }, 300);
    });

    // Skill boxes hover effect
    const skillBoxes = document.querySelectorAll('.skill-box');
    skillBoxes.forEach(box => {
        box.addEventListener('mouseenter', () => {
            box.style.transform = 'translateY(-5px)';
        });
        
        box.addEventListener('mouseleave', () => {
            box.style.transform = 'translateY(0)';
        });
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add animation to sections
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Add parallax effect to profile photo
    const profilePhoto = document.querySelector('.profile-photo');
    if (profilePhoto) {
        window.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            const x = (clientX - innerWidth / 2) / 50;
            const y = (clientY - innerHeight / 2) / 50;
            
            profilePhoto.style.transform = `translate(${x}px, ${y}px)`;
        });
    }

    // Initialize AOS
    AOS.init({ 
        duration: 1200, 
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Update copyright year
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
