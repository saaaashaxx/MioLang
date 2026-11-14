<?php

use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $model app\models\Userword */

$this->title = 'Create Userword';
$this->params['breadcrumbs'][] = ['label' => 'Userwords', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="userword-create">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
