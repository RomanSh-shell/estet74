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
  if (typeof cell !== 'string' || cell.trim() === '') {
    return null; 
  }

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
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/' + csvUrl;
    
    const response = await fetch(proxyUrl, {
        headers: {
            // Это нужно для cors-anywhere.herokuapp.com
            'X-Requested-With': 'XMLHttpRequest' 
        }
    });
    if (!response.ok) {
      throw new Error('Не удалось загрузить через proxy');
    }
    
    const csvText = await response.text();

    // !!! УДАЛИТЬ ЭТИ СТРОКИ ПОСЛЕ ОТЛАДКИ !!!  //
    console.log(`--- ПОЛНЫЙ CSV для ${sheetConfig.name} ---`);
    console.log(csvText); 
    console.log('-----------------------------------------');


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
    
    const isSingleRow = start.row === end.row;
    const isSingleColumn = start.col === end.col;
      
    if (isSingleColumn) {
      return result.map(row => row[0] || '');
    } 
    else if (isSingleRow) {
      return result[0];
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
  console.log('🔍 Загрузка расписания для дня:', dayIndex);
  
  // Если выбрана вся неделя
  if (dayIndex === 'all') {
    return await getWeekSchedule();
  }
  
  // Получаем списки классов
  console.log('📥 Загрузка списка классов...');
  const elemGROUPS = await getRange(days[`day${dayIndex}`], 'D18:AZ18');
  const secondGROUPS = await getRange(days[`day${dayIndex}`], 'D4:AZ4');
  let GROUPS = [...elemGROUPS, ...secondGROUPS];
  GROUPS = GROUPS.filter(groupName => groupName && groupName.trim() !== '');
  
  console.log('📋 Найдено классов:', GROUPS.length, GROUPS);
  
  // Получаем выбранную группу
  let GROUP = getCookie('selectedGroup');
  if (!GROUP || !GROUPS.includes(GROUP)) {
    GROUP = GROUPS[0];
    setCookie('selectedGroup', GROUP, 365);
  }
  
  console.log('🎯 Выбранный класс:', GROUP);
  
  // Находим индекс группы
  const groupIndex = GROUPS.indexOf(GROUP);
  const column = String.fromCharCode(68 + groupIndex);
  
  console.log('📍 Индекс класса:', groupIndex, 'Колонка:', column);
  
  // Определяем часть расписания
  const isElemGroup = elemGROUPS.includes(GROUP);
  const startRow = isElemGroup ? 18 + 1 : 4 + 1;
  const endRow = isElemGroup ? 29 + 1 : 15 + 1;
  
  console.log('📊 Диапазон строк:', startRow, '-', endRow);
  
  // Получаем уроки
  const LESSONSandROOMS = await getRange(
    days[`day${dayIndex}`], 
    `${column}${startRow}:${column}${endRow}`
  );
  
  console.log('📚 Загружено уроков:', LESSONSandROOMS.length, LESSONSandROOMS);
  
  // Находим первый и последний урок
  let firstlessonNUM = LESSONSandROOMS.findIndex(item => item && item.trim());
  let lastlessonNUM = -1;
  for (let i = LESSONSandROOMS.length - 1; i >= 0; i--) {
    if (LESSONSandROOMS[i] && LESSONSandROOMS[i].trim()) {
      lastlessonNUM = i;
      break;
    }
  }
  
  console.log('🔢 Первый урок:', firstlessonNUM, 'Последний урок:', lastlessonNUM);
  
  if (firstlessonNUM === -1 || lastlessonNUM === -1) {
    console.warn('⚠️ Уроки не найдены');
    return { schedule: [], GROUPS, selectedGroup: GROUP };
  }
  
  // Получаем время
  const TIMES = await getRange(
    days[`day${dayIndex}`], 
    `C${startRow + firstlessonNUM}:C${startRow + lastlessonNUM + 1}`
  );
  
  console.log('⏰ Время уроков:', TIMES);
  
  // Обрабатываем предметы
  const relevantLessons = LESSONSandROOMS.slice(firstlessonNUM, lastlessonNUM + 1);
  console.log('📖 Обработка предметов:', relevantLessons);
  
  const processedLessons = processSubjects(relevantLessons);
  console.log('✅ Обработанные предметы:', processedLessons);
  
  // Получаем домашнее задание
  const hometasks = await Promise.all(
    processedLessons.map(async (lesson) => {
      if (!lesson.subject) return '';

      // !!! ИСПРАВЛЕНИЕ: Используем GROUP целиком и делаем его устойчивым к ошибкам
      const groupSearchTerm = GROUP ? GROUP.split('-')[0].trim() : '';

      if (!groupSearchTerm) return '';

      const classKey = Object.keys(classes).find(key => 
        // Ищем ключ, имя которого (например, "5/1 класс") совпадает с частью группы
        classes[key].name.includes(groupSearchTerm)
      );
      
      if (!classKey) {
        console.warn(`Не найден класс-ключ для группы: ${GROUP}`);
        return '';
      }
      
      try {
        const hometask = await getRange(classes[classKey], `'${lesson.subject}'!C2`);
        return hometask[0] || '';
      } catch (error) {
        console.warn('Не удалось получить ДЗ для', lesson.subject);
        return '';
      }
    })
  ); 
  
  console.log('📝 Домашние задания:', hometasks);
  
  // Формируем финальный массив
  const schedule = processedLessons.map((lesson, index) => ({
    lesson: firstlessonNUM + index + 1,
    time: TIMES[index] || '',
    subject: lesson.subject,
    room: lesson.room,
    metadata: lesson.metadata,
    hometask: hometasks[index] || ''
  }));
  
  console.log('✨ Финальное расписание:', schedule);
  
  return { schedule, GROUPS, selectedGroup: GROUP };
}

// Функция для получения расписания на всю неделю
async function getWeekSchedule() {
  const weekSchedule = [];
  const dayNames = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница'];
  
  const elemGROUPS_raw = await getRange(days[`day${dayIndex}`], 'D4:AZ4');
  const secondGROUPS_raw = await getRange(days[`day${dayIndex}`], 'D18:AZ18');

  const elemGROUPS = elemGROUPS_raw.filter(g => g && g.trim());
  const secondGROUPS = secondGROUPS_raw.filter(g => g && g.trim());

  let GROUPS = [...elemGROUPS, ...secondGROUPS];
  
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
