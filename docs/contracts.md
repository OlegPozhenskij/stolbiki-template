# Контракты проекта

## Выпуск

`brief.json`: schemaVersion=1, engine=cards-v1, kind=episode|demo, title, audience,
seconds, design, world, media=pencil|vector|photo, music=bright|calm и timing.
timing: fps=30, step, intro, holdLast, outro в целых кадрах. Единственный расчёт
времени находится в src/engine/timeline.mjs. Python получает готовый timeline.json.

`content.json`: title, subtitle, cta, ctaSub, motif и items. Карточка:
id (уникальный slug), prefix, value (число или непустой текст), unit, title,
fact (до 45 знаков), move=hop|fly|swim|pulse|wiggle.
thumb: title, ids (1–3 уникальных id из items), badge={prefix,shown,unit}.

`sources.json`: объект по id карточки. Запись:
```json
{"status":"verified","checkedAt":"2026-11-15","urls":["https://example.org/source"],
 "scope":"Число — оценка возраста отдельной особи","fact":"Что источник подтверждает",
 "refresh":true,"validUntil":"2026-11-30"}
```
Это пример структуры, не готовый источник. Даты обновляет проверяющий.
Даты сравниваются в brief.timezone (по умолчанию Europe/Moscow), а не по UTC.
Для неизменных сведений refresh=false; дата проверки сохраняется в обоих случаях.
Новая формулировка факта требует сверки со scope/fact, даже если URL прежний.

## Изображение

assets.json сопоставляет id карточки с `{ "scene": "hamster" }` из каталога
или с внешним готовым изображением:
```json
{"composite":"photo/cat.jpg","background":"photo/cat-bg.jpg",
 "foreground":"photo/cat-fg.png","bounds":{"x":0.1,"y":0.2,"w":0.7,"h":0.6}}
```
Пути относительно public/. Только composite допустим, тогда изображение цельное:
отдельного движения вырезанного героя не будет. Для движения нужны оба слоя.
Нормализованные bounds задают точку опоры; координаты 0..1, foreground прозрачен.
Сцена экспортирует `{bg,fg}` — внутренности SVG 480×640. Полный SVG не нужен.
Модуль хранится в assets/scenes/, запись в assets/catalog.json. Существующие
помощники импортируются из helpers.mjs. Новый объект не требует изменения движка.

worlds/catalog.json хранит именованные миры. background=null сохраняет исходный
фон сцены, SVG-строка заменяет фон для всех героев выпуска. Слой героя сохраняется.
Это способ задать общее окружение; отдельные индивидуальные фоны задаются сценами.
Мир влияет на изображение, а не только на подпись в брифе.

## Оформление

Единый источник дизайнов: designs/catalog.json. Поддерживаются layout album
(бумага, скотч, наклон) и panel (панели), палитра, badgeShape=hex|round,
heading=hand|body, texture. В альбоме цвет заголовка title=null и badge=null
наследуют motif. Форма карандашного бейджа определяется motif (animals/sky/classic);
badgeShape задаёт CSS-форму панели. Карандашные формы добавляются в badge.mjs.
Медиа выбирается отдельно: vector можно показать в альбоме, pencil в панелях.
Новая палитра задаётся JSON. Новый вид композиции добавляйте в src/designs/
с сохранением контракта движка, затем расширьте registry/компоненты оформления.
Новая тема рисунков сама по себе не повод добавлять новое семейство оформления.

motion.ts отвечает за движение героя. timeline.mjs отвечает за время и видимость.
Праздничные эффекты вынесены в designs/Celebration.tsx. Код карточки и заставки
использует выбранное оформление; его поверхность может расширяться отдельно от
счётчика, камеры и расписания появления.
