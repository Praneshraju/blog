// Cybersecurity Blog Data
const blogPosts = [
    {
        id: 1,
        title: "Zero Trust Architecture: The Future of Enterprise Security",
        date: "December 10, 2025",
        excerpt: "Exploring how Zero Trust Architecture is revolutionizing enterprise security by eliminating implicit trust and implementing strict access controls. Learn about the core principles and implementation strategies.",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80", // Zero Trust Architecture
        category: "Enterprise Security",
        readTime: "8 min read",
        tags: ["Zero Trust", "Network Security", "Access Control"]
    },
    {
        id: 2,
        title: "Advanced Threat Detection with Machine Learning",
        date: "December 5, 2025",
        excerpt: "How machine learning algorithms are transforming threat detection and response in modern cybersecurity operations. Real-world case studies and implementation insights.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80", // AI Security
        category: "Threat Intelligence",
        readTime: "10 min read",
        tags: ["Machine Learning", "Threat Detection", "AI Security"]
    },
    {
        id: 3,
        title: "Cloud Security Best Practices for 2026",
        date: "November 28, 2025",
        excerpt: "Comprehensive guide to securing cloud infrastructure in an increasingly complex threat landscape. Covering IAM, encryption, and compliance considerations for major cloud providers.",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1744&q=80", // Cloud Security
        category: "Cloud Security",
        readTime: "12 min read",
        tags: ["AWS Security", "Azure", "GCP", "Cloud Compliance"]
    },
    {
        id: 4,
        title: "Ethical Hacking: Getting Started with Penetration Testing",
        date: "November 20, 2025",
        excerpt: "A beginner's guide to ethical hacking and penetration testing. Learn the tools, techniques, and methodologies used by security professionals to identify and fix vulnerabilities.",
        image: "https://images.unsplash.com/photo-1563986768711-b3bde3dc821e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1738&q=80", // Ethical Hacking
        category: "Penetration Testing",
        readTime: "15 min read",
        tags: ["Ethical Hacking", "Penetration Testing", "Kali Linux"]
    },
    {
        id: 5,
        title: "The Rise of Ransomware: Prevention and Response",
        date: "November 15, 2025",
        excerpt: "Understanding the evolving threat of ransomware attacks and how organizations can protect their critical assets. Includes incident response strategies and recovery best practices.",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80", // Ransomware
        category: "Cybersecurity",
        readTime: "14 min read",
        tags: ["Ransomware", "Incident Response", "Cyber Threats"]
    }
];

// Function to create blog post HTML with enhanced styling
function createBlogPost(post) {
    const tags = post.tags.map(tag => `<span class="blog-tag">${tag}</span>`).join('');
    
    return `
        <article class="blog-card" data-category="${post.category.toLowerCase().replace(/\s+/g, '-')}">
            <div class="blog-image">
                <img src="${post.image}" alt="${post.title}">
            </div>
            <div class="blog-content">
                <h3>${post.title}</h3>
                <span class="blog-date">${post.date} • ${post.readTime}</span>
                <div class="blog-excerpt">
                    <p>${post.excerpt}</p>
                    <div class="blog-tags">${tags}</div>
                </div>
            </div>
        </article>
    `;
}

// Function to display blog posts with filtering
function displayBlogPosts() {
    // Use the blog grid container that matches our CSS
    const blogContainer = document.querySelector('.blog-grid') || document.getElementById('blog-posts');
    
    if (blogContainer) {
        // Clear existing content
        blogContainer.innerHTML = '';
        
        // Add each blog post to the container
        blogPosts.forEach(post => {
            blogContainer.innerHTML += createBlogPost(post);
        });
        
        // Initialize animations
        initAnimations();
    }
}

// Initialize animations using Intersection Observer
function initAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in-up');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

// Initialize the blog when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    displayBlogPosts();
    
    // Initialize blog card interactions
    const blogCards = document.querySelectorAll('.blog-card');
    let isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints;
    
    blogCards.forEach(card => {
        let isLocked = false;
        let hoverTimeout;
        
        // Click handler for locking/unlocking
        card.addEventListener('click', function(e) {
            // Don't toggle if clicking on links
            if (e.target.tagName === 'A' || e.target.closest('a')) {
                return;
            }
            
            isLocked = !isLocked;
            card.classList.toggle('expanded', isLocked);
            e.stopPropagation();
        });
        
        // Hover handler for non-touch devices
        if (!isTouchDevice) {
            card.addEventListener('mouseenter', function() {
                if (!isLocked) {
                    hoverTimeout = setTimeout(() => {
                        card.classList.add('expanded');
                    }, 300); // Small delay to prevent accidental hovers
                }
            });
            
            card.addEventListener('mouseleave', function() {
                clearTimeout(hoverTimeout);
                if (!isLocked) {
                    card.classList.remove('expanded');
                }
            });
        }
    });
    
    // Close expanded cards when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.blog-card')) {
            blogCards.forEach(card => {
                if (!card.isLocked) {
                    card.classList.remove('expanded');
                }
            });
        }
    });
    
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            mobileMenuBtn.setAttribute('aria-expanded', 
                mobileMenuBtn.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'
            );
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                if (mainNav && mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                }
                
                // Smooth scroll to target
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without adding to history
                history.pushState(null, null, targetId);
            }
        });
    });
    
    // Back to top button
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Header scroll effect
    const header = document.querySelector('.header');
    
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // Contact form submission
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Here you would typically send the form data to a server
            console.log('Form submitted:', formObject);
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'form-success';
            successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Your message has been sent successfully!';
            
            // Add success message to form
            this.reset();
            this.appendChild(successMessage);
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        });
    }
    
    // Newsletter subscription
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email) {
                // Here you would typically send the email to your newsletter service
                console.log('Subscribed email:', email);
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'newsletter-success';
                successMessage.textContent = 'Thanks for subscribing!';
                
                // Replace form with success message
                this.parentNode.replaceChild(successMessage, this);
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                    this.parentNode.insertBefore(this, successMessage);
                    emailInput.value = '';
                }, 5000);
            }
        });
    }
    
    // Initialize Typed.js for the terminal typing effect
    if (typeof Typed !== 'undefined') {
        const typed = new Typed('.typing', {
            strings: [
                'nmap -sV -sC -p- --script vuln',
                'gobuster dir -u https://example.com -w /usr/share/wordlists/dirb/common.txt',
                'sqlmap -u "https://example.com/page?id=1" --dbs',
                'metasploitconsole',
                'whoami',
                'ls -la',
                'cd /root/Desktop',
                'hydra -l admin -P /usr/share/wordlists/rockyou.txt example.com http-post-form "/login:username=^USER^&password=^PASS^:Invalid credentials"'
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            startDelay: 500,
            loop: true,
            showCursor: false
        });
    }
});

// Add CSS for the terminal typing effect
const terminalStyle = document.createElement('style');
typingStyle.textContent = `
    .typing {
        color: #64d2ff;
        display: inline;
    }
    
    .cursor {
        display: inline-block;
        width: 10px;
        height: 1.2em;
        background: #4cd964;
        margin-left: 2px;
        animation: blink 1s infinite;
        vertical-align: middle;
    }
    
    @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
    }
`;
document.head.appendChild(typingStyle);

// Add CSS for form success messages
const formStyle = document.createElement('style');
formStyle.textContent = `
    .form-success,
    .newsletter-success {
        background: #10b981;
        color: white;
        padding: 0.75rem 1rem;
        border-radius: 4px;
        margin-top: 1rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        animation: fadeInUp 0.3s ease-out;
    }
    
    .form-success i,
    .newsletter-success i {
        font-size: 1.2rem;
    }
    
    .newsletter-success {
        background: #3b82f6;
        justify-content: center;
        text-align: center;
        padding: 1rem;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(formStyle);
