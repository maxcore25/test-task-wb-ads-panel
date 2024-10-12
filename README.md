# test-task-wb-ads-panel

![](/docs/main.png)

## Инструкция

1. Скопируйте файл `.env.example` и переименуйте в `.env`
2. Заполните переменные `MONGO_USER` и `MONGO_PASSWORD` в файле `.env`. Можно оставить тестовые значения из файла `.env.example`

## Запуск (с Docker)

1. Запустите проект командой

```bash
docker-compose up -d --build
```

2. Перейдите по ссылке на фронтенд: http://localhost

3. Перейдите по ссылке на документацию Swagger API: http://localhost:8000/docs

4. Перейдите по ссылке на админ-панель MongoDB и введите `user` и `123` для авторизации: http://localhost:8081

## Storybook

1. Запустите Storybook командой

```bash
cd frontend
pnpm sb
```

2. Перейдите по ссылке: http://localhost:6006

## Тесты

1. Запустите тесты в терминале командой

```bash
cd frontend
pnpm test
```

2. Запустите тесты в веб-интерфейсе командой

```bash
cd frontend
pnpm test:ui
```

3. Перейдите по ссылке: [http://localhost:51204/\_\_vitest\_\_/#/](http://localhost:51204/__vitest__/#/)

## E2E-тесты

1. Запустите e2e-тесты в терминале командой

```bash
cd frontend
pnpm test:e2e
```

2. Запустите e2e-тесты в веб-интерфейсе командой

```bash
cd frontend
pnpm test:e2e-ui
```

## Playwright команды

```bash
# Runs the end-to-end tests
pnpm exec playwright test

# Starts the interactive UI mode
pnpm exec playwright test --ui

# Runs the tests only on Desktop Chrome
pnpm exec playwright test --project=chromium

# Runs the tests in a specific file
pnpm exec playwright test example

# Runs the tests in debug mode
pnpm exec playwright test --debug

# Auto generate tests with Codegen
pnpm exec playwright codegen
```

## Пример запроса к Wildberries API

API URL:

```
POST https://app.marketspace.ru/testing-api/adv/v2/fullstats
```

Body:

```json
[
  {
    "id": 19447497,
    "dates": ["2024-10-08"]
  },
  {
    "id": 18854755,
    "dates": ["2024-10-08"]
  }
]
```

## ТЗ

Ссылка: https://docs.google.com/document/d/1IT78RNaJeabQUcPnHYBCZDoC12Xx-HvsWzWWYHOss8Q/edit?pli=1&tab=t.0

Термины

Advert - рекламная кампание, nm - продукт

Требуется:

- Написать API используя nestjs, typescript, mongodb
- Реализовать общение с api wb(https://openapi.wildberries.ru/promotion/api/ru/#tag/Statistika/paths/~1adv~1v2~1fullstats/post). Ссылка для работы с самим api https://app.marketspace.ru/testing-api/(дальше адрес запроса как в wb, токен уже вставлен)
- Написать front-end часть на react + typescript который будет кидать запрос и выводить табличку nm-ов и суммарную стату. Фильтры должны быть как в бэке. Если есть возможность в идеале стилизовать
- Если прям совсем возможности есть можно добавить Docker, eslint, доп утилитарные вещи, валидцию, swagger

Приложение должно иметь метод на запрос статистики за конкретный день, конкретной рекламы(примеры рк 19447497, 18854755). Данные должны быть сгруппированы по nmId. Также должна быть суммарная статистика. Сначала данным надо искать в mongo, если нет то запрашивать и записывать туда

Запрос:

```json
{
  "advert": 12,
  "date": "2024-09-09"
}
```

Ответ:

```json
{
  "summary": {
    "clicks": 2,
    "ctr": 0.19,
    "cpc": 0.09
  },
  "list": [
    {
      "nmId": 123,
      "clicks": 2,
      "ctr": 0.19,
      "cpc": 0.09
    },
    {
      "nmId": 124,
      "clicks": 2,
      "ctr": 0.19,
      "cpc": 0.09
    }
  ]
}
```
