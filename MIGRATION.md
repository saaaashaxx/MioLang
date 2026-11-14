# Перенос MioLang на Yii2

## Что перенесено
- `web/css/site.css` — исходный CSS без изменения правил оформления.
- `web/js/app.js` — интерактивность исходного макета; навигация использует URL из `window.MIO_ROUTES`.
- `web/assets/favicon.svg` — иконка сайта.
- `views/layouts/main.php` — общий layout с Yii lifecycle, `$content`, `head()` и `endBody()`.
- `views/layouts/_header.php`, `_footer.php` — повторно используемые partials.
- `views/site/index.php` — точка монтирования содержимого приложения.
- `controllers/SiteController.php` — отдельные actions для главной, словаря, карточек, тестов, экзамена и профиля.
- `config/web.php` — ЧПУ-маршруты.

## Ассеты
`assets/AppAsset.php` регистрирует CSS и JS через AssetBundle. Пути задаются относительно `web/`, базовый URL — `@web`.

## Запуск
1. Распакуйте проект.
2. В корне проекта выполните `composer install`, если папка `vendor/` отсутствует.
3. Настройте веб-сервер так, чтобы document root указывал на `web/`.
4. Откройте главную страницу приложения.

Состояние учебного интерфейса по-прежнему хранится в `localStorage` браузера, как и в исходной статической версии. Данные не переносятся на сервер и не являются системой авторизации.
