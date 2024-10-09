# test-task-wb-ads-panel

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
