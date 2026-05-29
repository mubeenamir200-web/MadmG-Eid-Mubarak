// ========================
// PAGE 0 — INTRO VIDEO
// ========================
let page0Started = false;

function handlePage0Click() {
  const video = document.getElementById("introVideo");
  const hint = document.getElementById("page0Hint");
  const music = document.getElementById("bgMusic"); // 📑 Grab the audio element

  if (!page0Started) {
    // First tap: Play video, fade out the hint overlay, and start background music
    page0Started = true;
    
    if (hint) hint.classList.add("fade-out");
    
    // 📑 Start the background music smoothly
    if (music) {
      music.volume = 0.4; // Optional: Sets the music volume to 40% so it isn't too loud over your videos
      music.play().catch(err => {
        console.log("Audio playback restriction handled:", err);
      });
    }
    
    if (video) {
      video.play().catch(err => {
        console.log("Video playback restriction handled:", err);
        nextPage(0);
      });

      video.onended = () => {
        nextPage(0);
      };
    }
  } else {
    // Second tap: Skip video functionality
    nextPage(0);
  }
}

let clickedCount = 0;
let revealTriggered = false;

function reveal(cloud) {
  const item = cloud.parentElement;

  if (item.classList.contains("revealed")) return;

  item.classList.add("revealed");
  clickedCount++;

  const totalClouds = document.querySelectorAll(".item").length;

  if (clickedCount >= totalClouds && !revealTriggered) {
    revealTriggered = true;

setTimeout(() => {

  document.querySelectorAll('.page1-line').forEach(el => {
    el.classList.add('hide');
  });

  const img = document.getElementById("revealImage");
  if (img) img.classList.add("show");

  const emoji = document.getElementById("page1Emoji");
  if (emoji) emoji.classList.add("show");

  setTimeout(() => {
    const btn = document.getElementById("page1Btn");
    if (btn) btn.classList.add("visible");
  }, 700);

}, 900);
  }
}

// ========================
// PAGE NAVIGATION
// ========================

function nextPage(currentPageNumber) {
  const currentPage = document.getElementById(`page${currentPageNumber}`);
  const nextPageEl = document.getElementById(`page${currentPageNumber + 1}`);

  if (!currentPage || !nextPageEl) return;

  currentPage.classList.remove("active");
  nextPageEl.classList.add("active");

  if (currentPageNumber + 1 === 2) initPage2();
  if (currentPageNumber + 1 === 3) initPage3();
  if (currentPageNumber + 1 === 4) initPage4();
  if (currentPageNumber + 1 === 5) initPage5();
  if (currentPageNumber + 1 === 6) initPage6();
}

// ========================
// PAGE 2 — VIDEO SEQUENCE
// ========================

function initPage2() {
  const v1 = document.getElementById("video1");
  const v2 = document.getElementById("video2");
  const v3 = document.getElementById("video3");
  const stage = document.getElementById("videoStage");
  const btn = document.getElementById("page2Btn");
  const paper = document.getElementById("duaPaper");
  let transitioned = false;

  btn.classList.remove("visible");
  paper.classList.remove("show");
  paper.classList.add("hidden");
  v1.classList.remove("hidden");
  v2.classList.add("hidden");
  v3.classList.add("hidden");

  v1.play();

  v1.addEventListener("ended", () => {
    if (transitioned) return;
    v1.classList.add("hidden");
    v2.classList.remove("hidden");
    v2.play();
  }, { once: true });

  stage.addEventListener("click", () => {
    if (transitioned) return;
    transitioned = true;

    const title = document.querySelector(".page2-title");
    if (title) title.classList.add("hide");

    v1.pause();
    v2.pause();
    v1.classList.add("hidden");
    v2.classList.add("hidden");

    v3.classList.remove("hidden");
    v3.play();

    setTimeout(() => {
      paper.classList.remove("hidden");
      paper.classList.add("show");
    }, 500);

    setTimeout(() => {
      btn.classList.add("visible");
    }, 2400);

  }, { once: true });
}

// ========================
// PAGE 3 — TAP BUTTON & FLOATING WORDS
// ========================

const TOTAL_TAPS = 5;
let tapCount = 0;
const CIRCUMFERENCE = 2 * Math.PI * 60;

const duaWords = ["Kushi ✨", "Barkat 🌟", "Rehmat 🌙", "Salamati 💖", "Muskurahat 😊", "Pyaar 🥰", "Kamyabi 👑"];

function initPage3() {
  tapCount = 0;
  const ring = document.getElementById("ringFill");
  if (ring) ring.style.strokeDashoffset = CIRCUMFERENCE;
}

function handleTap() {
  if (tapCount >= TOTAL_TAPS) return;

  tapCount++;

  if (tapCount === 1) {
    const title = document.querySelector(".page3-title");
    if (title) title.classList.add("hide");
  }

  createFloatingWord();

  const ring = document.getElementById("ringFill");
  const btn = document.getElementById("tapBtn");
  const hint = document.getElementById("tapHint");
  const nextBtn = document.getElementById("page3Btn");

  const progress = tapCount / TOTAL_TAPS;
  if (ring) ring.style.strokeDashoffset = CIRCUMFERENCE * (1 - progress);

  btn.classList.remove("tap-pulse");
  void btn.offsetWidth;
  btn.classList.add("tap-pulse");

  if (tapCount >= TOTAL_TAPS) {
    if (hint) hint.style.opacity = "0";
    if (nextBtn) nextBtn.classList.add("visible");
  }
}

function createFloatingWord() {
  const wrapper = document.querySelector('.tap-wrapper');
  if (!wrapper) return;

  const wordSpan = document.createElement('span');
  wordSpan.classList.add('floating-word');

  const randomWord = duaWords[Math.floor(Math.random() * duaWords.length)];
  wordSpan.innerText = randomWord;

  const randomX = (Math.random() * 120 - 60) + 'px';
  wordSpan.style.setProperty('--x-offset', randomX);

  wrapper.appendChild(wordSpan);

  wordSpan.addEventListener('animationend', () => {
    wordSpan.remove();
  });
}

// ========================
// PAGE 4 — POP SWEETS
// ========================

let poppedCount = 0;
const sweetWords = ["Tasty 😋", "Yummy ✨", "Delicious 🍬", "Mazedaar 🌟"];

function initPage4() {
  poppedCount = 0;
  document.querySelectorAll('.sweet-item').forEach(el => {
    el.classList.remove('popped');
  });
  const btn = document.getElementById("page4Btn");
  if (btn) btn.classList.remove("visible");
}

function popSweet(el) {
  if (el.classList.contains('popped')) return;
  el.classList.add('popped');
  poppedCount++;

  createSweetWord(el);

  if (poppedCount >= 3) {
    setTimeout(() => {
      const btn = document.getElementById("page4Btn");
      if (btn) btn.classList.add("visible");
    }, 500);
  }
}

function createSweetWord(el) {
  const wordSpan = document.createElement('span');
  wordSpan.classList.add('sweet-pop-word');

  const randomWord = sweetWords[Math.floor(Math.random() * sweetWords.length)];
  wordSpan.innerText = randomWord;

  el.appendChild(wordSpan);

  wordSpan.addEventListener('animationend', () => {
    wordSpan.remove();
  });
}

// ========================
// PAGE 5 — SCAN
// ========================

let scanStarted = false;

function initPage5() {
  scanStarted = false;

  const tapText   = document.getElementById("scanTapText");
  const scanGroup = document.getElementById("scanScanningGroup");
  const result    = document.getElementById("scanResult");
  const btn       = document.getElementById("page5Btn");
  const barFill   = document.getElementById("scanBarFill");
  const video     = document.getElementById("scanVideo");

  tapText.classList.remove("hidden");
  scanGroup.classList.add("hidden");
  result.classList.add("hidden");

  barFill.style.animation = "none";
  if (btn) btn.classList.remove("visible");

  video.currentTime = 0;
}

function startScan() {
  if (scanStarted) return;
  scanStarted = true;

  const video     = document.getElementById("scanVideo");
  const tapText   = document.getElementById("scanTapText");
  const scanGroup = document.getElementById("scanScanningGroup");
  const barFill   = document.getElementById("scanBarFill");
  const result    = document.getElementById("scanResult");
  const btn       = document.getElementById("page5Btn");

  video.play();

  tapText.classList.add("hidden");
  scanGroup.classList.remove("hidden");

  void barFill.offsetWidth;
  barFill.style.animation = "scanFill 6s linear forwards";

  video.onended = function () {
    scanGroup.classList.add("hidden");
    result.classList.remove("hidden");

    setTimeout(() => {
      if (btn) btn.classList.add("visible");
    }, 400);
  };
}

/// ========================
// PAGE 6 — ENVELOPE LETTER
// ========================
let envelopeOpened = false;

function initPage6() {
  envelopeOpened = false;

  const flap   = document.getElementById("envFlap");
  const seal   = document.getElementById("waxSeal");
  const hint   = document.getElementById("envHint");
  const scene  = document.getElementById("envScene");
  const letter = document.getElementById("letterWrap");
  const layer  = document.getElementById("starsLayer6");

  if (flap)   flap.classList.remove("open");
  if (seal)   seal.classList.remove("hide");
  if (hint)   hint.style.display = "";
  if (scene)  scene.style.display = "";
  if (letter) letter.classList.remove("visible");
  if (layer)  layer.innerHTML = "";
}

function openEnvelope() {
  if (envelopeOpened) return;
  envelopeOpened = true;

  const seal    = document.getElementById("waxSeal");
  const flap    = document.getElementById("envFlap");
  const hint    = document.getElementById("envHint");
  const scene   = document.getElementById("envScene");
  const letter  = document.getElementById("letterWrap");

  // 1. Hide wax seal instantly
  if (seal) seal.classList.add("hide");

  // 2. Flip flap open after short delay
  setTimeout(() => {
    if (flap) flap.classList.add("open");
  }, 200);

  // 3. Swap to letter cleanly after envelope finishes opening (1 second)
  setTimeout(() => {
    if (hint) hint.style.display = "none";
    if (scene) scene.style.display = "none";
    if (letter) letter.classList.add("visible");
    spawnStars6();

    const topImg = document.querySelector(".page6-top-img");
    if (topImg) topImg.classList.add("fade-out");
  }, 1000);

  // 4. Reveal the watch video link button smoothly at the end (2 seconds)
  setTimeout(() => {
    const watchBtn = document.querySelector(".watch-btn");
    if (watchBtn) {
      watchBtn.classList.add("visible");

      /* Pauses the global background music upon click */
      watchBtn.onclick = () => {
        const music = document.getElementById("bgMusic");
        if (music) music.pause();
      };
    }
  }, 2000);
}

function spawnStars6() {
  const layer = document.getElementById("starsLayer6");
  if (!layer) return;

  for (let i = 0; i < 22; i++) {
    const s = document.createElement("div");
    s.className = "star6";
    const size = 2 + Math.random() * 4;
    s.style.cssText = `
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      width: ${size}px;
      height: ${size}px;
      animation-delay: ${Math.random() * 3}s;
      animation-duration: ${2 + Math.random() * 3}s;
    `;
    layer.appendChild(s);
  }
}

function initStarsBg() {
  for (let i = 0; i < 80; i++) {
    const s = document.createElement("div");
    s.className = "star-bg";
    const size = 1.5 + Math.random() * 2.5;
    s.style.cssText = `
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      width: ${size}px;
      height: ${size}px;
      --dur: ${3 + Math.random() * 5}s;
      --delay: ${Math.random() * 6}s;
    `;
    document.body.appendChild(s);
  }
}

initStarsBg();