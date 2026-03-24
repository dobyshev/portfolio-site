// ========== MOBILE MENU TOGGLE ==========
document.addEventListener("DOMContentLoaded", () => {
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
      }
    });
  }

  // Закрытие меню при клике на ссылку
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        navLinks.style.display = "none";
      }
    });
  });

  // ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // ========== INTERSECTION OBSERVER (анимация появления блоков) ==========
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Наблюдаем за всеми секциями и карточками
  const elementsToAnimate = document.querySelectorAll(
    ".service-card, .case-card, .pricing-card, .advantage-item, .cta-content",
  );

  elementsToAnimate.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1)";
    observer.observe(el);
  });

  // ========== NAVBAR SCROLL EFFECT ==========
  const navbar = document.querySelector(".navbar");
  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
      navbar.style.background = "rgba(5, 7, 15, 0.95)";
      navbar.style.backdropFilter = "blur(12px)";
    } else {
      navbar.style.background = "rgba(10, 12, 21, 0.85)";
    }

    lastScroll = currentScroll;
  });

  // ========== HOVER PARALLAX FOR CARDS (optional) ==========
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

  // ========== TELEGRAM BUTTON TRACKING (можно добавить аналитику) ==========
  const tgButtons = document.querySelectorAll('a[href*="t.me"]');
  tgButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      console.log("Telegram клик: переход на связь");
      // Здесь можно добавить аналитику
    });
  });

  console.log("Сайт загружен. Анимации и эффекты активированы.");
});
