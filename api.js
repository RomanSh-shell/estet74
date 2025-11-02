////////////////////api.js//////////////////////
// Работа с куки
function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 86400000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [cookieName, cookieValue] = cookie.trim().split('=');
    if (cookieName === name) {
      return decodeURIComponent(cookieValue);
    }
  }
  return null;
}

// Получение данных из Google Sheets
let FAIL = false;
async function getRange(sheetConfig, range) {
  try {
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetConfig.id}/values/${range}?key=${sheetConfig.api}`
    );
    
    if (!response.ok) throw new Error(`[${sheetConfig.name}]: API failed`);
    const data = await response.json();
    let result = data.values || [];

    const rangeParts = range.split(':');
    const isSingleColumn = rangeParts.length > 1 && rangeParts[0].charAt(0) === rangeParts[1].charAt(0);
    const isSingleRow = rangeParts.length > 1 && rangeParts[0].match(/\d+/)[0] === rangeParts[1].match(/\d+/)[0];

    if (result.length > 0) {
        if (isSingleColumn) {
            result = result.map(row => row[0] || '');
        } else if (isSingleRow) {
            result = result[0].map(item => item || '');
        }
    }

    return result;
    
  } catch (error) { 
    console.warn(`! Ошибка получения данных таблицы [${sheetConfig.name}] — неверный API, переход к обходу CORS`);

    const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetConfig.id}/export?format=csv&gid=${sheetConfig.gid}`;
    const proxyUrl = 'https://api.allorigins.win/raw?url=' + encodeURIComponent(csvUrl);
    const response2 = await fetch(proxyUrl);
    
    if (!response2.ok) { 
      console.error(`!!! [${sheetConfig.name}]: Не удалось получить данные`);
      FAIL = true;
      throw new Error(`Couldn't get any data from table [${sheetConfig.name}]`);
    }
    
    const csv = await response2.text();
    let result = csv.split('\n').map(row => row.split(','));

    const rangeParts = range.split(':');
    const isSingleColumn = rangeParts.length > 1 && rangeParts[0].charAt(0) === rangeParts[1].charAt(0);
    const isSingleRow = rangeParts.length > 1 && rangeParts[0].match(/\d+/)[0] === rangeParts[1].match(/\d+/)[0];

    if (result.length > 0) {
        if (isSingleColumn) {
            result = result.map(row => row[0] || '');
        } else if (isSingleRow) {
            result = result[0].map(item => item || '');
        }
    }
    return result;
  }
}

// Главная функция получения расписания
async function getSchedule(dayIndex) {
  // Если выбрана вся неделя
  if (dayIndex === 'all') {
    return await getWeekSchedule();
  }
  
  // Получаем списки классов
  const elemGROUPS = await getRange(days[`day${dayIndex}`], 'D18:AZ18');
  const secondGROUPS = await getRange(days[`day${dayIndex}`], 'D4:AZ4');
  const GROUPS = [...elemGROUPS, ...secondGROUPS];
  
  // Получаем выбранную группу
  let GROUP = getCookie('selectedGroup');
  if (!GROUP || !GROUPS.includes(GROUP)) {
    GROUP = GROUPS[0];
    setCookie('selectedGroup', GROUP, 365);
  }
  
  // Находим индекс группы
  const groupIndex = GROUPS.indexOf(GROUP);
  const column = String.fromCharCode(68 + groupIndex);
  
  // Определяем часть расписания
  const isElemGroup = elemGROUPS.includes(GROUP);
  const startRow = isElemGroup ? 18 : 4;
  const endRow = isElemGroup ? 29 : 15;
  
  // Получаем уроки
  const LESSONSandROOMS = await getRange(
    days[`day${dayIndex}`], 
    `${column}${startRow}:${column}${endRow}`
  );
  
  // Находим первый и последний урок
  let firstlessonNUM = LESSONSandROOMS.findIndex(item => item && item.trim());
  let lastlessonNUM = -1;
  for (let i = LESSONSandROOMS.length - 1; i >= 0; i--) {
    if (LESSONSandROOMS[i] && LESSONSandROOMS[i].trim()) {
      lastlessonNUM = i;
      break;
    }
  }
  
  if (firstlessonNUM === -1 || lastlessonNUM === -1) {
    return { schedule: [], GROUPS, selectedGroup: GROUP };
  }
  
  // Получаем время
  const TIMES = await getRange(
    days[`day${dayIndex}`], 
    `C${startRow + firstlessonNUM}:C${startRow + lastlessonNUM + 1}`
  );
  
  // Обрабатываем предметы
  const relevantLessons = LESSONSandROOMS.slice(firstlessonNUM, lastlessonNUM + 1);
  const processedLessons = processSubjects(relevantLessons);
  
  // Получаем домашнее задание
  const hometasks = await Promise.all(
    processedLessons.map(async (lesson) => {
      if (!lesson.subject) return '';
      
      const classKey = Object.keys(classes).find(key => 
        classes[key].name.includes(GROUP.split('-')[0])
      );
      
      if (!classKey) return '';
      
      try {
        const hometask = await getRange(classes[classKey], `'${lesson.subject}'!C2`);
        return hometask[0] || '';
      } catch (error) {
        return '';
      }
    })
  );
  
  // Формируем финальный массив
  const schedule = processedLessons.map((lesson, index) => ({
    lesson: firstlessonNUM + index + 1,
    time: TIMES[index] || '',
    subject: lesson.subject,
    room: lesson.room,
    metadata: lesson.metadata,
    hometask: hometasks[index] || ''
  }));
  
  return { schedule, GROUPS, selectedGroup: GROUP };
}

// Функция для получения расписания на всю неделю
async function getWeekSchedule() {
  const weekSchedule = [];
  const dayNames = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница'];
  
  // Получаем группы из понедельника
  const elemGROUPS = await getRange(days['day0'], 'D18:AZ18');
  const secondGROUPS = await getRange(days['day0'], 'D4:AZ4');
  const GROUPS = [...elemGROUPS, ...secondGROUPS];
  
  let GROUP = getCookie('selectedGroup');
  if (!GROUP || !GROUPS.includes(GROUP)) {
    GROUP = GROUPS[0];
    setCookie('selectedGroup', GROUP, 365);
  }
  
  // Загружаем расписание для каждого дня
  for (let dayIndex = 0; dayIndex < 5; dayIndex++) {
    const dayData = await getSchedule(dayIndex);
    weekSchedule.push({
      dayName: dayNames[dayIndex],
      schedule: dayData.schedule
    });
  }
  
  return { weekSchedule, GROUPS, selectedGroup: GROUP };
}
