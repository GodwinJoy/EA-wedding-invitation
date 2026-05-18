
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/* =========================
   CUSTOM CURSOR
========================= */

const cursor = document.getElementById("custom-cursor");
const follower = document.getElementById("cursor-follower");

if (window.innerWidth < 768) {

    cursor.style.display = "none";
    follower.style.display = "none";

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

let playing = false;

/* PLAY MUSIC */

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

/* PAUSE MUSIC */

function pauseMusic() {

    music.pause();

    playing = false;

    musicBtn.innerHTML =
        `<i class="fa-solid fa-music"></i>`;
}

/* MUSIC TOGGLE */

musicBtn.addEventListener("click", () => {

    if (!playing) {

        playMusic();

    } else {

        pauseMusic();

    }

});

/* =========================
   INTRO → WEBSITE TRANSITION
========================= */

enterBtn.addEventListener("click", () => {

    /* AUTO MUSIC */

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
        duration: 0.8
    }, 1.4);

    tl.call(() => {

        ScrollTrigger.refresh();

        setTimeout(() => {

            initHeroAnimation();
            initVenueAnimations();

        }, 300);

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

/* HOVER FLOAT */

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
   SCRATCH CARD
========================= */

const canvas =
    document.getElementById("scratchCanvas");

const ctx =
    canvas.getContext("2d");

const celebration =
    document.getElementById("celebration");

let revealed = false;
let isScratching = false;

let lastX = 0;
let lastY = 0;

let brushSize = 42;
let circleSize = 22;

/* =========================
   RESPONSIVE BRUSH
========================= */

function updateBrushSizes() {

    const width = window.innerWidth;

    if (width < 480) {

        brushSize = 28;
        circleSize = 14;

    } else if (width < 768) {

        brushSize = 36;
        circleSize = 18;

    } else {

        brushSize = 46;
        circleSize = 24;

    }

}

/* =========================
   CANVAS SETUP
========================= */

function resizeCanvas() {

    updateBrushSizes();

    const dpr =
        window.devicePixelRatio || 1;

    const rect =
        canvas.getBoundingClientRect();

    ctx.setTransform(1, 0, 0, 1, 0, 0);

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    canvas.style.width = rect.width + "px";
    canvas.style.height = rect.height + "px";

    ctx.scale(dpr, dpr);

    ctx.clearRect(
        0,
        0,
        rect.width,
        rect.height
    );

    /* SCRATCH LAYER */

    ctx.globalCompositeOperation =
        "source-over";

    const gradient =
        ctx.createLinearGradient(
            0,
            0,
            rect.width,
            rect.height
        );

    gradient.addColorStop(0, "#f7d8e2");
    gradient.addColorStop(0.35, "#fbe7ee");
    gradient.addColorStop(0.7, "#f5d4de");
    gradient.addColorStop(1, "#efd1da");

    ctx.fillStyle = gradient;

    ctx.fillRect(
        0,
        0,
        rect.width,
        rect.height
    );

    /* GLOSS */

    ctx.fillStyle =
        "rgba(255,255,255,0.18)";

    ctx.beginPath();

    ctx.arc(
        rect.width * 0.2,
        rect.height * 0.2,
        rect.width * 0.35,
        0,
        Math.PI * 2
    );

    ctx.fill();

    /* TEXT */

    const titleSize =
        window.innerWidth < 480 ? 20 :
        window.innerWidth < 768 ? 24 :
        30;

    const subSize =
        window.innerWidth < 480 ? 11 :
        window.innerWidth < 768 ? 13 :
        16;

    ctx.textAlign = "center";

    ctx.fillStyle = "#ffffff";

    ctx.font =
        `bold ${titleSize}px Cormorant Garamond`;

    ctx.fillText(
        "Scratch To Reveal",
        rect.width / 2,
        rect.height / 2 - 10
    );

    ctx.font = `${subSize}px Poppins`;

    ctx.fillStyle =
        "rgba(255,255,255,0.92)";

    ctx.fillText(
        "Our Special Day",
        rect.width / 2,
        rect.height / 2 + 20
    );

    /* ERASE MODE */

    ctx.globalCompositeOperation =
        "destination-out";

    ctx.lineJoin = "round";
    ctx.lineCap = "round";

}

resizeCanvas();

window.addEventListener(
    "resize",
    resizeCanvas
);

/* =========================
   SCRATCH
========================= */

function scratch(x, y) {

    ctx.beginPath();

    ctx.lineWidth = brushSize;

    ctx.moveTo(lastX, lastY);

    ctx.lineTo(x, y);

    ctx.stroke();

    ctx.beginPath();

    ctx.arc(
        x,
        y,
        circleSize,
        0,
        Math.PI * 2
    );

    ctx.fill();

    lastX = x;
    lastY = y;

    clearTimeout(window.revealCheck);

    window.revealCheck = setTimeout(() => {

        checkReveal();

    }, 120);

}

/* =========================
   POSITION
========================= */

function getPosition(e) {

    const rect =
        canvas.getBoundingClientRect();

    if (e.touches) {

        return {
            x: e.touches[0].clientX - rect.left,
            y: e.touches[0].clientY - rect.top
        };

    }

    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };

}

/* =========================
   START SCRATCH
========================= */

function startScratch(e) {

    isScratching = true;

    const pos = getPosition(e);

    lastX = pos.x;
    lastY = pos.y;

    scratch(pos.x, pos.y);

}

/* =========================
   MOVE SCRATCH
========================= */

function moveScratch(e) {

    if (!isScratching) return;

    e.preventDefault();

    const pos = getPosition(e);

    scratch(pos.x, pos.y);

}

/* =========================
   END SCRATCH
========================= */

function endScratch() {

    isScratching = false;

}

/* =========================
   EVENTS
========================= */

canvas.addEventListener(
    "mousedown",
    startScratch
);

canvas.addEventListener(
    "mousemove",
    moveScratch
);

canvas.addEventListener(
    "mouseup",
    endScratch
);

canvas.addEventListener(
    "mouseleave",
    endScratch
);

canvas.addEventListener(
    "touchstart",
    startScratch
);

canvas.addEventListener(
    "touchmove",
    moveScratch,
    { passive: false }
);

canvas.addEventListener(
    "touchend",
    endScratch
);

/* =========================
   REVEAL CHECK
========================= */

function checkReveal() {

    if (revealed) return;

    const imageData =
        ctx.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
        );

    let transparent = 0;

    for (
        let i = 3;
        i < imageData.data.length;
        i += 4
    ) {

        if (imageData.data[i] === 0) {

            transparent++;

        }

    }

    const percent =
        (
            transparent /
            (canvas.width * canvas.height)
        ) * 100;

    if (percent > 42) {

        revealed = true;

        celebrationEffect();

        gsap.to(canvas, {
            opacity: 0,
            duration: 1,
            ease: "power2.out"
        });

        gsap.to("#countdownSection", {

            opacity: 1,
            y: 0,

            duration: 1.4,

            ease: "power4.out",

            delay: 0.5,

            onStart: () => {

                document
                    .getElementById(
                        "countdownSection"
                    )
                    .classList
                    .remove(
                        "pointer-events-none"
                    );

            }

        });

        gsap.to(window, {

            scrollTo: "#countdownSection",

            duration: 1.5,

            delay: 0.8,

            ease: "power2.inOut"

        });

    }

}

/* =========================
   CELEBRATION
========================= */

function celebrationEffect() {

    celebration.classList.remove("hidden");

    for (let i = 0; i < 80; i++) {

        const c =
            document.createElement("div");

        c.className =
            "absolute w-3 h-3 rounded-full";

        const colors = [
            "#cb7d96",
            "#d9aa74",
            "#fff",
            "#f3d6de"
        ];

        c.style.background =
            colors[
            Math.floor(
                Math.random() * colors.length
            )
            ];

        c.style.left =
            Math.random() * 100 + "%";

        c.style.top = "-20px";

        celebration.appendChild(c);

        gsap.to(c, {

            y: 500,

            x:
                (Math.random() - 0.5)
                * 300,

            rotation: 720,

            duration:
                3 + Math.random() * 2,

            ease: "power2.out",

            onComplete: () => c.remove()

        });

    }

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

