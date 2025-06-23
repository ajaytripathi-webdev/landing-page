// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Mobile Menu Toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            mobileMenu.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
});

// Header Scroll Effect
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Scroll Down
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Scroll Up
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Add animation to buttons
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('mouseover', () => {
        button.style.transform = 'translateY(-3px)';
        button.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
    });
    
    button.addEventListener('mouseout', () => {
        button.style.transform = 'translateY(0)';
        button.style.boxShadow = 'none';
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
});

// Form validation and submission
const form = document.querySelector('.consultation-form');
const thankYouPopup = document.querySelector('.thank-you-popup');
const popupOverlay = document.querySelector('.popup-overlay');
const closePopupBtn = document.querySelector('.close-popup');

// Validation functions
const validators = {
    fullName: (value) => {
        if (!value || typeof value !== 'string' || value.trim().length < 2 || value.trim().length > 100) {
            return "Full name must be between 2 and 100 characters";
        }
        return "";
    },
    emailAddress: (value) => {
        if (!value || typeof value !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
            return "Please enter a valid email address";
        }
        return "";
    },
    phoneNumber: (value) => {
        if (!value || typeof value !== 'string' || !/^[0-9+\-\s()]{10,15}$/.test(value.trim())) {
            return "Please enter a valid phone number";
        }
        return "";
    },
    city: (value) => {
        if (!value || typeof value !== 'string' || value.trim().length < 2 || value.trim().length > 50) {
            return "City must be between 2 and 50 characters";
        }
        return "";
    },
    natureOfBusiness: (value) => {
        if (!value || typeof value !== 'string') {
            return "Please select your nature of business";
        }
        return "";
    },
    yearsInBusiness: (value) => {
        if (!value || typeof value !== 'string') {
            return "Please select years in business";
        }
        return "";
    },
    storeSize: (value) => {
        if (!value || typeof value !== 'string') {
            return "Please select store size";
        }
        return "";
    }
};

// Function to show error message
function showError(input, message) {
    if (!input || !message) return;
    
    const formGroup = input.closest('.input-container');
    if (!formGroup) return;
    
    let errorDiv = formGroup.querySelector('.error-message');
    
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        formGroup.appendChild(errorDiv);
    }
    
    errorDiv.textContent = message;
    input.classList.add('error');
}

// Function to clear error message
function clearError(input) {
    if (!input) return;
    
    const formGroup = input.closest('.input-container');
    if (!formGroup) return;
    
    const errorDiv = formGroup.querySelector('.error-message');
    if (errorDiv) {
        errorDiv.remove();
    }
    input.classList.remove('error');
}

// Function to show thank you popup
function showThankYouPopup() {
    try {
        if (thankYouPopup && popupOverlay) {
            thankYouPopup.classList.add('show');
            popupOverlay.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    } catch (error) {
        console.error('Error showing popup:', error);
    }
}

// Function to hide thank you popup
function hideThankYouPopup() {
    try {
        if (thankYouPopup && popupOverlay) {
            thankYouPopup.classList.remove('show');
            popupOverlay.classList.remove('show');
            document.body.style.overflow = '';
        }
    } catch (error) {
        console.error('Error hiding popup:', error);
    }
}

// Close popup when clicking close button or overlay
if (closePopupBtn) {
    closePopupBtn.addEventListener('click', (e) => {
        e.preventDefault();
        hideThankYouPopup();
    });
}

if (popupOverlay) {
    popupOverlay.addEventListener('click', (e) => {
        e.preventDefault();
        hideThankYouPopup();
    });
}

// Function to reset form
function resetForm() {
    try {
        if (form) {
            form.reset();
            // Clear any error messages
            const errorMessages = form.querySelectorAll('.error-message');
            const errorInputs = form.querySelectorAll('.error');
            
            errorMessages.forEach(error => {
                if (error && error.parentNode) {
                    error.parentNode.removeChild(error);
                }
            });
            
            errorInputs.forEach(input => {
                if (input) {
                    input.classList.remove('error');
                }
            });
        }
    } catch (error) {
        console.error('Error resetting form:', error);
    }
}

// Add input event listeners for real-time validation
if (form) {
    form.querySelectorAll('input, select').forEach(input => {
        if (input && input.name && validators[input.name]) {
            input.addEventListener('input', () => {
                const error = validators[input.name](input.value);
                if (error) {
                    showError(input, error);
                } else {
                    clearError(input);
                }
            });
        }
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        try {
            // Validate all fields
            let hasErrors = false;
            const formData = new FormData(form);
            
            for (let [name, value] of formData.entries()) {
                if (validators[name]) {
                    const input = form.querySelector(`[name="${name}"]`);
                    if (input) {
                        const error = validators[name](value);
                        if (error) {
                            showError(input, error);
                            hasErrors = true;
                        } else {
                            clearError(input);
                        }
                    }
                }
            }
            
            if (hasErrors) {
                return;
            }
            
            const response = await fetch('submit_form.php', {
                method: 'POST',
                body: formData
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            
            if (result.status === 'success') {
                resetForm();
                showThankYouPopup();
            } else {
                if (result.errors) {
                    Object.entries(result.errors).forEach(([field, message]) => {
                        const input = form.querySelector(`[name="${field}"]`);
                        if (input) {
                            showError(input, message);
                        }
                    });
                } else {
                    alert('Error submitting form: ' + (result.message || 'Unknown error occurred'));
                }
            }
        } catch (error) {
            console.error('Form submission error:', error);
            alert('Error submitting form. Please try again.');
        }
    });
}

// About section Read More/Read Less toggle (mobile only)
document.addEventListener('DOMContentLoaded', function () {
    const aboutContent = document.querySelector('.about-content');
    if (!aboutContent) return;
    const p2 = aboutContent.querySelector('.about-p2');
    const btn = aboutContent.querySelector('.about-toggle-btn');
    if (!p2 || !btn) return;

    function isMobile() {
        return window.innerWidth <= 768;
    }

    function updateVisibility() {
        if (isMobile()) {
            p2.style.display = 'none';
            btn.style.display = 'inline-block';
            btn.textContent = 'Read More';
        } else {
            p2.style.display = '';
            btn.style.display = 'none';
        }
    }

    updateVisibility();
    window.addEventListener('resize', updateVisibility);

    btn.addEventListener('click', function () {
        if (p2.style.display === 'none') {
            p2.style.display = 'block';
            btn.textContent = 'Read Less';
        } else {
            p2.style.display = 'none';
            btn.textContent = 'Read More';
        }
    });
}); 