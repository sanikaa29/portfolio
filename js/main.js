(() => {
  "use strict";

  /* =========================================================
     Data
     ========================================================= */
  const SECTIONS = [
    "home", "overview", "education", "experience", "skills",
    "achievements", "research", "projects", "contact",
  ];

  const PROJECTS = [
    { title: "Brain Tumor Segmentation", category: "AI / ML",
      repo: "https://github.com/sanikaa29/brain-tumor-segmentation",
      lines: [
        "Built a computer vision system for MRI tumor segmentation using 3,929 FLAIR MRI slices from 110 patients, generating pixel-level tumor masks and extracting tumor area and boundaries.",
        "Benchmarked U-Net, U-Net++, Deep U-Net and ResUNet using Dice and IoU, ResUNet achieved 0.874 Dice and 0.776 IoU, outperforming a 50M parameter skip-connection-free Deep U-Net by 10+ Dice points.",
      ],
      stack: ["Python", "PyTorch", "Computer Vision"] },
    { title: "Brain Tumor Classification", category: "AI / ML",
      repo: "https://github.com/sanikaa29/brain-tumor-mri-classification",
      paper: "https://doi.org/10.1007/978-981-96-5955-5_27",
      lines: [
        "Developed a ResNet18-based MRI classification model using transfer learning and data augmentation to classify glioma, pituitary, and meningioma tumors, achieving 98.44% accuracy across 7,023 MRI images.",
        "Benchmarked multiple CNN architectures and tested generalization on 40 unseen MRI samples, correctly classifying 38 and published findings in Springer, SoCTA 2024.",
      ],
      stack: ["Python", "PyTorch", "ResNet18", "Deep Learning"] },
    { title: "QuantEdge: Financial Forecasting & Portfolio Optimization", category: ["AI / ML", "Full Stack"],
      repo: "https://github.com/sanikaa29/Quant-Edge",
      video: "https://drive.google.com/file/d/1x55bBYWq3pgApAElM3jXxqfArNo84qZL/view?usp=sharing",
      lines: [
        "Built a full-stack analytics platform and interactive dashboard for stock forecasting and portfolio optimization, delivering performance, risk, and allocation analytics.",
        "Developed an ensemble time-series forecasting pipeline using ARIMA, XGBoost, and LSTM, achieving 92.7% prediction accuracy, implemented Markowitz and Hierarchical Risk Parity optimization backtesting across 100+ stocks.",
      ],
      stack: ["Python", "React", "Node.js", "Flask", "PostgreSQL"] },
    { title: "CrewCares: Exposure Awareness for NYC Transit Workers", category: "Full Stack",
      repo: "https://github.com/sanikaa29/CrewCare",
      demo: "https://crewcares.vercel.app",
      lines: [
        "Hackathon team project giving NYC transit workers a pre-shift text about air quality at their station, a private health check-in that never leaves their phone, and anonymous station complaints routed to their union rep.",
        "Modelled platform PM2.5, heat, humidity and mould risk for 496 subway stations from live Open-Meteo weather data and NYS Open Data, served through a FastAPI JSON API to a React union-rep dashboard.",
      ],
      stack: ["Python", "FastAPI", "React", "Open-Meteo"] },
    { title: "Ransomware Recovery Lab", category: "Security",
      repo: "https://github.com/sanikaa29/Ransomware-recovery-lab",
      lines: [
        "Built a local lab that simulates a ransomware attack on a Postgres database and proves recovery end to end, with backups stored in an S3-compatible vault under Object Lock (COMPLIANCE mode) so even stolen admin credentials cannot delete them.",
        "Automated consistent snapshots with SHA-256 manifests, health checks every 5 seconds and verified clean-room restores with fallback; a measured run recorded 11 s RPO, 2.6 s detection and 3.2 s total downtime, with 6 of 6 locked backups surviving simulated vault attacks.",
      ],
      stack: ["Python", "PostgreSQL", "Docker", "S3 Object Lock"] },
    { title: "SwipeFit: Outfit Voting App", category: "Mobile",
      repo: "https://github.com/sanikaa29/SwipeFit",
      lines: [
        "Built a Tinder-style Android app where friend groups swipe Hot or Not on each other's outfits, with private groups joined by 6-character invite codes, anonymous sign-in and a live leaderboard with a top-three podium.",
        "Architected with MVVM, StateFlow and the repository pattern over Firebase Auth, Firestore and Storage; security rules enforce one vote per outfit on the server, and rankings update in real time through Firestore listeners wrapped in Kotlin Flow.",
      ],
      stack: ["Kotlin", "Jetpack Compose", "Firebase", "Android"] },
  ];

  const MILESTONES = [
    { title: "International CanSat Competition", year: "2025", image: "assets/ms-icc-certificates.jpg", image2: "assets/ms-icc-presentation.jpg", pos: "42% center",
      body: "Led DJS Arya to All India Rank 1 at the international CanSat challenge. Owned systems engineering across structures, avionics and recovery, and ran the full verification campaign before launch." },
    { title: "INSPACe National CanSat", year: "2025", image: "assets/ms-inspace-team.jpg", image2: "assets/ms-inspace-stage.jpg", pos: "56% center",
      body: "First place nationally at the INSPACe CanSat Competition. Designed the descent-control strategy and telemetry protocol that kept the payload within its error budget." },
    { title: "Canister Satellite", year: "2025", image: "assets/ms-cansat-hardware.jpg", pos: "center 45%",
      body: "Designed and built DJS Arya's flight-ready CanSat (Team #3109): a 3D-printed container housing avionics, telemetry and the recovery system, carried to the international launch." },
    { title: "Springer Publication", year: "2024", image: "assets/ms-socta-2024.jpg", pos: "72% center",
      body: "Presented first-author deep learning research on retinal disease classification at SoCTA 2024 (MNIT Jaipur), published in Springer proceedings. Owned the full experimental design, ablation study and reproducibility harness." },
    { title: "Team Leadership", year: "2024–2026", image: "assets/ms-team.jpg", pos: "center 35%",
      body: "Captained a 60+ member aerospace team across five sub-systems. Built the review cadence, documentation standard and mentoring pipeline the team still runs on." },
  ];

  const root = document.documentElement;
  const body = document.body;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));

  /* =========================================================
     Theme (with circular view-transition reveal)
     ========================================================= */
  const themeToggle = document.getElementById("theme-toggle");
  const themeMeta = document.querySelector('meta[name="theme-color"]');

  function applyTheme(theme) {
    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme;
    try { localStorage.setItem("sa-theme", theme); } catch (_) {}
    themeToggle.setAttribute("aria-label", `Switch to ${theme === "dark" ? "light" : "dark"} mode`);
    themeMeta.setAttribute("content", theme === "dark" ? "#000000" : "#f7f3fc");
  }
  applyTheme(root.classList.contains("dark") ? "dark" : "light");

  themeToggle.addEventListener("click", () => {
    const next = root.classList.contains("dark") ? "light" : "dark";
    if (!document.startViewTransition || reducedMotion) { applyTheme(next); return; }
    const r = themeToggle.getBoundingClientRect();
    const x = r.left + r.width / 2, y = r.top + r.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const vt = document.startViewTransition(() => applyTheme(next));
    vt.ready.then(() => {
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 700, easing: "cubic-bezier(0.65, 0, 0.35, 1)", pseudoElement: "::view-transition-new(root)" }
      );
    });
  });

  /* =========================================================
     Opening intro — pixel-art girl
     ========================================================= */
  const introEl = document.getElementById("pixel-intro");
  const girlBtn = document.getElementById("pixel-girl-btn");
  const skipBtn = document.getElementById("skip-intro");
  const introStars = document.getElementById("intro-stars");
  const introSparkles = document.getElementById("intro-sparkles");
  const heroTitle = document.querySelector(".hero-title");

  function startSite() {
    void body.offsetWidth; // commit initial hidden state before animating in
    body.classList.add("loaded");
  }

  if (root.classList.contains("has-intro")) {
    // build stars
    for (let i = 0; i < 45; i++) {
      const st = document.createElement("span");
      st.className = "intro-star";
      st.style.left = `${(i * 37) % 100}%`;
      st.style.top = `${(i * 53) % 100}%`;
      const size = (i % 5) * 0.5 + 1;
      st.style.width = `${size}px`;
      st.style.height = `${size}px`;
      st.style.opacity = String(0.1 + (i % 7) / 16);
      st.style.animationDelay = `${i % 5 * 0.3}s`;
      introStars.appendChild(st);
    }
    // build floating pixel sparkles
    for (let i = 0; i < 8; i++) {
      const sp = document.createElement("span");
      sp.className = "pg-sparkle";
      sp.style.left = `${8 + ((i * 41) % 84)}%`;
      sp.style.top = `${8 + ((i * 29) % 80)}%`;
      sp.style.animationDelay = `${(i % 6) * 0.6}s`;
      sp.style.animationDuration = `${4 + (i % 4)}s`;
      introSparkles.appendChild(sp);
    }

    const introPage = document.querySelectorAll("body > header, body > main, body > footer");
    introPage.forEach((el) => { el.inert = true; });
    const introTimers = [];
    const later = (fn, delay) => introTimers.push(setTimeout(fn, delay));
    let launched = false;
    let finished = false;

    const finishIntro = () => {
      if (finished) return;
      finished = true;
      introTimers.forEach(clearTimeout);
      try { sessionStorage.setItem("sa-launched", "2"); } catch (_) {}
      introEl.classList.add("hidden-intro");
      root.classList.remove("has-intro");
      root.classList.add("no-intro");
      introPage.forEach((el) => { el.inert = false; });
      startSite();
      heroTitle.focus({ preventScroll: true });
    };

    girlBtn.addEventListener("click", () => {
      if (launched) return;
      launched = true;
      window.scrollTo({ top: 0, behavior: "instant" });
      introEl.classList.add("started");
      if (reducedMotion) { finishIntro(); return; }
      girlBtn.classList.add("step-turn");
      later(() => girlBtn.classList.add("step-power"), 800);
      later(() => {
        const bounds = girlBtn.querySelector(".intro-laptop-display").getBoundingClientRect();
        const portal = document.getElementById("laptop-portal");
        Object.assign(portal.style, {
          left: `${bounds.left}px`, top: `${bounds.top}px`,
          width: `${bounds.width}px`, height: `${bounds.height}px`,
        });
        portal.getBoundingClientRect(); // Commit the screen position before expanding.
        introEl.classList.add("step-expand");
      }, 1150);
      later(() => introEl.classList.add("step-reveal"), 2050);
      later(finishIntro, 2500);
    });
    skipBtn.addEventListener("click", finishIntro);
    document.getElementById("intro-hint").addEventListener("click", () => girlBtn.click());
    window.addEventListener("keydown", function onKey(e) {
      if (finished || launched) { window.removeEventListener("keydown", onKey); return; }
      if (e.key === "Enter" && !(e.target instanceof HTMLButtonElement)) { e.preventDefault(); girlBtn.click(); }
      if (e.key === "Escape") finishIntro();
    });
  } else {
    introEl.classList.add("hidden-intro");
    startSite();
  }

  /* =========================================================
     Nav: scrolled state, mobile menu, scroll-spy
     ========================================================= */
  const header = document.getElementById("site-header");
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const navLinks = Array.from(document.querySelectorAll("#nav-links a"));

  mobileMenu.querySelectorAll("li").forEach((li, i) => li.style.setProperty("--i", i));

  function setMenuOpen(open) {
    header.classList.toggle("menu-open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    body.style.overflow = open ? "hidden" : "";
  }
  menuToggle.addEventListener("click", () => setMenuOpen(!header.classList.contains("menu-open")));
  mobileMenu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenuOpen(false)));

  const spy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      navLinks.forEach((a) => a.classList.toggle("active", a.dataset.section === id));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  SECTIONS.forEach((id) => { const el = document.getElementById(id); if (el) spy.observe(el); });

  /* =========================================================
     Scroll-linked effects (single rAF loop)
     ========================================================= */
  const progressBar = document.getElementById("scroll-progress");
  const hero = document.getElementById("home");
  const statement = document.getElementById("statement");
  const timeline = document.querySelector(".timeline");
  const timelineFill = document.getElementById("timeline-fill");

  // Split statement into words for scroll-scrubbed highlight
  const words = statement.textContent.trim().split(/\s+/);
  statement.innerHTML = words.map((w) => `<span class="w">${w}</span>`).join(" ");
  const wordEls = Array.from(statement.querySelectorAll(".w"));

  let ticking = false;
  function onScroll() {
    const y = window.scrollY;
    const vh = window.innerHeight;
    const max = document.documentElement.scrollHeight - vh;

    header.classList.toggle("scrolled", y > 10);
    progressBar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    if (y > 20) body.classList.add("scrolled-once");

    if (!reducedMotion) {
      hero.style.setProperty("--hp", clamp(y / (vh * 0.9)).toFixed(4));
    }

    // Statement words
    const sr = statement.getBoundingClientRect();
    const sp = reducedMotion ? 1 : clamp((vh * 0.85 - sr.top) / (sr.height + vh * 0.3));
    const lit = Math.round(sp * wordEls.length);
    wordEls.forEach((w, i) => w.classList.toggle("lit", i < lit));

    // Timeline fill
    const tr = timeline.getBoundingClientRect();
    timelineFill.style.setProperty("--tl", clamp((vh * 0.65 - tr.top) / tr.height).toFixed(4));

    ticking = false;
  }
  window.addEventListener("scroll", () => {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();

  /* =========================================================
     Reveal on scroll (with stagger)
     ========================================================= */
  document.querySelectorAll("[data-stagger]").forEach((group) => {
    Array.from(group.children).forEach((child, i) => child.style.setProperty("--i", i));
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      el.classList.add("in");
      revealObserver.unobserve(el);
      // Drop stagger delay afterwards so hover effects respond instantly
      setTimeout(() => el.style.removeProperty("--i"), 1600);
    });
  }, { rootMargin: "0px 0px -10% 0px", threshold: 0.08 });
  document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

  /* =========================================================
     Count-up stats
     ========================================================= */
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      counterObserver.unobserve(el);
      const target = parseFloat(el.dataset.count);
      const decimals = parseInt(el.dataset.decimals || "0", 10);
      if (reducedMotion) { el.textContent = target.toFixed(decimals); return; }
      const dur = 1600;
      const t0 = performance.now();
      (function tick(now) {
        const p = clamp((now - t0) / dur);
        const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
        el.textContent = (target * eased).toFixed(decimals);
        if (p < 1) requestAnimationFrame(tick);
      })(t0);
    });
  }, { threshold: 0.6 });
  document.querySelectorAll("[data-count]").forEach((el) => counterObserver.observe(el));

  /* =========================================================
     Pointer effects: card spotlight, hero parallax, magnetic buttons
     ========================================================= */
  if (finePointer && !reducedMotion) {
    document.addEventListener("pointermove", (e) => {
      const card = e.target.closest(".spotlight, .project-card");
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    }, { passive: true });

    const heroVisual = document.getElementById("hero-visual");
    hero.addEventListener("pointermove", (e) => {
      const nx = e.clientX / innerWidth - 0.5;
      const ny = e.clientY / innerHeight - 0.5;
      heroVisual.style.setProperty("--tx", `${(-nx * 24).toFixed(1)}px`);
      heroVisual.style.setProperty("--ty", `${(-ny * 18).toFixed(1)}px`);
    });
    hero.addEventListener("pointerleave", () => {
      heroVisual.style.setProperty("--tx", "0px");
      heroVisual.style.setProperty("--ty", "0px");
    });

    document.querySelectorAll(".magnetic").forEach((btn) => {
      btn.addEventListener("pointermove", (e) => {
        const r = btn.getBoundingClientRect();
        btn.style.setProperty("--bx", `${((e.clientX - r.left - r.width / 2) * 0.25).toFixed(1)}px`);
        btn.style.setProperty("--by", `${((e.clientY - r.top - r.height / 2) * 0.35).toFixed(1)}px`);
      });
      btn.addEventListener("pointerleave", () => {
        btn.style.setProperty("--bx", "0px");
        btn.style.setProperty("--by", "0px");
      });
    });
  }

  /* =========================================================
     Projects: segmented filter + animated grid
     ========================================================= */
  (function projects() {
    const grid = document.getElementById("projects-grid");
    const filterRow = document.getElementById("project-filters");
    const thumb = document.getElementById("segmented-thumb");
    const buttons = Array.from(filterRow.querySelectorAll("button"));
    const ghIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';

    function cardHTML(p, i) {
      return `
        <article class="card project-card" style="--i:${i}">
          <div class="project-top">
            <span class="project-cats">${[].concat(p.category).map((c) => `<span class="project-cat">${c}</span>`).join("")}</span>
            <a href="${p.repo}" target="_blank" rel="noreferrer" class="project-arrow" aria-label="${p.title} on GitHub">${ghIcon}</a>
          </div>
          <h3>${p.title}</h3>
          <ul>${p.lines.map((l) => `<li>${l}</li>`).join("")}</ul>
          <div class="project-stack">${p.stack.map((s) => `<span>${s}</span>`).join("")}</div>
          <div class="project-links">
            <a href="${p.repo}" target="_blank" rel="noreferrer" class="btn-link">View Code <span aria-hidden="true">›</span></a>
            ${p.paper ? `<a href="${p.paper}" target="_blank" rel="noopener noreferrer" class="btn-link">Read Paper <span aria-hidden="true">↗</span></a>` : ""}
            ${p.demo ? `<a href="${p.demo}" target="_blank" rel="noopener noreferrer" class="btn-link">Live Demo <span aria-hidden="true">↗</span></a>` : ""}
            ${p.video ? `<a href="${p.video}" target="_blank" rel="noopener noreferrer" class="btn-link">Watch Video <span aria-hidden="true">↗</span></a>` : ""}
          </div>
        </article>`;
    }

    function render(filter) {
      const list = filter === "All" ? PROJECTS : PROJECTS.filter((p) => [].concat(p.category).includes(filter));
      grid.innerHTML = list.map(cardHTML).join("");
      grid.querySelectorAll(".project-card").forEach((card) => {
        card.addEventListener("animationend", () => card.classList.add("shown"), { once: true });
      });
    }

    function moveThumb(btn) {
      thumb.style.width = `${btn.offsetWidth}px`;
      thumb.style.height = `${btn.offsetHeight}px`;
      thumb.style.top = `${btn.offsetTop}px`;
      thumb.style.transform = `translateX(${btn.offsetLeft}px)`;
    }

    let current = "All";
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (btn.dataset.filter === current) return;
        current = btn.dataset.filter;
        buttons.forEach((b) => {
          const on = b === btn;
          b.classList.toggle("active", on);
          b.setAttribute("aria-selected", String(on));
        });
        moveThumb(btn);
        const cards = grid.querySelectorAll(".project-card");
        if (reducedMotion || !cards.length) { render(current); return; }
        cards.forEach((c) => c.classList.add("leaving"));
        setTimeout(() => render(current), 230);
      });
    });

    const syncThumb = () => moveThumb(filterRow.querySelector("button.active"));
    window.addEventListener("resize", syncThumb);
    if (document.fonts) document.fonts.ready.then(syncThumb);
    syncThumb();
    render("All");
  })();

  /* =========================================================
     Modal helper
     ========================================================= */
  function createModal(overlay, closeBtn, onClose) {
    let lastFocus = null;
    function open() {
      lastFocus = document.activeElement;
      overlay.classList.add("open");
      body.style.overflow = "hidden";
      setTimeout(() => closeBtn.focus(), 50);
    }
    function close() {
      overlay.classList.remove("open");
      body.style.overflow = "";
      if (lastFocus) lastFocus.focus({ preventScroll: true });
      if (onClose) onClose();
    }
    closeBtn.addEventListener("click", close);
    overlay.addEventListener("click", (e) => { if (e.target === overlay) close(); });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && overlay.classList.contains("open")) close();
    });
    return { open, close };
  }

  /* =========================================================
     Milestones carousel + modal
     ========================================================= */
  (function milestones() {
    const track = document.getElementById("milestones-track");
    const dots = document.getElementById("milestone-dots");
    const prevBtn = document.getElementById("milestone-prev");
    const nextBtn = document.getElementById("milestone-next");
    const overlay = document.getElementById("milestone-modal");
    const media = document.getElementById("milestone-modal-media");
    const slideImg = document.getElementById("milestone-modal-img");
    const slideBg = document.getElementById("milestone-slide-bg");
    const slidePrev = document.getElementById("milestone-slide-prev");
    const slideNext = document.getElementById("milestone-slide-next");
    const slideDots = document.getElementById("milestone-slide-dots");
    const slideCount = document.getElementById("milestone-slide-count");
    let slides = [], slideIdx = 0, slideTitle = "";

    function showSlide(i, animate = true) {
      slideIdx = (i + slides.length) % slides.length;
      const src = slides[slideIdx];
      const apply = () => {
        slideImg.src = src;
        slideImg.alt = slides.length > 1 ? `${slideTitle} — photo ${slideIdx + 1} of ${slides.length}` : slideTitle;
        slideBg.style.backgroundImage = `url("${src}")`;
        slideImg.classList.remove("fading");
      };
      if (animate && !reducedMotion) { slideImg.classList.add("fading"); setTimeout(apply, 180); } else apply();
      Array.from(slideDots.children).forEach((d, k) => d.classList.toggle("on", k === slideIdx));
      slideCount.textContent = `${slideIdx + 1} / ${slides.length}`;
    }
    slidePrev.addEventListener("click", () => showSlide(slideIdx - 1));
    slideNext.addEventListener("click", () => showSlide(slideIdx + 1));
    document.addEventListener("keydown", (e) => {
      if (!overlay.classList.contains("open") || slides.length < 2) return;
      if (e.key === "ArrowRight") showSlide(slideIdx + 1);
      if (e.key === "ArrowLeft") showSlide(slideIdx - 1);
    });
    let touchX = null;
    media.addEventListener("touchstart", (e) => { touchX = e.touches[0].clientX; }, { passive: true });
    media.addEventListener("touchend", (e) => {
      if (touchX === null || slides.length < 2) return;
      const dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 40) showSlide(slideIdx + (dx < 0 ? 1 : -1));
      touchX = null;
    });
    const yearEl = document.getElementById("milestone-modal-year");
    const titleEl = document.getElementById("milestone-modal-title");
    const bodyEl = document.getElementById("milestone-modal-body");

    track.innerHTML = MILESTONES.map((m, i) => `
      <button type="button" class="milestone-card" data-index="${i}" aria-label="${m.title}, ${m.year}. Open details">
        <img src="${m.image}" alt="" loading="lazy" width="1024" height="768"${m.pos ? ` style="object-position:${m.pos}"` : ""} />
        <span class="m-year">${m.year}</span>
        <span class="m-content">
          <span class="m-title">${m.title}</span>
          <span class="m-sum">${m.body.split(". ")[0].replace(/\.$/, "")}.</span>
        </span>
        <span class="m-plus" aria-hidden="true">+</span>
      </button>`).join("");
    dots.innerHTML = MILESTONES.map(() => "<span></span>").join("");

    const cards = Array.from(track.children);
    const dotEls = Array.from(dots.children);
    const step = () => cards[0].offsetWidth + 20;
    const atEnd = () => track.scrollLeft >= track.scrollWidth - track.clientWidth - 4;

    function updateDots() {
      const idx = atEnd() ? cards.length - 1 : Math.round(track.scrollLeft / step());
      dotEls.forEach((d, i) => d.classList.toggle("on", i === idx));
    }
    track.addEventListener("scroll", () => requestAnimationFrame(updateDots), { passive: true });
    updateDots();

    function next() { atEnd() ? track.scrollTo({ left: 0 }) : track.scrollBy({ left: step() }); }
    function prev() { track.scrollLeft <= 4 ? track.scrollTo({ left: track.scrollWidth }) : track.scrollBy({ left: -step() }); }

    // Autoplay while visible, paused on hover/focus/interaction
    let hovering = false, inView = false, modalOpen = false, holdUntil = 0;
    const hold = () => { holdUntil = Date.now() + 8000; };
    prevBtn.addEventListener("click", () => { hold(); prev(); });
    nextBtn.addEventListener("click", () => { hold(); next(); });
    track.addEventListener("pointerenter", () => { hovering = true; });
    track.addEventListener("pointerleave", () => { hovering = false; });
    track.addEventListener("focusin", () => { hovering = true; });
    track.addEventListener("focusout", () => { hovering = false; });
    track.addEventListener("touchstart", hold, { passive: true });
    track.addEventListener("wheel", hold, { passive: true });
    new IntersectionObserver(([e]) => { inView = e.isIntersecting; }, { threshold: 0.4 }).observe(track);
    if (!reducedMotion) {
      setInterval(() => {
        if (inView && !hovering && !modalOpen && Date.now() > holdUntil && !document.hidden) next();
      }, 4500);
    }

    const modal = createModal(overlay, document.getElementById("milestone-modal-close"), () => { modalOpen = false; });

    track.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-index]");
      if (!btn) return;
      const idx = Number(btn.dataset.index);
      const m = MILESTONES[idx];
      slides = [m.image, m.image2].filter(Boolean);
      slideTitle = m.title;
      media.classList.toggle("single", slides.length < 2);
      slideDots.innerHTML = slides.map(() => "<span></span>").join("");
      showSlide(0, false);
      yearEl.textContent = m.year;
      titleEl.textContent = m.title;
      bodyEl.textContent = m.body;
      modalOpen = true;
      modal.open();
    });
  })();

  /* =========================================================
     Contact form
     ========================================================= */
  (function contact() {
    const form = document.getElementById("contact-form");
    const status = document.getElementById("form-status");
    const label = document.getElementById("transmit-label");
    const satellite = document.getElementById("contact-satellite");
    const TO = "sa2494@cornell.edu";

    // Opens the visitor's email app with the message pre-filled
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();
      const subject = `Portfolio inquiry from ${name}`;
      const bodyText = `${message}\n\n— ${name}\n${email}`;
      satellite.classList.add("sending");
      label.textContent = "Opening your email app…";
      window.location.href = `mailto:${TO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;
      setTimeout(() => {
        satellite.classList.remove("sending");
        label.textContent = "Transmit Message";
        status.textContent = "Your message is ready in your email app — just hit send.";
        status.classList.add("ok");
      }, 1400);
    });
  })();

  /* =========================================================
     Toast
     ========================================================= */
  function showToast(title, description) {
    const container = document.getElementById("toast-container");
    const toast = document.createElement("div");
    toast.className = "toast";
    const strong = document.createElement("strong");
    strong.textContent = title;
    const span = document.createElement("span");
    span.textContent = description;
    toast.append(strong, span);
    container.appendChild(toast);
    setTimeout(() => {
      toast.classList.add("out");
      setTimeout(() => toast.remove(), 400);
    }, 4000);
  }
})();
