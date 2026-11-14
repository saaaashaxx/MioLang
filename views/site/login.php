<?php
use yii\helpers\Html;
use yii\widgets\ActiveForm;

$this->title = 'Вход в систему';
?>
<div class="site-login" style="display: flex; justify-content: center; align-items: center; min-height: 70vh; padding: 20px;">
    <div style="width: 100%; max-width: 400px; padding: 32px; background: #fff; border-radius: 20px, border: 1px solid rgba(0,0,0,0.06); box-shadow: 0 10px 30px rgba(0,0,0,0.04);">
    <h1 style="font-size: 24px; font-weight: 700; margin-bottom: 8px; color: #1a1a1a;">Вход в систему</h1>
    <p style="color: #666; font-size: 14px; margin-bottom: 24px;">Пожалуйста, введите данные для входа:</p>

    <?php $form = \yii\widgets\ActiveForm::begin([
        'id' => 'login-form',
        'enableClientValidation' => false,
    ]); ?>

        <!-- Поле Логин -->
        <div style="margin-bottom: 16px;">
            <label style="display: block; font-size: 13px; font-weight: 600; color: #333; margin-bottom: 6px;">Логин / Email</label>
            <?= Html::activeTextInput($model, 'username', [
                'autofocus' => true,
                'class' => 'form-control',
                'placeholder' => 'Введите логин',
                'style' => 'width: 100%; padding: 12px 14px; border: 1px solid #e2e2e2; border-radius: 12px; font-size: 14px; outline: none; background: #fbfaf8; box-sizing: border-box;'
            ]) ?>
            <?= Html::error($model, 'username', ['style' => 'color: #e53e3e; font-size: 12px; margin-top: 4px; display: block;']) ?>
        </div>

        <!-- Поле Пароль -->
        <div style="margin-bottom: 16px;">
            <label style="display: block; font-size: 13px; font-weight: 600; color: #333; margin-bottom: 6px;">Пароль</label>
            <?= Html::activePasswordInput($model, 'password', [
                'class' => 'form-control',
                'placeholder' => 'Введите пароль',
                'style' => 'width: 100%; padding: 12px 14px; border: 1px solid #e2e2e2; border-radius: 12px; font-size: 14px; outline: none; background: #fbfaf8; box-sizing: border-box;'
            ]) ?>
            <?= Html::error($model, 'password', ['style' => 'color: #e53e3e; font-size: 12px; margin-top: 4px; display: block;']) ?>
        </div>

        <!-- Чекбокс Запомнить меня -->
        <div style="margin-bottom: 24px; display: flex; align-items: center;">
            <?= Html::activeCheckbox($model, 'rememberMe', [
                'label' => 'Запомнить меня',
                'unselect' => null,
                'style' => 'margin-right: 8px; cursor: pointer;',
                'labelOptions' => ['style' => 'font-size: 13px; color: #555; cursor: pointer; user-select: none;']
            ]) ?>
        </div>

        <!-- Кнопка Войти -->
        <div>
            <?= Html::submitButton('Войти', [
                'style' => 'width: 100%; padding: 13px; background: #813cf2; color: #fff; border: none; border-radius: 12px; font-size: 15px; font-weight: 600; cursor: pointer;'
            ]) ?>
        </div>

    <?php \yii\widgets\ActiveForm::end(); ?>

</div>