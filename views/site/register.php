<?php
use yii\helpers\Html;
use yii\helpers\Url;

$this->title = 'Регистрация — MioLang';
?>

<div class="site-register" style="display: flex; justify-content: center; align-items: center; min-height: 70vh; padding: 20px;">
    <div style="width: 100%; max-width: 400px; padding: 32px; background: #fff; border-radius: 20px; border: 1px solid rgba(0,0,0,0.06); box-shadow: 0 10px 30px rgba(0,0,0,0.04);">
    <h1 style="font-size: 24px; font-weight: 700; margin-bottom: 8px; color: #1a1a1a;">Регистрация</h1>
    <p style="color: #666; font-size: 14px; margin-bottom: 24px;">Создайте аккаунт для доступа к MioLang</p>

    <?= Html::beginForm(['site/register'], 'post', ['id' => 'form-signup']) ?>

        <!-- Поле Логин -->
        <div style="margin-bottom: 16px;">
            <label style="display: block; font-size: 13px; font-weight: 600; color: #333; margin-bottom: 6px;">Логин</label>
            <?= Html::activeTextInput($model, 'username', [
                'autofocus' => true,
                'class' => 'form-control',
                'placeholder' => 'Придумайте логин',
                'style' => 'width: 100%; padding: 12px 14px; border: 1px solid #e2e2e2; border-radius: 12px; font-size: 14px; outline: none; background: #fbfaf8; box-sizing: border-box;'
            ]) ?>
            <?= Html::error($model, 'username', ['style' => 'color: #e53e3e; font-size: 12px; margin-top: 4px; display: block;']) ?>
        </div>

        <!-- Поле Пароль -->
        <div style="margin-bottom: 24px;">
            <label style="display: block; font-size: 13px; font-weight: 600; color: #333; margin-bottom: 6px;">Пароль</label>
            <?= Html::activePasswordInput($model, 'password', [
                'class' => 'form-control',
                'placeholder' => 'Минимум 6 символов',
                'style' => 'width: 100%; padding: 12px 14px; border: 1px solid #e2e2e2; border-radius: 12px; font-size: 14px; outline: none; background: #fbfaf8; box-sizing: border-box;'
            ]) ?>
            <?= Html::error($model, 'password', ['style' => 'color: #e53e3e; font-size: 12px; margin-top: 4px; display: block;']) ?>
        </div>

        <!-- Кнопка Зарегистрироваться -->
        <div>
            <?= Html::submitButton('Зарегистрироваться', [
                'style' => 'width: 100%; padding: 13px; background: #813cf2; color: #fff; border: none; border-radius: 12px; font-size: 15px; font-weight: 600; cursor: pointer;'
            ]) ?>
        </div>

    <?= Html::endForm() ?>

    <div style="margin-top: 20px; text-align: center; font-size: 13px; color: #666;">
        Уже есть аккаунт? <a href="<?= Url::to(['/site/login']) ?>" style="color: #1a1a1a; font-weight: 600; text-decoration: none;">Войти</a>
    </div>

</div>