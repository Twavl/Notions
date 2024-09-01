// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    const smoothScroll = (targetId) => {
        const target = document.getElementById(targetId);
        if (target) {
            window.scrollTo({
                top: target.offsetTop,
                behavior: 'smooth'
            });
        }
    };

    document.querySelectorAll('.nav-button').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            smoothScroll(targetId);
        });
    });

    // Lazy loading for images
    const lazyLoadImages = () => {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        }, { rootMargin: '50px' });

        document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
    };

    lazyLoadImages();

    // Form submission handling with validation
    const handleFormSubmission = (form) => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (validateForm(form)) {
                // Here you would typically send the form data to a server
                console.log('Form submitted successfully');
                showFormFeedback(form, 'success', 'Thank you for your message!');
                form.reset();
            }
        });
    };

    const validateForm = (form) => {
        let isValid = true;
        form.querySelectorAll('input, textarea').forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                showFieldError(field, 'This field is required');
            } else {
                clearFieldError(field);
            }
        });
        return isValid;
    };

    const showFieldError = (field, message) => {
        const errorElement = field.nextElementSibling || document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        if (!field.nextElementSibling) field.parentNode.insertBefore(errorElement, field.nextSibling);
    };

    const clearFieldError = (field) => {
        const errorElement = field.nextElementSibling;
        if (errorElement && errorElement.className === 'error-message') {
            errorElement.remove();
        }
    };

    const showFormFeedback = (form, type, message) => {
        const feedbackElement = form.querySelector('.form-feedback') || document.createElement('div');
        feedbackElement.className = `form-feedback ${type}`;
        feedbackElement.textContent = message;
        if (!form.querySelector('.form-feedback')) form.appendChild(feedbackElement);
    };

    const contactForm = document.getElementById('contact-form');
    if (contactForm) handleFormSubmission(contactForm);

    // Add a scroll-to-top button with smooth animation
    const createScrollToTopButton = () => {
        const button = document.createElement('button');
        button.innerHTML = '&uarr;';
        button.className = 'scroll-to-top';
        button.setAttribute('aria-label', 'Scroll to top');
        document.body.appendChild(button);
        return button;
    };

    const scrollToTopBtn = createScrollToTopButton();

    const toggleScrollToTopButton = () => {
        const scrollPosition = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const showThreshold = windowHeight * 0.3;

        if (scrollPosition > showThreshold) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    };

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Throttle scroll event for better performance
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(() => {
                toggleScrollToTopButton();
                scrollTimeout = null;
            }, 100);
        }
    });

    // Initial check for scroll-to-top button visibility
    toggleScrollToTopButton();

    // Add typing effect for "Hi, I'm Notions" text with a smoother animation
    const typeWriterEffect = (element, text, speed = 50) => {
        let i = 0;
        element.textContent = '';
        
        const typeWriter = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, speed + Math.random() * 50);
            }
        };

        typeWriter();
    };

    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        typeWriterEffect(heroTitle, heroTitle.textContent);

        // Split the text into separate spans for each word
        const words = heroTitle.textContent.split(' ');
        heroTitle.innerHTML = words.map(word => `<span class="hero-word">${word}</span>`).join(' ');

        // Add hover effect to each word
        heroTitle.querySelectorAll('.hero-word').forEach(word => {
            word.addEventListener('mouseover', () => {
                word.style.transform = 'scale(1.2)';
                word.style.transition = 'transform 0.3s ease';
            });
            word.addEventListener('mouseout', () => {
                word.style.transform = 'scale(1)';
            });
        });
    }

    // Add subtle parallax effect to the hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.pageYOffset;
            heroSection.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
        });
    }
});
