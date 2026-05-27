/* ============================================================
   ROMANTIC DIGITAL MEMORY BOOK — script.js
   Victor ❤️ Indah
   ============================================================ */

gsap.registerPlugin(ScrollTrigger, TextPlugin);

/* ===== STATE ===== */
let musicPlaying = false;
const music = document.getElementById('bgMusic');

/* ============================================================
   PARTICLES CANVAS — floating sparkles
   ============================================================ */
(function initParticles() {
  const canvas = document.getElementById('particlesCanvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  const COUNT = 60;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.r = Math.random() * 2 + 0.5;
      this.speedY = -(Math.random() * 0.4 + 0.1);
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.alpha = Math.random() * 0.5 + 0.2;
      this.hue = Math.random() > 0.5 ? 'rgba(255,143,177,' : 'rgba(255,255,255,';
    }
    update() {
      this.y += this.speedY;
      this.x += this.speedX;
      this.alpha -= 0.001;
      if (this.y < -5 || this.alpha <= 0) this.reset();
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = this.hue + this.alpha + ')';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < COUNT; i++) particles.push(new Particle());

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(loop);
  }
  loop();
})();

/* ============================================================
   SAKURA PETALS
   ============================================================ */
function createSakura(container, count = 15) {
  const petals = ['🌸', '🌺', '✿', '❀', '💮'];
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.className = 'sakura-petal';
    el.textContent = petals[Math.floor(Math.random() * petals.length)];
    el.style.left = Math.random() * 100 + 'vw';
    el.style.animationDuration = (Math.random() * 6 + 5) + 's';
    el.style.animationDelay = (Math.random() * 8) + 's';
    el.style.fontSize = (Math.random() * 0.6 + 0.7) + 'rem';
    el.style.opacity = Math.random() * 0.5 + 0.3;
    container.appendChild(el);
  }
}

/* ============================================================
   STARS
   ============================================================ */
function createStars(container, count = 80) {
  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.animationDelay = Math.random() * 4 + 's';
    star.style.animationDuration = (Math.random() * 3 + 2) + 's';
    star.style.width = star.style.height = (Math.random() * 2.5 + 0.5) + 'px';
    container.appendChild(star);
  }
}

/* ============================================================
   INTRO ANIMATION
   ============================================================ */
function runIntro() {
  const tl = gsap.timeline();

  // Line 1
  tl.to('#introLine1', {
    opacity: 1,
    y: 0,
    duration: 1.2,
    ease: 'power2.out',
    delay: 0.8
  });

  // Line 2
  tl.to('#introLine2', {
    opacity: 1,
    y: 0,
    duration: 1.2,
    ease: 'power2.out',
  }, '+=0.6');

  // Dots
  tl.to('.intro-dots', {
    opacity: 1,
    duration: 0.5
  }, '+=0.4');

  // Transition to login
  tl.to('#introScreen', {
    opacity: 0,
    duration: 1,
    ease: 'power2.inOut',
    delay: 1.2,
    onComplete: () => {
      document.getElementById('introScreen').style.display = 'none';
      const loginPage = document.getElementById('loginPage');
      loginPage.classList.remove('hidden');
      gsap.from(loginPage, { opacity: 0, duration: 0.8, ease: 'power2.out' });

      // Init sakura for login
      createSakura(document.getElementById('sakuraLogin'), 20);
    }
  });
}

runIntro();

/* ============================================================
   LOGIN
   ============================================================ */
const CORRECT_USER = 'sunshine';
const CORRECT_PASS = '150426';

// Allow pressing Enter
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const loginPage = document.getElementById('loginPage');
    const hiddenModal = document.getElementById('hiddenModal');
    if (!loginPage.classList.contains('hidden')) handleLogin();
    if (!hiddenModal.classList.contains('hidden')) checkHiddenPassword();
  }
});

function handleLogin() {
  const user = document.getElementById('usernameInput').value.trim().toLowerCase();
  const pass = document.getElementById('passwordInput').value.trim();
  const errorEl = document.getElementById('loginError');
  const btn = document.getElementById('loginBtn');

  if (user === CORRECT_USER && pass === CORRECT_PASS) {
    errorEl.classList.add('hidden');
    btn.innerHTML = '<span>Masuk... ✨</span>';
    btn.disabled = true;

    // Success transition
    gsap.to('#loginPage', {
      opacity: 0,
      scale: 1.03,
      duration: 1.2,
      ease: 'power3.inOut',
      onComplete: () => {
        document.getElementById('loginPage').classList.add('hidden');
        initMainSite();
      }
    });

  } else {
    errorEl.classList.remove('hidden');
    gsap.fromTo('#loginBtn',
      { x: -6 },
      { x: 0, duration: 0.4, ease: 'elastic.out(1, 0.3)' }
    );
    // Shake password field
    gsap.fromTo('#passwordInput',
      { x: -4 },
      { x: 0, duration: 0.4, ease: 'elastic.out(1, 0.3)' }
    );
  }
}

/* ============================================================
   INIT MAIN SITE
   ============================================================ */
function initMainSite() {
  const main = document.getElementById('mainSite');
  main.classList.remove('hidden');
  gsap.from(main, { opacity: 0, duration: 1, ease: 'power2.out' });

  // Start music
  tryPlayMusic();

  // Init sections
  createStars(document.getElementById('heroStars'), 100);
  createStars(document.getElementById('letterStars'), 60);
  createEndingParticles();
  initCountdown();
  initHeroAnimations();
  initScrollAnimations();
  initChat();
}

/* ============================================================
   MUSIC
   ============================================================ */
function tryPlayMusic() {
  music.volume = 0.5;
  const playPromise = music.play();
  if (playPromise !== undefined) {
    playPromise.then(() => {
      musicPlaying = true;
      updateMusicBtn();
    }).catch(() => {
      // Autoplay blocked — wait for user interaction
      document.addEventListener('click', function resumeOnClick() {
        music.play().then(() => {
          musicPlaying = true;
          updateMusicBtn();
        }).catch(() => {});
        document.removeEventListener('click', resumeOnClick);
      }, { once: true });
    });
  }
}

function toggleMusic() {
  if (musicPlaying) {
    music.pause();
    musicPlaying = false;
  } else {
    music.play().catch(() => {});
    musicPlaying = true;
  }
  updateMusicBtn();
}

function updateMusicBtn() {
  const btn = document.getElementById('musicToggle');
  if (btn) {
    btn.textContent = musicPlaying ? '🎵' : '🔇';
    btn.classList.toggle('muted', !musicPlaying);
  }
}

/* ============================================================
   COUNTDOWN TIMER
   ============================================================ */
function initCountdown() {
  const start = new Date('2026-04-15T00:00:00');

  function update() {
    const now = new Date();
    const diff = now - start;
    if (diff < 0) return;

    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);
    const secs = Math.floor((diff % 60000) / 1000);

    document.getElementById('countDays').textContent = String(days).padStart(2, '0');
    document.getElementById('countHours').textContent = String(hours).padStart(2, '0');
    document.getElementById('countMins').textContent = String(mins).padStart(2, '0');
    document.getElementById('countSecs').textContent = String(secs).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}

/* ============================================================
   HERO ANIMATIONS (GSAP)
   ============================================================ */
function initHeroAnimations() {
  const tl = gsap.timeline({ delay: 0.3 });

  tl.to('.hero-eyebrow', { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' })
    .to('.hero-title', { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, '-=0.4')
    .to('.hero-subtitle', { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.5')
    .to('.countdown-card', { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.4')
    .to('.scroll-btn', { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.3');
}

/* ============================================================
   SCROLL ANIMATIONS (GSAP ScrollTrigger)
   ============================================================ */
function initScrollAnimations() {
  // Section headers
  gsap.utils.toArray('.section-header').forEach(el => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 80%', toggleActions: 'play none none none' },
      opacity: 0, y: 40, duration: 0.9, ease: 'power2.out'
    });
  });

  // Timeline items
  gsap.utils.toArray('.timeline-item').forEach((el, i) => {
    const dir = el.classList.contains('left') ? -40 : 40;
    gsap.to(el, {
      scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
      opacity: 1, y: 0, x: 0,
      duration: 0.8,
      delay: i * 0.1,
      ease: 'power2.out'
    });
    gsap.set(el, { x: dir });
  });

  // Gallery cards
  gsap.utils.toArray('.polaroid-card').forEach((el, i) => {
    gsap.to(el, {
      scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' },
      opacity: 1, scale: 1, y: 0,
      duration: 0.6,
      delay: i * 0.1,
      ease: 'back.out(1.5)'
    });
  });

  // Letter paragraphs
  gsap.utils.toArray('.letter-para').forEach((el, i) => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 88%' },
      opacity: 0, y: 20, duration: 0.7, delay: i * 0.08, ease: 'power2.out'
    });
  });

  // Ending section
  const endingTl = gsap.timeline({
    scrollTrigger: { trigger: '#endingSection', start: 'top 70%' }
  });
  endingTl
    .from('.ending-eyebrow', { opacity: 0, y: 20, duration: 0.8 })
    .from('.ending-quote', { opacity: 0, y: 30, duration: 1, ease: 'power2.out' }, '-=0.3')
    .from('.ending-names', { opacity: 0, scale: 0.8, duration: 1, ease: 'back.out(1.5)' }, '-=0.4')
    .from('.ending-tagline', { opacity: 0, y: 20, duration: 0.8 }, '-=0.3')
    .from('.ending-date', { opacity: 0, duration: 0.8 }, '-=0.3');
}

/* ============================================================
   FAKE CHAT
   ============================================================ */
const chatMessages = [
  { sender: 'indah', text: 'P', delay: 0 },
  { sender: 'victor', text: 'Ini siapa?', delay: 1800 },
  { sender: 'indah', text: 'Indah kak', delay: 3200 },
  { sender: 'victor', text: 'Indah mana?', delay: 4800 },
  { sender: 'indah', text: 'Penet kak 😭', delay: 6200 },
  { sender: 'indah', text: 'Save ya', delay: 7000 },
  { sender: 'victor', text: 'Iya 😭', delay: 8400 },
  { sender: 'indah', text: 'Hehe maaf ganggu ya kak', delay: 10000 },
  { sender: 'victor', text: 'Ngga ganggu kok', delay: 11600 },
  { sender: 'indah', text: 'Kamu marah ya?', delay: 14000 },
  { sender: 'victor', text: 'Ngga kok 😭 kenapa tiba-tiba nanya gitu', delay: 15600 },
  { sender: 'indah', text: 'Ngga apa-apa hehe', delay: 17200 },
  { sender: 'victor', text: 'Ngomong aja kalau ada yang salah', delay: 18800 },
  { sender: 'indah', text: 'Beneran ngga ada kok', delay: 20000 },
  { sender: 'victor', text: 'Oke... 😭', delay: 21200 },
  { sender: 'indah', text: '...', delay: 23000 },
  { sender: 'victor', text: '...', delay: 24000 },
  { sender: 'indah', text: 'Kangen', delay: 26000 },
  { sender: 'victor', text: 'IYA KANGEN JUGA HAHA', delay: 27200 },
  { sender: 'indah', text: 'Anjir 😭😭', delay: 28400 },
  { sender: 'victor', text: 'Gimana kalau kita jadian aja? 😭', delay: 32000 },
  { sender: 'indah', text: 'Hah?? serius?', delay: 34000 },
  { sender: 'victor', text: 'Serius. 💕', delay: 35400 },
  { sender: 'indah', text: 'I love you', delay: 38000 },
  { sender: 'victor', text: 'I love you more ❤️', delay: 39400 },
  { sender: 'indah', text: 'Ngga mungkin 😭', delay: 40600 },
  { sender: 'victor', text: 'Challenge accepted 😌💕', delay: 42000 },
];

let chatStarted = false;

function initChat() {
  const chatSection = document.getElementById('chatSection');

  // Start chat when section comes into view
  ScrollTrigger.create({
    trigger: chatSection,
    start: 'top 60%',
    onEnter: () => {
      if (!chatStarted) {
        chatStarted = true;
        playChatMessages();
      }
    }
  });
}

function playChatMessages() {
  const chatBody = document.getElementById('chatBody');
  const statusEl = document.getElementById('chatStatus');
  const typingIndicator = createTypingIndicator();
  chatBody.appendChild(typingIndicator);

  chatMessages.forEach((msg, i) => {
    // Show typing indicator before each message
    setTimeout(() => {
      const isLast = i === chatMessages.length - 1;
      statusEl.textContent = 'mengetik...';
      statusEl.className = 'chat-status typing';
      typingIndicator.classList.add('visible');
      chatBody.scrollTop = chatBody.scrollHeight;

      // Show message after typing delay
      const typingDuration = Math.min(msg.text.length * 40 + 400, 1200);
      setTimeout(() => {
        typingIndicator.classList.remove('visible');
        if (!isLast) {
          statusEl.textContent = 'online';
          statusEl.className = 'chat-status';
        } else {
          statusEl.textContent = 'online 💕';
          statusEl.className = 'chat-status';
        }

        const bubble = createBubble(msg.sender, msg.text);
        chatBody.insertBefore(bubble, typingIndicator);
        chatBody.scrollTop = chatBody.scrollHeight;
      }, typingDuration);

    }, msg.delay);
  });
}

function createTypingIndicator() {
  const div = document.createElement('div');
  div.className = 'typing-indicator';
  div.innerHTML = '<span></span><span></span><span></span>';
  return div;
}

function getRandomTime() {
  const h = Math.floor(Math.random() * 4) + 19; // 19-22
  const m = Math.floor(Math.random() * 60);
  return `${h}.${String(m).padStart(2,'0')}`;
}

function createBubble(sender, text) {
  const wrap = document.createElement('div');
  wrap.className = `chat-bubble ${sender}`;

  const msgDiv = document.createElement('div');
  msgDiv.className = 'bubble-msg';
  msgDiv.textContent = text;

  const timeDiv = document.createElement('div');
  timeDiv.className = 'bubble-time';
  timeDiv.textContent = getRandomTime();

  wrap.appendChild(msgDiv);
  wrap.appendChild(timeDiv);
  return wrap;
}

/* ============================================================
   ENDING PARTICLES
   ============================================================ */
function createEndingParticles() {
  const container = document.getElementById('endingParticles');
  const emojis = ['💕', '🌸', '✨', '💗', '⭐', '🌟'];

  for (let i = 0; i < 20; i++) {
    const el = document.createElement('div');
    el.style.cssText = `
      position: absolute;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      font-size: ${Math.random() * 1.5 + 0.8}rem;
      opacity: ${Math.random() * 0.4 + 0.1};
      animation: float-heart ${Math.random() * 4 + 3}s ease-in-out infinite;
      animation-delay: ${Math.random() * 4}s;
      pointer-events: none;
    `;
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    container.appendChild(el);
  }
}

/* ============================================================
   HIDDEN MODAL
   ============================================================ */
function openHiddenModal() {
  const modal = document.getElementById('hiddenModal');
  modal.classList.remove('hidden');
  setTimeout(() => document.getElementById('hiddenPasswordInput').focus(), 100);
}

function closeHiddenModal() {
  document.getElementById('hiddenModal').classList.add('hidden');
  document.getElementById('hiddenError').classList.add('hidden');
  document.getElementById('hiddenPasswordInput').value = '';
}

function closeHiddenModalOutside(e) {
  if (e.target === document.getElementById('hiddenModal')) closeHiddenModal();
}

function checkHiddenPassword() {
  const val = document.getElementById('hiddenPasswordInput').value.trim();
  const errEl = document.getElementById('hiddenError');

  if (val === CORRECT_PASS) {
    closeHiddenModal();
    openHiddenScene();
  } else {
    errEl.classList.remove('hidden');
    gsap.fromTo('#hiddenPasswordInput',
      { x: -5 },
      { x: 0, duration: 0.4, ease: 'elastic.out(1, 0.3)' }
    );
  }
}

function openHiddenScene() {
  const scene = document.getElementById('hiddenScene');
  scene.classList.remove('hidden');
  document.body.style.overflow = 'hidden';

  gsap.fromTo(scene,
    { opacity: 0 },
    { opacity: 1, duration: 0.8, ease: 'power2.out' }
  );

  gsap.from('.hidden-scene-heart', { scale: 0, duration: 0.6, delay: 0.4, ease: 'back.out(2)' });
  gsap.from('.hidden-scene-title', { opacity: 0, y: 20, duration: 0.8, delay: 0.6 });
  gsap.from('.hidden-scene-message', { opacity: 0, y: 30, duration: 0.8, delay: 0.8 });
}

function closeHiddenScene() {
  gsap.to('#hiddenScene', {
    opacity: 0, duration: 0.5, onComplete: () => {
      document.getElementById('hiddenScene').classList.add('hidden');
      document.body.style.overflow = '';
    }
  });
}

/* ============================================================
   SMOOTH SCROLL for internal links
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
