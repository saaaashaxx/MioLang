/* MioLang — учебный интерфейс на чистом JavaScript.
   Данные и прогресс сохраняются в localStorage этого браузера. */
'use strict';

const STORAGE_KEY = 'miolang-demo-v1';

const words = [
  { id: 'school', korean: '학교', roman: '[хаккё]', translation: 'школа', category: 'Учёба', level: '1급', type: 'существительное', examples: [{ ko: '저는 학교에 가요.', ru: 'Я иду в школу.' }, { ko: '학교에서 한국어를 공부해요.', ru: 'В школе я учу корейский.' }] },
  { id: 'friend', korean: '친구', roman: '[чхингу]', translation: 'друг', category: 'Люди', level: '1급', type: 'существительное', examples: [{ ko: '친구를 만나요.', ru: 'Я встречаюсь с другом.' }, { ko: '친구와 같이 공부해요.', ru: 'Я учусь вместе с другом.' }] },
  { id: 'book', korean: '책', roman: '[чхэк]', translation: 'книга', category: 'Учёба', level: '1급', type: 'существительное', examples: [{ ko: '책을 읽어요.', ru: 'Я читаю книгу.' }, { ko: '이 책은 재미있어요.', ru: 'Эта книга интересная.' }] },
  { id: 'water', korean: '물', roman: '[муль]', translation: 'вода', category: 'Еда и напитки', level: '1급', type: 'существительное', examples: [{ ko: '물을 마셔요.', ru: 'Я пью воду.' }, { ko: '물 주세요.', ru: 'Дайте, пожалуйста, воды.' }] },
  { id: 'love', korean: '사랑', roman: '[саран]', translation: 'любовь', category: 'Чувства', level: '1급', type: 'существительное', examples: [{ ko: '사랑해요.', ru: 'Я люблю тебя.' }, { ko: '사랑은 아름다워요.', ru: 'Любовь прекрасна.' }] },
  { id: 'study', korean: '공부', roman: '[конбу]', translation: 'учёба', category: 'Учёба', level: '1급', type: 'существительное', examples: [{ ko: '한국어를 공부해요.', ru: 'Я изучаю корейский язык.' }, { ko: '오늘 공부해요.', ru: 'Сегодня я занимаюсь.' }] }
];

const quizQuestions = [
  { wordId: 'school', options: ['школа', 'друг', 'книга', 'вода'] },
  { wordId: 'friend', options: ['любовь', 'друг', 'учёба', 'школа'] },
  { wordId: 'book', options: ['вода', 'школа', 'книга', 'любовь'] },
  { wordId: 'water', options: ['вода', 'друг', 'книга', 'учёба'] },
  { wordId: 'love', options: ['школа', 'любовь', 'вода', 'друг'] },
  { wordId: 'study', options: ['книга', 'учёба', 'любовь', 'вода'] },
  { wordId: 'school', options: ['друг', 'школа', 'учёба', 'книга'] },
  { wordId: 'friend', options: ['друг', 'вода', 'любовь', 'школа'] },
  { wordId: 'book', options: ['учёба', 'любовь', 'книга', 'друг'] },
  { wordId: 'water', options: ['книга', 'вода', 'школа', 'любовь'] }
];

const examQuestions = [
  { prompt: '여자는 어디에 갑니까?', hint: 'Послушай диалог и выбери правильный ответ.', options: ['학교', '회사', '병원'], audio: 'Диалог 01' },
  { prompt: '두 사람은 무엇을 하고 있습니까?', hint: 'Послушай разговор и выбери правильный ответ.', options: ['공부해요', '운동해요', '요리해요'], audio: 'Диалог 02' },
  { prompt: '남자는 몇 시에 만납니까?', hint: 'Послушай диалог и выбери правильный ответ.', options: ['세 시', '네 시', '다섯 시'], audio: 'Диалог 03' },
  { prompt: '남자는 무엇을 주문하고 싶어 합니까?', hint: 'Послушай диалог и выбери один ответ.', options: ['커피', '우유', '차'], audio: 'Диалог 01' },
  { prompt: '여자는 주말에 무엇을 할 겁니까?', hint: 'Послушай разговор и выбери правильный ответ.', options: ['친구를 만나요', '책을 읽어요', '집에서 쉬어요'], audio: 'Диалог 05' }
];

const defaultData = {
  name: 'Аня Смирнова',
  learnedWords: 248,
  favorites: ['school'],
  knownWords: ['friend', 'book'],
  completedDays: [true, true, true, true, true, false, false],
  flashIndex: 0,
  flashEasy: 4,
  flashAgain: 2,
  quizAnswers: {},
  quizIndex: 0,
  quizChecked: false,
  quizFinished: false,
  selectedCategory: 'I',
  selectedLevel: 1,
  selectedMock: 1,
  examAnswers: {},
  examIndex: 3,
  examRemaining: 39 * 60 + 12,
  reports: []
};

function readStoredData() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return { ...defaultData, ...stored };
  } catch (error) {
    return { ...defaultData };
  }
}

const state = {
  ...readStoredData(),
  route: 'home',
  wordFilter: 'all',
  wordSearch: '',
  selectedWordId: null,
  reportContext: 'quiz',
  examTimerHandle: null,
  toastHandle: null
};

const appMain = document.getElementById('appMain');
const modalLayer = document.getElementById('modalLayer');
const toastNode = document.getElementById('toast');
const mobileMenu = document.getElementById('mobileMenu');
const menuToggle = document.getElementById('menuToggle');

function saveState() {
  const snapshot = { ...state };
  delete snapshot.route;
  delete snapshot.wordFilter;
  delete snapshot.wordSearch;
  delete snapshot.selectedWordId;
  delete snapshot.reportContext;
  delete snapshot.examTimerHandle;
  delete snapshot.toastHandle;
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot)); } catch (error) { /* storage can be disabled */ }
}

function escapeHTML(value) {
  return String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
}

function getWord(id) { return words.find(word => word.id === id) || words[0]; }
function isFavorite(id) { return state.favorites.includes(id); }
function isKnown(id) { return state.knownWords.includes(id); }
function wordStatus(id) { return isKnown(id) ? 'Выучено' : 'Изучаю'; }
function percent(part, total) { return total ? Math.round((part / total) * 100) : 0; }

function showToast(message) {
  toastNode.textContent = message;
  toastNode.classList.add('visible');
  window.clearTimeout(state.toastHandle);
  state.toastHandle = window.setTimeout(() => toastNode.classList.remove('visible'), 2500);
}

function setRoute(route) {
  const allowed = ['home', 'dictionary', 'flashcards', 'quiz', 'quizResults', 'examSetup', 'exam', 'examResults', 'profile'];
  state.route = allowed.includes(route) ? route : 'home';
  if (state.route !== 'exam') stopExamTimer();
  closeMobileMenu();
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function render() {
  const views = {
    home: renderHome,
    dictionary: renderDictionary,
    flashcards: renderFlashcards,
    quiz: renderQuiz,
    quizResults: renderQuizResults,
    examSetup: renderExamSetup,
    exam: renderExam,
    examResults: renderExamResults,
    profile: renderProfile
  };
  appMain.innerHTML = views[state.route]();
  updateNavigation();
  if (state.route === 'exam') startExamTimer();
  else stopExamTimer();
}

function updateNavigation() {
  const routeGroup = state.route === 'home' ? 'home'
    : ['dictionary', 'flashcards', 'quiz', 'quizResults'].includes(state.route) ? 'dictionary'
      : ['examSetup', 'exam', 'examResults'].includes(state.route) ? 'examSetup' : 'profile';

  document.querySelectorAll('[data-route]').forEach(button => {
    const isPracticeTab = button.closest('.practice-tabs');

    const active = isPracticeTab
      ? button.dataset.route === state.route ||
        (state.route === 'quizResults' && button.dataset.route === 'quiz')
      : button.dataset.route === routeGroup || button.dataset.route === state.route;

    button.classList.toggle('active', active);

    if (button.classList.contains('bottom-nav-item')) {
      button.setAttribute('aria-current', active ? 'page' : 'false');
    }
  });

  const avatar = document.querySelector('.avatar-button');

  if (avatar) {
    avatar.textContent = (state.name.trim()[0] || 'А').toUpperCase();
  }
}

function practiceTabs(active) {
  return `<div class="practice-tabs" role="tablist" aria-label="Разделы практики">
    <button type="button" role="tab" aria-selected="${active === 'dictionary'}" class="${active === 'dictionary' ? 'active' : ''}" data-route="dictionary">🕮 <span>Словарь</span></button>
    <button type="button" role="tab" aria-selected="${active === 'flashcards'}" class="${active === 'flashcards' ? 'active' : ''}" data-route="flashcards">□ <span>Флеш-карточки</span></button>
    <button type="button" role="tab" aria-selected="${active === 'quiz'}" class="${active === 'quiz' || active === 'quizResults' ? 'active' : ''}" data-route="quiz">☷ <span>Тест по словам</span></button>
  </div>`;
}

function pageHeading(title, subtitle, breadcrumb = '', badge = '') {
  return `<div class="page-heading">
    ${breadcrumb ? `<div class="breadcrumb"><button type="button" data-route="${breadcrumb === 'Экзамен' ? 'examSetup' : 'home'}">← ${escapeHTML(breadcrumb)}</button>${breadcrumb.includes('/') ? '' : ''}</div>` : ''}
    <h1>${title}${badge ? `<span class="topik-badge">${badge}</span>` : ''}</h1>
    ${subtitle ? `<p class="subtitle">${subtitle}</p>` : ''}
  </div>`;
}

function renderHabitDays(compact = false) {
  const dayLabels = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  const dayNumbers = ['27', '28', '29', '30', '31', '1', '2'];
  return `<div class="habit-days" aria-label="Трекер занятий на неделю">${dayLabels.map((day, index) => `
    <div class="habit-day"><span>${day}</span><button type="button" class="${state.completedDays[index] ? 'done' : ''} ${index === 4 ? 'today' : ''}" data-action="toggle-habit" data-day="${index}" aria-label="${day}: ${state.completedDays[index] ? 'занятие выполнено' : 'отметить занятие'}">${state.completedDays[index] ? '✓' : dayNumbers[index]}</button></div>`).join('')}</div>`;
}

function renderHome() {
  const habitCount = state.completedDays.filter(Boolean).length;
  const learnedProgress = Math.min(100, percent(state.learnedWords, 400));
  return `
    <div class="welcome-row">
      <p class="eyebrow">СРЕДА, 28 ОКТЯБРЯ</p>
      <h1>Привет, ${escapeHTML(state.name.split(' ')[0] || 'Пользователь')}!</h1>
      <p class="subtitle">Продолжим твой языковой путь?</p>
    </div>
    <div class="diary-layout">
      <section class="diary-main" aria-label="Мой языковой прогресс">
      
        <article class="goal-card">
          <span class="sparkle" aria-hidden="true"></span>
          <span class="soft-badge" style="align-self:flex-start;background:#fff">МОЯ ГЛАВНАЯ ЦЕЛЬ</span>
          <h2>TOPIK I 1급 - Аудирование</h2>
          <div class="goal-meta"><span>12 из 20 занятий</span><strong class="purple-text">60%</strong></div>
          <div class="progress-track"><div class="progress-fill" style="width:60%"></div></div>
          <div class="goal-bottom"><span>Далее: диалоги о еде</span><button type="button" data-route="examSetup">Продолжить&nbsp; →</button></div>
        </article>
        <div class="diary-stats">
          <article class="pink-card habit-card">
            <div class="section-label" style="margin:0"><strong>Мой ритм</strong><span class="purple-text small">🔥 ${habitCount} дней подряд</span></div>
            ${renderHabitDays()}
            <p class="muted xsmall" style="margin:0">Цель: 10 дней</p>
          </article>
          <article class="cream-card word-count-card">
            <div class="section-label" style="margin:0"><strong>Выученные слова</strong><span class="purple-text"></span></div>
            <div class="word-count-number"><strong>${state.learnedWords}</strong><span class="muted small">слов в копилке</span></div>
            <div class="progress-track"><div class="progress-fill" style="width:${learnedProgress}%"></div></div>
            <p class="muted xsmall" style="margin:10px 0 0">Цель: 400 слов</p>
          </article>
        </div>
        <section class="daily-section">
          <h2>Сегодня - ещё один шаг</h2>
          <div class="daily-actions">
            <button class="action-tile" type="button" data-route="flashcards"><span class="action-icon">♬</span><span><strong>Практика аудирования</strong><small>10 минут · повседневные диалоги</small></span><span class="action-arrow">↗</span></button>
            <button class="action-tile" type="button" data-route="examSetup"><span class="action-icon">✓</span><span><strong>Сдать экзамен</strong><small>TOPIK I · пробный тест</small></span><span class="action-arrow">↗</span></button>
          </div>
        </section>
      </section>
      <aside class="diary-sidebar">
        <article class="card language-card">
          <div class="language-heading"><h3 style="margin:0;font-weight:500">Мои языки</h3><span class="purple-text" aria-hidden="true">＋</span></div>
          <div class="language-row"><span class="flag" aria-hidden="true"></span><span><strong>Корейский</strong><span>TOPIK I · 1급</span></span><span class="language-percent">60%</span></div>
          <div class="progress-track" style="margin-top:13px"><div class="progress-fill" style="width:60%"></div></div>
        </article>
        <article class="soft-card encouragement">
          <h3>Твой огонёк горит не зря! </h3>
          <p class="muted" style="margin:0">Маленькие шаги каждый день ведут к большим победам.</p>
        </article>
      </aside>
    </div>`;
}

function renderWordCard(word) {
  const statusClass = isKnown(word.id) ? 'known' : 'learn';
  return `<article class="word-card card">
    <button class="word-open" type="button" data-action="open-word" data-word="${word.id}" aria-label="Открыть слово ${word.korean}">
      <span class="word-card-top"><strong class="word-korean">${word.korean}</strong><span class="word-roman">${word.roman}</span></span>
      <span class="word-translation">${word.translation}</span>
    </button>
    <div class="word-card-bottom"><span>${word.category} · ${word.level}</span><span class="status-badge ${statusClass}">${wordStatus(word.id)}</span><button type="button" class="sound-mini" data-action="speak" data-word="${word.id}" aria-label="Прослушать ${word.korean}">◖))</button></div>
  </article>`;
}

function filteredWords() {
  const search = state.wordSearch.trim().toLocaleLowerCase('ru');
  return words.filter(word => {
    const matchesSearch = !search || [word.korean, word.roman, word.translation, word.category].some(value => value.toLocaleLowerCase('ru').includes(search));
    const matchesFilter = state.wordFilter === 'all' || (state.wordFilter === 'level1' && word.level === '1급') || (state.wordFilter === 'favorites' && isFavorite(word.id)) || (state.wordFilter === 'known' && isKnown(word.id));
    return matchesSearch && matchesFilter;
  });
}

function renderWordGrid() {
  const results = filteredWords();
  if (!results.length) return '<div class="empty-state">Ничего не найдено. Попробуй изменить запрос или фильтр.</div>';
  return results.map(renderWordCard).join('');
}

function renderDictionary() {
  return `${pageHeading('Словарь', 'Изучай новые слова, слушай произношение и возвращайся к знакомым.', 'Практика', 'TOPIK I · 1급')}
    <div class="practice-toolbar">${practiceTabs('dictionary')}<span class="streak-label">🔥 &nbsp;5 дней подряд</span></div>
    <div class="dictionary-layout">
      <section class="dictionary-main" aria-label="Список слов">
        <div class="search-row"><label class="search-box"><span class="search-icon" aria-hidden="true">⌕</span><input id="dictionarySearch" type="search" value="${escapeHTML(state.wordSearch)}" placeholder="Найти слово или перевод" aria-label="Найти слово или перевод"></label><button class="button button-secondary" type="button" data-action="sort-words">☷ &nbsp;По теме</button></div>
        <div class="filter-row" role="group" aria-label="Фильтры слов">
          <button type="button" class="filter-chip ${state.wordFilter === 'all' ? 'active' : ''}" data-filter="all">Все уровни</button>
          <button type="button" class="filter-chip ${state.wordFilter === 'level1' ? 'active' : ''}" data-filter="level1">1급 · Начальный</button>
          <button type="button" class="filter-chip ${state.wordFilter === 'known' ? 'active' : ''}" data-filter="known">Выучено</button>
          <button type="button" class="filter-chip ${state.wordFilter === 'favorites' ? 'active' : ''}" data-filter="favorites">Избранное</button>
          <span class="filter-count">248 слов</span>
        </div>
        <div id="wordGrid" class="word-grid">${renderWordGrid()}</div>
        <div class="pagination"><span style="margin-right:auto">Показано ${filteredWords().length} из 248 слов</span><button type="button" aria-label="Предыдущая страница">‹</button><button class="current" type="button">1</button><button type="button" data-action="next-page">2</button><button type="button">3</button><span>…</span><button type="button">42</button><button type="button" aria-label="Следующая страница" data-action="next-page">›</button></div>
      </section>
      <aside class="dictionary-sidebar">
        <article class="card card-pad daily-words"><h3>Слова на сегодня <span class="purple-text" style="float:right"></span></h3><div><strong>6</strong> <span class="muted">из 10 слов повторено</span></div><div class="progress-track" style="margin:12px 0 9px"><div class="progress-fill" style="width:60%"></div></div><p class="muted xsmall" style="margin:0">Ещё 4 слова — и цель достигнута!</p></article>
        <article class="soft-card"><h3>Слово за словом</h3><p class="muted small" style="margin:0">Нажми на слово, чтобы увидеть примеры.</p></article>
      </aside>
    </div>`;
}

function renderFlashcards() {
  const word = getWord(words[state.flashIndex % words.length].id);
  const position = state.flashIndex + 1;
  const complete = state.flashIndex >= words.length;
  return `${pageHeading('Флеш-карточки', 'Вспомни перевод, переверни карточку и оцени, насколько хорошо знаешь слово.', 'Практика', 'TOPIK I · 1급')}
    <div class="practice-toolbar">${practiceTabs('flashcards')}<span class="streak-label">🔥 &nbsp;5 дней подряд</span></div>
    <div class="study-layout">
      <section class="study-main">
        <div class="study-progress"><span>Карточка ${Math.min(position, words.length)} из ${words.length}</span><span>${complete ? 'Повторение завершено' : `${percent(position, words.length)}%`}</span></div>
        <div class="progress-track"><div class="progress-fill" style="width:${Math.min(100, percent(position, words.length))}%"></div></div>
        <article class="flash-card card">
          <span class="flash-card-top soft-badge">1급 · ${word.category}</span>
          <div class="flash-card-actions"><button type="button" class="icon-button" data-action="favorite-word" data-word="${word.id}" aria-label="Добавить в избранное">${isFavorite(word.id) ? '★' : '☆'}</button><button type="button" class="icon-button" data-action="speak" data-word="${word.id}" aria-label="Прослушать">◖))</button></div>
          <strong class="word-korean">${word.korean}</strong>
          <span class="word-roman">${word.roman}</span>
          ${state.flashFlipped ? `<div class="word-translation">${word.translation}</div><p class="flash-example">${word.examples[0].ko}</p><p class="muted small">${word.examples[0].ru}</p>` : ''}
          <button type="button" class="flash-flip" data-action="flip">${state.flashFlipped ? '↻ Ответ открыт · Перевернуть' : 'Ответ скрыт · Нажми, чтобы перевернуть'}</button>
        </article>
        <div class="flash-rating"><p class="muted small" style="margin-bottom:5px">Насколько хорошо ты помнишь это слово?</p><div class="rating-actions"><button type="button" class="button button-pink" data-action="flash-again">↻ &nbsp;Не помню</button><button type="button" class="button button-soft" data-action="flash-easy">✓ &nbsp;Легко</button></div>
          <div class="section-label"><button class="text-button" type="button" data-action="flash-previous">← Предыдущая карточка</button><button class="text-button muted" type="button" data-action="finish-flash">Завершить повторение</button></div>
        </div>
      </section>
      <aside class="study-sidebar">
        <article class="card card-pad"><h3>В этой тренировке</h3><div class="tally-grid"><div class="tally-box"><strong>${state.flashEasy}</strong><span class="muted small">Легко</span></div><div class="tally-box pink"><strong>${state.flashAgain}</strong><span class="muted small">Не помню</span></div></div><p class="muted xsmall" style="margin:0">Осталось разобрать ${Math.max(0, words.length - state.flashEasy - state.flashAgain)} карточек</p></article>
        <article class="soft-card"><h3>Ошибаться — нормально</h3><p class="muted small" style="margin:0">Забытые слова вернутся в повторение. Дай памяти немного времени.</p></article>
      </aside>
    </div>`;
}

function currentQuizQuestion() { return quizQuestions[Math.min(state.quizIndex, quizQuestions.length - 1)]; }
function quizScore() {
  return quizQuestions.reduce((total, question, index) => total + (state.quizAnswers[index] === getWord(question.wordId).translation ? 1 : 0), 0);
}
function resetQuiz() {
  state.quizAnswers = {};
  state.quizIndex = 0;
  state.quizChecked = false;
  state.quizFinished = false;
  saveState();
  setRoute('quiz');
}

function renderQuiz() {
  const question = currentQuizQuestion();
  const word = getWord(question.wordId);
  const selected = state.quizAnswers[state.quizIndex] || '';
  const checked = state.quizChecked;
  const answeredCount = Object.keys(state.quizAnswers).length;
  return `${pageHeading('Тест по словам', 'Проверь, какие слова уже запомнились. Всего 10 вопросов — без спешки и оценок.', 'Практика', 'TOPIK I · 1급')}
    <div class="practice-toolbar">${practiceTabs('quiz')}<span class="streak-label">🔥 &nbsp;5 дней подряд</span></div>
    <div class="quiz-layout">
      <section class="quiz-main card" aria-label="Вопрос теста">
        <div class="quiz-meta"><strong class="purple-text">Вопрос ${state.quizIndex + 1} из 10</strong><span class="muted">Один правильный ответ</span></div>
        <div class="progress-track"><div class="progress-fill" style="width:${percent(state.quizIndex + 1, 10)}%"></div></div>
        <div class="quiz-word-panel"><div><h3 class="quiz-question">Как переводится это слово?</h3><p class="muted small" style="margin:0">Вспомни значение и выбери вариант ниже.</p></div><div style="display:flex;align-items:center;gap:10px"><div style="text-align:center"><strong class="word-korean">${word.korean}</strong><div class="word-roman">${word.roman}</div></div><button type="button" class="icon-button" data-action="speak" data-word="${word.id}" aria-label="Прослушать слово">◖))</button></div></div>
        <p class="muted small">Выбери правильный перевод на русский</p>
        <div class="option-grid">${question.options.map((option, index) => {
          let className = selected === option ? 'selected' : '';
          if (checked && option === word.translation) className += ' correct';
          else if (checked && selected === option && selected !== word.translation) className += ' incorrect';
          return `<button type="button" class="answer-option ${className}" data-action="select-quiz-answer" data-answer="${escapeHTML(option)}" ${checked ? 'disabled' : ''}><span class="option-number">${index + 1}</span><span class="option-copy">${option}</span><span class="option-mark"></span></button>`;
        }).join('')}</div>
        <p class="feedback-line ${checked ? (selected === word.translation ? 'good' : 'bad') : ''}" aria-live="polite">${checked ? (selected === word.translation ? '✓ Верно! Отличная работа.' : `Правильный ответ: ${word.translation}. Продолжим тренировку!`) : (selected ? `Выбран ответ: ${question.options.indexOf(selected) + 1}.` : '')}</p>
        <div class="quiz-actions"><button type="button" class="button button-secondary" data-action="quiz-back" ${state.quizIndex === 0 ? 'disabled' : ''}>← &nbsp;Назад</button><div class="quiz-actions-right"><button type="button" class="text-button muted" data-action="quiz-skip">Пропустить</button><button type="button" class="button" data-action="${checked ? 'quiz-next' : 'quiz-check'}" ${!checked && !selected ? 'disabled' : ''}>${checked ? (state.quizIndex === 9 ? 'Завершить' : 'Далее') : 'Проверить ответ'} &nbsp;→</button></div></div>
      </section>
      <aside class="quiz-sidebar">
        <article class="card card-pad"><div class="section-label" style="margin:0"><h3 style="margin:0">Твой прогресс</h3><span class="muted small">${answeredCount}/10</span></div><div class="question-grid">${quizQuestions.map((item, index) => `<button type="button" class="${state.quizIndex === index ? 'current' : (state.quizAnswers[index] ? 'answered' : '')}" data-action="quiz-jump" data-index="${index}" aria-label="Вопрос ${index + 1}">${index + 1}</button>`).join('')}</div><button type="button" class="button button-soft button-full" data-action="open-report">⚑ &nbsp;Ошибка в вопросе</button><button type="button" class="text-button button-full" data-action="quiz-finish">Завершить тест</button></article>
        <article class="soft-card"><h3>Не спеши, ты справишься</h3><p class="muted small" style="margin:0">Здесь нет таймера. Вспоминай слова в своём ритме.</p></article>
      </aside>
    </div>`;
}

function renderQuizResults() {
  const score = quizScore();
  const missed = quizQuestions.filter((question, index) => state.quizAnswers[index] !== getWord(question.wordId).translation);
  return `<div class="results-wrap card">
    <div class="mascot" aria-hidden="true"></div><span class="soft-badge">Отличная работа!</span>
    <h1 style="margin-top:10px">Результаты теста</h1><div class="result-score">${score} из 10</div>
    <p class="muted">${percent(score, 10)}% верных ответов. Котик гордится тобой!</p>
    <div class="result-stats"><div class="result-stat"><strong>${score}</strong><span>Верно</span></div><div class="result-stat"><strong>${10 - score}</strong><span>Ошибки</span></div><div class="result-stat"><strong>2:34</strong><span>Время</span></div></div>
    <article class="cream-card" style="text-align:left;margin-bottom:18px"><strong>Закрепим сложные слова?</strong><p class="muted small" style="margin:5px 0 0">${missed.length ? missed.map(q => `${getWord(q.wordId).korean} — ${getWord(q.wordId).translation}`).join(' · ') : 'Все слова отвечены верно. Так держать!'}</p></article>
    <div class="result-actions"><button class="button" type="button" data-action="repeat-quiz">↻ &nbsp;Повторить тест</button><button class="button button-secondary" type="button" data-route="dictionary">Вернуться в словарь</button></div>
  </div>`;
}

function renderExamSetup() {
  const categoryI = state.selectedCategory === 'I';
  return `${pageHeading('Выбор уровня и пробников', 'Выбери свою цель и попробуй силы в формате настоящего TOPIK.', 'Экзамен')}
    <div class="exam-setup-layout">
      <section>
        <div class="section-label"><h3 style="margin:0">1. Выбери категорию и уровень</h3><span class="muted small">Твоя цель: ${state.selectedLevel}급</span></div>
        <div class="level-grid">
          <article class="level-card ${categoryI ? 'selected' : ''}">
            <div class="level-card-title" data-action="select-category" data-category="I" tabindex="0" role="button" aria-pressed="${categoryI}"><div><h3>TOPIK I ${categoryI ? '<span class="purple-text small">Выбрано</span>' : ''}</h3><p class="muted small" style="margin:0">Начальный и базовый корейский</p></div><span class="radio-dot"></span></div>
            <div class="level-selector"><button type="button" class="${state.selectedLevel === 1 && categoryI ? 'selected' : ''}" data-action="select-level" data-level="1" data-category="I">1급 ${state.selectedLevel === 1 && categoryI ? '✓' : ''}</button><button type="button" class="${state.selectedLevel === 2 && categoryI ? 'selected' : ''}" data-action="select-level" data-level="2" data-category="I">2급</button></div>
            <p class="muted xsmall" style="margin:0">Аудирование и чтение · 100 минут</p>
          </article>
          <article class="level-card ${!categoryI ? 'selected' : ''}">
            <div class="level-card-title" data-action="select-category" data-category="II" tabindex="0" role="button" aria-pressed="${!categoryI}"><div><h3>TOPIK II ${!categoryI ? '<span class="purple-text small">Выбрано</span>' : ''}</h3><p class="muted small" style="margin:0">От среднего до продвинутого уровня</p></div><span class="radio-dot"></span></div>
            <div class="level-selector">${[3,4,5,6].map(level => `<button type="button" class="${state.selectedLevel === level && !categoryI ? 'selected' : ''}" data-action="select-level" data-level="${level}" data-category="II">${level}급</button>`).join('')}</div>
            <p class="muted xsmall" style="margin:0">Аудирование, письмо и чтение · 180 минут</p>
          </article>
        </div>
        <div class="section-label"><h3 style="margin:0">2. Выбери пробник <span class="topik-badge">TOPIK ${state.selectedCategory} · ${state.selectedLevel}급</span></h3><span class="muted small">3 пробника</span></div>
        <div class="mock-grid">
          ${[1,2,3].map(number => `<article class="mock-card ${state.selectedMock === number ? 'selected' : ''}">
            ${number === 1 ? '<span class="recommend-badge">Рекомендуем</span>' : number === 2 ? '<span class="recommend-badge" style="color:#956d00;background:#fbf2dc">Новая попытка</span>' : '<span class="recommend-badge" style="color:#3b8558;background:#e9f4ed">Пройден · 124/200</span>'}
            <h3>Пробник № ${number}</h3><p class="muted small">${number === 1 ? 'Первый шаг к экзамену' : number === 2 ? 'Закрепи уверенность' : 'Проверь свой прогресс'}</p>
            <div class="mock-meta"><span>◷ &nbsp;100 мин</span><span>70 заданий</span></div>
            <button type="button" class="button ${state.selectedMock === number ? 'button-soft' : 'button-secondary'}" data-action="select-mock" data-mock="${number}">${state.selectedMock === number ? '✓ &nbsp;Выбран' : number === 3 ? 'Пройти ещё раз' : 'Выбрать пробник'}</button>
          </article>`).join('')}
        </div>
        <p class="muted xsmall" style="margin-top:13px"> Все пробники TOPIK I включают уровни 1급 и 2급.</p>
      </section>
      <aside class="exam-sidebar">
        <article class="card exam-summary"><div class="section-label" style="margin:0"><h3 style="margin:0">Твой пробный экзамен</h3><span class="purple-text">▣</span></div><div class="exam-summary-highlight"><span class="purple-text xsmall">TOPIK ${state.selectedCategory} · цель ${state.selectedLevel}급</span><h3 style="margin:8px 0">Пробник № ${state.selectedMock}</h3><p class="muted small" style="margin:0">Аудирование · ${categoryI ? '30' : '50'} заданий<br>Чтение · ${categoryI ? '40' : '50'} заданий</p></div><div class="section-label"><span class="muted small">Для уровня ${state.selectedLevel}급</span><strong>от 80 / 200 баллов</strong></div><button type="button" class="button button-full" data-action="start-exam">Начать пробник &nbsp;→</button><p class="muted xsmall" style="text-align:center;margin:11px 0 0">100 минут · результат и разбор в конце</p></article>
        <article class="soft-card"><h3>Всё начинается с попытки</h3><p class="muted small" style="margin:0">Подготовь наушники и найди тихое место. У тебя получится!</p></article>
      </aside>
    </div>`;
}

function formatTime(seconds) {
  const safe = Math.max(0, seconds);
  const mins = Math.floor(safe / 60);
  const secs = safe % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function currentExamQuestion() { return examQuestions[state.examIndex % examQuestions.length]; }

function renderExam() {
  const question = currentExamQuestion();
  const selected = state.examAnswers[state.examIndex];
  const completed = Object.keys(state.examAnswers).length;
  const bars = Array.from({ length: 34 }, (_, index) => 12 + ((index * 17 + 21) % 35));
  return `<div class="page-heading"><div class="breadcrumb"><button type="button" data-route="examSetup">← Экзамены / TOPIK ${state.selectedCategory} / Аудирование</button></div><h1>TOPIK ${state.selectedCategory} ${state.selectedLevel}급 - Аудирование <span class="topik-badge">Пробный экзамен</span></h1></div>
    <div class="exam-runner-layout">
      <section class="exam-question-panel">
        <div class="quiz-meta"><strong class="purple-text">Задание ${state.examIndex + 1} из 30</strong><span class="muted">Один правильный ответ</span></div>
        <div class="progress-track"><div class="progress-fill" style="width:${percent(state.examIndex + 1, 30)}%"></div></div>
        <div class="audio-panel"><div class="audio-top"><strong><span class="purple-text">♬</span> &nbsp;${question.audio}</strong><span class="soft-badge">Прослушано 1/2</span></div><div style="display:flex;align-items:center;gap:18px"><button type="button" class="play-button" data-action="play-audio" aria-label="Воспроизвести аудио">▶</button><div class="audio-wave" aria-hidden="true">${bars.map(height => `<span style="height:${height}px"></span>`).join('')}</div></div><div class="audio-controls"><span>00:07</span><span>00:18</span></div></div>
        <h2 class="exam-question-title">${question.prompt}</h2><p class="muted">${question.hint}</p>
        <div class="exam-answers">${question.options.map((option, index) => `<button class="exam-answer ${selected === index ? 'selected' : ''}" type="button" data-action="select-exam-answer" data-answer="${index}"><span class="option-number">${index + 1}</span><span>${option}</span><span style="margin-left:auto;color:var(--purple)">${selected === index ? '●' : '○'}</span></button>`).join('')}</div>
        <div class="quiz-actions"><button type="button" class="button button-secondary" data-action="exam-previous" ${state.examIndex === 0 ? 'disabled' : ''}>← &nbsp;Назад</button><div class="quiz-actions-right"><span class="muted small">${selected === undefined ? 'Ответ не выбран' : `Выбран ответ ${selected + 1}`}</span><button type="button" class="button" data-action="exam-next">${state.examIndex === 29 ? 'Завершить' : 'Ответить и далее'} &nbsp;→</button></div></div>
      </section>
      <aside class="exam-side-stack">
        <article class="timer-card"><span class="muted small">◷ &nbsp;Осталось времени</span><strong class="timerValue">${formatTime(state.examRemaining)}</strong></article>
        <article class="card exam-map"><div class="section-label" style="margin:0"><h3 style="margin:0;font-weight:500">Карта заданий</h3><span class="muted small">${completed}/30 готово</span></div><div class="question-grid">${Array.from({ length: 30 }, (_, index) => `<button type="button" class="${state.examIndex === index ? 'current' : (state.examAnswers[index] !== undefined ? 'answered' : '')}" data-action="exam-jump" data-index="${index}">${index + 1}</button>`).join('')}</div><p class="muted xsmall">ⓘ Ответы можно изменить до завершения</p><button class="button button-soft button-full" type="button" data-action="open-report">⚑ &nbsp;Ошибка в вопросе</button><button class="text-button button-full" type="button" data-action="finish-exam">Завершить тест</button></article>
      </aside>
    </div>`;
}

function startExamTimer() {
  if (state.examTimerHandle) return;
  state.examTimerHandle = window.setInterval(() => {
    if (state.route !== 'exam') return stopExamTimer();
    state.examRemaining = Math.max(0, state.examRemaining - 1);
    const timer = document.querySelector('.timerValue');
    if (timer) timer.textContent = formatTime(state.examRemaining);
    if (state.examRemaining <= 0) finishExam();
  }, 1000);
}

function stopExamTimer() {
  if (state.examTimerHandle) {
    window.clearInterval(state.examTimerHandle);
    state.examTimerHandle = null;
  }
}

function finishExam() {
  stopExamTimer();
  saveState();
  setRoute('examResults');
}

function examScore() {
  const correctByQuestion = [0, 1, 2, 0, 1];
  let score = 0;
  Object.entries(state.examAnswers).forEach(([index, answer]) => {
    if (answer === correctByQuestion[Number(index) % correctByQuestion.length]) score += 1;
  });
  return score;
}

function renderExamResults() {
  const answered = Object.keys(state.examAnswers).length;
  const correct = examScore();
  const points = Math.round((correct / 30) * 200);
  return `<div class="results-wrap card"><div class="mascot" aria-hidden="true">🎓</div><span class="soft-badge">Пробный экзамен завершён</span><h1 style="margin-top:10px">Результаты TOPIK ${state.selectedCategory}</h1><div class="result-score">${points} / 200</div><p class="muted">Пробник № ${state.selectedMock} · уровень ${state.selectedLevel}급</p><div class="result-stats"><div class="result-stat"><strong>${correct}</strong><span>Верно</span></div><div class="result-stat"><strong>${30 - correct}</strong><span>Ошибки</span></div><div class="result-stat"><strong>${answered}/30</strong><span>Отвечено</span></div></div><p class="muted">${points >= 80 ? 'Хороший результат! Продолжай закреплять знания.' : 'Это только тренировка. Разбери ошибки и попробуй ещё раз.'}</p><div class="result-actions"><button type="button" class="button" data-action="restart-exam">↻ &nbsp;Пройти ещё раз</button><button type="button" class="button button-secondary" data-route="examSetup">К выбору пробников</button></div></div>`;
}

function renderProfile() {
  const habitCount = state.completedDays.filter(Boolean).length;
  const initials = state.name.split(/\s+/).map(part => part[0]).slice(0, 2).join('').toUpperCase() || 'А';
  return `${pageHeading('Твой профиль', 'TOPIK I · 1급')}
    <div class="profile-layout">
      <aside class="profile-left">
        <article class="card profile-card"><div class="profile-avatar"><div class="profile-avatar-circle">${escapeHTML(initials)}</div><div><h3 style="margin:0">${escapeHTML(state.name)}</h3><p class="muted xsmall" style="margin:3px 0 0">С нами с сентября 2026</p></div></div><span class="soft-badge">Любознательный исследователь</span><div class="language-row" style="margin:14px 0 9px"><span>🇰🇷</span><span><strong style="font-weight:500">Корейский</strong></span><span class="language-percent">1급 · 60%</span></div><div class="progress-track"><div class="progress-fill" style="width:60%"></div></div><button class="button button-secondary button-full" style="margin-top:13px" type="button" data-action="edit-profile">✎ &nbsp;Редактировать профиль</button></article>
        <article class="pink-card"><div style="display:flex;align-items:center;gap:12px"><span class="action-icon" style="background:#fff">🔥</span><div><strong style="font-size:25px">${habitCount} дней</strong><div class="muted small">Стрик дней</div></div></div>${renderHabitDays()}<div class="progress-track"><div class="progress-fill" style="width:${Math.min(100, habitCount * 10)}%"></div></div><p class="muted small" style="margin:11px 0 0">До цели в 10 дней — половина пути. Продолжай в том же ритме!</p></article>
      </aside>
      <section>
        <div class="profile-stat-grid"><article class="profile-stat"><span class="small">Выучено слов</span><strong>${state.learnedWords}</strong><span class="muted xsmall">+32 за неделю</span></article><article class="profile-stat"><span class="small">Точность ответов</span><strong>86%</strong><span class="muted xsmall">+8% за месяц</span></article><article class="profile-stat"><span class="small">Время практики</span><strong>4,5 ч</strong><span class="muted xsmall">за этот месяц</span></article></div>
        <div class="profile-charts"><article class="card chart-card"><div class="section-label" style="margin:0"><h3 style="margin:0">Рост словарного запаса</h3><span class="soft-badge">За месяц</span></div><p class="muted xsmall" style="margin:8px 0 0">● Выученные слова · октябрь</p><svg class="chart-svg" viewBox="0 0 520 190" role="img" aria-label="График роста словарного запаса с 150 до 250 слов"><defs><linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#b889ff" stop-opacity=".25"/><stop offset="1" stop-color="#b889ff" stop-opacity=".04"/></linearGradient></defs><g stroke="#eee6f4" stroke-width="1"><path d="M35 24H505M35 68H505M35 112H505M35 156H505"/></g><g fill="#857e96" font-size="10"><text x="3" y="27">250</text><text x="3" y="71">200</text><text x="3" y="115">150</text><text x="35" y="180">1 окт</text><text x="150" y="180">7 окт</text><text x="265" y="180">14 окт</text><text x="380" y="180">21 окт</text><text x="474" y="180">28 окт</text></g><path d="M35 143 C70 139 80 125 115 126 S175 111 205 104 S245 105 275 86 S335 89 360 68 S410 70 440 51 S480 50 505 24 L505 156 L35 156Z" fill="url(#chartFill)"/><path d="M35 143 C70 139 80 125 115 126 S175 111 205 104 S245 105 275 86 S335 89 360 68 S410 70 440 51 S480 50 505 24" fill="none" stroke="#8a48f7" stroke-width="3" stroke-linecap="round"/><circle cx="505" cy="24" r="4" fill="#8a48f7" stroke="#fff" stroke-width="2"/></svg></article>
          <article class="card chart-card"><div class="section-label" style="margin:0"><h3 style="margin:0">Ритм занятий</h3><span class="purple-text">▥</span></div><p class="muted xsmall" style="margin:7px 0 0">Практика за неделю · минуты</p><div class="bar-chart">${[18,25,15,30,22,3,3].map((value, index) => `<div class="bar-col"><span>${value > 3 ? value : '—'}</span><div class="bar" style="height:${Math.max(4, value * 3)}px"></div><span>${['Пн','Вт','Ср','Чт','Пт','Сб','Вс'][index]}</span></div>`).join('')}</div></article></div>
        <article class="card achievements"><div class="section-label" style="margin:0"><h3 style="margin:0">Твои достижения</h3><span class="muted xsmall">3 из 12 открыто</span></div><div class="achievement-grid"><div class="achievement"><div class="medal"></div><strong>Первый шаг</strong><small>Первое занятие позади</small></div><div class="achievement"><div class="medal"></div><strong>Собиратель слов</strong><small>100 слов в копилке</small></div><div class="achievement"><div class="medal"></div><strong>В ритме</strong><small>5 дней практики подряд</small></div><div class="achievement"><div class="medal"></div><strong>Знаток слов</strong><small>Выучи 500 слов · ${state.learnedWords}/500</small></div></div></article>
      </section>
    </div>`;
}

function openWordModal(wordId) {
  const word = getWord(wordId);
  state.selectedWordId = word.id;
  modalLayer.innerHTML = `<div class="modal-backdrop" data-action="backdrop-close"><section class="modal" role="dialog" aria-modal="true" aria-labelledby="wordModalTitle"><div class="modal-header"><div><p class="eyebrow">TOPIK I · ${word.level}</p><h2 id="wordModalTitle" style="margin:0">Детали слова</h2></div><button type="button" class="modal-close" data-action="close-modal" aria-label="Закрыть">×</button></div><div class="modal-word"><strong class="word-korean">${word.korean}</strong><p class="muted small" style="margin:0">${word.roman}</p><h3 style="margin:8px 0 2px">${word.translation}</h3><p class="muted xsmall" style="margin:0">${word.type}</p></div><div class="section-label"><strong>Слово в контексте</strong><span class="muted xsmall">${word.category} · ${word.level}</span></div>${word.examples.map((example, index) => `<article class="soft-card" style="margin:8px 0;padding:13px 15px"><strong>${index + 1}. ${example.ko}</strong><p class="muted small" style="margin:4px 0 0">${example.ru}</p></article>`).join('')}<div style="display:grid;gap:9px;margin-top:16px"><button type="button" class="button button-full" data-action="mark-known" data-word="${word.id}">${isKnown(word.id) ? '✓ Уже выучено' : '✓ Повторить слово'}</button><button type="button" class="button button-secondary button-full" data-action="favorite-word" data-word="${word.id}">${isFavorite(word.id) ? '★ В избранном' : '☆ В избранное'}</button><button type="button" class="button button-secondary button-full" data-action="speak" data-word="${word.id}">◖)) &nbsp;Прослушать произношение</button></div></section></div>`;
}

function openEditProfileModal() {
  modalLayer.innerHTML = `<div class="modal-backdrop" data-action="backdrop-close"><section class="modal" role="dialog" aria-modal="true" aria-labelledby="editProfileTitle"><div class="modal-header"><div><p class="eyebrow">Мой аккаунт</p><h2 id="editProfileTitle" style="margin:0">Редактировать профиль</h2></div><button type="button" class="modal-close" data-action="close-modal" aria-label="Закрыть">×</button></div><form data-form="profile"><div class="modal-field"><label for="profileName">Твоё имя</label><input id="profileName" name="name" value="${escapeHTML(state.name)}" maxlength="50" required></div><button class="button button-full" type="submit">Сохранить изменения</button></form></section></div>`;
  document.getElementById('profileName')?.focus();
}

function openReportModal() {
  modalLayer.innerHTML = `<div class="modal-backdrop" data-action="backdrop-close"><section class="modal" role="dialog" aria-modal="true" aria-labelledby="reportTitle"><div class="modal-header"><div><p class="eyebrow">${state.reportContext === 'exam' ? 'Пробный экзамен' : 'Тест по словам'}</p><h2 id="reportTitle" style="margin:0">Ошибка в вопросе</h2></div><button type="button" class="modal-close" data-action="close-modal" aria-label="Закрыть">×</button></div><p class="muted small">Спасибо за внимательность! Помоги нам стать лучше.</p><form data-form="report"><div class="modal-field"><label>Что случилось? *</label><div class="radio-list"><label><input type="radio" name="reason" value="Ошибка в переводе" required> Ошибка в переводе</label><label><input type="radio" name="reason" value="Проблема со звуком"> Проблема со звуком</label><label><input type="radio" name="reason" value="Другое"> Другое</label></div></div><div class="modal-field"><label for="reportDetails">Расскажи подробнее *</label><textarea id="reportDetails" name="details" maxlength="1000" required placeholder="Опиши, что именно нужно проверить..."></textarea><span class="muted xsmall">До 1000 символов</span></div><div class="modal-field"><label for="reportFile">Прикрепить скриншот (необязательно)</label><input id="reportFile" name="file" type="file" accept="image/png,image/jpeg"><span class="muted xsmall">PNG, JPG · до 10 МБ</span></div><label class="small"><input type="checkbox" name="notify" checked> Сообщить мне, когда ошибка будет исправлена</label><button class="button button-full" style="margin-top:16px" type="submit">Отправить сообщение</button></form></section></div>`;
}

function speakWord(wordId) {
  const word = getWord(wordId);
  if ('speechSynthesis' in window && 'SpeechSynthesisUtterance' in window) {
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word.korean);
      utterance.lang = 'ko-KR';
      utterance.rate = 0.82;
      window.speechSynthesis.speak(utterance);
      showToast(`Произношение: ${word.korean}`);
    } catch (error) {
      showToast('Озвучивание недоступно в этом браузере.');
    }
  } else {
    showToast('В этом браузере нет функции озвучивания.');
  }
}

function closeModal() {
  modalLayer.innerHTML = '';
  state.selectedWordId = null;
}

function closeMobileMenu() {
  mobileMenu.hidden = true;
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Открыть меню');
}

function advanceFlash(rating) {
  if (rating === 'easy') {
    state.flashEasy += 1;
    const word = words[state.flashIndex % words.length];
    if (!isKnown(word.id)) {
      state.knownWords.push(word.id);
      state.learnedWords += 1;
    }
  } else {
    state.flashAgain += 1;
  }
  state.flashIndex = (state.flashIndex + 1) % words.length;
  state.flashFlipped = false;
  saveState();
  render();
}

function resetExam() {
  state.examIndex = 3;
  state.examAnswers = { 0: 0, 1: 1, 2: 0 };
  state.examRemaining = 39 * 60 + 12;
  saveState();
  setRoute('exam');
}

function handleAction(action, element, clickEvent) {
  switch (action) {
    case 'open-word': openWordModal(element.dataset.word); break;
    case 'close-modal': closeModal(); break;
    case 'backdrop-close': if (clickEvent && element === clickEvent.target) closeModal(); break;
    case 'speak': speakWord(element.dataset.word); break;
    case 'language-info': showToast('Сейчас в MioLang доступен корейский язык.'); break;
    case 'toggle-habit': {
      const day = Number(element.dataset.day);
      state.completedDays[day] = !state.completedDays[day];
      saveState(); render(); break;
    }
    case 'favorite-word': {
      const id = element.dataset.word;
      state.favorites = isFavorite(id) ? state.favorites.filter(item => item !== id) : [...state.favorites, id];
      saveState();
      if (state.selectedWordId) openWordModal(id); else render();
      showToast(isFavorite(id) ? 'Добавлено в избранное' : 'Удалено из избранного');
      break;
    }
    case 'mark-known': {
      const id = element.dataset.word;
      if (!isKnown(id)) { state.knownWords.push(id); state.learnedWords += 1; }
      saveState(); closeModal(); render(); showToast('Слово отмечено как выученное'); break;
    }
    case 'sort-words': state.wordFilter = 'all'; state.wordSearch = ''; render(); showToast('Список слов отсортирован по теме'); break;
    case 'next-page': showToast('В демонстрационном словаре показаны 6 примеров слов.'); break;
    case 'flip': state.flashFlipped = !state.flashFlipped; render(); break;
    case 'flash-easy': advanceFlash('easy'); break;
    case 'flash-again': advanceFlash('again'); break;
    case 'flash-previous': state.flashIndex = Math.max(0, state.flashIndex - 1); state.flashFlipped = false; saveState(); render(); break;
    case 'finish-flash': state.flashIndex = 0; state.flashFlipped = false; saveState(); setRoute('dictionary'); showToast('Повторение завершено. Молодец!'); break;
    case 'select-quiz-answer': if (!state.quizChecked) { state.quizAnswers[state.quizIndex] = element.dataset.answer; saveState(); render(); } break;
    case 'quiz-check': {
      if (!state.quizAnswers[state.quizIndex]) { showToast('Сначала выбери вариант ответа.'); break; }
      state.quizChecked = true; saveState(); render(); break;
    }
    case 'quiz-next':
      if (state.quizIndex >= 9) { state.quizFinished = true; saveState(); setRoute('quizResults'); }
      else { state.quizIndex += 1; state.quizChecked = false; saveState(); render(); }
      break;
    case 'quiz-back': state.quizIndex = Math.max(0, state.quizIndex - 1); state.quizChecked = Boolean(state.quizAnswers[state.quizIndex]); saveState(); render(); break;
    case 'quiz-skip': if (state.quizIndex >= 9) { state.quizFinished = true; saveState(); setRoute('quizResults'); } else { state.quizIndex += 1; state.quizChecked = false; saveState(); render(); } break;
    case 'quiz-jump': state.quizIndex = Number(element.dataset.index); state.quizChecked = Boolean(state.quizAnswers[state.quizIndex]); saveState(); render(); break;
    case 'quiz-finish': state.quizFinished = true; saveState(); setRoute('quizResults'); break;
    case 'repeat-quiz': resetQuiz(); break;
    case 'open-report': state.reportContext = state.route === 'exam' ? 'exam' : 'quiz'; openReportModal(); break;
    case 'select-category': state.selectedCategory = element.dataset.category; state.selectedLevel = state.selectedCategory === 'I' ? 1 : 3; saveState(); render(); break;
    case 'select-level': state.selectedCategory = element.dataset.category; state.selectedLevel = Number(element.dataset.level); saveState(); render(); break;
    case 'select-mock': state.selectedMock = Number(element.dataset.mock); saveState(); render(); break;
    case 'start-exam': resetExam(); break;
    case 'select-exam-answer': state.examAnswers[state.examIndex] = Number(element.dataset.answer); saveState(); render(); break;
    case 'exam-previous': state.examIndex = Math.max(0, state.examIndex - 1); saveState(); render(); break;
    case 'exam-next': if (state.examIndex >= 29) finishExam(); else { state.examIndex += 1; saveState(); render(); } break;
    case 'exam-jump': state.examIndex = Number(element.dataset.index); saveState(); render(); break;
    case 'finish-exam': finishExam(); break;
    case 'restart-exam': resetExam(); break;
    case 'edit-profile': openEditProfileModal(); break;
    case 'play-audio': showToast('Демо аудиодорожка: пример диалога TOPIK.'); break;
    default: break;
  }
}

document.addEventListener('click', event => {
  const routeButton = event.target.closest('[data-route]');
  if (routeButton) {
    event.preventDefault();
    setRoute(routeButton.dataset.route);
    return;
  }

  const filterButton = event.target.closest('[data-filter]');
  if (filterButton) {
    state.wordFilter = filterButton.dataset.filter;
    render();
    return;
  }

  const actionElement = event.target.closest('[data-action]');
  if (actionElement) {
    handleAction(actionElement.dataset.action, actionElement, event);
    return;
  }
});

document.addEventListener('input', event => {
  if (event.target.id === 'dictionarySearch') {
    state.wordSearch = event.target.value;
    const grid = document.getElementById('wordGrid');
    if (grid) grid.innerHTML = renderWordGrid();
    const count = document.querySelector('.filter-count');
    if (count) count.textContent = `${filteredWords().length} слова`;
  }
});

document.addEventListener('submit', event => {
  const form = event.target;
  if (form.dataset.form === 'profile') {
    event.preventDefault();
    const name = new FormData(form).get('name').trim();
    if (!name) return showToast('Введи имя для профиля.');
    state.name = name;
    saveState();
    closeModal();
    render();
    showToast('Профиль обновлён');
  }
  if (form.dataset.form === 'report') {
    event.preventDefault();
    const data = new FormData(form);
    const file = data.get('file');
    if (file && file.size > 10 * 1024 * 1024) return showToast('Файл должен быть меньше 10 МБ.');
    state.reports.push({ context: state.reportContext, reason: data.get('reason'), details: data.get('details'), notify: data.has('notify'), date: new Date().toISOString() });
    saveState();
    closeModal();
    showToast('Спасибо! Сообщение об ошибке сохранено.');
  }
});

menuToggle.addEventListener('click', () => {
  const isOpen = !mobileMenu.hidden;
  mobileMenu.hidden = isOpen;
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Открыть меню' : 'Закрыть меню');
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closeModal();
    closeMobileMenu();
  }
  if ((event.key === 'Enter' || event.key === ' ') && event.target.matches('[data-action="select-category"], [data-action="select-mock"]')) {
    event.preventDefault();
    handleAction(event.target.dataset.action, event.target);
  }
});

render();
