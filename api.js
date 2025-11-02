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

// Функция для конвертации A1 нотации в индексы
function a1ToIndex(cell) {
  const match = cell.match(/^([A-Z]+)(\d+)$/);
  if (!match) return null;
  
  const col = match[1];
  const row = parseInt(match[2]) - 1;
  
  let colIndex = 0;
  for (let i = 0; i < col.length; i++) {
    colIndex = colIndex * 26 + (col.charCodeAt(i) - 64);
  }
  colIndex--;
  
  return { row, col: colIndex };
}

async function getRange(sheetConfig, range) {
  // Сначала пробуем API
  if (sheetConfig.api) {
    try {
      const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${sheetConfig.id}/values/${range}?key=${sheetConfig.api}`
      );
      
      if (response.ok) {
        const data = await response.json();
        let result = data.values || [];

        const rangeParts = range.split(':');
        const isSingleColumn = rangeParts[0].charAt(0) === rangeParts[1]?.charAt(0);

        if (result.length > 0 && isSingleColumn) {
          result = result.map(row => row[0] || '');
        }

        return result;
      }
    } catch (error) {
      console.warn(`API ключ не работает для [${sheetConfig.name}]`);
    }
  }
  
  // Если API не сработал, используем CORS proxy
  console.warn(`Использую CORS proxy для [${sheetConfig.name}]`);
  
  try {
    // Парсим диапазон
    const [startCell, endCell] = range.split(':');
    const start = a1ToIndex(startCell);
    const end = a1ToIndex(endCell);
    
    if (!start || !end) {
      throw new Error('Неверный формат диапазона');
    }
    
    // Загружаем CSV через proxy
    const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetConfig.id}/export?format=csv&gid=${sheetConfig.gid}`;
    const proxyUrl = 'https://api.allorigins.win/raw?url=' + encodeURIComponent(csvUrl);
    
    const response = await fetch(proxyUrl);
    
    if (!response.ok) {
      throw new Error('Не удалось загрузить через proxy');
    }
    
    const csvText = await response.text();
    const rows = csvText.split('\n').map(row => {
      // Простой CSV парсер (учитывает кавычки)
      const cells = [];
      let cell = '';
      let inQuotes = false;
      
      for (let i = 0; i < row.length; i++) {
        const char = row[i];
        
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          cells.push(cell.trim());
          cell = '';
        } else {
          cell += char;
        }
      }
      cells.push(cell.trim());
      
      return cells;
    });
    
    // Извлекаем нужный диапазон
    const result = [];
    for (let r = start.row; r <= end.row; r++) {
      if (r < rows.length) {
        const rowData = [];
        for (let c = start.col; c <= end.col; c++) {
          rowData.push(rows[r][c] || '');
        }
        result.push(rowData);
      }
    }
    
    // Если это один столбец, возвращаем плоский массив
    const isSingleColumn = start.col === end.col;
    if (isSingleColumn) {
      return result.map(row => row[0] || '');
    }
    
    return result;
    
  } catch (error) {
    console.error(`!!! [${sheetConfig.name}]: Не удалось получить данные`, error);
    FAIL = true;
    throw error;
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
