const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const mainContainer = document.getElementById('main-container');
const successContainer = document.getElementById('success-container');

// Initial setup for the No button to make sure it aligns with the layout initially
// We'll let CSS handle the initial render, but once we hover, we'll switch to absolute positioning
// relative to the viewport or body to let it roam freely.

let isMoving = false;

noBtn.addEventListener('mouseover', function () {
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);

    noBtn.style.position = 'fixed'; // Switch to fixed to move anywhere on screen
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
});

// Also handle click just in case they manage to click it (e.g. on mobile or fast reflex)
noBtn.addEventListener('click', function (e) {
    e.preventDefault();
    // Move it again!
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
    noBtn.style.position = 'fixed';
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
});

yesBtn.addEventListener('click', function () {
    // Hide the question
    mainContainer.classList.add('hidden');

    // Show the success message
    successContainer.classList.remove('hidden');

    // Trigger confetti
    triggerConfetti();
});

function triggerConfetti() {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        // since particles fall down, start a bit higher than random
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
}
