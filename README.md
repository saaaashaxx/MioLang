**MioLang** — это интерактивная образовательная платформа, разработанная на фреймворке **Yii2**, предназначенная для эффективного пополнения словарного запаса корейского языка, тренировки памяти с помощью карточек и прохождения проверочных тестов.

[![Yii2](https://img.shields.io/badge/Framework-Yii2-green.svg)](http://www.yiiframework.com/)
[![PHP](https://img.shields.io/badge/PHP-8.x-blue.svg)](https://php.net/)
[![Database](https://img.shields.io/badge/Database-PostgreSQL-orange.svg)](https://www.postgresql.org/)

---

## 🚀 Основные функциональные возможности

*   **Словарь (`/site/dictionary`)**:
    *   Просмотр каталога слов с корейским написанием, транскрипцией и переводом.
    *   Динамическое отображение уровней сложности (**TOPIK I**, **TOPIK II**), подтягиваемых напрямую из базы данных через связи (`idlevel`).
    *   Мгновенный **живой поиск** по словам и переводам на стороне клиента (JavaScript).
    *   Удобные **фильтры-чипсы** для сортировки по уровням (TOPIK I, TOPIK II) и статусам (*Изучаю* / *Выучено*).
*   **Флеш-карточки (`/site/flashcards`)**: интерактивный тренажер для запоминания лексики.
*   **Тесты (`/site/quiz`)**: проверочные задания для закрепления материала.
*   **Дневник пользователя**: отслеживание прогресса и ежедневной учебной цели.

---

## 🛠 Технологический стек

*   **Бэкенд:** PHP 8.x, Yii2 Framework (MVC архитектура).
*   **База данных:** PostgreSQL / MySQL (управление через phpMyAdmin).
*   **Фронтенд:** HTML5, CSS3, Vanilla JavaScript (динамическая фильтрация, интерактивные элементы интерфейса).
*   **Сборка и верстка:** Интеграция статического макета в структуру представлений Yii2 (`views/layouts/main.php`, подключаемые partials `_header.php`, `_footer.php`, ассеты через `AppAsset`).

---

## 📂 Структура проекта

Основные директории приложения:

```text
    assets/         — определение и регистрация клиентских стилей и скриптов (AppAsset)
    commands/       — консольные команды приложения
    config/         — конфигурационные файлы (web.php, db.php, маршруты и ЧПУ)
    controllers/    — контроллеры веб-приложения (SiteController и др.)
    mail/           — шаблоны писем
    models/         — модели данных (работа с таблицами БД)
    runtime/        — файлы, генерируемые во время работы приложения
    tests/          — модульные, функциональные и приемочные тесты (Codeception)
    vendor/         — сторонние пакеты Composer
    views/          — шаблоны страниц (включая views/site/dictionary.php)
    web/            — входная точка (index.css/js, статика, ассеты)
```

<img width="871" height="564" alt="DBMioLang" src="https://github.com/user-attachments/assets/af3cc239-0f33-4bc3-a336-d95f7a2ef706" />

<img width="1920" height="1001" alt="Site" src="https://github.com/user-attachments/assets/d0f37513-85e2-4dbc-a3c7-4ed5d579976c" />

<img width="1867" height="911" alt="VS" src="https://github.com/user-attachments/assets/2aad5747-218f-471b-98ef-672550373bbd" />
