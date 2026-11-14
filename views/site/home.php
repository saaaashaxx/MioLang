<main >
    <div class="welcome-row">
      <p class="eyebrow">СРЕДА, 28 ОКТЯБРЯ</p>
      <h1>Привет, <?= Yii::$app->user->identity->username ?></h1>
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
          <?php use yii\helpers\Url; ?>

          <div class="goal-bottom">
    <span>Далее: диалоги о еде</span>
    <a href="<?= \yii\helpers\Url::to(['/site/dictionary']) ?>" style="text-decoration: none;" class="goal-continue-btn">
        <button type="button" style="cursor: pointer; background: none; border: none; font: inherit; color: inherit;">Продолжить&nbsp; →</button>
    </a>
</div>       </article>
        <div class="diary-stats">
          <article class="pink-card habit-card">
            <div class="section-label" style="margin:0"><strong>Мой ритм</strong><span class="purple-text small">🔥 7 дней подряд</span></div>
            <div class="habit-days" aria-label="Трекер занятий на неделю">
    <div class="habit-day"><span>Пн</span><button type="button" class="done " data-action="toggle-habit" data-day="0" aria-label="Пн: занятие выполнено">✓</button></div>
    <div class="habit-day"><span>Вт</span><button type="button" class="done " data-action="toggle-habit" data-day="1" aria-label="Вт: занятие выполнено">✓</button></div>
    <div class="habit-day"><span>Ср</span><button type="button" class="done " data-action="toggle-habit" data-day="2" aria-label="Ср: занятие выполнено">✓</button></div>
    <div class="habit-day"><span>Чт</span><button type="button" class="done " data-action="toggle-habit" data-day="3" aria-label="Чт: занятие выполнено">✓</button></div>
    <div class="habit-day"><span>Пт</span><button type="button" class="done today" data-action="toggle-habit" data-day="4" aria-label="Пт: занятие выполнено">✓</button></div>
    <div class="habit-day"><span>Сб</span><button type="button" class="done " data-action="toggle-habit" data-day="5" aria-label="Сб: занятие выполнено">✓</button></div>
    <div class="habit-day"><span>Вс</span><button type="button" class="done " data-action="toggle-habit" data-day="6" aria-label="Вс: занятие выполнено">✓</button></div></div>
            <p class="muted xsmall" style="margin:0">Цель: 10 дней</p>
          </article>
          <article class="cream-card word-count-card">
            <div class="section-label" style="margin:0"><strong>Выученные слова</strong><span class="purple-text"></span></div>
            <div class="word-count-number"><strong>248</strong><span class="muted small">слов в копилке</span></div>
            <div class="progress-track"><div class="progress-fill" style="width:62%"></div></div>
            <p class="muted xsmall" style="margin:10px 0 0">Цель: 400 слов</p>
          </article>
        </div>
        <section class="daily-section">
          <h2>Сегодня - ещё один шаг</h2>
          <div class="daily-actions">
            <button class="action-tile" type="button" data-route="flashcards"><span class="action-icon">♬</span><span><strong>Практика аудирования</strong><small>10 минут · повседневные диалоги</small></span><span class="action-arrow">↗</span></button>

<a href="<?= Url::to(['/site/exam']) ?>" class="action-tile" style="text-decoration: none; color: inherit; display: flex; align-items: center;">
    <span class="action-icon">✓</span>
    <span><strong>Сдать экзамен</strong><small>TOPIK I · пробный тест</small></span>
    <span class="action-arrow">↗</span>
</a>
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
    </div></main>