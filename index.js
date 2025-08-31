 // Menu Mobile Toggle
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Header Scroll Effect
        const header = document.getElementById('header');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
        
        // Matrix Rain Effect
        function createMatrixRain() {
            const canvas = document.createElement('canvas');
            const container = document.getElementById('matrixRain');
            container.appendChild(canvas);
            
            const ctx = canvas.getContext('2d');
            let width = container.offsetWidth;
            height = container.offsetHeight;
            
            canvas.width = width;
            canvas.height = height;
            
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&!*';
            const fontSize = 12;
            const columns = Math.floor(width / fontSize);
            
            const drops = [];
            for (let i = 0; i < columns; i++) {
                drops[i] = Math.floor(Math.random() * height / fontSize);
            }
            
            function draw() {
                ctx.fillStyle = 'rgba(5, 5, 5, 0.05)';
                ctx.fillRect(0, 0, width, height);
                
                ctx.fillStyle = '#0f0';
                ctx.font = `${fontSize}px Orbitron`;
                
                for (let i = 0; i < drops.length; i++) {
                    const text = characters[Math.floor(Math.random() * characters.length)];
                    
                    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                    
                    if (drops[i] * fontSize > height && Math.random() > 0.975) {
                        drops[i] = 0;
                    }
                    
                    drops[i]++;
                }
            }
            
            setInterval(draw, 33);
            
            window.addEventListener('resize', () => {
                width = container.offsetWidth;
                height = container.offsetHeight;
                canvas.width = width;
                canvas.height = height;
            });
        }
        
        // Smooth Scroll with Animation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Close mobile menu if open
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // Calculate position to scroll to
                    const targetPosition = targetSection.offsetTop - 80;
                    
                    // Smooth scroll
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Add highlight animation to section
                    setTimeout(() => {
                        targetSection.classList.add('highlight');
                        
                        // Remove highlight class after animation completes
                        setTimeout(() => {
                            targetSection.classList.remove('highlight');
                        }, 1000);
                    }, 500);
                }
            });
        });
        
        // Initialize effects when page loads
        window.addEventListener('load', () => {
            createMatrixRain();
            
            // Typing animation
            const typingElement = document.querySelector('.typing-text');
            const text = typingElement.textContent;
            typingElement.textContent = '';
            typingElement.style.width = '0';
            typingElement.style.borderRight = '2px solid var(--neon-green)';
            
            let i = 0;
            function typeWriter() {
                if (i < text.length) {
                    typingElement.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 100);
                }
            }
            
            setTimeout(typeWriter, 1000);
        });