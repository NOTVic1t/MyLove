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
  // === AWAL KENAL — 4 April 2026 ===
  { sender: 'indah', text: 'P', delay: 0 },
  { sender: 'indah', text: 'kakk', delay: 700 },
  { sender: 'victor', text: 'Ya?', delay: 2200 },
  { sender: 'victor', text: 'Ini siapa?', delay: 3000 },
  { sender: 'indah', text: 'Indah kak', delay: 4800 },
  { sender: 'victor', text: 'Indah mana?', delay: 6200 },
  { sender: 'indah', text: 'Penettt kak, tau gak? 😂', delay: 8000 },
  { sender: 'victor', text: 'Dapet nomorku darimana?', delay: 9600 },
  { sender: 'indah', text: 'Dari mana ya kak, berusaha sendiri nyarinya 😂', delay: 11400 },
  { sender: 'victor', text: 'Kok bisa??', delay: 13000 },
  { sender: 'victor', text: 'Ah ini palingan ada orang ngerjain, pake nomor baru', delay: 14000 },
  { sender: 'indah', text: 'Ngga kak, beneran!', delay: 15800 },
  { sender: 'indah', text: 'Aku Indah kak, mungkin kak ga kenal aku, tapi aku tau kamu kak 😂', delay: 17000 },
  { sender: 'victor', text: 'Indah penet yang mana ini', delay: 19000 },
  { sender: 'victor', text: 'Kok bisa gitu wkwk', delay: 19800 },
  { sender: 'indah', text: 'Bisa dong haha', delay: 21400 },
  { sender: 'indah', text: 'Kak ga kenal pasti', delay: 22200 },
  { sender: 'victor', text: 'Temenku yang mana yang kenal kamu', delay: 24000 },
  { sender: 'indah', text: 'Andiii', delay: 25600 },
  { sender: 'victor', text: 'Oalah pantes, Andi yang ngasih nomorku ya', delay: 27200 },
  { sender: 'indah', text: 'Bukan kak, aku aja yang ga wa dia', delay: 28800 },
  { sender: 'victor', text: 'Lah terus gimana bisa dapet nomorku, gamungkin ngasal dong haha', delay: 30600 },
  { sender: 'indah', text: 'Aku pernah ke Penet kak waktu itu, udah agak lama, aku lihat kak', delay: 32400 },
  { sender: 'victor', text: 'Hah kapan??', delay: 34000 },
  { sender: 'victor', text: 'Kasih tau aku, penasaran banget 😂', delay: 35000 },
  { sender: 'indah', text: 'Duh, aku penasaran juga lagi kak sama kamu 😂', delay: 37000 },
  { sender: 'victor', text: 'Aku penasaran banget serius', delay: 38600 },
  { sender: 'indah', text: 'Sini kak kalau penasaran haha', delay: 40200 },
  { sender: 'victor', text: 'Sini kemana haha 😄', delay: 41800 },
  { sender: 'indah', text: 'Kemana yaa 😂', delay: 43200 },
  { sender: 'victor', text: 'Kemana hayoo 😄', delay: 44800 },
  { sender: 'indah', text: 'Gatau kemana ya kak 😂', delay: 46200 },
  { sender: 'victor', text: 'Jadi makin penasaran 😄', delay: 48000 },
  { sender: 'indah', text: 'Haha masa sih 😂', delay: 49600 },
  { sender: 'indah', text: 'Aku sering ke Penet kak, kalo servis', delay: 51200 },
  { sender: 'indah', text: 'Mampir kerumah 😂', delay: 52400 },
  { sender: 'victor', text: 'Ah aku aja masih penasaran, udah disuruh mampir kerumah aja 😂', delay: 54200 },
  { sender: 'indah', text: 'Kak ga boleh tau nama lengkap aku?', delay: 57000 },
  { sender: 'victor', text: 'Pengen tau nama lengkap kamu', delay: 58600 },
  { sender: 'victor', text: 'Gabole ya?', delay: 59400 },
  { sender: 'indah', text: 'Boleh, tapi ga penting', delay: 61000 },
  { sender: 'victor', text: 'Penting sih, tapi kalo ga boleh gapapa kok', delay: 62600 },
  { sender: 'indah', text: 'Boleh kok kak', delay: 64200 },
  { sender: 'indah', text: 'Kamu ga cuma penasaran aja kan kak sama aku?', delay: 67000 },
  { sender: 'victor', text: 'Ngga, aku ga gitu', delay: 68800 },

  // === MOMEN JUJUR ===
  { sender: 'victor', text: 'Aku bukan ga suka cewek 😭 aku cuma main game aja dulu, fokus ke game. Mungkin egois, tapi itu dulu. Sekarang udah waktunya berpikir dewasa, aku ga akan hidup cukup sama main game aja', delay: 73000 },
  { sender: 'victor', text: 'Dan sekarang terbukti kalau aku suka sama cewek', delay: 75000 },
  { sender: 'victor', text: 'Yaitu kamu', delay: 76200 },
  { sender: 'indah', text: 'Belum kak, aku nangis', delay: 78000 },
  { sender: 'indah', text: 'Nanti aku baca chatnya', delay: 79000 },
  { sender: 'victor', text: 'Kenapa nangis 😭', delay: 80600 },
  { sender: 'victor', text: 'Kamu jangan nangis, aku tungguin ya', delay: 81600 },

  // === VICTOR MAU NGOMONG SERIUS ===
  { sender: 'victor', text: 'Ada yang mau aku omongin kalau kita ketemu', delay: 86000 },
  { sender: 'indah', text: 'Ngomong apa, penasaran', delay: 87800 },
  { sender: 'victor', text: 'Ya nanti kalau ketemu aku mau ngomong serius', delay: 89400 },
  { sender: 'victor', text: 'Aku mau ngomong di depan kamu', delay: 90400 },
  { sender: 'indah', text: 'Kapan ya kak', delay: 92000 },
  { sender: 'indah', text: 'Takut banget', delay: 93200 },
  { sender: 'victor', text: 'Takut apa 😭', delay: 94800 },
  { sender: 'victor', text: 'Kok mati', delay: 95600 },
  { sender: 'indah', text: 'Malu', delay: 97000 },
  { sender: 'indah', text: 'Kakak ini masih awal, kita gatau nanti gimana', delay: 99000 },
  { sender: 'indah', text: 'Aku takut banget', delay: 100200 },
  { sender: 'victor', text: 'Aku tentuin waktunya nanti, ga akan lama kok', delay: 102000 },
  { sender: 'victor', text: 'Kan aku udah bilang mau ajak kamu jalan', delay: 103000 },
  { sender: 'indah', text: 'Iya kak, gapapa, sebisa aja', delay: 104800 },
  { sender: 'victor', text: 'Iya aku luangin waktuku buat kamu nanti yaa', delay: 106400 },
  { sender: 'indah', text: 'Makasih ya kak 🩷🩷', delay: 108000 },
  { sender: 'victor', text: 'Makasih ya 🥰', delay: 109600 },
  { sender: 'indah', text: 'Makasih apaan kak', delay: 111000 },

  // === MOMEN KHAWATIR (14 April) ===
  { sender: 'indah', text: 'Sayang, kamu kenapa?', delay: 116000 },
  { sender: 'indah', text: 'Sayang marah ya sama aku? 🥺', delay: 117400 },
  { sender: 'indah', text: 'Sayang jangan marah ya, aku sayang banget sama kamu 🥺🥺', delay: 118800 },
  { sender: 'indah', text: 'Sayang kenapa, aku ada salah?', delay: 120400 },
  { sender: 'indah', text: 'Aku minta maaf ya kalau aku ada salah, aku sayang banget sama kamu 🥺', delay: 122000 },
  { sender: 'victor', text: 'Ngga loh yang', delay: 124000 },
  { sender: 'victor', text: 'Aku tidur', delay: 124800 },
  { sender: 'indah', text: 'Bohong', delay: 126200 },
  { sender: 'indah', text: 'Sayang kemana ya, khawatir banget aku 🥺', delay: 128000 },
  { sender: 'victor', text: 'Yang aku tidur, baru bangun', delay: 130000 },
  { sender: 'victor', text: 'Sayang maaf ya suka ngilang 🙁', delay: 131200 },
  { sender: 'indah', text: 'Aku kira kemana 🥺', delay: 133000 },
  { sender: 'victor', text: 'Maaf ya suka ilang-ilangan 🙁', delay: 134600 },
  { sender: 'indah', text: 'Iya gapapa sayang', delay: 136200 },
  { sender: 'indah', text: 'Namanya cape, istirahat', delay: 137400 },
  { sender: 'indah', text: 'Udah bobo lagi yuk', delay: 138600 },
  { sender: 'victor', text: 'Gapapa mulu 😄', delay: 140200 },
  { sender: 'indah', text: 'Ya gapapa sayang 💋', delay: 141800 },
  { sender: 'indah', text: 'Semangat ya kerja nya 💗', delay: 143000 },

  // === MOMEN JEMPUT (15 April) ===
  { sender: 'victor', text: 'Jadi sayang, magrib aku otw dari sini ya', delay: 148000 },
  { sender: 'indah', text: 'Jadi gaa? Hati-hati ya sayang', delay: 149800 },
  { sender: 'indah', text: 'Kak mau jemput di rumah ga? Kalau dari rumah aku pulang abis nganter teman', delay: 151400 },
  { sender: 'victor', text: 'Aku otw, udah sampe Mandala', delay: 153200 },
  { sender: 'indah', text: 'Pelan-pelan aja', delay: 154800 },
  { sender: 'indah', text: 'Ih sabar kak 😭😭', delay: 156000 },
  { sender: 'indah', text: 'Sampe mana?', delay: 158000 },
  { sender: 'victor', text: 'Penet, 5 menit lagi', delay: 159600 },
  { sender: 'indah', text: 'Okee sayang, tunggu ya 🩷', delay: 161200 },
  { sender: 'indah', text: 'Sayang hati-hati ya kalau udah sampe, kabarin', delay: 163000 },
  { sender: 'victor', text: 'Baru sampe rumah sayang', delay: 165000 },
  { sender: 'victor', text: 'Aku mau jatuh tadi di Mandala 😭', delay: 166000 },
  { sender: 'indah', text: 'Alhamdulillah', delay: 167800 },
  { sender: 'victor', text: 'Maaf ya suka bikin kamu mikir yang aneh-aneh 😭', delay: 170000 },
  { sender: 'indah', text: 'Iya sayang gapapa 💋', delay: 172000 },
  { sender: 'indah', text: 'Semangat ya kerjanya 💗', delay: 173200 },
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
