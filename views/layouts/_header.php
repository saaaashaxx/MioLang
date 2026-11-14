<?php
/** @var yii\web\View $this */
/** @var array $routeMap */

use yii\helpers\Html;
use yii\helpers\Url;

?>
 <header class="site-header">
    <div class="header-inner">
      <a class="brand" href="<?= Url::to(['site/index']) ?>"  data-route="home" aria-label="MioLang — на главную">MioLang</a>

      <button class="icon-button menu-toggle" id="menuToggle" type="button" aria-label="Открыть меню" aria-expanded="false" aria-controls="mobileMenu">
        <span></span><span></span><span></span>
      </button>

      <nav class="desktop-nav" aria-label="Основная навигация">
        <!-- <a class="nav-link" href="">Мой дневник</button>  -->
      
        <a href="<?= Url::to(['site/index']) ?>" class="nav-link">Мой дневник</a>
        <a  href="<?= Url::to(['site/dictionary']) ?>" class="nav-link">Практика</a>
        <a  href="<?= Url::to(['site/exam']) ?>" class="nav-link" >Экзамен</a>
      </nav>

      <div class="header-tools">
        <button class="language-pill" type="button" data-action="language-info" aria-label="Выбранный язык: корейский">
          <span aria-hidden="true"></span><span>Корейский</span><span class="chevron" aria-hidden="true"></span>
        </button>
        <a href="<?= Url::to(['site/profile']) ?>" class="avatar-button" type="button" data-route="profile" aria-label="Открыть профиль">А</a>
      </div>
    </div>
    <nav class="mobile-menu" id="mobileMenu" aria-label="Мобильная навигация" hidden>
      <button type="button" data-route="home">Мой дневник</button>
      <button type="button" data-route="dictionary">Словарь</button>
      <button type="button" data-route="flashcards">Флеш-карточки</button>
      <button type="button" data-route="quiz">Тест по словам</button>
      <button type="button" data-route="examSetup">Экзамен TOPIK</button>
      <button type="button" data-route="profile">Профиль и статистика</button>
    </nav>
  </header>
