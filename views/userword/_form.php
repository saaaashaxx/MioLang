<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model app\models\Userword */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="userword-form">

    <?php $form = ActiveForm::begin(); ?>

    <?= $form->field($model, 'iduser')->textInput() ?>

    <?= $form->field($model, 'iddictionary')->textInput() ?>

    <?= $form->field($model, 'islearned')->textInput() ?>

    <div class="form-group">
        <?= Html::submitButton('Save', ['class' => 'btn btn-success']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>
