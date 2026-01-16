const elements = document.querySelectorAll('.card, .project');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('show');
    });
}, { threshold: 0.2 });

elements.forEach(el => observer.observe(el));

// =========================
// DEVICE DETECTION
// =========================
const isMobile = /Mobi|Android/i.test(navigator.userAgent);

// =========================
// PARTICLES JS
// =========================
particlesJS("particles-js", {
    particles: {
        number: { value: isMobile ? 35 : 80, density: { enable: true, value_area: 800 } },
        color: { value: "#ffffff" },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: true },
        size: { value: isMobile ? 2 : 3, random: true },
        line_linked: { enable: !isMobile, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
        move: { enable: true, speed: isMobile ? 1 : 2 }
    },
    interactivity: {
        events: { onhover: { enable: !isMobile, mode: "repulse" } }
    },
    retina_detect: true
});

// =========================
// CURSOR TRAIL & TOUCH EFFECT
// =========================
const cursorTrail = [];
const colors = ["#dc1845ff", "#650f19ff", "#b55970ff"];

const canvas = document.createElement("canvas");
canvas.id = "cursorCanvas";
canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.pointerEvents = "none";
canvas.style.zIndex = "999";
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Cursor positions
let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
let smoothCursor = { x: mouse.x, y: mouse.y };

// Desktop: mouse trail
if (!isMobile) {
    document.addEventListener("mousemove", e => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;

        cursorTrail.push({
            x: e.clientX,
            y: e.clientY,
            radius: Math.random() * 4 + 1,
            color: colors[Math.floor(Math.random() * colors.length)],
            alpha: 1
        });
    });
}

// Mobile: touch trail
if (isMobile) {
    document.addEventListener("touchmove", e => {
        const touch = e.touches[0];
        cursorTrail.push({
            x: touch.clientX,
            y: touch.clientY,
            radius: Math.random() * 3 + 1,
            color: colors[Math.floor(Math.random() * colors.length)],
            alpha: 0.8
        });
    });
}

// =========================
// ANIMATION LOOP
// =========================
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!isMobile) {
        // Smooth cursor (desktop)
        smoothCursor.x += (mouse.x - smoothCursor.x) * 0.15;
        smoothCursor.y += (mouse.y - smoothCursor.y) * 0.15;

        // Draw smooth cursor
        ctx.beginPath();
        ctx.arc(smoothCursor.x, smoothCursor.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.8)";
        ctx.fill();
    }

    // Draw trail particles
    for (let i = 0; i < cursorTrail.length; i++) {
        const t = cursorTrail[i];
        ctx.beginPath();
        ctx.arc(t.x, t.y, t.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${parseInt(t.color.slice(1,3),16)},${parseInt(t.color.slice(3,5),16)},${parseInt(t.color.slice(5,7),16)},${t.alpha})`;
        ctx.fill();

        t.alpha -= 0.03;
        t.radius *= 0.95;
    }

    // Remove invisible trails
    for (let i = cursorTrail.length - 1; i >= 0; i--) {
        if (cursorTrail[i].alpha <= 0) cursorTrail.splice(i, 1);
    }

    requestAnimationFrame(animate);
}

animate();
