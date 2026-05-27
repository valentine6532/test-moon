// 연우의 마법 머리카락 — 책 뷰어 스크립트
(() => {
  const INLINE_DATA = {
    "title": "연우의 마법 머리카락",
    "subtitle": "불러줘, 연우야! 머리카락을 내려줘!",
    "author": "AI 동화 작가",
    "pages": [
      { "type": "cover", "image": "images/cover.png", "title": "연우의 마법 머리카락", "subtitle": "불러줘, 연우야! 머리카락을 내려줘!", "author": "AI 동화 작가" },
      { "type": "scene", "number": 1, "title": "탑 위의 연우", "body": "마법의 숲 한가운데, 높고 높은 돌탑이 있었어요.\n그 탑 꼭대기에 여덟 살 연우가 살고 있었지요.\n연우의 머리카락은 매일 조금씩 자랐어요.\n오늘도 연우는 창가에 앉아 긴 머리카락을 빗으며 노래했어요.\n\"언제쯤 친구가 나를 찾아와 줄까…\"", "image": "images/scene_01.png" },
      { "type": "scene", "number": 2, "title": "연아, 탑을 발견하다", "body": "숲 저편에는 다섯 살 연아가 살았어요.\n까치발로 나무 사이를 들여다보던 연아의 눈이 반짝 빛났어요.\n\"어? 저게 뭐지?\"\n나뭇가지 너머로 하늘 높이 솟은 탑이 보였어요.\n연아는 두근두근 탑을 향해 달려갔어요.", "image": "images/scene_02.png" },
      { "type": "scene", "number": 3, "title": "\"연우야, 머리카락을 내려줘!\"", "body": "탑 아래에 도착한 연아는 두 손을 모아 힘껏 외쳤어요.\n\"연우야, 연우야! 머리카락을 내려줘!\"\n탑 꼭대기 창문에서 연우가 고개를 빼꼼 내밀었어요.\n\"누구야? 어떻게 내 이름을 알아?\"\n\"나 연아야! 위에 올라가고 싶어!\"", "image": "images/scene_03.png" },
      { "type": "scene", "number": 4, "title": "반짝반짝 마법 머리카락", "body": "연우는 방실방실 웃으며 머리카락을 창밖으로 늘어뜨렸어요.\n기다란 머리카락이 스르르 내려오더니 땅에 닿았지요.\n\"꼭 잡아, 연아야!\"\n연우의 머리카락은 튼튼한 밧줄처럼 반짝반짝 빛났어요.", "image": "images/scene_04.png" },
      { "type": "scene", "number": 5, "title": "연아가 올라가요!", "body": "연아는 두 손으로 머리카락을 꼭 잡고 발로 탑 벽을 힘차게 밀었어요.\n\"하나, 둘, 셋!\"\n연아의 빨간 별 원피스가 바람에 펄럭였어요.\n\"연우 언니, 나 올라가고 있어!\"\n\"잘 한다, 연아야! 조금만 더!\"", "image": "images/scene_05.png" },
      { "type": "scene", "number": 6, "title": "탑 위의 신나는 하루", "body": "탑 위는 꼭 비밀 놀이터 같았어요!\n연우와 연아는 꽃을 머리에 꽂고, 그림을 그리고, 노래를 불렀어요.\n\"연우 언니, 탑 위가 이렇게 신나는 줄 몰랐어!\"\n연아가 깔깔 웃자, 연우도 오랜만에 실컷 웃었답니다.", "image": "images/scene_06.png" },
      { "type": "scene", "number": 7, "title": "저녁놀 미끄럼틀", "body": "해가 뉘엿뉘엿 질 무렵, 연아가 집에 돌아갈 시간이 되었어요.\n연우는 머리카락을 다시 창밖으로 내렸어요.\n\"꼭 잡아, 천천히!\"\n연아는 스르르, 미끄럼 타듯 내려왔어요.\n금빛 저녁 햇살이 두 아이를 따뜻하게 감쌌어요.", "image": "images/scene_07.png" },
      { "type": "scene", "number": 8, "title": "내일 또 만나요!", "body": "땅에 내려선 연아가 하늘 높이 손을 흔들었어요.\n탑 창문에서 연우도 두 손을 흔들며 외쳤어요.\n\"연아야, 내일도 와!\"\n\"응! 연우 언니, 내일도 불러줄게!\"\n숲 속에 두 아이의 웃음소리가 퍼져나갔어요.", "image": "images/scene_08.png" },
      { "type": "ending", "message": "멀리 있어도 마음은 언제나 가까워요.\n부르면 달려오는 친구가 있다면,\n세상 어디도 외롭지 않아요.", "image": "images/scene_08.png" }
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
