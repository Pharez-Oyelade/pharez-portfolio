document.addEventListener("DOMContentLoaded", () => {
  /* -------------------------------------------------------------------------- */
  /*                               Navigation Logic                             */
  /* -------------------------------------------------------------------------- */
  const navLinks = document.querySelectorAll("nav a");
  const sections = document.querySelectorAll("section");

  // Initialize active state
  if (navLinks.length > 0) {
    navLinks[0].classList.add("active");
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
        });
      }

      navLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
    });
  });

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - sectionHeight / 3) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").includes(current)) {
        link.classList.add("active");
      }
    });
  });

  /* -------------------------------------------------------------------------- */
  /*                                Aside Links                                 */
  /* -------------------------------------------------------------------------- */
  const asideLinks = document.querySelectorAll("#aside-links a");
  const asideSections = document.querySelectorAll("#article-content > div[id]");
  const article = document.querySelector("#article-content");

  if (asideLinks.length > 0) {
    asideLinks[0].classList.add("active");
  }

  asideLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
        });
      }

      asideLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          asideLinks.forEach((link) => {
            link.classList.remove("active");

            if (link.getAttribute("href") === `#${entry.target.id}`) {
              link.classList.add("active");
            }
          });
        }
      });
    },
    {
      root: null, // window scroll
      threshold: 0.85,
    },
  );

  asideSections.forEach((section) => observer.observe(section));

  /* -------------------------------------------------------------------------- */
  /*                                Theme Toggle                                */
  /* -------------------------------------------------------------------------- */
  const toggleBtn = document.getElementById("theme-toggle");
  const html = document.documentElement;
  const sunIcon = document.getElementById("sun");
  const moonIcon = document.getElementById("moon");

  // Check initialized preference
  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    html.classList.add("dark");
    sunIcon.style.display = "block";
    moonIcon.style.display = "none";
  } else {
    html.classList.remove("dark");
    sunIcon.style.display = "none";
    moonIcon.style.display = "block";
  }

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      //   console.log("Toggle clicked");
      if (html.classList.contains("dark")) {
        html.classList.remove("dark");
        localStorage.theme = "light";
        sunIcon.style.display = "none";
        moonIcon.style.display = "block";
      } else {
        html.classList.add("dark");
        localStorage.theme = "dark";
        sunIcon.style.display = "block";
        moonIcon.style.display = "none";
      }
    });
  }
});
