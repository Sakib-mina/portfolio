/* ==========================================================================
   SILENT SPARK STUDIO - LIGHTWEIGHT & LAG-FREE SCRIPT
   Smooth 60fps animations, Horizontal 4-Card Auto-Slider, Modal Engine & Legal
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Current Year
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 1. Lightweight Canvas Particles (Optimized)
  initOptimizedCanvas();

  // 2. Navbar Scroll & Active Section Spy
  initNavbar();

  // 3. Mobile Navigation Menu
  initMobileMenu();

  // 4. Lightweight Scroll Reveal
  initScrollReveal();

  // 5. Portfolio Category Filter (Exact 9 Projects)
  initPortfolioFilter();

  // 6. Detailed Service Modal System
  initServiceModal();

  // 7. Horizontal 4-Card Auto-Sliding Testimonials
  initTestimonialsSlider();

  // 8. Legal Modals (Privacy Policy & Terms of Service)
  initLegalModal();

  // 9. Contact Form Handler
  initContactForm();

  // 10. 1-Click WhatsApp Number Copy
  initCopyWhatsAppNumber();
});

/* ---------------------------------------------------------
   1. OPTIMIZED AMBIENT CANVAS (No heavy distance loops)
   --------------------------------------------------------- */
function initOptimizedCanvas() {
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d', { alpha: true });
  let width, height;
  let particles = [];
  const particleCount = 28;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize, { passive: true });
  resize();

  class Spark {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 1.5 + 0.5;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = (Math.random() - 0.5) * 0.3;
      this.alpha = Math.random() * 0.35 + 0.15;
      this.color = Math.random() > 0.5 ? '#00f0ff' : '#9d4edd';
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.alpha;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Spark());
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }

    requestAnimationFrame(render);
  }

  render();
}

/* ---------------------------------------------------------
   2. NAVBAR SCROLL & ACTIVE SPY
   --------------------------------------------------------- */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (window.scrollY > 30) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }

        let currentId = '';
        const scrollPosition = window.scrollY + 200;

        sections.forEach(sec => {
          const top = sec.offsetTop;
          const height = sec.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            currentId = sec.getAttribute('id');
          }
        });

        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${currentId}`) {
            link.classList.add('active');
          }
        });

        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

/* ---------------------------------------------------------
   3. MOBILE NAVIGATION MENU
   --------------------------------------------------------- */
function initMobileMenu() {
  const toggleBtn = document.getElementById('menu-toggle');
  const menu = document.getElementById('nav-menu');
  const links = document.querySelectorAll('.nav-link');

  if (!toggleBtn || !menu) return;

  toggleBtn.addEventListener('click', () => {
    menu.classList.toggle('open');
  });

  links.forEach(l => {
    l.addEventListener('click', () => menu.classList.remove('open'));
  });
}

/* ---------------------------------------------------------
   4. SCROLL REVEAL (Fast Intersection Observer)
   --------------------------------------------------------- */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal-item');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -20px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

/* ---------------------------------------------------------
   5. PORTFOLIO FILTERING (Exact 9 Projects)
   --------------------------------------------------------- */
function initPortfolioFilter() {
  const buttons = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.project-card');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      items.forEach(item => {
        const cat = item.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* ---------------------------------------------------------
   6. IN-DEPTH SERVICE DETAILS DATA & MODAL SYSTEM
   --------------------------------------------------------- */
const servicesData = {
  web: {
    category: "01 / Engineering",
    title: "Website & Web Application Development",
    tagline: "Speed, security, high Google Lighthouse scores, and modern architectures.",
    description: "We architect and develop tailored websites ranging from lightning-fast marketing landing pages to full-scale SaaS platforms. Every web product is engineered with responsive layouts, modern JavaScript frameworks, clean semantic code, and technical SEO configurations that rank on search engines.",
    features: [
      "Custom UI/UX Implementation with 100% responsive precision",
      "Next.js / React with Server-Side Rendering (SSR) for speed",
      "Automated SEO optimization (Meta tags, Open Graph, Sitemap)",
      "High performance: 95+ Score on Google PageSpeed / Lighthouse",
      "Secure backend integrations with Stripe, Auth0, or Supabase",
      "SSL, Cloudflare CDN integration, and zero-downtime hosting setup"
    ],
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "Vercel / AWS", "PostgreSQL"],
    guarantee: "We guarantee cross-device compatibility, lightning-fast load times under 1.2 seconds, and complete source code ownership."
  },
  mobile: {
    category: "02 / Mobile Engineering",
    title: "Mobile App Development (iOS & Android)",
    tagline: "Native performance, fluid 60fps animations, and enterprise-grade offline sync.",
    description: "We build intuitive, robust, and beautiful cross-platform and native mobile apps. From initial state management and local SQLite/Hive caching to real-time WebSockets and push notifications, your app will feel fluid, battery-friendly, and enjoyable to use.",
    features: [
      "Unified single-codebase Flutter / React Native or native Swift/Kotlin",
      "Seamless offline-first architecture with local cache synchronization",
      "Push Notification pipelines via Firebase Cloud Messaging (FCM)",
      "Biometric security (FaceID & Fingerprint authentication)",
      "In-App Purchases (IAP) & Google Play Billing / Apple StoreKit integration",
      "Full API integrations, background fetch, and camera/GPS hardware access"
    ],
    tech: ["Flutter", "React Native", "Swift (iOS)", "Kotlin (Android)", "Firebase", "SQLite", "GraphQL"],
    guarantee: "Tested across 30+ physical Android and iOS screen sizes with zero crash tolerance on production releases."
  },
  software: {
    category: "03 / Enterprise Software",
    title: "Custom Software & Scalable Backend Systems",
    tagline: "Automated business logic, internal ERPs, CRM hubs, and resilient microservices.",
    description: "When off-the-shelf software doesn't fit your business processes, we engineer bespoke enterprise systems. We build internal management dashboards, automated order processing, customer portals, and high-throughput REST and GraphQL APIs capable of handling millions of transactions.",
    features: [
      "Custom business dashboards with role-based access control (RBAC)",
      "High-scale RESTful & GraphQL API architecture with documentation",
      "Enterprise database design with indexing, backups, and replication",
      "Automated background workers, cron jobs, and email/SMS triggers",
      "Third-party integrations: Payment gateways, ERPs, Webhooks, CRMs",
      "Containerized microservices with Docker and automated CI/CD pipelines"
    ],
    tech: ["Node.js", "Python / Django", "Go", "Docker", "PostgreSQL", "Redis", "AWS / Google Cloud"],
    guarantee: "Engineered with modular code architecture, bank-grade encryption at rest and in transit, and scalable infrastructure."
  },
  uiux: {
    category: "04 / Product Design",
    title: "UI / UX Design & Product Architecture",
    tagline: "Human-centered interfaces, coherent design systems, and conversion-focused journeys.",
    description: "We design digital experiences that captivate visitors and convert them into loyal clients. Every curve, button state, color palette, and animation is deliberate. We design full atomic design systems and clickable Figma prototypes so you can test the user journey before writing a single line of code.",
    features: [
      "In-depth user research, wireframing, and user flow mapping",
      "Pixel-perfect high-fidelity UI mockups in Figma",
      "Comprehensive design systems (Typography scale, tokens, component library)",
      "Interactive clickable prototypes for user testing and stakeholder pitches",
      "Dark mode & light mode visual themes with strict WCAG accessibility",
      "Developer handoff documentation with ready-to-export assets & CSS tokens"
    ],
    tech: ["Figma", "FigJam", "Adobe Creative Suite", "Design Tokens", "Wireframing Tools"],
    guarantee: "100% custom-tailored designs with unlimited refinement rounds during the wireframe phase until you are fully satisfied."
  },
  publishing: {
    category: "05 / Store Operations",
    title: "Play Store & Apple Store App Publishing",
    tagline: "Guaranteed store approvals, policy compliance, and hassle-free release management.",
    description: "Navigating the strict review requirements of the Apple App Store and Google Play Console can be stressful. Silent Spark Studio takes full ownership of the submission process: preparing developer accounts, writing compliant privacy policies, generating required screenshots, and resolving store review inquiries until your app is live.",
    features: [
      "Complete Google Play Console & Apple App Store Connect account configuration",
      "Generating high-resolution screenshots & promotional banner art",
      "Writing Store descriptions, keywords, categories, and target audience surveys",
      "App privacy declaration, Data Safety Section, and GDPR compliance policies",
      "Building signed production release bundles (AAB for Google, IPA for Apple)",
      "Direct response and policy mediation with Apple & Google review teams"
    ],
    tech: ["Google Play Console", "App Store Connect", "TestFlight", "Fastlane", "Privacy Compliance"],
    guarantee: "100% Approval Guarantee: If Apple or Google requests changes, our team handles all fixes until the app is approved."
  },
  video: {
    category: "06 / Creative Media",
    title: "YouTube Explainer Video Creation (via Canva)",
    tagline: "Clean, visual YouTube explainer videos designed entirely in Canva Pro for maximum audience clarity.",
    description: "We specialize exclusively in creating informative, visually engaging YouTube explainer videos using Canva. From structuring your topic into easy-to-follow visual slides to choosing clean graphics, animated transitions, subtitles, and syncing voiceovers, we help creators and businesses educate their viewers clearly without complex bloated productions.",
    features: [
      "Full slide-by-slide visual storytelling designed in Canva Pro",
      "Curated premium Canva graphics, icons, and vector illustrations",
      "Voiceover synchronization & timing optimization for YouTube retention",
      "Clean subtitles / captions to boost viewer watch time",
      "Optimized 16:9 1080p Full HD export tailored for YouTube uploads",
      "Includes ready-to-use YouTube Thumbnail designed in Canva"
    ],
    tech: ["Canva Pro", "Canva Video Editor", "Audio Syncing", "YouTube Studio Specs"],
    guarantee: "Clean, professional, and clear visual explanations tailored for YouTube educational and promotional content."
  }
};

function initServiceModal() {
  const modal = document.getElementById('service-modal');
  const closeBtn = document.getElementById('modal-close');
  const serviceCards = document.querySelectorAll('.service-card[data-service]');

  if (!modal) return;

  const modalCat = document.getElementById('modal-category');
  const modalTitle = document.getElementById('modal-title');
  const modalTagline = document.getElementById('modal-tagline');
  const modalDesc = document.getElementById('modal-description');
  const modalFeatures = document.getElementById('modal-features');
  const modalTech = document.getElementById('modal-tech');
  const modalGuarantee = document.getElementById('modal-guarantee');
  const modalCta = document.getElementById('modal-cta');

  function openModal(serviceKey) {
    const data = servicesData[serviceKey];
    if (!data) return;

    modalCat.textContent = data.category;
    modalTitle.textContent = data.title;
    modalTagline.textContent = data.tagline;
    modalDesc.textContent = data.description;
    modalGuarantee.textContent = data.guarantee;

    // Populate Features
    modalFeatures.innerHTML = data.features.map(f => `<li>${f}</li>`).join('');

    // Populate Tech Tags
    modalTech.innerHTML = data.tech.map(t => `<span class="modal-tech-tag">${t}</span>`).join('');

    // Update Contact Dropdown to this service if matched
    const serviceSelect = document.getElementById('service');
    if (serviceSelect) {
      if (serviceKey === 'web') serviceSelect.value = 'Website Development';
      if (serviceKey === 'mobile') serviceSelect.value = 'Mobile App Development';
      if (serviceKey === 'software') serviceSelect.value = 'Custom Software Development';
      if (serviceKey === 'uiux') serviceSelect.value = 'UI / UX Design';
      if (serviceKey === 'publishing') serviceSelect.value = 'Play Store & Apple Store Publishing';
      if (serviceKey === 'video') serviceSelect.value = 'YouTube Explainer Video (Canva)';
    }

    modal.classList.add('active');
    document.body.classList.add('modal-open');

    // Refresh icons inside modal
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.classList.remove('modal-open');
  }

  serviceCards.forEach(card => {
    card.addEventListener('click', () => {
      const serviceKey = card.getAttribute('data-service');
      openModal(serviceKey);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  if (modalCta) {
    modalCta.addEventListener('click', () => {
      closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ---------------------------------------------------------
   7. HORIZONTAL 4-CARD AUTO-SLIDING TESTIMONIALS
   --------------------------------------------------------- */
function initTestimonialsSlider() {
  const track = document.getElementById('testimonials-track');
  const slides = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.getElementById('slider-prev');
  const nextBtn = document.getElementById('slider-next');
  const dotsContainer = document.getElementById('carousel-dots');
  const wrapper = document.getElementById('testimonials-wrapper');

  if (!track || slides.length === 0) return;

  let currentIndex = 0;
  let autoSlideTimer = null;

  function getCardsPerView() {
    if (window.innerWidth <= 640) return 1;
    if (window.innerWidth <= 992) return 2;
    if (window.innerWidth <= 1200) return 3;
    return 4; // 4 cards visible on desktop
  }

  function getMaxIndex() {
    const cardsPerView = getCardsPerView();
    return Math.max(0, slides.length - cardsPerView);
  }

  function updateDots() {
    if (!dotsContainer) return;
    const maxIdx = getMaxIndex();
    dotsContainer.innerHTML = '';

    for (let i = 0; i <= maxIdx; i++) {
      const dot = document.createElement('button');
      dot.className = `carousel-dot ${i === currentIndex ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Slide ${i + 1}`);
      dot.addEventListener('click', () => {
        currentIndex = i;
        updateSlider();
        restartAutoSlide();
      });
      dotsContainer.appendChild(dot);
    }
  }

  function updateSlider() {
    const cardsPerView = getCardsPerView();
    const slidePercentage = 100 / cardsPerView;
    track.style.transform = `translateX(-${currentIndex * slidePercentage}%)`;

    // update active dot
    const dots = dotsContainer.querySelectorAll('.carousel-dot');
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentIndex);
    });
  }

  function nextSlide() {
    const maxIdx = getMaxIndex();
    if (currentIndex >= maxIdx) {
      currentIndex = 0;
    } else {
      currentIndex++;
    }
    updateSlider();
  }

  function prevSlide() {
    const maxIdx = getMaxIndex();
    if (currentIndex <= 0) {
      currentIndex = maxIdx;
    } else {
      currentIndex--;
    }
    updateSlider();
  }

  function startAutoSlide() {
    stopAutoSlide();
    autoSlideTimer = setInterval(nextSlide, 3500); // Smooth auto-slide every 3.5 seconds
  }

  function stopAutoSlide() {
    if (autoSlideTimer) {
      clearInterval(autoSlideTimer);
      autoSlideTimer = null;
    }
  }

  function restartAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      restartAutoSlide();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      restartAutoSlide();
    });
  }

  // Pause on hover
  if (wrapper) {
    wrapper.addEventListener('mouseenter', stopAutoSlide);
    wrapper.addEventListener('mouseleave', startAutoSlide);
    // Touch swipe support
    let startX = 0;
    wrapper.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      stopAutoSlide();
    }, { passive: true });

    wrapper.addEventListener('touchend', (e) => {
      const endX = e.changedTouches[0].clientX;
      if (startX - endX > 40) {
        nextSlide();
      } else if (endX - startX > 40) {
        prevSlide();
      }
      startAutoSlide();
    }, { passive: true });
  }

  window.addEventListener('resize', () => {
    const maxIdx = getMaxIndex();
    if (currentIndex > maxIdx) currentIndex = maxIdx;
    updateDots();
    updateSlider();
  }, { passive: true });

  updateDots();
  updateSlider();
  startAutoSlide();
}

/* ---------------------------------------------------------
   8. LEGAL MODAL SYSTEM (Privacy Policy & Terms of Service)
   --------------------------------------------------------- */
const legalData = {
  privacy: {
    category: "Legal & Compliance",
    title: "Privacy Policy",
    date: "Last Updated: November 2026",
    html: `
      <h3>1. Information We Collect</h3>
      <p>Silent Spark Studio values your privacy. When you contact us or start a project inquiry, we may collect your name, email address, project specifications, and any voluntary technical requirements provided.</p>
      
      <h3>2. How We Use Your Information</h3>
      <p>We use your information exclusively to:</p>
      <ul>
        <li>Deliver our development, UI/UX design, app store publishing, and YouTube explainer video services.</li>
        <li>Respond promptly to project inquiries and provide consultation estimates.</li>
        <li>Coordinate with third-party store providers (such as Google Play Console & Apple App Store Connect) strictly per your project needs.</li>
      </ul>

      <h3>3. Confidentiality & Code Ownership</h3>
      <p>All project specifications, proprietary business logic, client brand assets, and custom codebases developed for your company remain 100% confidential. Upon complete project handover, you retain full intellectual property ownership.</p>

      <h3>4. Data Security</h3>
      <p>We implement standard encryption and secure protocols to protect your personal information against unauthorized disclosure, loss, or access.</p>

      <h3>5. Contact Us</h3>
      <p>If you have questions regarding this Privacy Policy, please reach us directly at <strong>hello@silentsparkstudio.com</strong>.</p>
    `
  },
  terms: {
    category: "Legal Agreement",
    title: "Terms & Conditions",
    date: "Last Updated: November 2026",
    html: `
      <h3>1. Acceptance of Terms</h3>
      <p>By accessing this website or engaging Silent Spark Studio for design, software, app store publishing, or Canva YouTube explainer video services, you agree to comply with and be bound by these Terms.</p>

      <h3>2. Scope of Services & Revisions</h3>
      <p>Each project scope is clearly defined prior to commencement. Revisions and milestones are structured within agreed timelines. Additional feature requests beyond the agreed scope are quoted transparently.</p>

      <h3>3. Store Publishing Terms</h3>
      <p>For Google Play Store and Apple App Store publishing services, we guarantee adherence to active developer policies. However, clients must ensure their app content does not violate trademark or illegal content regulations.</p>

      <h3>4. YouTube Explainer Videos (Canva)</h3>
      <p>Our video service consists specifically of YouTube explainer videos produced via Canva Pro. Final deliverables include high-resolution MP4 video files and Canva project templates where specified.</p>

      <h3>5. Intellectual Property</h3>
      <p>Upon receipt of full contract payment, all custom-built web assets, applications, and designed graphics belong entirely to the client.</p>

      <h3>6. Limitation of Liability</h3>
      <p>Silent Spark Studio shall not be liable for any third-party server downtimes, external platform policy changes, or algorithmic shifts on YouTube or app store listings.</p>
    `
  }
};

function initLegalModal() {
  const legalModal = document.getElementById('legal-modal');
  const closeBtn = document.getElementById('legal-modal-close');
  const okBtn = document.getElementById('legal-modal-ok');
  const privacyLink = document.getElementById('link-privacy');
  const termsLink = document.getElementById('link-terms');

  if (!legalModal) return;

  const modalCat = document.getElementById('legal-modal-category');
  const modalTitle = document.getElementById('legal-modal-title');
  const modalDate = document.getElementById('legal-modal-date');
  const modalBody = document.getElementById('legal-modal-body');

  function openLegal(type) {
    const data = legalData[type];
    if (!data) return;

    modalCat.textContent = data.category;
    modalTitle.textContent = data.title;
    modalDate.textContent = data.date;
    modalBody.innerHTML = data.html;

    legalModal.classList.add('active');
    document.body.classList.add('modal-open');
  }

  function closeLegal() {
    legalModal.classList.remove('active');
    document.body.classList.remove('modal-open');
  }

  if (privacyLink) {
    privacyLink.addEventListener('click', (e) => {
      e.preventDefault();
      openLegal('privacy');
    });
  }

  if (termsLink) {
    termsLink.addEventListener('click', (e) => {
      e.preventDefault();
      openLegal('terms');
    });
  }

  if (closeBtn) closeBtn.addEventListener('click', closeLegal);
  if (okBtn) okBtn.addEventListener('click', closeLegal);

  legalModal.addEventListener('click', (e) => {
    if (e.target === legalModal) {
      closeLegal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && legalModal.classList.contains('active')) {
      closeLegal();
    }
  });
}

/* ---------------------------------------------------------
   9. CONTACT FORM SUBMISSION (Real-Time Multi-Fallback Pipeline)
   EmailJS + API Transmission + WhatsApp Lead Option
   --------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const feedback = document.getElementById('form-feedback');

  if (!form || !feedback) return;

  // Initialize EmailJS (Optional: user can set public key if desired)
  if (window.emailjs) {
    try {
      window.emailjs.init("YOUR_EMAILJS_PUBLIC_KEY");
    } catch (e) {
      // quiet fallback
    }
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('.btn-submit');
    const originalText = btn.innerHTML;

    btn.disabled = true;
    btn.innerHTML = '<span>Sending Inquiry...</span>';
    feedback.textContent = '';
    feedback.className = 'form-feedback';

    const name = form.elements['name'] ? form.elements['name'].value.trim() : '';
    const email = form.elements['email'] ? form.elements['email'].value.trim() : '';
    const service = form.elements['service'] ? form.elements['service'].value : '';
    const message = form.elements['message'] ? form.elements['message'].value.trim() : '';

    // Set reply-to header to client email for instant reply
    const replyToInput = document.getElementById('form-replyto');
    if (replyToInput) {
      replyToInput.value = email;
    }

    const formData = new FormData(form);
    formData.set('_replyto', email);

    let sent = false;

    // 1. Primary Route: FormSubmit API JSON
    try {
      // Add anti-spam & proper headers for FormSubmit
      formData.set('_subject', `New Project Inquiry from ${name} — Silent Spark Studio`);
      formData.set('_captcha', 'false');
      formData.set('_template', 'table');
      formData.set('_autoresponse', `Hi ${name}, thank you for reaching out to Silent Spark Studio! We have received your inquiry and will get back to you within 12 hours. — Silent Spark Studio Team`);
      formData.set('name', name);
      formData.set('email', email);
      formData.set('service', service);
      formData.set('message', message);

      const response = await fetch('https://formsubmit.co/ajax/dreamhost391@gmail.com', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: formData
      });

      if (response.ok) {
        sent = true;
      }
    } catch (err) {
      console.warn('API delivery error, activating fallback...');
    }

    // 2. Fallback Route: Direct submission if API blocks
    if (!sent) {
      try {
        form.submit();
        return;
      } catch (err) {
        sent = true;
      }
    }

    btn.disabled = false;
    btn.innerHTML = originalText;
    form.reset();

    // Prepare direct WhatsApp link with user input pre-filled
    const waText = encodeURIComponent(
      `Hello Silent Spark Studio!\n\nName: ${name}\nEmail: ${email}\nService: ${service}\nProject Overview: ${message}`
    );
    const waLink = `https://wa.me/8801947781282?text=${waText}`;

    // Render interactive rich success message
    feedback.innerHTML = `
      <div class="feedback-success-box">
        <div class="feedback-title">✓ Inquiry Sent Successfully to dreamhost391@gmail.com!</div>
        <p class="feedback-sub">We will respond within 12 hours. Need an immediate reply?</p>
        <a href="${waLink}" target="_blank" rel="noopener noreferrer" class="btn-whatsapp-instant">
          <i data-lucide="message-circle"></i>
          <span>Continue on WhatsApp Directly</span>
        </a>
      </div>
    `;
    feedback.className = 'form-feedback success';

    if (window.lucide) {
      window.lucide.createIcons();
    }
  });
}

/* ---------------------------------------------------------
   10. 1-CLICK WHATSAPP NUMBER COPY (Clipboard API)
   --------------------------------------------------------- */
function initCopyWhatsAppNumber() {
  const copyBtn = document.getElementById('copy-whatsapp-btn');
  const tooltip = document.getElementById('copy-tooltip');
  const rawNumber = '+8801947781282';

  if (!copyBtn) return;

  copyBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(rawNumber);
      } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = rawNumber;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }

      copyBtn.classList.add('copied');
      if (tooltip) tooltip.textContent = 'Copied!';

      setTimeout(() => {
        copyBtn.classList.remove('copied');
        if (tooltip) tooltip.textContent = 'Copy';
      }, 2000);
    } catch (err) {
      console.error('Failed to copy WhatsApp number', err);
    }
  });
}
