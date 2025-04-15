
// JavaScript for Bouncing DVD Motion
const container = document.getElementById('imageContainer');
const images = container.querySelectorAll('.highlight-image');

let posX = Math.random() * (window.innerWidth - 160); // Random starting X position
let posY = Math.random() * (window.innerHeight - 160); // Random starting Y position
let velocityX = 2, velocityY = 2; // Speed and direction

function moveImages() {
    const imageRect = images[0].getBoundingClientRect();

    // Update position
    posX += velocityX;
    posY += velocityY;

    // Check for boundary collisions
    if (posX + imageRect.width > window.innerWidth || posX < 0) {
        velocityX = -velocityX; // Reverse X direction
    }
    if (posY + imageRect.height > window.innerHeight || posY < 0) {
        velocityY = -velocityY; // Reverse Y direction
    }

    // Apply new position
    container.style.left = `${posX}px`;
    container.style.top = `${posY}px`;

    // Request the next animation frame
    requestAnimationFrame(moveImages);
}

// Start the animation
moveImages();
