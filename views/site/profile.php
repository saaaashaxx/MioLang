<?php

use yii\helpers\Url;
?>
<h1>Твой профиль</h1>
<p class="subtitle">TOPIK I · 1급</p>
</div>
<div class="profile-layout">
  <aside class="profile-left">
    <article class="card profile-card">
      <div class="profile-avatar">
        <div class="profile-avatar-circle">АС</div>
        <div>
          <h3 style="margin:0"><?= Yii::$app->user->identity->username ?></h3>
          <p class="muted xsmall" style="margin:3px 0 0">С нами с сентября 2026</p>
        </div>
      </div><span class="soft-badge">Любознательный исследователь</span>
      <div class="language-row" style="margin:14px 0 9px"><span>🇰🇷</span><span><strong style="font-weight:500">Корейский</strong></span><span class="language-percent">1급 · 60%</span></div>
      <div class="progress-track">
        <div class="progress-fill" style="width:60%"></div>
      </div>
      <a href="<?= Url::to(["user/update?id=".Yii::$app->user->identity->id]) ?>">
        <button class="button button-secondary button-full" style="margin-top:13px" type="button" data-action="edit-profile">✎ &nbsp;Редактировать профиль</button>
      </a>

    </article>
    <!-- <article class="pink-card">
      <div style="display:flex;align-items:center;gap:12px"><span class="action-icon" style="background:#fff">🔥</span>
        <div><strong style="font-size:25px">5 дней</strong>
          <div class="muted small">Стрик дней</div>
        </div>
      </div>
      <div class="habit-days" aria-label="Трекер занятий на неделю">
        <div class="habit-day"><span>Пн</span><button type="button" class="done " data-action="toggle-habit" data-day="0" aria-label="Пн: занятие выполнено">✓</button></div>
        <div class="habit-day"><span>Вт</span><button type="button" class="done " data-action="toggle-habit" data-day="1" aria-label="Вт: занятие выполнено">✓</button></div>
        <div class="habit-day"><span>Ср</span><button type="button" class="done " data-action="toggle-habit" data-day="2" aria-label="Ср: занятие выполнено">✓</button></div>
        <div class="habit-day"><span>Чт</span><button type="button" class="done " data-action="toggle-habit" data-day="3" aria-label="Чт: занятие выполнено">✓</button></div>
        <div class="habit-day"><span>Пт</span><button type="button" class="done today" data-action="toggle-habit" data-day="4" aria-label="Пт: занятие выполнено">✓</button></div>
        <div class="habit-day"><span>Сб</span><button type="button" class=" " data-action="toggle-habit" data-day="5" aria-label="Сб: отметить занятие">1</button></div>
        <div class="habit-day"><span>Вс</span><button type="button" class=" " data-action="toggle-habit" data-day="6" aria-label="Вс: отметить занятие">2</button></div>
      </div>
      <div class="progress-track">
        <div class="progress-fill" style="width:50%"></div>
      </div>
      <p class="muted small" style="margin:11px 0 0">До цели в 10 дней — половина пути. Продолжай в том же ритме!</p>
    </article> -->
  </aside>
  <!-- <section>
        <div class="profile-stat-grid"><article class="profile-stat"><span class="small">Выучено слов</span><strong>248</strong><span class="muted xsmall">+32 за неделю</span></article><article class="profile-stat"><span class="small">Точность ответов</span><strong>86%</strong><span class="muted xsmall">+8% за месяц</span></article><article class="profile-stat"><span class="small">Время практики</span><strong>4,5 ч</strong><span class="muted xsmall">за этот месяц</span></article></div>
        <div class="profile-charts"><article class="card chart-card"><div class="section-label" style="margin:0"><h3 style="margin:0">Рост словарного запаса</h3><span class="soft-badge">За месяц</span></div><p class="muted xsmall" style="margin:8px 0 0">● Выученные слова · октябрь</p><svg class="chart-svg" viewBox="0 0 520 190" role="img" aria-label="График роста словарного запаса с 150 до 250 слов"><defs><linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#b889ff" stop-opacity=".25"></stop><stop offset="1" stop-color="#b889ff" stop-opacity=".04"></stop></linearGradient></defs><g stroke="#eee6f4" stroke-width="1"><path d="M35 24H505M35 68H505M35 112H505M35 156H505"></path></g><g fill="#857e96" font-size="10"><text x="3" y="27">250</text><text x="3" y="71">200</text><text x="3" y="115">150</text><text x="35" y="180">1 окт</text><text x="150" y="180">7 окт</text><text x="265" y="180">14 окт</text><text x="380" y="180">21 окт</text><text x="474" y="180">28 окт</text></g><path d="M35 143 C70 139 80 125 115 126 S175 111 205 104 S245 105 275 86 S335 89 360 68 S410 70 440 51 S480 50 505 24 L505 156 L35 156Z" fill="url(#chartFill)"></path><path d="M35 143 C70 139 80 125 115 126 S175 111 205 104 S245 105 275 86 S335 89 360 68 S410 70 440 51 S480 50 505 24" fill="none" stroke="#8a48f7" stroke-width="3" stroke-linecap="round"></path><circle cx="505" cy="24" r="4" fill="#8a48f7" stroke="#fff" stroke-width="2"></circle></svg></article>
          <article class="card chart-card"><div class="section-label" style="margin:0"><h3 style="margin:0">Ритм занятий</h3><span class="purple-text">▥</span></div><p class="muted xsmall" style="margin:7px 0 0">Практика за неделю · минуты</p><div class="bar-chart"><div class="bar-col"><span>18</span><div class="bar" style="height:54px"></div><span>Пн</span></div><div class="bar-col"><span>25</span><div class="bar" style="height:75px"></div><span>Вт</span></div><div class="bar-col"><span>15</span><div class="bar" style="height:45px"></div><span>Ср</span></div><div class="bar-col"><span>30</span><div class="bar" style="height:90px"></div><span>Чт</span></div><div class="bar-col"><span>22</span><div class="bar" style="height:66px"></div><span>Пт</span></div><div class="bar-col"><span>—</span><div class="bar" style="height:9px"></div><span>Сб</span></div><div class="bar-col"><span>—</span><div class="bar" style="height:9px"></div><span>Вс</span></div></div></article></div>
        <article class="card achievements"><div class="section-label" style="margin:0"><h3 style="margin:0">Твои достижения</h3><span class="muted xsmall">3 из 12 открыто</span></div><div class="achievement-grid"><div class="achievement"><div class="medal"></div><strong>Первый шаг</strong><small>Первое занятие позади</small></div><div class="achievement"><div class="medal"></div><strong>Собиратель слов</strong><small>100 слов в копилке</small></div><div class="achievement"><div class="medal"></div><strong>В ритме</strong><small>5 дней практики подряд</small></div><div class="achievement"><div class="medal"></div><strong>Знаток слов</strong><small>Выучи 500 слов · 248/500</small></div></div></article>
      </section> -->
</div>