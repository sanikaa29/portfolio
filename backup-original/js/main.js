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
    { title: "Enterprise GenAI Report Engine", category: "AI", image: "assets/proj-ai.jpg", repo: "https://github.com/sanikaajgaonkar",
      lines: ["Retrieval-augmented pipeline over GPT-4 and LLaMA for enterprise reporting.", "Cut manual report preparation effort by 40% across analyst workflows.", "Deployed on AWS with evaluation harness and guardrailed prompt routing."],
      stack: ["Python", "PyTorch", "AWS", "Flask"] },
    { title: "CanSat Telemetry Ground Station", category: "Full Stack", image: "assets/proj-web.jpg", repo: "https://github.com/sanikaajgaonkar",
      lines: ["Real-time telemetry dashboard streaming satellite sensor packets at 1 Hz.", "Socket.io pipeline sustained zero packet loss across competition flights.", "Used by a 60+ member team during International CanSat launch operations."],
      stack: ["React", "Next.js", "Node.js", "Socket.io"] },
    { title: "Deep Learning Retinal Diagnostics", category: "ML", image: "assets/proj-ai.jpg", repo: "https://github.com/sanikaajgaonkar",
      lines: ["CNN ensemble classifying retinal pathologies from fundus imagery.", "Reached clinically useful accuracy with augmentation and transfer learning.", "Published methodology and ablation study in a Springer proceedings volume."],
      stack: ["PyTorch", "TensorFlow", "OpenCV", "NumPy"] },
    { title: "Urban Air Quality Forecasting", category: "Data", image: "assets/proj-data.jpg", repo: "https://github.com/sanikaajgaonkar",
      lines: ["Time-series models forecasting pollutant concentration across Mumbai wards.", "Feature store built on BigQuery with automated daily ingestion jobs.", "Power BI layer surfaced ward-level risk to non-technical stakeholders."],
      stack: ["Python", "BigQuery", "Pandas", "Power BI"] },
    { title: "Campus Scheduling Database", category: "DBMS", image: "assets/proj-db.jpg", repo: "https://github.com/sanikaajgaonkar",
      lines: ["Normalized PostgreSQL schema resolving room, faculty and cohort conflicts.", "Constraint solver reduced timetable generation from days to minutes.", "Indexed query plans kept p95 lookup latency under 40 ms at peak load."],
      stack: ["PostgreSQL", "SQL", "Django", "Linux"] },
    { title: "IoT Predictive Maintenance", category: "ML", image: "assets/proj-data.jpg", repo: "https://github.com/sanikaajgaonkar",
      lines: ["Edge-to-cloud anomaly detection on vibration and thermal sensor streams.", "Early fault signals raised prediction accuracy over the prior baseline.", "Shipped a working prototype now used for real-time equipment monitoring."],
      stack: ["Python", "Scikit-learn", "AWS", "MySQL"] },
    { title: "Neuro-Inspired Attention Study", category: "AI", image: "assets/proj-ai.jpg", repo: "https://github.com/sanikaajgaonkar",
      lines: ["Compared biologically-motivated attention priors against standard transformers.", "Measured sample efficiency gains on low-data vision benchmarks.", "Reproducible experiment suite with seeded runs and logged ablations."],
      stack: ["PyTorch", "NumPy", "Python"] },
    { title: "Satellite Imagery Segmentation", category: "Data", image: "assets/proj-db.jpg", repo: "https://github.com/sanikaajgaonkar",
      lines: ["U-Net segmentation of land-use classes from multispectral satellite tiles.", "Tiling and caching pipeline processed large scenes on modest hardware.", "Exported GeoJSON layers consumable directly by downstream GIS tooling."],
      stack: ["TensorFlow", "OpenCV", "Python", "AWS"] },
  ];

  const MILESTONES = [
    { title: "International CanSat Competition", year: "2024", image: "assets/cansat.jpg",
      body: "Led DJS Arya to All India Rank 1 at the international CanSat challenge. Owned systems engineering across structures, avionics and recovery, and ran the full verification campaign before launch.",
      tech: ["Embedded C", "Python", "Telemetry", "Systems Engineering"], impact: "All India Rank 1 among national teams." },
    { title: "INSPACe National CanSat", year: "2024", image: "assets/satellite.jpg",
      body: "First place nationally at the INSPACe CanSat Competition. Designed the descent-control strategy and telemetry protocol that kept the payload within its error budget.",
      tech: ["Sensor Fusion", "RF Downlink", "Simulation"], impact: "National winner, judged on design rigour and flight performance." },
    { title: "Ernst & Young — GenAI", year: "2025", image: "assets/proj-ai.jpg",
      body: "Built enterprise GenAI tooling on GPT-4 and LLaMA with an AWS deployment path. Shipped evaluation tooling that made model quality measurable for business stakeholders.",
      tech: ["GPT-4", "LLaMA", "AWS", "Python"], impact: "30% reporting accuracy improvement, 40% less manual effort." },
    { title: "Springer Publication", year: "2025", image: "assets/proj-data.jpg",
      body: "Published first-author deep learning research on retinal disease classification. Contributed the full experimental design, ablation study and reproducibility harness.",
      tech: ["PyTorch", "OpenCV", "Research Writing"], impact: "Peer-reviewed publication in a Springer proceedings volume." },
    { title: "Cornell Tech", year: "2026", image: "assets/proj-web.jpg",
      body: "Admitted to the MS in Computer & Information Systems at Cornell Tech, continuing work at the intersection of AI systems and product engineering in New York.",
      tech: ["AI Systems", "Product", "Data Management"], impact: "Next mission: building intelligent products at Cornell Tech." },
    { title: "Team Leadership", year: "2023–2025", image: "assets/cansat.jpg",
      body: "Captained a 60+ member aerospace team across five sub-systems. Built the review cadence, documentation standard and mentoring pipeline the team still runs on.",
      tech: ["Leadership", "Systems Review", "Mentoring"], impact: "Two consecutive competition wins with a fully student-built stack." },
    { title: "Applied Research", year: "2024", image: "assets/proj-db.jpg",
      body: "Research internship translating IoT sensor streams into deployable machine learning prototypes for real-time monitoring in industrial settings.",
      tech: ["Scikit-learn", "IoT", "Time Series"], impact: "Prototypes moved from notebook to working deployment." },
    { title: "AI & ML Honors", year: "2025", image: "assets/proj-ai.jpg",
      body: "Completed an honors track in Artificial Intelligence and Machine Learning alongside an Electronics & Telecommunication core, pairing theory with hardware intuition.",
      tech: ["Machine Learning", "Statistics", "Signal Processing"], impact: "Honors distinction in AI & ML." },
  ];

  /* =========================================================
     Theme
     ========================================================= */
  const root = document.documentElement;
  const themeToggle = document.getElementById("theme-toggle");
  const iconSun = document.getElementById("theme-icon-sun");
  const iconMoon = document.getElementById("theme-icon-moon");

  function applyTheme(theme) {
    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme;
    localStorage.setItem("sa-theme", theme);
    iconSun.style.display = theme === "dark" ? "" : "none";
    iconMoon.style.display = theme === "dark" ? "none" : "";
    themeToggle.setAttribute("aria-label", `Switch to ${theme === "dark" ? "light" : "dark"} mode`);
  }

  let currentTheme = localStorage.getItem("sa-theme") || "dark";
  applyTheme(currentTheme);
  themeToggle.addEventListener("click", () => {
    currentTheme = currentTheme === "dark" ? "light" : "dark";
    applyTheme(currentTheme);
  });

  /* =========================================================
     Opening intro — pixel-art girl
     ========================================================= */
  const introEl = document.getElementById("pixel-intro");
  const girlBtn = document.getElementById("pixel-girl-btn");
  const skipBtn = document.getElementById("skip-intro");
  const introStars = document.getElementById("intro-stars");
  const introSparkles = document.getElementById("intro-sparkles");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // build stars
  for (let i = 0; i < 70; i++) {
    const s = document.createElement("span");
    s.className = "intro-star";
    s.style.left = `${(i * 37) % 100}%`;
    s.style.top = `${(i * 53) % 100}%`;
    const size = (i % 5) * 0.5 + 1;
    s.style.width = `${size}px`;
    s.style.height = `${size}px`;
    s.style.opacity = String(0.2 + (i % 7) / 10);
    s.style.animationDelay = `${i % 5 * 0.3}s`;
    introStars.appendChild(s);
  }

  // build floating pixel sparkles
  for (let i = 0; i < 16; i++) {
    const p = document.createElement("span");
    p.className = "pg-sparkle";
    p.style.left = `${8 + ((i * 41) % 84)}%`;
    p.style.top = `${8 + ((i * 29) % 80)}%`;
    p.style.animationDelay = `${(i % 6) * 0.6}s`;
    p.style.animationDuration = `${4 + (i % 4)}s`;
    introSparkles.appendChild(p);
  }

  const introPage = document.querySelectorAll("body > header, body > main, body > footer");
  let launched = false;
  const introTimers = [];
  function finishIntro() {
    introTimers.forEach(clearTimeout);
    try { sessionStorage.setItem("sa-launched", "2"); } catch (_) { /* Storage may be disabled. */ }
    introEl.classList.add("hidden-intro");
    document.body.classList.remove("intro-active");
    introPage.forEach(el => { el.inert = false; });
    const heading = document.querySelector("#home h1");
    heading.setAttribute("tabindex", "-1");
    heading.focus({ preventScroll: true });
  }
  let seenIntro = false;
  try { seenIntro = sessionStorage.getItem("sa-launched") === "2"; } catch (_) {}
  if (seenIntro) {
    introEl.classList.add("hidden-intro");
  } else {
    document.body.classList.add("intro-active");
    introPage.forEach(el => { el.inert = true; });
    const later = (fn, delay) => introTimers.push(setTimeout(fn, delay));
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
          width: `${bounds.width}px`, height: `${bounds.height}px`
        });
        portal.getBoundingClientRect(); // Commit the screen position before expanding.
        introEl.classList.add("step-expand");
      }, 1150);
      later(() => introEl.classList.add("step-reveal"), 2050);
      later(finishIntro, 2500);
    });
    skipBtn.addEventListener("click", finishIntro);
  }

  /* =========================================================
     Starfield canvas + cursor glow
     ========================================================= */
  (function starfield() {
    const canvas = document.getElementById("starfield");
    const ctx = canvas.getContext("2d");
    let w = 0, h = 0, stars = [], shooters = [];
    const mouse = { x: -999, y: -999 };
    let scrollY = window.scrollY;
    let raf = 0;
    let t = 0;

    function isDark() { return root.classList.contains("dark"); }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(170, Math.round((w * h) / 12000));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.3 + 0.3,
        a: Math.random() * 0.6 + 0.3,
        tw: Math.random() * 0.02 + 0.004,
        depth: Math.random() * 0.5 + 0.15,
      }));
    }

    function draw() {
      t += 1;
      const dark = isDark();
      const starColor = dark ? "249, 250, 251" : "37, 99, 235";
      const lineColor = dark ? "124, 58, 237" : "37, 99, 235";
      const baseAlpha = dark ? 1 : 0.55;

      ctx.clearRect(0, 0, w, h);
      const px = (scrollY * 0.06) % h;

      for (const s of stars) {
        const y = (s.y - px * s.depth + h) % h;
        let x = s.x, sy = y;
        const dx = mouse.x - s.x, dy = mouse.y - y;
        const dist = Math.hypot(dx, dy);
        if (dist < 120) {
          const push = (120 - dist) / 120;
          x -= (dx / (dist || 1)) * push * 8;
          sy -= (dy / (dist || 1)) * push * 8;
        }
        const alpha = reducedMotion ? s.a : s.a + Math.sin(t * s.tw * 6) * 0.25;
        ctx.beginPath();
        ctx.fillStyle = `rgba(${starColor}, ${Math.max(0.08, alpha) * baseAlpha})`;
        ctx.arc(x, sy, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.lineWidth = 0.5;
      for (let i = 0; i < stars.length; i += 3) {
        for (let j = i + 1; j < Math.min(i + 6, stars.length); j++) {
          const a = stars[i], b = stars[j];
          if (!a || !b) continue;
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 110) {
            ctx.strokeStyle = `rgba(${lineColor}, ${(1 - d / 110) * (dark ? 0.16 : 0.14)})`;
            ctx.beginPath();
            ctx.moveTo(a.x, (a.y - px * a.depth + h) % h);
            ctx.lineTo(b.x, (b.y - px * b.depth + h) % h);
            ctx.stroke();
          }
        }
      }

      if (!reducedMotion) {
        if (Math.random() < 0.0025 && shooters.length < 2) {
          shooters.push({ x: Math.random() * w * 0.7, y: Math.random() * h * 0.4, vx: 5 + Math.random() * 3, vy: 2 + Math.random(), life: 1 });
        }
        shooters = shooters.filter((s) => s.life > 0);
        for (const s of shooters) {
          s.x += s.vx; s.y += s.vy; s.life -= 0.012;
          const grad = ctx.createLinearGradient(s.x, s.y, s.x - s.vx * 14, s.y - s.vy * 14);
          grad.addColorStop(0, `rgba(${starColor}, ${s.life * baseAlpha})`);
          grad.addColorStop(1, "rgba(0,0,0,0)");
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(s.x - s.vx * 14, s.y - s.vy * 14);
          ctx.stroke();
        }
      }

      raf = requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", (e) => { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
    window.addEventListener("scroll", () => { scrollY = window.scrollY; }, { passive: true });
  })();

  (function cursorGlow() {
    const el = document.getElementById("cursor-glow");
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let x = 0, y = 0, cx = 0, cy = 0, raf = 0;
    window.addEventListener("mousemove", (e) => {
      x = e.clientX; y = e.clientY;
      el.style.opacity = "1";
    }, { passive: true });
    (function loop() {
      cx += (x - cx) * 0.12;
      cy += (y - cy) * 0.12;
      el.style.transform = `translate3d(${cx - 160}px, ${cy - 160}px, 0)`;
      raf = requestAnimationFrame(loop);
    })();
  })();

  /* =========================================================
     Passing satellite (re-triggers every 20s)
     ========================================================= */
  (function passingSatellite() {
    const el = document.getElementById("passing-satellite");
    function retrigger() {
      el.style.animation = "none";
      // force reflow
      void el.offsetWidth;
      el.style.animation = "drift-across 18s linear";
    }
    retrigger();
    setInterval(retrigger, 20000);
  })();

  /* =========================================================
     Nav: scroll shadow, mobile menu, scroll-spy, constellation badge
     ========================================================= */
  const siteNav = document.getElementById("site-nav");
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const menuIconOpen = document.getElementById("menu-icon-open");
  const menuIconClose = document.getElementById("menu-icon-close");
  const navLinks = Array.from(document.querySelectorAll("#nav-links a"));
  const constellationBadge = document.getElementById("constellation-badge");

  window.addEventListener("scroll", () => {
    siteNav.classList.toggle("scrolled", window.scrollY > 40);
  }, { passive: true });

  let menuOpen = false;
  function setMenuOpen(open) {
    menuOpen = open;
    mobileMenu.classList.toggle("open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    menuIconOpen.style.display = open ? "none" : "";
    menuIconClose.style.display = open ? "" : "none";
  }
  menuToggle.addEventListener("click", () => setMenuOpen(!menuOpen));
  mobileMenu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenuOpen(false)));

  // constellation badge
  const NODES = [[6, 16], [14, 7], [22, 14], [17, 22], [9, 24], [24, 5]];
  const visited = new Set(["home"]);
  let activeSection = "home";

  function renderBadge() {
    const progress = visited.size / SECTIONS.length;
    const lit = Math.max(Math.round(progress * NODES.length), 1);
    let svg = "";
    for (let i = 0; i < lit - 1; i++) {
      const [x1, y1] = NODES[i];
      const [x2, y2] = NODES[i + 1];
      svg += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="var(--nebula)" stroke-width="0.7" opacity="0.7" />`;
    }
    NODES.forEach(([x, y], i) => {
      const isLit = i < lit;
      svg += `<circle cx="${x}" cy="${y}" r="${isLit ? 1.8 : 1}" fill="${isLit ? "var(--signal)" : "currentColor"}" opacity="${isLit ? 1 : 0.25}" />`;
    });
    constellationBadge.innerHTML = svg;
    document.getElementById("nav-brand-link").setAttribute(
      "aria-label", `Sanika Ajgaonkar — journey ${Math.round(progress * 100)}% explored`
    );
  }
  renderBadge();

  function setActiveNav(id) {
    activeSection = id;
    navLinks.forEach((a) => a.classList.toggle("active", a.dataset.section === id));
  }

  const sectionEls = SECTIONS.map((id) => document.getElementById(id)).filter(Boolean);
  const spyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          visited.add(id);
          setActiveNav(id);
          renderBadge();
        }
      });
    },
    { rootMargin: "-45% 0px -45% 0px" }
  );
  sectionEls.forEach((el) => spyObserver.observe(el));

  /* =========================================================
     Reveal-on-scroll animation
     ========================================================= */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = "running";
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "-60px", threshold: 0.01 }
  );
  document.querySelectorAll(".reveal, .section-header").forEach((el) => {
    el.style.animationPlayState = "paused";
    revealObserver.observe(el);
  });

  /* =========================================================
     Projects: render, filter, modal
     ========================================================= */
  (function projects() {
    const grid = document.getElementById("projects-grid");
    const filterRow = document.getElementById("project-filters");
    const modal = document.getElementById("project-modal");
    const modalImg = document.getElementById("project-modal-img");
    const modalTitle = document.getElementById("project-modal-title");
    const modalDesc = document.getElementById("project-modal-desc");
    const modalClose = document.getElementById("project-modal-close");

    function cardHTML(p) {
      return `
        <article class="project-card panel panel-hover">
          <div class="project-body">
            <h3>${p.title}</h3>
            <ul>${p.lines.map((l) => `<li>${l}</li>`).join("")}</ul>
            <a href="${p.repo}" target="_blank" rel="noreferrer" class="btn btn-outline lift">
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/></svg>
              View Code
            </a>
          </div>
        </article>`;
    }

    function render(filter) {
      const list = filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);
      grid.innerHTML = list.map(cardHTML).join("");
      grid.querySelectorAll("[data-preview]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const p = PROJECTS.find((x) => x.title === btn.dataset.preview);
          openModal(p);
        });
      });
    }

    function openModal(p) {
      modalImg.src = p.image;
      modalImg.alt = `${p.title} full preview`;
      modalTitle.textContent = p.title;
      modalDesc.textContent = p.lines.join(" ");
      modal.classList.add("open");
    }
    function closeModal() { modal.classList.remove("open"); }

    modalClose.addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });

    filterRow.querySelectorAll("button").forEach((btn) => {
      btn.addEventListener("click", () => {
        filterRow.querySelectorAll("button").forEach((b) => {
          b.classList.remove("active");
          b.setAttribute("aria-selected", "false");
        });
        btn.classList.add("active");
        btn.setAttribute("aria-selected", "true");
        render(btn.dataset.filter);
      });
    });

    render("All");
  })();

  /* =========================================================
     Milestones: render, autoscroll, modal
     ========================================================= */
  (function milestones() {
    const track = document.getElementById("milestones-track");
    const prevBtn = document.getElementById("milestone-prev");
    const nextBtn = document.getElementById("milestone-next");
    const modal = document.getElementById("milestone-modal");
    const modalClose = document.getElementById("milestone-modal-close");
    const img1 = document.getElementById("milestone-modal-img1");
    const img2 = document.getElementById("milestone-modal-img2");
    const yearEl = document.getElementById("milestone-modal-year");
    const titleEl = document.getElementById("milestone-modal-title");
    const bodyEl = document.getElementById("milestone-modal-body");
    const impactEl = document.getElementById("milestone-modal-impact");
    const techEl = document.getElementById("milestone-modal-tech");

    const items = [...MILESTONES, ...MILESTONES];

    function cardHTML(m, i) {
      return `
        <button type="button" class="milestone-card panel panel-hover" data-index="${i}">
          <div class="milestone-thumb">
            <img src="${m.image}" alt="${m.title}" loading="lazy" width="1024" height="768" />
            <span class="caption">${m.title}</span>
          </div>
          <p class="milestone-summary">${m.body.split(". ")[0].replace(/\.$/, "")}.</p>
        </button>`;
    }

    track.innerHTML = items.map((m, i) => cardHTML(m, i)).join("");

    let paused = false;
    let modalOpen = false;
    let raf = 0;

    function step() {
      if (!paused && !modalOpen && !reducedMotion) {
        track.scrollLeft += 0.6;
        if (track.scrollLeft >= track.scrollWidth / 2) track.scrollLeft -= track.scrollWidth / 2;
      }
      raf = requestAnimationFrame(step);
    }
    raf = requestAnimationFrame(step);

    track.addEventListener("mouseenter", () => { paused = true; });
    track.addEventListener("mouseleave", () => { paused = false; });
    track.addEventListener("focusin", () => { paused = true; });
    track.addEventListener("focusout", () => { paused = false; });

    prevBtn.addEventListener("click", () => track.scrollBy({ left: -340, behavior: "smooth" }));
    nextBtn.addEventListener("click", () => track.scrollBy({ left: 340, behavior: "smooth" }));

    function openModal(m) {
      const nextIndex = (MILESTONES.indexOf(m) + 1) % MILESTONES.length;
      img1.src = m.image; img1.alt = m.title;
      img2.src = MILESTONES[nextIndex].image; img2.alt = `${m.title} — additional context`;
      yearEl.textContent = m.year;
      titleEl.textContent = m.title;
      bodyEl.textContent = m.body;
      impactEl.textContent = m.impact;
      techEl.innerHTML = m.tech.map((t) => `<li>${t}</li>`).join("");
      modal.classList.add("open");
      modalOpen = true;
    }
    function closeModal() { modal.classList.remove("open"); modalOpen = false; }

    track.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-index]");
      if (!btn) return;
      const idx = Number(btn.dataset.index) % MILESTONES.length;
      openModal(MILESTONES[idx]);
    });

    modalClose.addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
  })();

  /* =========================================================
     Contact form
     ========================================================= */
  (function contact() {
    const form = document.getElementById("contact-form");
    const btn = document.getElementById("transmit-btn");
    const label = document.getElementById("transmit-label");
    const status = document.getElementById("form-status");
    const satelliteWrap = document.getElementById("contact-satellite");
    let sent = false;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      btn.disabled = true;
      btn.classList.add("sending");
      satelliteWrap.classList.add("sending");
      label.textContent = "Transmitting…";

      setTimeout(() => {
        btn.disabled = false;
        btn.classList.remove("sending");
        satelliteWrap.classList.remove("sending");
        sent = true;
        label.textContent = "Transmit Again";
        status.textContent = "Transmission confirmed — the constellation lit up.";
        showToast("Signal received", "Your message reached the ground station. I'll reply shortly.");
      }, 1600);
    });
  })();

  /* =========================================================
     Toast
     ========================================================= */
  function showToast(title, description) {
    const container = document.getElementById("toast-container");
    const toast = document.createElement("div");
    toast.style.cssText = `
      pointer-events: auto;
      max-width: 22rem;
      margin-top: 0.5rem;
      border-radius: 0.875rem;
      border: 1px solid var(--border);
      background: color-mix(in oklab, var(--surface) 92%, transparent);
      backdrop-filter: blur(12px);
      box-shadow: var(--shadow-lift);
      padding: 0.875rem 1rem;
      font-size: 0.8125rem;
      color: var(--foreground);
      animation: fade-up 0.4s var(--ease-orbit);
    `;
    toast.innerHTML = `<strong style="display:block;margin-bottom:2px;">${title}</strong><span style="color:var(--muted-foreground)">${description}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.transition = "opacity 400ms, transform 400ms";
      toast.style.opacity = "0";
      toast.style.transform = "translateY(-8px)";
      setTimeout(() => toast.remove(), 400);
    }, 4000);
  }

  const toastContainerStyle = document.createElement("style");
  toastContainerStyle.textContent = `
    #toast-container {
      position: fixed;
      right: 1rem;
      bottom: 1rem;
      z-index: 200;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      pointer-events: none;
    }
  `;
  document.head.appendChild(toastContainerStyle);
})();
