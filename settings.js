////////////////////settings.js//////////////////////
// --- ИНСТРУКЦИЯ ПО НАСТРОЙКЕ ---
// 1. Для работы приложения получите API-ключ для Google Sheets.
//    Инструкция здесь: https://ai2.appinventor.mit.edu/reference/other/googlesheets-api-setup.html
// 2. Вставьте полученный ключ в поле 'api' для каждой таблицы ниже.
// ---------------------------

// Конфигурация таблиц Google Sheets
const days = {
  day0: {
    name: 'Расписание на понедельник',
    id: '1rnYBzXaWr9dI1u8haxakKDiz7KK0IzjJ',
    api: '', // <-- ВСТАВЬТЕ СВОЙ КЛЮЧ СЮДА
    gid: '0'
  },
  day1: {
    name: 'Расписание на вторник',
    id: '17Oz-Ld6NHA57SEKCiuAWQNYYngJ3_7LB',
    api: '',
    gid: '0'
  },
  day2: {
    name: 'Расписание на среду',
    id: '1Xt-HxVTrKzp4_3NcaBGbTYxKp_PGLeN2',
    api: '',
    gid: '0'
  },
  day3: {
    name: 'Расписание на четверг',
    id: '1oessjK-CwC-p_Kf0y1be61ZRwHq4jd4l',
    api: '',
    gid: '0'
  },
  day4: {
    name: 'Расписание на пятницу',
    id: '1_m0C3uWV3XvPLAko0KZSJWq5JMMHe8HH',
    api: '',
    gid: '0'
  }
};

const classes = {
  individual: {
    name: 'Индивидуалы, дз',
    id: '1WDnmYHNnhmO9MdCdcR2mKRR9hTqthR84mqV_1VsU38w',
    api: '',
    gid: '0'
  },
  class5_1: {
    name: '5-1 класс, дз',
    id: '1mywfGN2EP0z2FIlWnmfVOwdbZoP1_I_tsTU0lqd5UfI',
    api: '',
    gid: '0'
  },
  class5_2: {
    name: '5-2 класс, дз',
    id: '1dYiQ0SiJGvlDGjyjfBIgMl1vgAdloSLf_kjkPlKSKOQ',
    api: '',
    gid: '0'
  },
  class6_1: {
    name: '6-1 класс, дз',
    id: '1zov6d36gXBvqY5Z5p-iNppVFMidI-dDsOYwfLaOLG5w',
    api: '',
    gid: '0'
  },
  class6_2: {
    name: '6-2 класс, дз',
    id: '1C_CxD9fUXJ5OtgiLmRwwGvIQd7MxE7uziAdWehGnkpU',
    api: '',
    gid: '0'
  },
  class7_1: {
    name: '7-1 класс, дз',
    id: '1uufK-YSTwzuOsI1WD8Ay8kAgDI-owGQ6pofxTaxPU1s',
    api: '',
    gid: '0'
  },
  class7_2: {
    name: '7-2 класс, дз',
    id: '14Kug6YztYre6iKs-qH47Paf-dwcJse0JW-zSLekhSxY',
    api: '',
    gid: '0'
  },
  class8_1: {
    name: '8-1 класс, дз',
    id: '11LKk9u8OyVdphPMA8dIVNGkz1EQVEYovFc_ZChayWtU',
    api: '',
    gid: '0'
  },
  class8_2: {
    name: '8-2 класс, дз',
    id: '1wQ13kwq009UbhaVyTgVIx8XQY1PiuWQrr6KBOx4G52Q',
    api: '',
    gid: '0'
  },
  class8_3: {
    name: '8-3 класс, дз',
    id: '1_Etr2b0OURFaJZAbXgj1l3TDKk7X0469CiMysGKEvsc',
    api: '',
    gid: '0'
  },
  class9_1: {
    name: '9-1 класс, дз',
    id: '1FMNCOHLbIRZrL822scLvZPiAvHnQY4bKr0YRGhNJ_n0',
    api: '',
    gid: '0'
  },
  class9_2: {
    name: '9-2 класс, дз',
    id: '10mwDQQxPaDd8t00kwQn7e593SBeDB2YLHxjHbcsW-Mw',
    api: '',
    gid: '0'
  },
  class10_1: {
    name: '10-1 класс, дз',
    id: '1PeSWxzLIlDNhT2ujqQz0mKnCAdt0iSQyo_XQMMeN2-g',
    api: '',
    gid: '0'
  },
  class10_2: {
    name: '10-2 класс, дз',
    id: '1-yU65SGDMPCSI59P4eVRNkcMtaxDdToGqG2-7Ay89Iw',
    api: '',
    gid: '0'
  },
  class11_1: {
    name: '11-1 класс, дз',
    id: '1D7AjubNMiNcZuKU0aA7MOvxGHOD8RFKYH6WvtMGua0s',
    api: '',
    gid: '0'
  },
  class11_2: {
    name: '11-2 класс, дз',
    id: '19WzVvOWy41xkinaKqjlGUmZu6htaGDLPuAstW-eeqVM',
    api: '',
    gid: '0'
  }
};

// Словарь синонимов предметов
const SUBJECT_MAP = {
  'Английский язык': ['Англ.яз', 'Английский', 'English', 'Анг.яз', 'Англ', 'Анг'],
  'Физкультура': ['Физ-ра', 'Физическая культура', 'Физра', 'Физ-культура', 'Физ'],
  'Русский язык': ['Рус.яз', 'Русский', 'Рус'],
  'Литература': ['Литер', 'Лит-ра', 'Лит'],
  'История': ['Истор'],
  'География': ['Геогр'],
  'Биология': ['Биол'],
  'Химия': [],
  'Психология': ['Психол', 'Психолог'],
  'Физика': [],
  'Информатика': ['Информ'],
  'Обществознание': ['Обществ', 'Обществозн'],
  'Технология': ['Технол'],
  'Рисование': ['ИЗО', 'Изобразительное искусство'],
  'Музыка': [],
  'Основы безопасности': ['ОБЖ', 'Основы безопасности жизнедеятельности'],
  'Начальные классы': ['Началка', 'Нач. классы', 'НК'],
  'Математика': ['Матем', 'Математ'],
  'Статистика': ['Вероятность и Статистика', 'ВиС', 'Вероятность', 'В', 'С'],
  'Геометрия': ['Геом', 'Г'],
  'Алгебра': ['Алг', 'А'],
  'Лекция': ['Лек', 'Л'],
  'Практика': ['Практ', 'Пр'],
  'Подготовка': ['Подг', 'П'],
  'Лабораторная': ['Лаб', 'ЛР'],
  'Контрольная': ['КР'],
  'Консультация': ['Конс', 'К'],
  'Зачёт': ['Зач', 'З'],
  'Экзамен': ['Экз'],
  'Столовая': ['стол', 'столовая'],
  'Спортзал': ['зал', 'спортзал', 'спорт'],
  'Актовый зал': ['актовый', 'акт', 'актзал'],
  'Лаборатория': ['лаб', 'лаборатория'],
  'Кабинет': ['каб', 'к'],
  'Мастерская': ['мастер', 'маст'],
  'Бассейн': ['бассейн', 'басс']
};
