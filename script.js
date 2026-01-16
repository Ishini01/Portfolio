<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Cursor Trail + Particles</title>
<style>
  body, html {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    background: #111;
    height: 100%;
  }

  #particles-js {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }

  /* Example content styling */
  .card, .project {
    opacity: 0;
    transform: translateY(50px);
    transition: all 0.6s ease;
    color: white;
    font-size: 1.5rem;
    margin: 50px;
  }

  .card.show, .project.show {
    opacity: 1;
    transform: translateY(0);
  }
</style>
</head>
<body>

<div id="particles-js"></div>

<!-- Example content -->
<div class="card">Card 1</div>
<div class="card">Card 2</div>
<div class="project">Project 1</div>
<div class="project">Project 2</div>

<!-- JS -->
<script src="https://cdn.jsdelivr.net/npm/particles.js"></script>
<script>
  // =========================
  // IntersectionObserver for cards/projects
  // =========================
  const elements = document.querySelectorAll('.card, .project');

  const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('show');
      });
  }, { threshold: 0.2 });

  elements.forEach(el => observer.observe(el));

  // =========================
  // Device detection
  // =========================
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);

  // =========================
  // Particles JS
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
  // Cursor trail + touch trail (No smooth cursor circle)
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

  // Desktop mouse trail
  if (!isMobile) {
      document.addEventListener("mousemove", e => {
          cursorTrail.push({
              x: e.clientX,
              y: e.clientY,
              radius: Math.random() * 4 + 1,
              color: colors[Math.floor(Math.random() * colors.length)],
              alpha: 1
          });
      });
  }

  // Mobile touch trail
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

  // Animation loop
  function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

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
</script>

</body>
</html>

