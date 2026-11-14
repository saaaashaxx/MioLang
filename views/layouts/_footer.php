<?php
/** @var yii\web\View $this */
/** @var array $routeMap */

use yii\helpers\Html;
?>
<footer class="site-footer"><span>MioLang</span></footer>

<nav class="bottom-nav" aria-label="Быстрая навигация">
    <?= Html::a('<span aria-hidden="true">⌂</span><small>Главная</small>', $routeMap['home'], ['class' => 'bottom-nav-item', 'data-route' => 'home', 'aria-label' => 'Мой дневник', 'encode' => false]) ?>
    <?= Html::a('<span aria-hidden="true">▤</span><small>Практика</small>', $routeMap['dictionary'], ['class' => 'bottom-nav-item', 'data-route' => 'dictionary', 'aria-label' => 'Практика', 'encode' => false]) ?>
    <?= Html::a('<span aria-hidden="true">▣</span><small>Экзамен</small>', $routeMap['examSetup'], ['class' => 'bottom-nav-item', 'data-route' => 'examSetup', 'aria-label' => 'Экзамен', 'encode' => false]) ?>
    <?= Html::a('<span aria-hidden="true">○</span><small>Профиль</small>', $routeMap['profile'], ['class' => 'bottom-nav-item', 'data-route' => 'profile', 'aria-label' => 'Профиль', 'encode' => false]) ?>
</nav>
