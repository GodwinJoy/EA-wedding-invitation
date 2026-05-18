gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/* =========================
   BODY LOCK
========================= */

document.body.style.overflow = "hidden";

/* =========================
   CUSTOM CURSOR
========================= */

const cursor = document.getElementById("custom-cursor");
const follower = document.getElementById("cursor-follower");

if (window.innerWidth < 768) {

    if (cursor) cursor.style.display = "none";
    if (follower) follower.style.display = "none";

} else {

    let mouseX = 0;
    let mouseY = 0;

    window.addEventListener("mousemove", (e) => {

        mouseX = e.clientX;
        mouseY = e.clientY;

    });

    gsap.ticker.add(() => {

        gsap.set(cursor, {
            x: mouseX,
            y: mouseY
        });

        gsap.to(follower, {
            x: mouseX - 14,
            y: mouseY - 14,
            duration: 0.3,
            ease: "power2.out"
        });

    });

}

/* =========================
   MUSIC
========================= */

const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicToggle");
const enterBtn = document.getElementById("enterWebsite");
const intro = document.getElementById("intro");
const websiteContent = document.getElementById("websiteContent");

let playing = false;

/* SAFETY CHECK */

if (!music || !musicBtn || !enterBtn) {

    console.warn("Music elements missing");

}

/* =========================
   PLAY MUSIC
========================= */

function playMusic() {

    music.play()
        .then(() => {

            playing = true;

            musicBtn.innerHTML =
                `<i class="fa-solid fa-pause"></i>`;

        })
        .catch(err => {

            console.log("Autoplay blocked:", err);

        });

}

/* =========================
   PAUSE MUSIC
========================= */

function pauseMusic() {

    music.pause();

    playing = false;

    musicBtn.innerHTML =
        `<i class="fa-solid fa-music"></i>`;

}

/* =========================
   MUSIC TOGGLE
========================= */

musicBtn.addEventListener("click", () => {

    if (!playing) {

        playMusic();

    } else {

        pauseMusic();

    }

});

/* =========================
   LUXURY FLOWERS
========================= */

const flowerContainer =
    document.getElementById("flowerContainer");

/* FLOWER SVG DESIGNS */

const flowerSvgs = [

`<svg width="36" height="36" viewBox="0 0 64 64" fill="none">
<path d="M32 10C36 20 48 20 50 32C48 44 36 44 32 54C28 44 16 44 14 32C16 20 28 20 32 10Z"
fill="#f8d7e2"/>
</svg>`,

`<svg width="32" height="32" viewBox="0 0 64 64" fill="none">
<path d="M32 8C38 18 52 20 54 32C52 44 38 46 32 56C26 46 12 44 10 32C12 20 26 18 32 8Z"
fill="#f3c9d7"/>
</svg>`,

`<svg width="28" height="28" viewBox="0 0 64 64" fill="none">
<path d="M32 12C36 20 46 22 48 32C46 42 36 44 32 52C28 44 18 42 16 32C18 22 28 20 32 12Z"
fill="#fff1f5"/>
</svg>`

];

/* =========================
   CREATE FLOWER
========================= */

function createFlower() {

    const flower =
        document.createElement("div");

    flower.classList.add("flower");

    const depthRandom = Math.random();

    if (depthRandom < 0.33) {

        flower.classList.add("depth-far");

    } else if (depthRandom < 0.66) {

        flower.classList.add("depth-mid");

    } else {

        flower.classList.add("depth-near");

    }

    flower.innerHTML =
        flowerSvgs[
            Math.floor(
                Math.random() * flowerSvgs.length
            )
        ];

    flowerContainer.appendChild(flower);

    const startX =
        Math.random() * window.innerWidth;

    const startY =
        -150 - Math.random() * 200;

    const size =
        Math.random() * 30 + 20;

    const duration =
        Math.random() * 8 + 12;

    const drift =
        (Math.random() - 0.5) * 350;

    const rotate =
        Math.random() * 360;

    const scale =
        Math.random() * 0.6 + 0.7;

    flower.style.width = `${size}px`;
    flower.style.height = `${size}px`;

    gsap.set(flower, {

        x: startX,
        y: startY,

        scale: scale,

        rotation: rotate,

        opacity: 0,

        force3D: true

    });

    gsap.fromTo(flower,

        {
            opacity: 0,
            scale: scale * 0.7,
            filter:
                "blur(10px)"
        },

        {
            opacity: 1,
            scale: scale,
            filter:
                "blur(0px)",

            duration: 2,

            ease: "power3.out"
        }

    );

    gsap.to(flower, {

        y:
            window.innerHeight + 250,

        x:
            startX + drift,

        rotation:
            rotate +
            (Math.random() > 0.5
                ? 720
                : -720),

        duration: duration,

        ease: "none",

        force3D: true,

        onComplete: () => {

            flower.remove();

        }

    });

    gsap.to(flower, {

        x:
            `+=${Math.random() > 0.5 ? 50 : -50}`,

        duration:
            Math.random() * 3 + 2,

        repeat: -1,

        yoyo: true,

        ease: "sine.inOut"

    });

    gsap.to(flower, {

        rotateZ:
            `+=${Math.random() > 0.5 ? 25 : -25}`,

        duration:
            Math.random() * 4 + 3,

        repeat: -1,

        yoyo: true,

        ease: "sine.inOut"

    });

    createFlowerGlow(startX);

}

/* =========================
   FLOWER GLOW
========================= */

function createFlowerGlow(x) {

    const glow =
        document.createElement("div");

    glow.classList.add("flower-glow");

    document
        .getElementById("flowerGlow")
        .appendChild(glow);

    const size =
        Math.random() * 8 + 4;

    glow.style.width = `${size}px`;
    glow.style.height = `${size}px`;

    gsap.set(glow, {

        x: x,
        y: -50,

        opacity:
            Math.random() * 0.6 + 0.2

    });

    gsap.to(glow, {

        y:
            window.innerHeight + 100,

        x:
            x +
            ((Math.random() - 0.5) * 150),

        duration:
            Math.random() * 10 + 10,

        ease: "none",

        onComplete: () => {

            glow.remove();

        }

    });

}

/* =========================
   START FLOWERS
========================= */

function startLuxuryFlowers() {

    const totalFlowers =
        window.innerWidth < 768 ? 18 : 35;

    for (let i = 0; i < totalFlowers; i++) {

        setTimeout(() => {

            createFlower();

        }, i * 300);

    }

    window.flowerInterval = setInterval(() => {

        createFlower();

    }, window.innerWidth < 768 ? 1400 : 700);

}

/* =========================
   STOP FLOWERS
========================= */

function stopLuxuryFlowers() {

    clearInterval(window.flowerInterval);

}

/* =========================
   INTRO TRANSITION
========================= */

enterBtn.addEventListener("click", () => {

    startLuxuryFlowers();

    if (!playing) {

        playMusic();

    }

    const tl = gsap.timeline();

    tl.to("#leftCurtain", {
        x: "-100%",
        duration: 2,
        ease: "power4.inOut"
    });

    tl.to("#rightCurtain", {
        x: "100%",
        duration: 2,
        ease: "power4.inOut"
    }, 0);

    tl.to("#intro", {
        opacity: 0,
        duration: 1
    }, 1.2);

    tl.set("#intro", {
        display: "none"
    });

    tl.to("#websiteContent", {
        opacity: 1,
        duration: 0.8,
        pointerEvents: "auto"
    }, 1.4);

    tl.call(() => {

        document.body.style.overflowY = "auto";

        ScrollTrigger.refresh();

        setTimeout(() => {

            initHeroAnimation();
            initVenueAnimations();

        }, 300);

    });

    gsap.to(musicBtn, {

        opacity: 1,
        duration: 1,
        delay: 0.5,

        onStart: () => {

            musicBtn.style.pointerEvents = "auto";

        }

    });

});

/* =========================
   HERO ANIMATION
========================= */

function initHeroAnimation() {

    gsap.set("#hero-card-reveal", {
        visibility: "visible"
    });

    const tl = gsap.timeline();

    tl.fromTo("#hero-card-reveal",
        {
            scale: 1.08,
            y: 80,
            opacity: 0
        },
        {
            scale: 1,
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out"
        }
    )

    .fromTo("#hero-card-reveal img",
        {
            scale: 1.2,
            filter: "blur(10px)"
        },
        {
            scale: 1,
            filter: "blur(0px)",
            duration: 1.2,
            ease: "power3.out"
        },
        "-=1"
    )

    .from(".hero-stagger", {
        y: 60,
        opacity: 0,
        stagger: 0.12,
        duration: 1,
        ease: "power4.out"
    }, "-=1");

}

/* =========================
   MEMORY NOTES
========================= */

gsap.from(".memory-note", {
    y: 80,
    opacity: 0,
    stagger: 0.2,
    duration: 1.2,
    ease: "power3.out",
    scrollTrigger: {
        trigger: ".memory-note",
        start: "top 85%"
    }
});

/* =========================
   MEMORY NOTE HOVER
========================= */

document.querySelectorAll(".memory-note").forEach((note, index) => {

    note.addEventListener("mouseenter", () => {

        gsap.to(note, {
            y: -12,
            rotate: index % 2 === 0 ? 2 : -2,
            duration: 0.4
        });

    });

    note.addEventListener("mouseleave", () => {

        gsap.to(note, {
            y: 0,
            rotate: index % 2 === 0 ? 2 : -2,
            duration: 0.4
        });

    });

});

/* =========================
   VENUE ANIMATIONS
========================= */

function initVenueAnimations() {

    gsap.from(".venue-heading", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });

    gsap.from(".venue-card", {
        y: 80,
        opacity: 0,
        stagger: 0.2,
        duration: 1.1,
        ease: "power3.out",
        clearProps: "all"
    });

    gsap.to(".floating-icon", {
        y: -8,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

}

/* =========================
   STORY
========================= */

gsap.from(".story-image", {
    x: -100,
    opacity: 0,
    duration: 1.2,
    scrollTrigger: {
        trigger: ".story-image",
        start: "top 80%"
    }
});

gsap.from(".story-content", {
    x: 100,
    opacity: 0,
    duration: 1.2,
    scrollTrigger: {
        trigger: ".story-content",
        start: "top 80%"
    }
});

/* =========================
   SCROLL PROGRESS
========================= */

window.addEventListener("scroll", () => {

    const totalH =
        document.body.scrollHeight - window.innerHeight;

    const progress = totalH > 0
        ? (window.scrollY / totalH) * 100
        : 0;

    const offset =
        176 - (progress / 100 * 176);

    document.getElementById("scroll-circle")
        .style.strokeDashoffset = offset;

    document.getElementById("scroll-percent")
        .innerText = Math.round(progress) + "%";

});

/* =========================
   COUNTDOWN
========================= */

const weddingDate =
    new Date("October 26, 2026 15:00:00").getTime();

setInterval(() => {

    const now = new Date().getTime();

    const distance = weddingDate - now;

    if (distance <= 0) {

        document.getElementById("days").innerHTML = "00";
        document.getElementById("hours").innerHTML = "00";
        document.getElementById("minutes").innerHTML = "00";
        document.getElementById("seconds").innerHTML = "00";

        return;

    }

    document.getElementById("days").innerHTML =
        Math.floor(distance / (1000 * 60 * 60 * 24));

    document.getElementById("hours").innerHTML =
        Math.floor(
            (distance % (1000 * 60 * 60 * 24))
            / (1000 * 60 * 60)
        );

    document.getElementById("minutes").innerHTML =
        Math.floor(
            (distance % (1000 * 60 * 60))
            / (1000 * 60)
        );

    document.getElementById("seconds").innerHTML =
        Math.floor(
            (distance % (1000 * 60))
            / 1000
        );

}, 1000);

/* =========================
   HEART CLICK EFFECT
========================= */

document.addEventListener("click", (e) => {

    const heart = document.createElement("div");

    heart.className = "heart";

    heart.innerHTML = "❤";

    heart.style.left = e.clientX + "px";
    heart.style.top = e.clientY + "px";

    document.body.appendChild(heart);

    setTimeout(() => {

        heart.remove();

    }, 1500);

});

/* =========================
   PETAL ERASER REVEAL EFFECT
========================= */

const petalCard =
    document.getElementById("petalRevealCard");

const petalLayer =
    document.getElementById("petalLayer");

const petalField =
    document.getElementById("petalField");

const petalHint =
    document.getElementById("petalHint");

const saveDateContent =
    document.getElementById("saveDateContent");

const petalCelebration =
    document.getElementById("petalCelebration");

let removedPetals = 0;
let totalPetals = 110;
let petalRevealDone = false;

function createPetalField() {

    if (!petalField || !petalCard || !saveDateContent) return;

    petalField.innerHTML = "";

    removedPetals = 0;
    petalRevealDone = false;

    totalPetals = window.innerWidth < 480 ? 75 : 110;

    gsap.set(saveDateContent, {
        opacity: 0,
        scale: 0.92,
        filter: "blur(8px)"
    });

    for (let i = 0; i < totalPetals; i++) {

        const petal =
            document.createElement("div");

        petal.className = "mini-petal";

        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const rotate = Math.random() * 360;
        const scale = Math.random() * 0.5 + 0.65;

        petal.style.left = `${x}%`;
        petal.style.top = `${y}%`;

        gsap.set(petal, {
            xPercent: -50,
            yPercent: -50,
            rotate,
            scale,
            opacity: 1
        });

        petalField.appendChild(petal);

        gsap.to(petal, {
            y: "+=5",
            rotate: `+=${Math.random() > 0.5 ? 7 : -7}`,
            duration: Math.random() * 2 + 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }
}

function removePetal(petal) {

    if (
        !petal ||
        petal.classList.contains("touched") ||
        petalRevealDone
    ) return;

    petal.classList.add("touched");

    removedPetals++;

    gsap.to(petal, {
        scale: 0,
        opacity: 0,
        rotate: "+=140",
        y: "-=45",
        duration: 0.45,
        ease: "back.in(1.7)",
        onComplete: () => petal.remove()
    });

    if (petalHint && removedPetals > 8) {

        gsap.to(petalHint, {
            opacity: 0,
            duration: 0.5
        });

    }

    const revealedPercent =
        removedPetals / totalPetals;

    if (revealedPercent >= 0.68) {

        finishPetalReveal();

    }

}

function finishPetalReveal() {

    if (petalRevealDone) return;

    petalRevealDone = true;

    gsap.to(".mini-petal", {
        scale: 0,
        opacity: 0,
        y: "-=80",
        rotate: "+=180",
        stagger: 0.008,
        duration: 0.6,
        ease: "power3.in",
        onComplete: () => {

            if (petalLayer) {
                petalLayer.style.display = "none";
            }

        }
    });

    gsap.to(saveDateContent, {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 1.1,
        ease: "power3.out"
    });

    gsap.to("#countdownSection", {
        opacity: 1,
        y: 0,
        duration: 1.2,
        delay: 1.2,
        ease: "power4.out",
        onStart: () => {

            const countdown =
                document.getElementById("countdownSection");

            if (countdown) {
                countdown.classList.remove("pointer-events-none");
            }

        }
    });
}

function handlePetalMove(clientX, clientY, radius) {

    if (petalRevealDone) return;

    const petals =
        document.querySelectorAll(".mini-petal");

    petals.forEach((petal) => {

        const rect =
            petal.getBoundingClientRect();

        const px =
            rect.left + rect.width / 2;

        const py =
            rect.top + rect.height / 2;

        const distance =
            Math.hypot(clientX - px, clientY - py);

        if (distance < radius) {
            removePetal(petal);
        }

    });

}

/* INIT */

if (petalCard && petalField) {

    createPetalField();

    petalCard.addEventListener("mousemove", (e) => {

        handlePetalMove(
            e.clientX,
            e.clientY,
            42
        );

    });

    petalCard.addEventListener("touchmove", (e) => {

        const touch =
            e.touches[0];

        handlePetalMove(
            touch.clientX,
            touch.clientY,
            50
        );

    }, { passive: true });

    petalCard.addEventListener("click", (e) => {

        handlePetalMove(
            e.clientX,
            e.clientY,
            58
        );

    });

}

/* =========================
   RESPONSIVE GSAP
========================= */

ScrollTrigger.matchMedia({

    "(max-width: 767px)": function () {

        gsap.set(".floating-icon", {
            scale: 0.8
        });

    },

    "(min-width: 768px)": function () {

        gsap.set(".floating-icon", {
            scale: 1
        });

    }

});