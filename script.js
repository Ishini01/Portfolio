const elements = document.querySelectorAll('.card, .project');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, { threshold: 0.2 });

elements.forEach(el => observer.observe(el));
particlesJS("particles-js", {
  particles: {
    number: {
      value: 80,
      density: { enable: true, value_area: 800 }
    },
    color: { value: "#ffffff" },
    shape: { type: "circle" },
    opacity: {
      value: 0.5,
      random: true
    },
    size: {
      value: 3,
      random: true
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 2
    }
  },
  interactivity: {
    events: {
      onhover: { enable: true, mode: "repulse" }
    }
  },
  retina_detect: true
});
document.addEventListener("DOMContentLoaded", function () {
  particlesJS("particles-js", {
    particles: {
      number: { value: 80 },
      color: { value: "#ffffff" },
      shape: { type: "circle" },
      opacity: { value: 0.5 },
      size: { value: 3 },
      move: { enable: true, speed: 2 }
    }
  });
});

/* PARTICLES */
particlesJS("particles-js", {
  particles: {
    number: { value: 60 },
    color: { value: "#ff4f9a" },
    size: { value: 3 },
    move: { enable: true, speed: 1 }
  }
});

/* CURSOR EFFECT */
const cursor = document.querySelector(".cursor");
const follower = document.querySelector(".cursor-follower");

document.addEventListener("mousemove", e => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";

  follower.style.left = e.clientX - 15 + "px";
  follower.style.top = e.clientY - 15 + "px";
});

