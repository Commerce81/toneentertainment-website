// ============================================
// GOOGLE SHEETS CONFIGURATION FOR REVIEWS
// ============================================
// Replace this with your Google Sheets Web App URL
const GOOGLE_SHEETS_URL = 'YOUR_GOOGLE_SHEETS_WEB_APP_URL_HERE';

// ============================================
// LOAD REVIEWS FROM GOOGLE SHEETS
// ============================================
async function loadReviews() {
    const container = document.getElementById('reviewsContainer');
    if (!container) return;
    
    try {
        const response = await fetch(GOOGLE_SHEETS_URL);
        const data = await response.json();
        
        if (data && data.reviews && data.reviews.length > 0) {
            displayReviews(data.reviews);
        } else {
            container.innerHTML = '<p style="text-align: center; color: #999; grid-column: 1 / -1;">No reviews available yet.</p>';
        }
    } catch (error) {
        console.error('Error loading reviews:', error);
        // Show fallback reviews if Google Sheets fails
        displayFallbackReviews();
    }
}

function displayReviews(reviews) {
    const container = document.getElementById('reviewsContainer');
    container.innerHTML = '';
    
    reviews.forEach(review => {
        const card = document.createElement('div');
        card.className = 'review-card';
        card.innerHTML = `
            ${review.eventType ? `<div class="event-type">${review.eventType}</div>` : ''}
            <div class="stars">★★★★★</div>
            <p>"${review.text}"</p>
            <div class="reviewer">${review.reviewer || review.source || ''}</div>
        `;
        container.appendChild(card);
    });
}

function displayFallbackReviews() {
    const fallbackReviews = [
        {
            eventType: 'Corporate Event',
            text: 'Tone Entertainment provided exceptional service for our annual company gala. Professional, responsive, and the entertainment was perfect for our brand.',
            reviewer: 'Corporate Client - Los Angeles'
        },
        {
            eventType: 'Wedding',
            text: 'Matt and his team made our wedding unforgettable. From ceremony to reception, everything was flawless. Highly recommend!',
            reviewer: 'Wedding Client - Santa Monica'
        },
        {
            eventType: 'Private Party',
            text: 'Outstanding experience from start to finish. The band was incredible and kept everyone dancing all night.',
            reviewer: 'Private Event - Beverly Hills'
        }
    ];
    
    displayReviews(fallbackReviews);
}

// ============================================
// MOBILE MENU TOGGLE
// ============================================
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
}

// Close mobile menu when clicking a link
if (navLinks) {
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
            }
        });
    });
}

// ============================================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// ============================================
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

// ============================================
// CONTACT FORM HANDLING
// ============================================
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        const action = contactForm.getAttribute('action');
        
        // If Formspree URL hasn't been updated yet, prevent submission
        if (!action || action.includes('YOUR_FORM_ID')) {
            e.preventDefault();
            alert('Contact form needs to be connected to Formspree. Please update the form action URL in contact.html');
            return;
        }
        
        // Otherwise, let Formspree handle it normally
        // After submission, user will see Formspree's default page
        // To customize, follow the same steps as Matt Commerce site
    });
}

// ============================================
// INITIALIZE ON PAGE LOAD
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Load reviews if on reviews page
    if (document.getElementById('reviewsContainer')) {
        loadReviews();
    }
    
    // Add any other initialization here
    console.log('Tone Entertainment site loaded');
});