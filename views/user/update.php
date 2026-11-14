<?php

use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $model app\models\User */

$this->title = 'Редактирование профиля';
?>
<div class="user-update-container">
    <div class="card form-card">
        <h1 class="page-title">Редактирование профиля</h1>
        <p class="page-subtitle">Измените данные вашей учетной записи</p>

        <?= $this->render('_form', [
            'model' => $model,
        ]) ?>
    </div>
</div>