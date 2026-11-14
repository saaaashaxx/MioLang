<div class="page-heading">
  <div class="breadcrumb"><button type="button" data-route="examSetup" class="active">← Экзамен</button></div>
  <h1>Выбор уровня и пробников</h1>
  <p class="subtitle">Выбери свою цель и попробуй силы в формате настоящего TOPIK.</p>
</div>
<div class="exam-setup-layout">
  <section>
    <div class="section-label">
      <h3 style="margin:0">1. Выбери категорию и уровень</h3><span class="muted small">Твоя цель: 1급</span>
    </div>
    <div class="level-grid">




    <?php foreach($exams as $exam) {?>
      <article class="level-card selected">
        <div class="level-card-title" data-action="select-category" data-category="I" tabindex="0" role="button" aria-pressed="true">
          <div>
            <h3><?= $exam->level->name ?> <span class="purple-text small">Выбрано</span></h3>
            <p class="muted small" style="margin:0"><?= $exam->title ?></p>
          </div><span class="radio-dot"></span>
        </div>
        <div class="level-selector"><button type="button" class="selected" data-action="select-level" data-level="1" data-category="I">1급 ✓</button><button type="button" class="" data-action="select-level" data-level="2" data-category="I">2급</button></div>
        <p class="muted xsmall" style="margin:0">Аудирование и чтение · <?= $exam->duration ?> минут</p>
        <p>
        <?= $exam->totalquestions ?>
        </p>
      </article>
    <?php } ?>












      <!-- <article class="level-card selected">
            <div class="level-card-title" data-action="select-category" data-category="I" tabindex="0" role="button" aria-pressed="true"><div><h3>TOPIK I <span class="purple-text small">Выбрано</span></h3><p class="muted small" style="margin:0">Начальный и базовый корейский</p></div><span class="radio-dot"></span></div>
            <div class="level-selector"><button type="button" class="selected" data-action="select-level" data-level="1" data-category="I">1급 ✓</button><button type="button" class="" data-action="select-level" data-level="2" data-category="I">2급</button></div>
            <p class="muted xsmall" style="margin:0">Аудирование и чтение · 100 минут</p>
          </article>
          <article class="level-card ">
            <div class="level-card-title" data-action="select-category" data-category="II" tabindex="0" role="button" aria-pressed="false"><div><h3>TOPIK II </h3><p class="muted small" style="margin:0">От среднего до продвинутого уровня</p></div><span class="radio-dot"></span></div>
            <div class="level-selector"><button type="button" class="" data-action="select-level" data-level="3" data-category="II">3급</button><button type="button" class="" data-action="select-level" data-level="4" data-category="II">4급</button><button type="button" class="" data-action="select-level" data-level="5" data-category="II">5급</button><button type="button" class="" data-action="select-level" data-level="6" data-category="II">6급</button></div>
            <p class="muted xsmall" style="margin:0">Аудирование, письмо и чтение · 180 минут</p>
          </article> -->
    </div>
    <div class="section-label">
      <h3 style="margin:0">Твои прошлые попытки <span class="topik-badge">TOPIK I · 1급</span></h3><span class="muted small">3 пробника</span>
    </div>
    <div class="mock-grid">
      <article class="mock-card selected">
        <span class="recommend-badge">Рекомендуем перепройти</span>
        <h3>Пробник № 1</h3>
        <p class="muted small">Проверь свой прогресс</p>
        <div class="mock-meta"><span>◷ &nbsp;100 мин</span><span>70 заданий</span></div>
        <button type="button" class="button button-soft" data-action="select-mock" data-mock="1">✓ &nbsp;Выбран</button>
      </article>
      <article class="mock-card ">
        <span class="recommend-badge" style="color:#956d00;background:#fbf2dc">Новая попытка</span>
        <h3>Пробник № 2</h3>
        <p class="muted small">Проверь свой прогресс</p>
        <div class="mock-meta"><span>◷ &nbsp;100 мин</span><span>70 заданий</span></div>
        <button type="button" class="button button-secondary" data-action="select-mock" data-mock="2">Пройти ещё раз</button>
      </article>
      <article class="mock-card ">
        <span class="recommend-badge" style="color:#3b8558;background:#e9f4ed">Пройден · 124/200</span>
        <h3>Пробник № 3</h3>
        <p class="muted small">Проверь свой прогресс</p>
        <div class="mock-meta"><span>◷ &nbsp;100 мин</span><span>70 заданий</span></div>
        <button type="button" class="button button-secondary" data-action="select-mock" data-mock="3">Пройти ещё раз</button>
      </article>
    </div>
    <p class="muted xsmall" style="margin-top:13px"> Все пробники TOPIK I включают уровни 1급 и 2급.</p>
  </section>
  <aside class="exam-sidebar">
    <article class="card exam-summary">
      <div class="section-label" style="margin:0">
        <h3 style="margin:0">Твой пробный экзамен</h3><span class="purple-text">▣</span>
      </div>
      <div class="exam-summary-highlight"><span class="purple-text xsmall">TOPIK I · цель 1급</span>
        <h3 style="margin:8px 0">Пробник № 1</h3>
        <p class="muted small" style="margin:0">Аудирование · 30 заданий<br>Чтение · 40 заданий</p>
      </div>
      <div class="section-label"><span class="muted small">Для уровня 1급</span><strong>от 80 / 200 баллов</strong></div><button type="button" class="button button-full" data-action="start-exam">Начать пробник &nbsp;→</button>
      <p class="muted xsmall" style="text-align:center;margin:11px 0 0">100 минут · результат и разбор в конце</p>
    </article>
    <article class="soft-card">
      <h3>Всё начинается с попытки</h3>
      <p class="muted small" style="margin:0">Подготовь наушники и найди тихое место. У тебя получится!</p>
    </article>
  </aside>
</div>