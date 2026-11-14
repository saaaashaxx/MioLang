<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model app\models\User */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="user-form">

    <?php $form = ActiveForm::begin([
        'options' => ['class' => 'styled-form']
    ]); ?>

        <?= $form->field($model, 'username')->textInput([
            'maxlength' => true,
            'class' => 'form-control form-input',
            'placeholder' => 'Введите имя'
        ]) ?>

        <?= $form->field($model, 'email')->textInput([
            'maxlength' => true,
            'class' => 'form-control form-input',
            'placeholder' => 'Введите email'
        ]) ?>

        <div class="form-actions">
            <?= Html::submitButton('Сохранить', ['class' => 'btn btn-primary']) ?>
            <?= Html::a('Отмена', ['profile'], ['class' => 'btn btn-secondary']) ?>
        </div>

    <?php ActiveForm::end(); ?>

</div>