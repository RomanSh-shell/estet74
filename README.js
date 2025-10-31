let FAIL = false
async function getRange(sheetConfig, range) {
  // Пробуем API
  try {
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetConfig.sheetId}/values/${range}?key=${sheetConfig.apiKey}`
    );
    
    if (!response.ok) throw new Error(`[${sheetConfig.name}]:API failed`);
    const data = await response.json();
    return data.values;
    
  } catch (error) { 
    // Если получить по API не получилось, переходим к обходу CORS 
    console.warn(`! Ошибка получения данных таблицы [${sheetConfig}] — неверный API, переход к обходу CORS |Получение API: https://ai2.appinventor.mit.edu/reference/other/googlesheets-api-setup.html`);

    const proxy = 'https://corsproxy.io/?';
    const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetConfig.sheetId}/export?format=csv&gid=${sheetConfig.gid}`;
    const response2 = await fetch(proxy + encodeURIComponent(csvUrl));
    
    if (!response2.ok) { 
      // Если и второй способ не сработал, возвращаем ручной выбор таблиц.
      console.error(`!!! [${sheetConfig.name}]: Не удалось получить данные`);
      FAIL = true 
      throw new Error(`Couldn't get data from table [${sheetConfig.name}]. Fallback to the old design`);
    }
    
    const csv = await response2.text();
    return csv.split('\n').map(row => row.split(','));
  }
}
//Из ячеек B2 таблиц расписания сохраняем текст соответствующий «ДД.ММ.» в массив DATES

//(Пользователю предоставляется выбор дня недели DAY По умолчанию DAY приравниваем следующему дня недели, если завтра СБ или ВС или ПН, то DAY = "Вся неделя")

//В таблице с расписанием нам нужен лист с выбранным пользователем днём недели DAY

//Из диапазона листа <DAY> D18:→18 составляем список elemGROUPS, а из диапазона D4:→4 список secondGROUPS. 

//создаём общий список классов
GROUPS = [...elemGROUPS, ...secondGROUPS]

//(Ах да, совсем забыл, пользователю предоставляется выбор ещё и из GROUPS, выбранное значение из текстового списка будет в GROUP, которое сохраняем в куки и берём изначально из них, если оно там есть)

//Для выбранного GROUP получаем диапазон на 12 ячеек вниз, сохраняем эти значения в список LESSONSandROOMS, пустые значения не убираем и не пропускаем.

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
  if (LESSONSandROOMS[i]) { // проверка на непустое значение (truthy)
    lastlessonNUM = i;
    break;
  }
}
//Если GROUP принадлежит elemGROUPS: Берём текст ячеек "C"+"firstlessonNUM+18" : "C"+"lastlessonNUM+18" в массив TIMES

//Если GROUP принадлежит secondGROUPS: Берём текст ячеек "C"+"firstlessonNUM+4" : "C"+"lastlessonNUM+4" в массив TIMES

//В таблице с домашним заданием открываем лист соответствующий LESSON in LESSONS, значение ячейки C2 добавляем в массив HOMETASK 
 
