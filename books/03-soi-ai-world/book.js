// 소이의 반짝이는 하루 — 책 뷰어 스크립트
(() => {
  const INLINE_DATA = {
    "title": "소이의 반짝이는 하루",
    "subtitle": "AI 세상에서도 가장 따뜻한 건 엄마 아빠 품이에요",
    "author": "AI 동화 작가",
    "pages": [
      { "type": "cover", "image": "images/cover.png", "title": "소이의 반짝이는 하루", "subtitle": "AI 세상에서도 가장 따뜻한 건 엄마 아빠 품이에요", "author": "AI 동화 작가" },
      { "type": "scene", "number": 1, "title": "반짝반짝 아침이 왔어요", "body": "소이가 자고 있는 방 창문으로 햇살이 쏟아졌어요. \"소이야, 좋은 아침!\" 두두가 살랑살랑 날아와 소이 코 앞에서 빙글 돌았어요. 소이는 눈을 비비며 두두를 꼭 안았답니다. \"두두야, 오늘도 왔구나!\"", "image": "images/scene_01.png" },
      { "type": "scene", "number": 2, "title": "신기한 아침밥", "body": "부엌에서는 AI 요리 팔이 팔랑팔랑 움직이며 아침밥을 만들고 있었어요. \"달걀 프라이, 완성!\" 소이는 식탁에 앉아 눈을 동그랗게 떴어요. 그런데 제일 좋은 건 엄마가 옆에 앉아 \"잘 잤어?\" 해 주는 거였어요.", "image": "images/scene_02.png" },
      { "type": "scene", "number": 3, "title": "AI 유치원", "body": "소이의 유치원에는 AI 선생님 '별쌤'도 있었어요. 별쌤은 소이가 모르는 것을 뭐든 알려 주었지요. \"별은 왜 빛나요?\" 소이가 물으면 별쌤이 손바닥에 작은 별 홀로그램을 피워 올렸어요. 친구들 모두 \"와아!\" 하고 손뼉을 쳤답니다.", "image": "images/scene_03.png" },
      { "type": "scene", "number": 4, "title": "소이가 넘어졌어요", "body": "집에 오는 길에 소이가 그만 넘어지고 말았어요. 무릎이 까져서 눈물이 났지요. 두두가 \"소이야, 괜찮아?\" 하고 날아왔지만, 소이는 엄마가 보고 싶었어요. AI가 아무리 친절해도 엄마 품만 같을 순 없었거든요.", "image": "images/scene_04.png" },
      { "type": "scene", "number": 5, "title": "엄마 품이 최고야", "body": "집에 돌아오자 엄마가 달려왔어요. 엄마는 아무 말 없이 소이를 꼭 안아 주었어요. 엄마 품은 따뜻하고 폭신했지요. AI가 해 줄 수 없는 것, 그건 바로 이 느낌이었어요. 소이는 금세 울음을 그쳤답니다.", "image": "images/scene_05.png" },
      { "type": "scene", "number": 6, "title": "아빠와 그림 그리기", "body": "저녁에 아빠가 돌아왔어요. \"소이야, 오늘 뭐 하고 싶어?\" 소이는 두두를 불러 함께 벽에 그림을 그렸어요. 소이가 선을 그으면 두두가 색을 입혀 주었지요. 아빠도 옆에서 함께 그렸어요. 셋이 만든 그림은 세상에서 하나뿐인 그림이었어요.", "image": "images/scene_06.png" },
      { "type": "scene", "number": 7, "title": "별빛 아래 이야기", "body": "잠자리에 들기 전, 아빠가 소이를 안고 베란다로 나갔어요. 도시 하늘에도 별이 반짝였어요. \"소이야, 저 별처럼 우리 가족도 항상 빛나고 있어.\" 두두도 조용히 옆에서 작은 별빛을 내며 함께했어요.", "image": "images/scene_07.png" },
      { "type": "scene", "number": 8, "title": "내일도 함께해요", "body": "소이는 엄마 아빠 사이에 쏙 끼어 잠이 들었어요. 두두는 침대 옆 탁자 위에서 조용히 빛을 낮추고 소이를 지켜보았어요. AI 세상에 살아도, 소이에게 가장 소중한 건 엄마 아빠의 사랑이었답니다.", "image": "images/scene_08.png" },
      { "type": "ending", "message": "AI 세상이 아무리 신기해도,\n엄마 아빠 품보다 따뜻한 곳은 없답니다.", "image": "images/scene_08.png" }
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
            <h1>${escapeHtml(p.title)}</h1>
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
  }

  init();
})();
