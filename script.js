// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission handling
const bookingForm = document.getElementById('bookingForm');
const bookingModal = document.getElementById('bookingModal');
const closeModalBtn = document.querySelector('.close-modal');
const closeModalBtn2 = document.getElementById('closeModalBtn');
const referenceIdElement = document.getElementById('referenceId');

bookingForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Generate a unique reference ID
    const timestamp = new Date().getTime().toString().slice(-6);
    const randomNum = Math.floor(Math.random() * 1000);
    const referenceId = `ADS-${new Date().getFullYear()}-${timestamp}${randomNum}`;
    
    // Update the reference ID in the modal
    referenceIdElement.textContent = referenceId;
    
    // Show the modal
    bookingModal.style.display = 'flex';
    
    // In a real application, you would send the data to a server here
    console.log('Booking submitted:', data);
    
    // Reset the form
    this.reset();
});

// Close modal when clicking the close button
closeModalBtn.addEventListener('click', () => {
    bookingModal.style.display = 'none';
});

closeModalBtn2.addEventListener('click', () => {
    bookingModal.style.display = 'none';
});

// Close modal when clicking outside of it
window.addEventListener('click', (e) => {
    if (e.target === bookingModal) {
        bookingModal.style.display = 'none';
    }
});

// Payment method selection
const paymentRadios = document.querySelectorAll('input[name="payment"]');
const paymentDetails = document.getElementById('paymentDetails');

paymentRadios.forEach(radio => {
    radio.addEventListener('change', function() {
        updatePaymentDetails(this.value);
    });
});

function updatePaymentDetails(method) {
    let details = '';
    
    switch(method) {
        case 'cash':
            details = '<p>You can make payment when you visit our shop. We accept cash in Ghana Cedis (GHS).</p>';
            break;
        case 'mobile_money':
            details = '<p>After booking confirmation, we will send you our Mobile Money details for payment. We accept MTN Momo, Vodafone Cash, and AirtelTigo Money.</p>';
            break;
        case 'card':
            details = '<p>We accept Visa and Mastercard payments. A payment link will be sent to you after booking confirmation.</p>';
            break;
        default:
            details = '<p>You can make payment when you visit our shop or via mobile money after booking confirmation.</p>';
    }
    
    paymentDetails.innerHTML = details;
}

// Set minimum date for booking to today
const appointmentDate = document.getElementById('appointmentDate');
const today = new Date().toISOString().split('T')[0];
appointmentDate.min = today;

// Set a default date (3 days from now)
const defaultDate = new Date();
defaultDate.setDate(defaultDate.getDate() + 3);
const defaultDateFormatted = defaultDate.toISOString().split('T')[0];
appointmentDate.value = defaultDateFormatted;

// Active navigation link based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector(`.nav-links a[href*="${sectionId}"]`).classList.add('active');
        } else {
            document.querySelector(`.nav-links a[href*="${sectionId}"]`).classList.remove('active');
        }
    });
});

// Open Map button functionality
const openMapBtn = document.getElementById('openMap');
openMapBtn.addEventListener('click', () => {
    // In a real application, this would open Google Maps with the shop location
    alert('In a real website, this would open Google Maps with the shop location at: 123 Fashion Street, Osu, Accra, Ghana');
    
    // For demonstration, we'll simulate opening a new window
    // window.open('https://www.google.com/maps/search/?api=1&query=123+Fashion+Street+Osu+Accra+Ghana', '_blank');
});

// Generate a random reference ID for demonstration
function generateReferenceId() {
    const prefix = 'ADS';
    const year = new Date().getFullYear();
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `${prefix}-${year}-${randomNum}`;
}

// Initialize payment details
updatePaymentDetails('cash');

// Add animation to elements when they come into view
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .portfolio-item').forEach(el => {
    observer.observe(el);
});

// Add a simple loading animation for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', function() {
        this.classList.add('loaded');
    });
});