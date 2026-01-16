const elements = document.querySelectorAll('.card, .project');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, { threshold: 0.2 });

elements.forEach(el => observer.observe(el));

// =========================
// PARTICLES JS
// =========================
particlesJS("particles-js", {
  particles: {
    number: { value: 80, density: { enable: true, value_area: 800 } },
    color: { value: "#ffffff" },
    shape: { type: "circle" },
    opacity: { value: 0.5, random: true },
    size: { value: 3, random: true },
    line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
    move: { enable: true, speed: 2 }
  },
  interactivity: { events: { onhover: { enable: true, mode: "repulse" } } },
  retina_detect: true
});

// =========================
// CURSOR TRAIL + MOTION EFFECT
// =========================
const cursorTrail = [];
const colors = ["#dc1845ff", "#650f19ff", "#b55970ff"]; 

// Create canvas
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

// Mouse position and smooth cursor
let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
let smoothCursor = { x: mouse.x, y: mouse.y };

document.addEventListener("mousemove", e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;

    // Add trail particle
    cursorTrail.push({
        x: e.clientX,
        y: e.clientY,
        radius: Math.random() * 6 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1
    });
});

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Smooth cursor motion (lerp)
    smoothCursor.x += (mouse.x - smoothCursor.x) * 0.15;
    smoothCursor.y += (mouse.y - smoothCursor.y) * 0.15;

    // Draw smooth cursor (big circle following the mouse)
    ctx.beginPath();
    ctx.arc(smoothCursor.x, smoothCursor.y, 10, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,255,0.8)";
    ctx.fill();

    // Draw cursor trail
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
    for (let i = cursorTrail.length -1; i >=0; i--) {
        if(cursorTrail[i].alpha <= 0) cursorTrail.splice(i,1);
    }

    requestAnimationFrame(animate);
}

animate();
