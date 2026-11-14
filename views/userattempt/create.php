<?php

use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $model app\models\Userattempt */

$this->title = 'Create Userattempt';
$this->params['breadcrumbs'][] = ['label' => 'Userattempts', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="userattempt-create">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
