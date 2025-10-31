////////////////////////////////////////////////
const days = {
  day1: {
    name: 'Расписание на понедельник',
    id: '1rnYBzXaWr9dI1u8haxakKDiz7KK0IzjJ',
    api: '',
    gid: '0'
  },
  day2: {
    name: 'Расписание на вторник',
    id: '17Oz-Ld6NHA57SEKCiuAWQNYYngJ3_7LB',
    api: '',
    gid: '0'
  },
  day3: {
    name: 'Расписание на среду',
    id: '1Xt-HxVTrKzp4_3NcaBGbTYxKp_PGLeN2',
    api: '',
    gid: '0'
  },
  day4: {
    name: 'Расписание на четверг',
    id: '1oessjK-CwC-p_Kf0y1be61ZRwHq4jd4l',
    api: '',
    gid: '0'
  },
  day5: {
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
//////////////////////////////////////////////////////////
//---сохранение переменной в куки---//
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 86400000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
//---Получение данных из таблицы---//
let FAIL = false
async function getRange(sheetConfig, range) {
  // Пробуем API
  try {
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetConfig.id}/values/${range}?key=${sheetConfig.api}`
    );
    
    if (!response.ok) throw new Error(`[${sheetConfig.name}]: API failed`);
    const data = await response.json();
    let result = data.values || [];

    const rangeParts = range.split(':');
    const isSingleColumn = rangeParts[0].charAt(0) === rangeParts[1]?.charAt(0);

    if (result.length > 0 && isSingleColumn) {
        result = result.map(row => row[0]);
    }

    return result;
    
  } catch (error) { 
    // Если получить по API не получилось, переходим к обходу CORS 
    console.warn(`! Ошибка получения данных таблицы [${sheetConfig}] — неверный API, переход к обходу CORS |Получение API: https://ai2.appinventor.mit.edu/reference/other/googlesheets-api-setup.html`);

    const proxy = 'https://corsproxy.io/?';
    const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetConfig.id}/export?format=csv&gid=${sheetConfig.gid}`;
    const response2 = await fetch(proxy + encodeURIComponent(csvUrl));
    
    if (!response2.ok) { 
      // Если и второй способ не сработал, возвращаем ручной выбор таблиц.
      console.error(`!!! [${sheetConfig.name}]: Не удалось получить данные`);
      FAIL = true 
      throw new Error(`Couldn't get any data from table [${sheetConfig.name}]. Fallback to the old design`);
    }
    
    const csv = await response2.text();
    let result = csv.split('\n').map(row => row.split(','));

    const rangeParts = range.split(':');
    const isSingleColumn = rangeParts[0].charAt(0) === rangeParts[1]?.charAt(0);

    if (result.length > 0 && isSingleColumn) {
        result = result.map(row => row[0]);
    }
    return result;
  }
}

//---Приведение сокращений предметов к стандартному виду---//
function normalizeSubject(subjectString) {
  const subjectMap = {
    'Английский язык': ['Англ.яз', 'Английский', 'English', 'Анг.яз'],
    'Физкультура': ['Физ-ра', 'Физическая культура', 'Физра', 'Физ-культура'],
    'Русский язык': ['Рус.яз', 'Русский', 'Русский язык'],
    'Математика': ['Матем', 'Математика'],
    'Статистика': ['Вероятность и Статистика','ВиС','Вероятность', 'В', 'С'],
    'Геометрия': ['Геом', 'Г'],
    'Алгебра': ['Алг', 'А'],
    'Литература': ['Литер', 'Лит-ра'],
    'История': ['История', 'Истор'],
    'География': ['География', 'Геогр'],
    'Биология': ['Биология', 'Биол'],
    'Химия': ['Химия'],
    'Психология': ['Психол','Психолог'],
    'Физика': ['Физика'],
    'Информатика': ['Информатика', 'Информ'],
    'Обществознание': ['Обществ'],
    'Технология': ['Технология', 'Технол'],
    'Рисование': ['ИЗО', 'Изобразительное искусство'],
    'Музыка': ['Музыка'],
    'Основы безопасности': ['ОБЖ', 'Основы безопасности жизнедеятельности'],
    'Начальные классы': ['Началка', 'Нач. классы', 'НК'],
  };
  
  // Создаем обратный маппинг: сокращение → полное название
  const reverseMap = {};
  for (const [normalName, variants] of Object.entries(subjectMap)) {
    variants.forEach(variant => {
      reverseMap[variant.toLowerCase()] = normalName;
    });
    // Добавляем полное название
    reverseMap[normalName.toLowerCase()] = normalName;
  }
  
  const lowerInput = subjectString.trim().toLowerCase();
  return reverseMap[lowerInput] || subjectString; // Возвращаем полное название или оригинал
}




//Получаем порядковый номер следующего дня, где понедельник = 0
const day = ((new Date().getDay() + 6) % 7 + 1) % 7;

///////////////////////////////////////////////////////////

//Из диапазона листа <DAY> D18:→18 составляем список elemGROUPS, а из диапазона D4:→4 список secondGROUPS. 
const elemGROUPS = await getRange(days[`day${day}`], 'D18:AZ18')
const secondGROUPS = await getRange(days[`day${day}`], 'D4:AZ4')
const GROUPS = [...elemGROUPS, ...secondGROUPS] //объединяем в общий список классов

//(Ах да, совсем забыл, пользователю предоставляется выбор ещё и из GROUPS, выбранное значение из текстового списка будет в GROUP, которое сохраняем в куки и берём изначально из них, если оно там есть)
//Для выбранного GROUP получаем диапазон на 12 ячеек вниз, сохраняем эти значения в список LESSONSandROOMS, пустые значения не убираем и не пропускаем.
const column = String.fromCharCode(68 + groupIndex); //68 = D

if (elemGROUPS[0][groupIndex]) { // Если группа в elemGROUPS
    let LESSONSandROOMS = await getRange(days[`day${day}`], `${column}18:${column}29`);
  
} else { // Если группа в secondGROUPS
    let LESSONSandROOMS = await getRange(days[`day${day}`], `${column}4:${column}15`);
}

let LESSONS = LESSONSandROOMS.map(str => str.replace(/[^a-zA-Zа-яА-Я]/g, ""));
let ROOMS

//Получаем индекс первого непустого элемента в LESSONSandROOMS, к индексу прибавляем единицу и сохраняем в firstlessonNUM. 
let firstlessonNUM = -1;
for (let i = 0; i < 12; i++) {
  if (LESSONSandROOMS[i]) { // проверка на непустое значение (truthy)
    firstlessonNUM = i;
    break;
  }
}
//Получаем индекс последнего непустого элемента в LESSONSandROOMS, к индексу прибавляем единицу и сохраняем в lastlessonNUM. 
let lastlessonNUM = -1;
for (let i = 11; i >= 0; i--) {
  if (LESSONSandROOMS[i]) { //truthy
    lastlessonNUM = i;
    break;
  }
}

//получаем массив продолжительности уроков, отдельный для нижней и верхней части расписания
const TIMES = await getRange(
  days[`day${day}`], 
  `C${(elemGROUPS[0][groupIndex] ? 18 : 4) + firstlessonNUM}:C${(elemGROUPS[0][groupIndex] ? 18 : 4) + lastlessonNUM}` //Берём колонку C от начальной до конечной строки, 
);

//В таблице с домашним заданием открываем лист соответствующий LESSON in LESSONS, значение ячейки C2 добавляем в массив HOMETASK 





























