////////////////////settings.js//////////////////////
// Все настройки модуля, Списки таблиц и предметов //
/////////////////////////////////////////////////////

// --- НАСТРОЙКИ АВАРИЙНОГО ОБХОДА API ---
const WORKER_HOST = "https://estet74-proxy.coneco-neco.workers.dev/"; // Cсылка на worker, которую даёт Cloudflare после деплоя
const PROXY_URL = "https://api.allorigins.win/raw?url="; // Cсылка на proxy, используется при проблемах с worker
const USE_WORKER = true;
const USE_PROXY = false; // прокси отключён

// Это "Упрощенный режим" или режим ошибки.
const INITIAL_FAIL_MODE = false; // <-- Если здесь true, возвращаем ручной выбор гугл-таблиц

// --- Конфигурация таблиц Google Sheets ---
const days = {
  day0: {
    name: 'Расписание на понедельник',
    id: '1rnYBzXaWr9dI1u8haxakKDiz7KK0IzjJ',
    api: '',
    gid: '396671462'
  },
  day1: {
    name: 'Расписание на вторник',
    id: '17Oz-Ld6NHA57SEKCiuAWQNYYngJ3_7LB',
    api: '',
    gid: '1000062797'
  },
  day2: {
    name: 'Расписание на среду',
    id: '1Xt-HxVTrKzp4_3NcaBGbTYxKp_PGLeN2',
    api: '',
    gid: '1112063833'
  },
  day3: {
    name: 'Расписание на четверг',
    id: '1oessjK-CwC-p_Kf0y1be61ZRwHq4jd4l',
    api: '',
    gid: '820887987'
  },
  day4: {
    name: 'Расписание на пятницу',
    id: '1_m0C3uWV3XvPLAko0KZSJWq5JMMHe8HH',
    api: '',
    gid: '1260478207'
  },
};

const classes = {
  class5_1: {
    sheetId: "1mywfGN2EP0z2FIlWnmfVOwdbZoP1_I_tsTU0lqd5UfI",
    api: "class5_1_api",
    "Русский_язык": {
      gid: 0,
      range: "C3:C180",
      mode: "last",
      name: "Русский язык"
    },
    "Литература": {
      gid: 329233048,
      range: "C3:C180",
      mode: "last",
      name: "Литература"
    },
    "Английский_язык": {
      gid: 171674353,
      range: "C3:C180",
      mode: "last",
      name: "Английский язык"
    },
    "Математика": {
      gid: 624656389,
      range: "C3:C180",
      mode: "last",
      name: "Математика"
    },
    "Информатика": {
      gid: 1421083680,
      range: "C3:C180",
      mode: "last",
      name: "Информатика"
    },
    "История": {
      gid: 801015494,
      range: "C3:C180",
      mode: "last",
      name: "История"
    },
    "История_нашего_края": {
      gid: 2047340950,
      range: "C3:C180",
      mode: "last",
      name: "История нашего края"
    },
    "География": {
      gid: 696023630,
      range: "C3:C180",
      mode: "last",
      name: "География"
    },
    "Биология": {
      gid: 611403980,
      range: "C3:C180",
      mode: "last",
      name: "Биология"
    }
  },
  class5_2: {
    sheetId: "1dYiQ0SiJGvlDGjyjfBIgMl1vgAdloSLf_kjkPlKSKOQ",
    api: "class5_2_api",
    "Русский_язык": {
      gid: 0,
      range: "C3:C180",
      mode: "last",
      name: "Русский язык"
    },
    "Литература": {
      gid: 329233048,
      range: "C3:C180",
      mode: "last",
      name: "Литература"
    },
    "Английский_язык": {
      gid: 171674353,
      range: "C3:C180",
      mode: "last",
      name: "Английский язык"
    },
    "Математика": {
      gid: 624656389,
      range: "C3:C180",
      mode: "last",
      name: "Математика"
    },
    "Информатика": {
      gid: 1421083680,
      range: "C3:C180",
      mode: "last",
      name: "Информатика"
    },
    "История": {
      gid: 801015494,
      range: "C3:C180",
      mode: "last",
      name: "История"
    },
    "История_нашего_края": {
      gid: 652732812,
      range: "C3:C180",
      mode: "last",
      name: "История нашего края"
    },
    "География": {
      gid: 696023630,
      range: "C3:C180",
      mode: "last",
      name: "География"
    },
    "Биология": {
      gid: 611403980,
      range: "C3:C180",
      mode: "last",
      name: "Биология"
    }
  },
  class6_1: {
    sheetId: "1zov6d36gXBvqY5Z5p-iNppVFMidI-dDsOYwfLaOLG5w",
    api: "class6_1_api",
    "Русский_язык": {
      gid: 0,
      range: "C3:C180",
      mode: "last",
      name: "Русский язык"
    },
    "Литература": {
      gid: 329233048,
      range: "C3:C180",
      mode: "last",
      name: "Литература"
    },
    "Английский_язык": {
      gid: 171674353,
      range: "C3:C180",
      mode: "last",
      name: "Английский язык"
    },
    "Математика": {
      gid: 624656389,
      range: "C3:C180",
      mode: "last",
      name: "Математика"
    },
    "Информатика": {
      gid: 1421083680,
      range: "C3:C180",
      mode: "last",
      name: "Информатика"
    },
    "История": {
      gid: 801015494,
      range: "C3:C180",
      mode: "last",
      name: "История"
    },
    "География": {
      gid: 696023630,
      range: "C3:C180",
      mode: "last",
      name: "География"
    },
    "Биология": {
      gid: 611403980,
      range: "C3:C180",
      mode: "last",
      name: "Биология"
    }
  },
  class6_2: {
    sheetId: "1C_CxD9fUXJ5OtgiLmRwwGvIQd7MxE7uziAdWehGnkpU",
    api: "class6_2_api",
    "Русский_язык": {
      gid: 0,
      range: "C3:C180",
      mode: "last",
      name: "Русский язык"
    },
    "Литература": {
      gid: 329233048,
      range: "C3:C180",
      mode: "last",
      name: "Литература"
    },
    "Английский_язык": {
      gid: 171674353,
      range: "C3:C180",
      mode: "last",
      name: "Английский язык"
    },
    "Математика": {
      gid: 624656389,
      range: "C3:C180",
      mode: "last",
      name: "Математика"
    },
    "Информатика": {
      gid: 1421083680,
      range: "C3:C180",
      mode: "last",
      name: "Информатика"
    },
    "История": {
      gid: 801015494,
      range: "C3:C180",
      mode: "last",
      name: "История"
    },
    "География": {
      gid: 696023630,
      range: "C3:C180",
      mode: "last",
      name: "География"
    },
    "Биология": {
      gid: 611403980,
      range: "C3:C180",
      mode: "last",
      name: "Биология"
    }
  },
  class7_1: {
    sheetId: "1uufK-YSTwzuOsI1WD8Ay8kAgDI-owGQ6pofxTaxPU1s",
    api: "class7_1_api",
    "Русский_язык": {
      gid: 0,
      range: "C3:C180",
      mode: "last",
      name: "Русский язык"
    },
    "Литература": {
      gid: 329233048,
      range: "C3:C180",
      mode: "last",
      name: "Литература"
    },
    "Английский_язык": {
      gid: 171674353,
      range: "C3:C180",
      mode: "last",
      name: "Английский язык"
    },
    "Математика": {
      gid: 624656389,
      range: "C3:C180",
      mode: "last",
      name: "Математика"
    },
    "Информатика": {
      gid: 1421083680,
      range: "C3:C180",
      mode: "last",
      name: "Информатика"
    },
    "История": {
      gid: 801015494,
      range: "C3:C180",
      mode: "last",
      name: "История"
    },
    "География": {
      gid: 696023630,
      range: "C3:C180",
      mode: "last",
      name: "География"
    },
    "Биология": {
      gid: 611403980,
      range: "C3:C180",
      mode: "last",
      name: "Биология"
    },
    "Физика": {
      gid: 340190869,
      range: "C3:C180",
      mode: "last",
      name: "Физика"
    }
  },
  class7_2: {
    sheetId: "14Kug6YztYre6iKs-qH47Paf-dwcJse0JW-zSLekhSxY",
    api: "class7_2_api",
    "Русский_язык": {
      gid: 0,
      range: "C3:C180",
      mode: "last",
      name: "Русский язык"
    },
    "Литература": {
      gid: 329233048,
      range: "C3:C180",
      mode: "last",
      name: "Литература"
    },
    "Английский_язык": {
      gid: 171674353,
      range: "C3:C180",
      mode: "last",
      name: "Английский язык"
    },
    "Математика": {
      gid: 624656389,
      range: "C3:C180",
      mode: "last",
      name: "Математика"
    },
    "Информатика": {
      gid: 1421083680,
      range: "C3:C180",
      mode: "last",
      name: "Информатика"
    },
    "История": {
      gid: 801015494,
      range: "C3:C180",
      mode: "last",
      name: "История"
    },
    "География": {
      gid: 696023630,
      range: "C3:C180",
      mode: "last",
      name: "География"
    },
    "Биология": {
      gid: 611403980,
      range: "C3:C180",
      mode: "last",
      name: "Биология"
    },
    "Физика": {
      gid: 340190869,
      range: "C3:C180",
      mode: "last",
      name: "Физика"
    }
  },
  class8_1: {
    sheetId: "11LKk9u8OyVdphPMA8dIVNGkz1EQVEYovFc_ZChayWtU",
    api: "class8_1_api",
    "Русский_язык": {
      gid: 0,
      range: "C3:C180",
      mode: "last",
      name: "Русский язык"
    },
    "Литература": {
      gid: 329233048,
      range: "C3:C180",
      mode: "last",
      name: "Литература"
    },
    "Английский_язык": {
      gid: 171674353,
      range: "C3:C180",
      mode: "last",
      name: "Английский язык"
    },
    "Математика": {
      gid: 624656389,
      range: "C3:C180",
      mode: "last",
      name: "Математика"
    },
    "Информатика": {
      gid: 1421083680,
      range: "C3:C180",
      mode: "last",
      name: "Информатика"
    },
    "История": {
      gid: 801015494,
      range: "C3:C180",
      mode: "last",
      name: "История"
    },
    "Обществознание": {
      gid: 835052542,
      range: "C3:C180",
      mode: "last",
      name: "Обществознание"
    },
    "География": {
      gid: 696023630,
      range: "C3:C180",
      mode: "last",
      name: "География"
    },
    "Биология": {
      gid: 611403980,
      range: "C3:C180",
      mode: "last",
      name: "Биология"
    },
    "Физика": {
      gid: 340190869,
      range: "C3:C180",
      mode: "last",
      name: "Физика"
    },
    "Химия": {
      gid: 1532686743,
      range: "C3:C180",
      mode: "last",
      name: "Химия"
    }
  },
  class8_2: {
    sheetId: "1wQ13kwq009UbhaVyTgVIx8XQY1PiuWQrr6KBOx4G52Q",
    api: "class8_2_api",
    "Русский_язык": {
      gid: 0,
      range: "C3:C180",
      mode: "last",
      name: "Русский язык"
    },
    "Литература": {
      gid: 329233048,
      range: "C3:C180",
      mode: "last",
      name: "Литература"
    },
    "Английский_язык": {
      gid: 171674353,
      range: "C3:C180",
      mode: "last",
      name: "Английский язык"
    },
    "Математика": {
      gid: 624656389,
      range: "C3:C180",
      mode: "last",
      name: "Математика"
    },
    "Информатика": {
      gid: 1421083680,
      range: "C3:C180",
      mode: "last",
      name: "Информатика"
    },
    "История": {
      gid: 801015494,
      range: "C3:C180",
      mode: "last",
      name: "История"
    },
    "Обществознание": {
      gid: 482148264,
      range: "C3:C180",
      mode: "last",
      name: "Обществознание"
    },
    "География": {
      gid: 696023630,
      range: "C3:C180",
      mode: "last",
      name: "География"
    },
    "Биология": {
      gid: 611403980,
      range: "C3:C180",
      mode: "last",
      name: "Биология"
    },
    "Физика": {
      gid: 340190869,
      range: "C3:C180",
      mode: "last",
      name: "Физика"
    },
    "Химия": {
      gid: 1532686743,
      range: "C3:C180",
      mode: "last",
      name: "Химия"
    }
  },
  class8_3: {
    sheetId: "1_Etr2b0OURFaJZAbXgj1l3TDKk7X0469CiMysGKEvsc",
    api: "class8_3_api",
    "Русский_язык": {
      gid: 0,
      range: "C3:C180",
      mode: "last",
      name: "Русский язык"
    },
    "Литература": {
      gid: 329233048,
      range: "C3:C180",
      mode: "last",
      name: "Литература"
    },
    "Английский_язык": {
      gid: 171674353,
      range: "C3:C180",
      mode: "last",
      name: "Английский язык"
    },
    "Математика": {
      gid: 624656389,
      range: "C3:C180",
      mode: "last",
      name: "Математика"
    },
    "Информатика": {
      gid: 1421083680,
      range: "C3:C180",
      mode: "last",
      name: "Информатика"
    },
    "История": {
      gid: 801015494,
      range: "C3:C180",
      mode: "last",
      name: "История"
    },
    "Обществознание": {
      gid: 820658772,
      range: "C3:C180",
      mode: "last",
      name: "Обществознание"
    },
    "География": {
      gid: 696023630,
      range: "C3:C180",
      mode: "last",
      name: "География"
    },
    "Биология": {
      gid: 611403980,
      range: "C3:C180",
      mode: "last",
      name: "Биология"
    },
    "Физика": {
      gid: 340190869,
      range: "C3:C180",
      mode: "last",
      name: "Физика"
    },
    "Химия": {
      gid: 1532686743,
      range: "C3:C180",
      mode: "last",
      name: "Химия"
    }
  },
  class9_1: {
    sheetId: "1FMNCOHLbIRZrL822scLvZPiAvHnQY4bKr0YRGhNJ_n0",
    api: "class9_1_api",
    "Русский_язык": {
      gid: 0,
      range: "C3:C180",
      mode: "last",
      name: "Русский язык"
    },
    "Литература": {
      gid: 329233048,
      range: "C3:C180",
      mode: "last",
      name: "Литература"
    },
    "Английский_язык": {
      gid: 171674353,
      range: "C3:C180",
      mode: "last",
      name: "Английский язык"
    },
    "Математика": {
      gid: 624656389,
      range: "C3:C180",
      mode: "last",
      name: "Математика"
    },
    "Информатика": {
      gid: 1421083680,
      range: "C3:C180",
      mode: "last",
      name: "Информатика"
    },
    "История": {
      gid: 801015494,
      range: "C3:C180",
      mode: "last",
      name: "История"
    },
    "Обществознание": {
      gid: 1518102440,
      range: "C3:C180",
      mode: "last",
      name: "Обществознание"
    },
    "География": {
      gid: 696023630,
      range: "C3:C180",
      mode: "last",
      name: "География"
    },
    "Биология": {
      gid: 611403980,
      range: "C3:C180",
      mode: "last",
      name: "Биология"
    },
    "Физика": {
      gid: 340190869,
      range: "C3:C180",
      mode: "last",
      name: "Физика"
    },
    "Химия": {
      gid: 1532686743,
      range: "C3:C180",
      mode: "last",
      name: "Химия"
    }
  },
  class9_2: {
    sheetId: "10mwDQQxPaDd8t00kwQn7e593SBeDB2YLHxjHbcsW-Mw",
    api: "class9_2_api",
    "Русский_язык": {
      gid: 0,
      range: "C3:C180",
      mode: "last",
      name: "Русский язык"
    },
    "Литература": {
      gid: 329233048,
      range: "C3:C180",
      mode: "last",
      name: "Литература"
    },
    "Английский_язык": {
      gid: 171674353,
      range: "C3:C180",
      mode: "last",
      name: "Английский язык"
    },
    "Математика": {
      gid: 624656389,
      range: "C3:C180",
      mode: "last",
      name: "Математика"
    },
    "Информатика": {
      gid: 1421083680,
      range: "C3:C180",
      mode: "last",
      name: "Информатика"
    },
    "История": {
      gid: 801015494,
      range: "C3:C180",
      mode: "last",
      name: "История"
    },
    "Обществознание": {
      gid: 370783621,
      range: "C3:C180",
      mode: "last",
      name: "Обществознание"
    },
    "География": {
      gid: 696023630,
      range: "C3:C180",
      mode: "last",
      name: "География"
    },
    "Биология": {
      gid: 611403980,
      range: "C3:C180",
      mode: "last",
      name: "Биология"
    },
    "Физика": {
      gid: 340190869,
      range: "C3:C180",
      mode: "last",
      name: "Физика"
    },
    "Химия": {
      gid: 1532686743,
      range: "C3:C180",
      mode: "last",
      name: "Химия"
    }
  },
  class10_1: {
    sheetId: "1PeSWxzLIlDNhT2ujqQz0mKnCAdt0iSQyo_XQMMeN2-g",
    api: "class10_1_api",
    "Русский_язык": {
      gid: 0,
      range: "C3:C180",
      mode: "last",
      name: "Русский язык"
    },
    "Литература": {
      gid: 329233048,
      range: "C3:C180",
      mode: "last",
      name: "Литература"
    },
    "Английский_язык": {
      gid: 171674353,
      range: "C3:C180",
      mode: "last",
      name: "Английский язык"
    },
    "Математика": {
      gid: 624656389,
      range: "C3:C180",
      mode: "last",
      name: "Математика"
    },
    "Информатика": {
      gid: 1421083680,
      range: "C3:C180",
      mode: "last",
      name: "Информатика"
    },
    "История": {
      gid: 801015494,
      range: "C3:C180",
      mode: "last",
      name: "История"
    },
    "Обществознание": {
      gid: 370783621,
      range: "C3:C180",
      mode: "last",
      name: "Обществознание"
    },
    "География": {
      gid: 696023630,
      range: "C3:C180",
      mode: "last",
      name: "География"
    },
    "Биология": {
      gid: 611403980,
      range: "C3:C180",
      mode: "last",
      name: "Биология"
    },
    "Физика": {
      gid: 340190869,
      range: "C3:C180",
      mode: "last",
      name: "Физика"
    },
    "Химия": {
      gid: 1532686743,
      range: "C3:C180",
      mode: "last",
      name: "Химия"
    }
  },
  class10_2: {
    sheetId: "1-yU65SGDMPCSI59P4eVRNkcMtaxDdToGqG2-7Ay89Iw",
    api: "class10_2_api",
    "Русский_язык": {
      gid: 0,
      range: "C3:C180",
      mode: "last",
      name: "Русский язык"
    },
    "Литература": {
      gid: 329233048,
      range: "C3:C180",
      mode: "last",
      name: "Литература"
    },
    "Английский_язык": {
      gid: 171674353,
      range: "C3:C180",
      mode: "last",
      name: "Английский язык"
    },
    "Математика": {
      gid: 624656389,
      range: "C3:C180",
      mode: "last",
      name: "Математика"
    },
    "Информатика": {
      gid: 1421083680,
      range: "C3:C180",
      mode: "last",
      name: "Информатика"
    },
    "История": {
      gid: 801015494,
      range: "C3:C180",
      mode: "last",
      name: "История"
    },
    "Обществознание": {
      gid: 370783621,
      range: "C3:C180",
      mode: "last",
      name: "Обществознание"
    },
    "География": {
      gid: 696023630,
      range: "C3:C180",
      mode: "last",
      name: "География"
    },
    "Биология": {
      gid: 611403980,
      range: "C3:C180",
      mode: "last",
      name: "Биология"
    },
    "Физика": {
      gid: 340190869,
      range: "C3:C180",
      mode: "last",
      name: "Физика"
    },
    "Химия": {
      gid: 1532686743,
      range: "C3:C180",
      mode: "last",
      name: "Химия"
    }
  },
  class11_1: {
    sheetId: "1D7AjubNMiNcZuKU0aA7MOvxGHOD8RFKYH6WvtMGua0s",
    api: "class11_1_api",
    "Русский_язык": {
      gid: 0,
      range: "C3:C180",
      mode: "last",
      name: "Русский язык"
    },
    "Литература": {
      gid: 329233048,
      range: "C3:C180",
      mode: "last",
      name: "Литература"
    },
    "Английский_язык": {
      gid: 171674353,
      range: "C3:C180",
      mode: "last",
      name: "Английский язык"
    },
    "Математика": {
      gid: 624656389,
      range: "C3:C180",
      mode: "last",
      name: "Математика"
    },
    "Информатика": {
      gid: 1421083680,
      range: "C3:C180",
      mode: "last",
      name: "Информатика"
    },
    "История": {
      gid: 801015494,
      range: "C3:C180",
      mode: "last",
      name: "История"
    },
    "Обществознание": {
      gid: 370783621,
      range: "C3:C180",
      mode: "last",
      name: "Обществознание"
    },
    "География": {
      gid: 696023630,
      range: "C3:C180",
      mode: "last",
      name: "География"
    },
    "Биология": {
      gid: 611403980,
      range: "C3:C180",
      mode: "last",
      name: "Биология"
    },
    "Физика": {
      gid: 340190869,
      range: "C3:C180",
      mode: "last",
      name: "Физика"
    },
    "Химия": {
      gid: 1532686743,
      range: "C3:C180",
      mode: "last",
      name: "Химия"
    }
  },
  class11_2: {
    sheetId: "19WzVvOWy41xkinaKqjlGUmZu6htaGDLPuAstW-eeqVM",
    api: "class11_2_api",
    "Русский_язык": {
      gid: 0,
      range: "C3:C180",
      mode: "last",
      name: "Русский язык"
    },
    "Литература": {
      gid: 329233048,
      range: "C3:C180",
      mode: "last",
      name: "Литература"
    },
    "Английский_язык": {
      gid: 171674353,
      range: "C3:C180",
      mode: "last",
      name: "Английский язык"
    },
    "Математика": {
      gid: 624656389,
      range: "C3:C180",
      mode: "last",
      name: "Математика"
    },
    "Информатика": {
      gid: 1421083680,
      range: "C3:C180",
      mode: "last",
      name: "Информатика"
    },
    "История": {
      gid: 801015494,
      range: "C3:C180",
      mode: "last",
      name: "История"
    },
    "Обществознание": {
      gid: 370783621,
      range: "C3:C180",
      mode: "last",
      name: "Обществознание"
    },
    "География": {
      gid: 696023630,
      range: "C3:C180",
      mode: "last",
      name: "География"
    },
    "Биология": {
      gid: 611403980,
      range: "C3:C180",
      mode: "last",
      name: "Биология"
    },
    "Физика": {
      gid: 340190869,
      range: "C3:C180",
      mode: "last",
      name: "Физика"
    },
    "Химия": {
      gid: 1532686743,
      range: "C3:C180",
      mode: "last",
      name: "Химия"
    }
  }
};

// --- Словарь синонимов предметов ---
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
  'Окружающий мир': ['Окр.м','Окр.мир'],
  'Технология': ['Технол'],
  'Рисование': [],
  'Изобразительное искусство': ['ИЗО'],
  'Музыка': [],
  'Основы безопасности': ['ОБЖ', 'Основы безопасности жизнедеятельности'],
  'Начальные классы': ['Началка', 'Нач. классы', 'НК'],
  'Математика': ['Матем', 'Математ'],
  'Статистика': ['Вероятность и Статистика', 'ВиС', 'Вероятность', 'В', 'С'],
  'Геометрия': ['Геом', 'Г'],
  'Алгебра': ['Алг', 'А'],
  'Внеурочная деятельность': ['В.Д.'],
  'Настольный теннис': ['Нас.тен.', 'н.т.'],
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