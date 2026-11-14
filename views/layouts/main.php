<?php
/** @var yii\web\View $this */
/** @var string $content */

use app\assets\AppAsset;
use yii\helpers\Html;
use yii\helpers\Json;
use yii\helpers\Url;

AppAsset::register($this);

$this->title = $this->title ?: 'MioLang — изучай корейский';
$this->registerLinkTag([
    'rel' => 'icon',
    'type' => 'image/svg+xml',
    'href' => Yii::getAlias('@web/assets/favicon.svg'),
]);

$initialRoute = $this->params['initialRoute'] ?? 'home';
$routeMap = [
    'home' => Url::to(['/site/index']),
    'dictionary' => Url::to(['/site/dictionary']),
    'flashcards' => Url::to(['/site/flashcards']),
    'quiz' => Url::to(['/site/quiz']),
    'quizResults' => Url::to(['/site/quiz-results']),
    'examSetup' => Url::to(['/site/exam-setup']),
    'exam' => Url::to(['/site/exam']),
    'examResults' => Url::to(['/site/exam-results']),
    'profile' => Url::to(['/site/profile']),
];
?>
<?php $this->beginPage(); ?>
<!doctype html>
<html lang="<?= Html::encode(Yii::$app->language) ?>">
<head>
    <meta charset="<?= Html::encode(Yii::$app->charset) ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#fbfaf8">
    <meta name="description" content="MioLang — приложение для изучения корейского языка и подготовки к TOPIK.">
    <title><?= Html::encode($this->title) ?></title>
    <?php $this->head() ?>
</head>
<body data-initial-route="<?= Html::encode($initialRoute) ?>">
<?php $this->beginBody() ?>

<?= $this->render('_header', ['routeMap' => $routeMap]) ?>

<main class="app-main">
<?= $content ?>
</main>

<!-- Нижняя панель навигации для мобильных устройств -->
<nav class="mobile-bottom-nav" aria-label="Мобильная навигация">
    <a href="<?= Url::to(['/site/index']) ?>" class="mobile-nav-item">
        <span>🏠</span>
        <span>Главная</span>
    </a>
    <a href="<?= Url::to(['/site/dictionary']) ?>" class="mobile-nav-item">
        <span>📚</span>
        <span>Практика</span>
    </a>
    <a href="<?= Url::to(['/site/exam']) ?>" class="mobile-nav-item">
        <span>📝</span>
        <span>Экзамен</span>
    </a>
    <a href="<?= Url::to(['/site/profile']) ?>" class="mobile-nav-item">
        <span>👤</span>
        <span>Профиль</span>
    </a>
</nav>

<div id="modalLayer"></div>
<div id="toast" class="toast" role="status" aria-live="polite"></div>

<script>
    window.MIO_ROUTES = <?= Json::htmlEncode($routeMap) ?>;
</script>

<?php $this->endBody() ?>
</body>
</html>
<?php $this->endPage(); ?>