console.log("Scripts loaded.");

// 1. Select Text Elements
const designerSide = document.getElementById('designer-side');
const coderSide = document.getElementById('coder-side');
const profileImageContainer = document.getElementById('profile-image');

// 2. Select The 3 Images
const imgCenter = document.getElementById('img-center');
const imgRight = document.getElementById('img-right');
const imgLeft = document.getElementById('img-left');

// Helper function to switch images smoothly
function showImage(imageName) {
    // Hide all first
    imgCenter.classList.remove('active');
    imgRight.classList.remove('active');
    imgLeft.classList.remove('active');

    // Show the requested one
    if(imageName === 'center') imgCenter.classList.add('active');
    if(imageName === 'right')  imgRight.classList.add('active');
    if(imageName === 'left')   imgLeft.classList.add('active');
}

// 1. Click "Designer" (Left Text) -> Move Image RIGHT
if (designerSide) {
    designerSide.addEventListener('click', () => {
        // Move Container
        profileImageContainer.classList.remove('move-left');
        profileImageContainer.classList.add('move-right');
        
        // CHANGE IMAGE -> Show Right Photo
        showImage('right');

        // Handle Text Effects
        coderSide.classList.add('shrink-content');
        coderSide.classList.remove('active-side');
        designerSide.classList.remove('shrink-content');
        designerSide.classList.add('active-side');
    });
}

// 2. Click "Coder" (Right Text) -> Move Image LEFT
if (coderSide) {
    coderSide.addEventListener('click', () => {
        // Move Container
        profileImageContainer.classList.remove('move-right');
        profileImageContainer.classList.add('move-left');

        // CHANGE IMAGE -> Show Left Photo
        showImage('left');

        // Handle Text Effects
        designerSide.classList.add('shrink-content');
        designerSide.classList.remove('active-side');
        coderSide.classList.remove('shrink-content');
        coderSide.classList.add('active-side');
    });
}

// 3. Click Image -> RESET to Center
if (profileImageContainer) {
    profileImageContainer.addEventListener('click', () => {
        // Reset Container Position
        profileImageContainer.classList.remove('move-left');
        profileImageContainer.classList.remove('move-right');

        // CHANGE IMAGE -> Show Center Photo
        showImage('center');

        // Reset Text Effects
        designerSide.classList.remove('shrink-content');
        designerSide.classList.remove('active-side');
        coderSide.classList.remove('shrink-content');
        coderSide.classList.remove('active-side');
    });
}
/* --- LIGHTBOX LOGIC --- */

// 1. Select elements
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close-lightbox');
// Select all images inside the photo-grid
const photoStripImages = document.querySelectorAll('.photo-grid img'); 

// 2. Add Click Event to EVERY photo in the strip
photoStripImages.forEach(img => {
    img.addEventListener('click', () => {
        // Set the lightbox image source to match the clicked image
        lightboxImg.src = img.src;
        // Show the lightbox
        lightbox.classList.add('active');
    });
});

// 3. Close when clicking the (X) button
if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });
}

// 4. Close when clicking anywhere on the dark background
if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        // Only close if clicking the background, not the image itself
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
        }
    });
}

/* --- SCROLL ANIMATION (Fade Up) --- */

// 1. Select the image
const graphImage = document.getElementById('skills-graph');

// 2. Create the Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // If the image enters the screen (is intersecting)
        if (entry.isIntersecting) {
            // Add the class that triggers the CSS animation
            entry.target.classList.add('in-view');
            // Optional: Stop watching once it has appeared
            observer.unobserve(entry.target); 
        }
    });
}, {
    threshold: 0.2 // Trigger when 20% of the image is visible
});

// 3. Start watching
if (graphImage) {
    observer.observe(graphImage);
}