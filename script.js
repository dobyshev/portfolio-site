// AOS Animation Initialization
AOS.init({
  duration: 800,
  once: true,
  offset: 100,
});

// Cursor Glow Effect
const cursor = document.querySelector(".cursor-glow");
if (cursor) {
  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });
}

// Particle Animation
const canvas = document.getElementById("particleCanvas");
if (canvas) {
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particles = [];
  const particleCount = 80;

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 1;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.speedY = (Math.random() - 0.5) * 0.5;
      this.color = `rgba(59, 75, 255, ${Math.random() * 0.3})`;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x < 0) this.x = canvas.width;
      if (this.x > canvas.width) this.x = 0;
      if (this.y < 0) this.y = canvas.height;
      if (this.y > canvas.height) this.y = 0;
    }

    draw() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function initParticles() {
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((particle) => {
      particle.update();
      particle.draw();
    });
    requestAnimationFrame(animateParticles);
  }

  initParticles();
  animateParticles();

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles = [];
    initParticles();
  });
}

// Mobile Menu Toggle
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    if (navLinks.style.display === "flex") {
      navLinks.style.display = "none";
    } else {
      navLinks.style.display = "flex";
      navLinks.style.flexDirection = "column";
      navLinks.style.position = "absolute";
      navLinks.style.top = "70px";
      navLinks.style.left = "0";
      navLinks.style.width = "100%";
      navLinks.style.background = "rgba(10, 12, 21, 0.95)";
      navLinks.style.backdropFilter = "blur(12px)";
      navLinks.style.padding = "20px";
      navLinks.style.gap = "20px";
      navLinks.style.zIndex = "999";
    }
  });
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      if (window.innerWidth <= 768 && navLinks.style.display === "flex") {
        navLinks.style.display = "none";
      }
    }
  });
});

// Navbar Scroll Effect
const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(5, 7, 15, 0.95)";
    navbar.style.backdropFilter = "blur(12px)";
  } else {
    navbar.style.background = "rgba(10, 12, 21, 0.85)";
  }
});

// 3D Tilt Effect for Cards
const cards = document.querySelectorAll(".glass-card");
cards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform =
      "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
  });
});

// Animate Numbers on Scroll
const animateNumbers = () => {
  const statNumbers = document.querySelectorAll(".stat-number");
  statNumbers.forEach((stat) => {
    const target = parseInt(stat.innerText);
    if (!stat.hasAttribute("data-animated")) {
      stat.setAttribute("data-animated", "true");
      let current = 0;
      const increment = target / 30;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          stat.innerText = target;
          clearInterval(timer);
        } else {
          stat.innerText = Math.floor(current);
        }
      }, 30);
    }
  });
};

const heroObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateNumbers();
        heroObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 },
);

const heroSection = document.querySelector(".hero");
if (heroSection) {
  heroObserver.observe(heroSection);
}

console.log("🚀 Сайт загружен. Все анимации активированы!");

// FAQ Accordion
const faqItems = document.querySelectorAll(".faq-item");
faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");
  const answer = item.querySelector(".faq-answer");

  // Скрываем ответы по умолчанию
  if (answer) {
    answer.style.display = "none";
  }

  question.addEventListener("click", () => {
    const isOpen = answer.style.display === "block";

    // Закрываем все
    faqItems.forEach((otherItem) => {
      const otherAnswer = otherItem.querySelector(".faq-answer");
      if (otherAnswer) {
        otherAnswer.style.display = "none";
      }
    });

    // Открываем текущий
    if (!isOpen && answer) {
      answer.style.display = "block";
    }
  });
});

// Показываем первый FAQ открытым для примера
if (faqItems[0]) {
  const firstAnswer = faqItems[0].querySelector(".faq-answer");
  if (firstAnswer) {
    firstAnswer.style.display = "block";
  }
}
