document.addEventListener('DOMContentLoaded', () => {

    // Element Cache & Setup ✨
    const bgm = document.querySelector('#bgm');
    bgm.volume = 0.2;
    const tapOverlay = document.querySelector('#tapOverlay');
    const character = document.querySelector('#character');
    const message = document.querySelector('#message');
    const cloudLayer = document.querySelector('#cloudLayer');
    const petalLayer = document.querySelector('#petalLayer');
    const dustLayer = document.querySelector('#dustLayer');
    const sparkleLayer = document.querySelector('#sparkleLayer');
    const heartLayer = document.querySelector('#heartLayer');
    const isMobile = /Mobi|Android|iPhone/i.test(navigator.userAgent);

    // Father's Day Compliments
    const compliments = [
        "You're my hero!", "Best dad ever! 🏆", "Strong, wise, and kind 💙",
        "No one compares!", "My guiding star ⭐", "So cool and amazing! 😎", "Very demure, very polite"
    ];

    // ❤️ Floating Hearts Function ❤️
    const createFloatingHearts = () => {
        const numHearts = isMobile ? 5 : 10;
        const bluePurpleColors = ['#a29bfe', '#74b9ff', '#8e44ad', '#6c5ce7', '#a29bfe', '#55efc4'];
        for (let i = 0; i < numHearts; i++) {
            const heartContainer = document.createElement('div');
            heartContainer.className = 'heart-container';
            const heart = document.createElement('div');
            heart.className = 'heart';

            const size = Math.random() * (isMobile ? 10 : 15) + (isMobile ? 10 : 15);
            const duration = Math.random() * 2 + (isMobile ? 3 : 2.5);
            const color = bluePurpleColors[Math.floor(Math.random() * bluePurpleColors.length)];
            const leftPos = Math.random() * (window.innerWidth - size - 20) + 10;

            heart.style.width = `${size}px`;
            heart.style.height = `${size}px`;
            heart.style.backgroundColor = color;

            heartContainer.style.left = `${leftPos}px`;
            heartContainer.style.bottom = `-${Math.random() * 20 + 10}px`;
            heartContainer.style.animationDuration = `${duration}s`;
            heartContainer.style.animationDelay = `${Math.random() * 1.5}s`;

            heartContainer.append(heart);
            (heartLayer || petalLayer).append(heartContainer);
            setTimeout(() => heartContainer.remove(), duration * 1000 + 2000);
        }
    };

    //  Main Animation Kickoff
    const startCardAnimations = () => {
        character.classList.add('enter');
        character.addEventListener('animationend', (e) => {
            if (e.animationName === 'slideInCharacter') {
                let trailCount = 0;
                const maxTrails = 10;
                const trailInterval = setInterval(() => {
                    if (trailCount >= maxTrails) {
                        clearInterval(trailInterval);
                        return;
                    }
                    const trail = document.createElement('div');
                    trail.className = 'dust';
                    const offset = character.getBoundingClientRect();
                    trail.style.left = `${offset.left + (character.offsetWidth / 2) + (Math.random() * 40 - 20)}px`;
                    trail.style.top = `${offset.top + character.offsetHeight - 30 + (Math.random() * 20 - 10)}px`;
                    dustLayer.append(trail);
                    setTimeout(() => trail.remove(), 800);
                    trailCount++;
                }, 60);

                character.style.animation += ', bounce 0.25s ease-in-out';

                message.classList.add('show');
                createFloatingHearts();
            }
        }, { once: true });

        const numClouds = isMobile ? 3 : 5;
        const cloudSizes = ['small', 'medium', 'large'];
        for (let i = 0; i < numClouds; i++) {
            const cloud = document.createElement('div');
            cloud.classList.add('cloud', 'fluffy', cloudSizes[Math.floor(Math.random() * cloudSizes.length)]);
            cloud.style.top = `${Math.random() * 40 + 5}%`;
            cloud.style.opacity = '0';
            cloud.style.transition = 'opacity 1.5s';
            cloudLayer.append(cloud);
            setTimeout(() => {
                cloud.style.opacity = (Math.random() * 0.3) + 0.6;
            }, Math.random() * 500);
        }

        const numPetals = isMobile ? 8 : 15;
        for (let i = 0; i < numPetals; i++) {
            const petal = document.createElement('div');
            petal.className = 'petal';
            petal.style.left = `${Math.random() * window.innerWidth}px`;
            petal.style.top = `-${Math.random() * 20 + 20}px`;
            petal.style.animationDuration = `${Math.random() * 3 + 4}s`;
            petal.style.animationDelay = `${Math.random() * 2}s`;
            petal.style.opacity = Math.random() * 0.4 + 0.6;
            petalLayer.append(petal);
        }

        setInterval(() => {
            const msg = compliments[Math.floor(Math.random() * compliments.length)];
            const comp = document.createElement('div');
            comp.className = 'compliment';
            comp.innerHTML = msg; // Use .innerHTML to render emojis
            const floatDuration = isMobile ? (Math.random() * 3 + 10) + 's' : (Math.random() * 2 + 8) + 's';
            comp.style.left = `${Math.random() * 70 + 15}vw`;
            comp.style.bottom = isMobile ? '12vh' : '8vh';
            comp.style.animationDuration = floatDuration;
            petalLayer.append(comp);
            setTimeout(() => comp.remove(), parseFloat(floatDuration) * 1000 + 500);
        }, isMobile ? 5000 : 4000);

        let lastMove = 0;
        document.addEventListener('mousemove', (e) => {
            if (Date.now() - lastMove < 16) return;
            lastMove = Date.now();
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.left = `${e.pageX - 4}px`;
            sparkle.style.top = `${e.pageY - 4}px`;
            sparkleLayer.append(sparkle);
            setTimeout(() => sparkle.remove(), 600);
        });

        document.addEventListener('click', (e) => {
            const ripple = document.createElement('div');
            ripple.className = 'ripple';
            ripple.style.left = `${e.pageX - 25}px`;
            ripple.style.top = `${e.pageY - 25}px`;
            document.body.append(ripple);
            setTimeout(() => ripple.remove(), 700);
        });

        // Listen for clicks on the floating compliments ✨
        petalLayer.addEventListener('click', (e) => {
            if (e.target.classList.contains('compliment')) {
                const clickedCompliment = e.target;
                clickedCompliment.classList.add('fade-out');
                clickedCompliment.addEventListener('transitionend', () => {
                    clickedCompliment.remove();
                }, { once: true });
            }
        });

    };

    // Initial Interaction Logic 🎬
    const initiateExperience = () => {
        bgm.play().catch(err => console.warn("Audio play failed, user interaction needed.", err));
        tapOverlay.classList.add('fade-out');
        tapOverlay.addEventListener('transitionend', () => tapOverlay.remove());
        startCardAnimations();
    };

    if (isMobile) {
        tapOverlay.addEventListener('click', initiateExperience, { once: true });
    } else {
        bgm.play().then(initiateExperience).catch(() => {
            tapOverlay.addEventListener('click', initiateExperience, { once: true });
        });
    }
});