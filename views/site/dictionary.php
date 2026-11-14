<div class="breadcrumb"><button type="button" data-route="home">← Практика</button></div>
<h1>Словарь<span class="topik-badge">TOPIK I · 1급</span></h1>
<p class="subtitle">Изучай новые слова, слушай произношение и возвращайся к знакомым.</p>
</div>

<div class="practice-toolbar">
  <div class="practice-tabs" role="tablist" aria-label="Разделы практики">
    <button type="button" role="tab" aria-selected="true" class="active" data-route="dictionary">🕮 <span>Словарь</span></button>
    <button type="button" role="tab" aria-selected="false" class="" data-route="flashcards">□ <span>Флеш-карточки</span></button>
    <button type="button" role="tab" aria-selected="false" class="" data-route="quiz">☷ <span>Тест по словам</span></button>
  </div>
  <span class="streak-label">🔥 &nbsp;5 дней подряд</span>
</div>

<div class="dictionary-layout">
  <section class="dictionary-main" aria-label="Список слов">
    <div class="search-row">
        <label class="search-box">
            <span class="search-icon" aria-hidden="true">⌕</span>
            <input id="dictionarySearch" type="search" value="" placeholder="Найти слово или перевод" aria-label="Найти слово или перевод">
        </label>
    </div>

    <div class="filter-row" role="group" aria-label="Фильтры слов">
      <button type="button" class="filter-chip active" data-filter="all">Все уровни</button>
      <button type="button" class="filter-chip" data-filter="TOPIK I">TOPIK I</button>
      <button type="button" class="filter-chip" data-filter="TOPIK II">TOPIK II</button>
      <button type="button" class="filter-chip" data-filter="known">Выучено</button>
      <button type="button" class="filter-chip" data-filter="favorites">Избранное</button>
      <span class="filter-count">248 слов</span>
    </div>

    <div id="wordGrid" class="word-grid">
    <?php foreach($words as $word) { 
          // Точно берем уровень по нашему полю idlevel (1 -> TOPIK I, 2 -> TOPIK II)
          $levelId = $word->idlevel ?? 1;
          $level = ($levelId == 2) ? 'TOPIK II' : 'TOPIK I';
          
          $status = $word->status ?? 'learn';
      ?>
        <article class="word-card card" 
                 data-word="<?= htmlspecialchars(mb_strtolower($word->word)) ?>" 
                 data-translation="<?= htmlspecialchars(mb_strtolower($word->translation)) ?>"
                 data-level="<?= htmlspecialchars($level) ?>"
                 data-status="<?= $status ?>">
            <button class="word-open" type="button" data-action="open-word" data-word="<?= $word->word ?>" aria-label="Открыть слово <?= $word->word ?>">
              <span class="word-card-top">
                  <strong class="word-korean"><?= $word->word ?></strong>
                  <span class="word-roman">[<?= $word->transcription ?>]</span>
              </span>
              <span class="word-translation"><?= $word->translation ?></span>
            </button>
            <div class="word-card-bottom">
                <span><?= htmlspecialchars($word->name ?? 'Общее') ?> · <?= htmlspecialchars($level) ?></span>
                
                <span class="status-badge <?= $status === 'known' ? 'known' : 'learn' ?>">
                    <?= $status === 'known' ? 'Выучено' : 'Изучаю' ?>
                </span>
                <button type="button" class="sound-mini" data-action="speak" data-word="<?= $word->word ?>" aria-label="Прослушать <?= $word->word ?>">◖))</button>
            </div>
        </article>
      <?php } ?>
    </div>

    <div class="pagination">
        <span style="margin-right:auto">Слова из базы данных</span>
        <button type="button" aria-label="Предыдущая страница">‹</button>
        <button class="current" type="button">1</button>
        <button type="button" aria-label="Следующая страница">›</button>
    </div>
  </section>

  <aside class="dictionary-sidebar">
    <article class="card card-pad daily-words">
      <h3>Слова на сегодня <span class="purple-text" style="float:right"></span></h3>
      <div><strong>6</strong> <span class="muted">из 10 слов повторено</span></div>
      <div class="progress-track" style="margin:12px 0 9px">
        <div class="progress-fill" style="width:60%"></div>
      </div>
      <p class="muted xsmall" style="margin:0">Ещё 4 слова — и цель достигнута!</p>
    </article>
    <article class="soft-card">
      <h3>Слово за словом</h3>
      <p class="muted small" style="margin:0">Нажми на слово, чтобы увидеть примеры.</p>
    </article>
  </aside>
</div>

<!-- Скрипт живого поиска и фильтрации -->
<script>
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('dictionarySearch');
    const filterButtons = document.querySelectorAll('.filter-chip');
    const wordCards = document.querySelectorAll('.word-card');
    
    let currentFilter = 'all';

    function filterWords() {
        const query = searchInput.value.toLowerCase().trim();

        wordCards.forEach(card => {
            const koreanWord = card.getAttribute('data-word') || '';
            const translation = card.getAttribute('data-translation') || '';
            const level = card.getAttribute('data-level') || '';
            const status = card.getAttribute('data-status') || '';

            const matchesSearch = koreanWord.includes(query) || translation.includes(query);

            let matchesFilter = true;
            if (currentFilter === 'TOPIK I' || currentFilter === 'TOPIK II') {
                matchesFilter = (level === currentFilter);
            } else if (currentFilter === 'known') {
                matchesFilter = (status === 'known');
            } else if (currentFilter === 'favorites') {
                matchesFilter = card.classList.contains('favorite'); 
            }

            if (matchesSearch && matchesFilter) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', filterWords);
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            currentFilter = this.getAttribute('data-filter');
            filterWords();
        });
    });
});
</script>