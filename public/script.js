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
  /*                                Theme Toggle                                */
  /* -------------------------------------------------------------------------- */
  const toggleBtn = document.getElementById("theme-toggle");
  const html = document.documentElement;

  // Check initialized preference
  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    html.classList.add("dark");
  } else {
    html.classList.remove("dark");
  }

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      //   console.log("Toggle clicked");
      if (html.classList.contains("dark")) {
        html.classList.remove("dark");
        localStorage.theme = "light";
      } else {
        html.classList.add("dark");
        localStorage.theme = "dark";
      }
    });
  }
});
