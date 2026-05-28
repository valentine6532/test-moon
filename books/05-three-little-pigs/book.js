// 수연, 연우, 연아의 집 짓기 대소동 — 책 뷰어 스크립트
(() => {
  const INLINE_DATA = {
    "title": "수연, 연우, 연아의 집 짓기 대소동",
    "subtitle": "열심히 지은 집이 최고야!",
    "author": "AI 동화 작가",
    "pages": [
      { "type": "cover", "image": "images/cover.png", "title": "수연, 연우, 연아의\n집 짓기 대소동", "subtitle": "열심히 지은 집이 최고야!", "author": "AI 동화 작가" },
      { "type": "scene", "number": 1, "title": "엄마의 배웅", "body": "어느 맑은 봄날, 엄마 돼지는 세 딸을 불렀어요.\n\"수연아, 연우야, 연아야! 이제 너희도 스스로 집을 짓고 살아야 할 때가 됐단다.\"\n엄마는 따뜻하게 안아 주며 말했어요.\n\"집은 튼튼하게 지어야 해. 무서운 늑대 홍관이 나타날지도 모르거든!\"\n세 자매는 신이 나서 각자의 길을 떠났어요.", "image": "images/scene_01.png", "audio": "audio/scene_01.mp3" },
      { "type": "scene", "number": 2, "title": "수연의 짚집", "body": "첫째 수연이는 마음이 급했어요.\n\"집 짓는 게 뭐가 어려워? 이거면 충분해!\"\n수연이는 들판에서 짚을 한 아름 모아 후다닥 집을 지었어요.\n지붕도 뚝딱, 문도 뚝딱, 순식간에 완성!\n\"야호! 나 벌써 다 됐어~\" 수연이는 콧노래를 부르며 낮잠을 잤어요.", "image": "images/scene_02.png", "audio": "audio/scene_02.mp3" },
      { "type": "scene", "number": 3, "title": "연우의 나무집", "body": "둘째 연우는 숲에서 나뭇가지와 판자를 모았어요.\n\"짚보다는 나무가 낫겠지. 그래도 너무 힘들게는 하지 말자.\"\n연우는 열심히, 하지만 그냥저냥 나무집을 지었어요.\n창문도 달고, 문도 달고…\n\"음, 꽤 근사하잖아?\" 연우는 흐뭇하게 웃었어요.", "image": "images/scene_03.png", "audio": "audio/scene_03.mp3" },
      { "type": "scene", "number": 4, "title": "연아의 벽돌집", "body": "막내 연아는 처음부터 끝까지 꼼꼼하게 계획을 세웠어요.\n\"튼튼한 집을 지으려면 벽돌이 최고야!\"\n연아는 땀을 뻘뻘 흘리며 벽돌을 하나하나 쌓았어요.\n하루가 지나고, 이틀이 지나고… 드디어 단단한 벽돌집이 완성!\n\"수고했어, 나 자신!\" 연아는 뿌듯하게 집을 쓰다듬었어요.", "image": "images/scene_04.png", "audio": "audio/scene_04.mp3" },
      { "type": "scene", "number": 5, "title": "홍관, 짚집을 날려버리다", "body": "어느 날 저녁, 무서운 늑대 홍관이 나타났어요!\n\"수연아, 문 열어! 안 열면 확 불어서 날려버릴 테야!\"\n\"절대 안 돼요!\" 수연이가 외쳤지만…\n홍관이 크게 숨을 들이쉬더니 있는 힘껏 '훅~!' 하고 불었어요.\n짚집은 흔들흔들… 그대로 훅 날아가 버렸어요! 수연이는 허둥지둥 연우네 집으로 달려갔어요.", "image": "images/scene_05.png", "audio": "audio/scene_05.mp3" },
      { "type": "scene", "number": 6, "title": "나무집도 무너지다", "body": "수연이와 연우가 나무집 안에 꼭 붙어 있었어요.\n\"이번엔 절대 안 돼요!\" 하지만 홍관이 '훅훅~!' 더 세게 불자,\n나무집도 삐걱삐걱 흔들리더니 와르르 무너졌어요.\n\"으악!\" 수연이와 연우는 손을 잡고 있는 힘껏 달렸어요.\n\"연아네 집으로 가자!\" 홍관이 씩 웃으며 뒤를 쫓아왔어요.", "image": "images/scene_06.png", "audio": "audio/scene_06.mp3" },
      { "type": "scene", "number": 7, "title": "벽돌집은 끄떡없어!", "body": "셋이 연아의 벽돌집으로 쏙 들어갔어요.\n홍관이 '훅! 훅훅! 훅훅훅!' 온 힘을 다해 불었지만 벽돌집은 꿈쩍도 안 했어요.\n\"에잇, 굴뚝으로 들어가야겠다!\" 홍관이 지붕에 올라 굴뚝으로 쑥 들어왔어요.\n그런데… 아래에는 연아가 끓여놓은 뜨거운 수프 냄비가!\n\"앗, 뜨거워!\" 홍관은 비명을 지르며 멀리멀리 도망쳤어요.", "image": "images/scene_07.png", "audio": "audio/scene_07.mp3" },
      { "type": "scene", "number": 8, "title": "행복한 세 자매", "body": "그날 이후, 수연이와 연우는 연아의 벽돌집 옆에 튼튼한 집을 새로 지었어요.\n이번엔 게으름 없이, 있는 힘껏!\n\"역시 집은 튼튼하게 지어야 해!\"\n\"맞아, 연아 말이 옳았어!\"\n세 자매는 서로 도와가며 행복하게 살았답니다. 홍관은 다시는 나타나지 않았어요.", "image": "images/scene_08.png", "audio": "audio/scene_08.mp3" },
      { "type": "ending", "message": "서두르지 말고 꼼꼼하게!\n힘들어도 열심히 하면\n언젠가 반드시 빛이 나요.", "image": "images/scene_08.png" }
    ]
  };

  const $ = (sel) => document.querySelector(sel);
  const trackEl = $('#page-track');
  const prevBtn = $('#prev');
  const nextBtn = $('#next');
  const indicator = $('#indicator');
  const dotsEl = $('#dots');
  const edgePrev = $('#edge-prev');
  const edgeNext = $('#edge-next');
  const restartBtn = $('#restart-btn');
  const fullscreenBtn = $('#fullscreen-btn');
  const bookEl = $('#book');

  let data = null;
  let currentIdx = 0;
  let pageEls = [];
  let isAnimating = false;

  // 오디오 플레이어
  const audioEl = new Audio();
  audioEl.preload = 'auto';
  let isMuted = false;

  // 자동 넘김
  let isAutoTurn = false;
  let mutedDelay = 5;
  let autoTimer = null;

  function clearAutoTimer() {
    if (autoTimer) { clearTimeout(autoTimer); autoTimer = null; }
    stopProgressBar();
  }

  function startProgressBar(durationMs) {
    const bar = document.getElementById('auto-progress');
    if (!bar) return;
    bar.style.transition = 'none';
    bar.style.width = '100%';
    void bar.offsetWidth;
    bar.style.transition = `width ${durationMs}ms linear`;
    bar.style.width = '0%';
  }

  function stopProgressBar() {
    const bar = document.getElementById('auto-progress');
    if (!bar) return;
    bar.style.transition = 'none';
    bar.style.width = '0%';
  }

  function scheduleAutoTurn() {
    clearAutoTimer();
    if (!isAutoTurn) return;
    if (currentIdx >= data.pages.length - 1) return;
    const page = data.pages[currentIdx];
    if (!isMuted && page.audio) return; // audio ended 이벤트가 처리
    const delay = mutedDelay * 1000;
    startProgressBar(delay);
    autoTimer = setTimeout(() => { clearAutoTimer(); goTo(currentIdx + 1); }, delay);
  }

  audioEl.addEventListener('ended', () => {
    if (!isAutoTurn || isMuted) return;
    if (currentIdx >= data.pages.length - 1) return;
    startProgressBar(1000);
    autoTimer = setTimeout(() => { clearAutoTimer(); goTo(currentIdx + 1); }, 1000);
  });

  function updateAutoBtn() {
    const btn = document.getElementById('auto-btn');
    const picker = document.getElementById('delay-picker');
    if (!btn || !picker) return;
    if (isAutoTurn) {
      btn.classList.add('active-gold');
      btn.title = '자동 넘김 끄기';
      picker.classList.add('visible');
    } else {
      btn.classList.remove('active-gold');
      btn.title = '자동 넘김 켜기';
      picker.classList.remove('visible');
    }
  }

  function playPageAudio(idx) {
    const p = data.pages[idx];
    audioEl.pause();
    if (p && p.audio) {
      audioEl.src = p.audio;
      audioEl.currentTime = 0;
      const promise = audioEl.play();
      if (promise) {
        promise.catch(() => {
          // 브라우저 자동재생 정책으로 차단된 경우: 다음 사용자 인터랙션 시 재생
          document.addEventListener('click', () => audioEl.play(), { once: true });
        });
      }
    }
    updateMuteBtn();
  }

  function updateMuteBtn() {
    const btn = document.getElementById('mute-btn');
    if (!btn) return;
    const p = data && data.pages[currentIdx];
    const hasAudio = p && p.audio;
    btn.style.display = hasAudio ? 'flex' : 'none';
    btn.textContent = isMuted ? '🔇' : '🔊';
    btn.title = isMuted ? '소리 켜기' : '소리 끄기';
  }

  async function loadData() {
    try {
      const res = await fetch('book.json', { cache: 'no-store' });
      if (!res.ok) throw new Error('book.json fetch failed');
      return await res.json();
    } catch (e) {
      console.info('[viewer] fetch unavailable (likely file://), using inline data.');
      return INLINE_DATA;
    }
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
  }

  function buildPages() {
    trackEl.innerHTML = '';
    pageEls = data.pages.map((p, i) => {
      const el = document.createElement('article');
      el.className = `page ${p.type}`;
      el.dataset.idx = i;
      if (p.type === 'cover') {
        el.innerHTML = `
          <div class="cover-img" role="img" aria-label="표지: ${escapeHtml(p.title)}" style="background-image:url('${p.image}')"></div>
          <div class="cover-text">
            <h1>${escapeHtml(p.title).replace(/\n/g, '<br>')}</h1>
            <p class="subtitle">${escapeHtml(p.subtitle || '')}</p>
            <span class="author">${escapeHtml(p.author || '')}</span>
          </div>
        `;
      } else if (p.type === 'scene') {
        el.innerHTML = `
          <div class="scene-img" role="img" aria-label="장면 ${p.number}: ${escapeHtml(p.title)}" style="background-image:url('${p.image}')"></div>
          <div class="scene-text">
            <div class="scene-num">SCENE · ${String(p.number).padStart(2,'0')}</div>
            <h2 class="scene-title">${escapeHtml(p.title)}</h2>
            <p class="scene-body">${escapeHtml(p.body)}</p>
          </div>
        `;
      } else if (p.type === 'ending') {
        el.style.setProperty('--ending-bg', `url('${p.image}')`);
        el.innerHTML = `
          <div class="ending-inner">
            <span class="ending-mark">FIN</span>
            <p class="ending-message">${escapeHtml(p.message)}</p>
            <button class="ending-btn" id="restart-end">처음부터 다시 읽기</button>
          </div>
        `;
      }
      trackEl.appendChild(el);
      return el;
    });

    dotsEl.innerHTML = '';
    data.pages.forEach((_, i) => {
      const d = document.createElement('span');
      d.className = 'dot';
      d.dataset.idx = i;
      d.addEventListener('click', () => goTo(i));
      dotsEl.appendChild(d);
    });
  }

  function render() {
    pageEls.forEach((el, i) => {
      el.classList.remove('active', 'leaving', 'entering-back');
      if (i === currentIdx) el.classList.add('active');
    });
    indicator.textContent = `${currentIdx + 1} / ${data.pages.length}`;
    Array.from(dotsEl.children).forEach((d, i) => {
      d.classList.toggle('active', i === currentIdx);
    });
    prevBtn.disabled = currentIdx === 0;
    nextBtn.disabled = currentIdx === data.pages.length - 1;

    const p = data.pages[currentIdx];
    const metaEl = document.getElementById('meta-title');
    if (metaEl) {
      if (p.type === 'cover') metaEl.textContent = data.title;
      else if (p.type === 'scene') metaEl.textContent = `${data.title} · ${p.title}`;
      else metaEl.textContent = `${data.title} · 끝`;
    }

    const restartEnd = document.getElementById('restart-end');
    if (restartEnd) restartEnd.onclick = () => goTo(0);
  }

  function goTo(idx) {
    if (isAnimating) return;
    if (idx < 0 || idx >= data.pages.length) return;
    if (idx === currentIdx) return;
    clearAutoTimer();
    const goingForward = idx > currentIdx;
    const oldIdx = currentIdx;
    isAnimating = true;

    if (!goingForward) {
      pageEls[idx].classList.add('entering-back');
      void pageEls[idx].offsetWidth;
    }
    pageEls[oldIdx].classList.add('leaving');
    pageEls[oldIdx].classList.remove('active');
    pageEls[idx].classList.add('active');
    pageEls[idx].classList.remove('entering-back');

    currentIdx = idx;
    indicator.textContent = `${currentIdx + 1} / ${data.pages.length}`;
    Array.from(dotsEl.children).forEach((d, i) => d.classList.toggle('active', i === currentIdx));
    prevBtn.disabled = currentIdx === 0;
    nextBtn.disabled = currentIdx === data.pages.length - 1;

    const p = data.pages[currentIdx];
    const metaEl = document.getElementById('meta-title');
    if (metaEl) {
      if (p.type === 'cover') metaEl.textContent = data.title;
      else if (p.type === 'scene') metaEl.textContent = `${data.title} · ${p.title}`;
      else metaEl.textContent = `${data.title} · 끝`;
    }

    playPageAudio(idx);
    scheduleAutoTurn();

    setTimeout(() => {
      pageEls[oldIdx].classList.remove('leaving');
      isAnimating = false;
      const restartEnd = document.getElementById('restart-end');
      if (restartEnd) restartEnd.onclick = () => goTo(0);
    }, 560);
  }

  function next() { goTo(currentIdx + 1); }
  function prev() { goTo(currentIdx - 1); }

  function bindEvents() {
    nextBtn.addEventListener('click', next);
    prevBtn.addEventListener('click', prev);
    edgePrev.addEventListener('click', prev);
    edgeNext.addEventListener('click', next);
    restartBtn.addEventListener('click', () => goTo(0));

    const muteBtn = document.getElementById('mute-btn');
    if (muteBtn) {
      muteBtn.addEventListener('click', () => {
        isMuted = !isMuted;
        audioEl.muted = isMuted;
        updateMuteBtn();
        // 음소거 전환 시 자동넘김 재스케줄
        scheduleAutoTurn();
      });
    }

    const autoBtn = document.getElementById('auto-btn');
    if (autoBtn) {
      autoBtn.addEventListener('click', () => {
        isAutoTurn = !isAutoTurn;
        updateAutoBtn();
        if (isAutoTurn) scheduleAutoTurn();
        else clearAutoTimer();
      });
    }

    document.querySelectorAll('.delay-opt').forEach(btn => {
      btn.addEventListener('click', () => {
        mutedDelay = Number(btn.dataset.delay);
        document.querySelectorAll('.delay-opt').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        if (isAutoTurn) scheduleAutoTurn();
      });
    });

    fullscreenBtn.addEventListener('click', () => {
      const doc = document;
      if (!doc.fullscreenElement) {
        (doc.documentElement.requestFullscreen || doc.documentElement.webkitRequestFullscreen)?.call(doc.documentElement);
      } else {
        (doc.exitFullscreen || doc.webkitExitFullscreen)?.call(doc);
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault(); next();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault(); prev();
      } else if (e.key === 'Home') {
        e.preventDefault(); goTo(0);
      } else if (e.key === 'End') {
        e.preventDefault(); goTo(data.pages.length - 1);
      }
    });

    let touchStartX = 0, touchStartY = 0, touchStartTime = 0;
    bookEl.addEventListener('touchstart', (e) => {
      const t = e.touches[0];
      touchStartX = t.clientX; touchStartY = t.clientY;
      touchStartTime = Date.now();
    }, { passive: true });
    bookEl.addEventListener('touchend', (e) => {
      const t = e.changedTouches[0];
      const dx = t.clientX - touchStartX;
      const dy = t.clientY - touchStartY;
      const dt = Date.now() - touchStartTime;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) && dt < 700) {
        if (dx < 0) next(); else prev();
      }
    });
  }

  function preloadImages() {
    data.pages.forEach(p => {
      if (p.image) { const img = new Image(); img.src = p.image; }
    });
  }

  async function init() {
    data = await loadData();
    document.title = data.title;
    buildPages();
    bindEvents();
    render();
    preloadImages();
    bookEl.focus();
    playPageAudio(0);
  }

  init();
})();
