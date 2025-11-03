////////////////////api.js//////////////////////
// Работа с куки
function setCookie(data, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 86400000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = data + "=" + (value || "") + expires + "; path=/";
}

function getCookie(data) {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [cookiedata, cookieValue] = cookie.trim().split('=');
    if (cookiedata === data) {
      return decodeURIComponent(cookieValue);
    }
  }
  return null;
}

// Получение данных из Google Sheets
let FAIL = false;

// Функция для конвертации A2 нотации в индексы
function a2ToIndex(cell) {
  if (typeof cell !== 'string' || cell.trim() === '') {
    return null; 
  }

  const match = cell.match(/^([A-Z]+)(\d+)$/);
  if (!match) return null;
  
  const colLetters = match[1]; // Буквы столбца
  const rowNumber = parseInt(match[2], 10); // Номер строки
  
  // Индекс строки в массиве = Номер строки в Sheets - 1
  const rowIndex = rowNumber - 1; 
  
  let colIndex = 0;
  for (let i = 0; i < colLetters.length; i++) {
    colIndex = colIndex * 26 + (colLetters.charCodeAt(i) - 'A'.charCodeAt(0) + 1);
  }
  colIndex--;
  
  return { row: rowIndex, col: colIndex };
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
        const isSingleColumn = rangeParts[0].charAt(0) === rangeParts[2]?.charAt(0);

        if (result.length > 0 && isSingleColumn) {
          result = result.map(row => row[0] || '');
        }

        return result;
      }
    } catch (error) {
      console.warn(`API ключ не работает для [${sheetConfig.data}]`);
    }
  }
  
  // Если API не сработал, используем CORS proxy
  console.warn(`Использую CORS proxy для [${sheetConfig.data}]`);
  
  try {
    // Парсим диапазон
    const [startCell, endCell] = range.split(':');
    const start = a2ToIndex(startCell);
    const end = a2ToIndex(endCell);
    
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
    console.log(`--- ПОЛНЫЙ CSV для ${sheetConfig.data} ---`);
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
    console.error(`!!! [${sheetConfig.data}]: Не удалось получить данные`, error);
    FAIL = true;
    throw error;
  }
}

// Диапазон ДЗ на листе предмета
const HOMEWORK_RANGE = 'A1:D6'; 

/**
 * Ищет текст домашнего задания (колонка D) по метаданным (колонка C).
 * * @param {object} sheetConfig - Конфигурация таблицы класса.
 * @param {string} subjectdata - Имя листа (Предмет).
 * @param {string} targetMetadata - Искомое значение метаданных (C1-C6).
 * @returns {Promise<string>} - Текст домашнего задания или пустая строка.
 */
async function findHomeworkByMetadata(sheetConfig, subjectdata, targetMetadata) {
  if (!targetMetadata) return ''; 
    
  const fullRange = `'${subjectdata}'!${HOMEWORK_RANGE}`;
  
  try {
    const rawData = await getRange(sheetConfig, fullRange);
    
    if (!Array.isArray(rawData) || rawData.length === 0) {
        return ''; 
    }
    
    // Поиск строки по метаданным (C-колонка)
    const foundRow = rawData.find(row => {
        // row[2] - Метаданные (C), row[3] - Домашка (D)
        if (row.length < 4) return false;
        
        const metadataCol = String(row[2] || '').trim().toLowerCase();
        
        return metadataCol === targetMetadata.toLowerCase().trim();
    });

    // Возвращаем текст домашнего задания (D-колонка)
    return foundRow ? String(foundRow[3] || '').trim() : '';
    
  } catch (error) {
    console.warn(`Ошибка при поиске ДЗ для ${subjectdata} (Метаданные: ${targetMetadata})`, error);
    return '';
  }
}

// Главная функция получения расписания
async function getSchedule(dayIndex) {
    console.log('🔍 Загрузка расписания для дня:', dayIndex);
    
    if (dayIndex === 'all') {
        return await getWeekSchedule(); 
    }
    
    const dayConfig = days[`day${dayIndex}`]; 
    let GROUP = getCookie('selectedGroup');

    // Переменные для хранения данных, чтобы они были доступны вне try/catch 
    let GROUPS = [];
    let processedLessons = [];
    let TIMES = [];
    let hometasks = []; // <--- ИСПРАВЛЕНИЕ 1: Объявление hometasks

    try {
        // --- ЗАГРУЗКА ГРУПП ---
        const elemGROUPS = await getRange(dayConfig, 'D28:AZ28');
        const secondGROUPS = await getRange(dayConfig, 'D4:AZ4');
        GROUPS = [...(elemGROUPS || []), ...(secondGROUPS || [])]
            .map(groupdata => String(groupdata || '').trim())
            .filter(groupdata => groupdata !== '');
        
        if (!GROUP || !GROUPS.includes(GROUP)) {
            GROUP = GROUPS[0];
            setCookie('selectedGroup', GROUP, 365);
        }
        
        if (GROUPS.length === 0 || !GROUP) {
            throw new Error("Не удалось загрузить список групп или выбрать группу.");
        }
        
        const groupIndex = GROUPS.indexOf(GROUP);
        const column = String.fromCharCode(68 + groupIndex);
        const isElemGroup = elemGROUPS.map(g => String(g || '').trim()).includes(GROUP);
        const startRow = isElemGroup ? 19 : 5;
        const endRow = isElemGroup ? 30 : 16;
        
        console.log(`🎯 Выбранный класс: ${GROUP}`);
        console.log(`📍 Индекс класса: ${groupIndex} Колонка: ${column}`);
        console.log(`📊 Диапазон строк: ${startRow} - ${endRow}`);
        
        // --- ЗАГРУЗКА УРОКОВ ---
        const LESSONSandROOMS = await getRange(
            dayConfig, 
            `${column}${startRow}:${column}${endRow}`
        );
        
        console.log('📝 Исходные ячейки (LESSONSandROOMS):', LESSONSandROOMS);
        let firstlessonNUM = -1
        let lastlessonNUM = -1;
        firstlessonNUM = LESSONSandROOMS.findIndex(item => String(item || '').trim());
        for (let i = LESSONSandROOMS.length - 1; i >= 0; i--) {
            if (String(LESSONSandROOMS[i] || '').trim()) {
                lastlessonNUM = i;
                break;
            }
        }

        if (firstlessonNUM === -1 || lastlessonNUM === -1 || lastlessonNUM < firstlessonNUM) {
            throw new Error('Уроки не найдены или расписание пустое.');
        }

        TIMES = await getRange(
            dayConfig, 
            `C${startRow + firstlessonNUM}:C${startRow + lastlessonNUM}` 
        );
        
        const relevantLessons = LESSONSandROOMS.slice(firstlessonNUM, lastlessonNUM + 1); 
        processedLessons = processSubjects(relevantLessons, TIMES); 

        console.log(`📚 Загружено уроков: ${relevantLessons.length} (${processedLessons.length}) ${relevantLessons.slice(0, 4)}`);
        console.log(`🔢 Первый урок: ${firstlessonNUM} Последний урок: ${lastlessonNUM}`);
        console.log(`⏰ Время уроков: (${TIMES.length}) ${TIMES.slice(0, 4)}`);
        console.log(`✅ Обработанные предметы: (${processedLessons.length}) ${processedLessons.slice(0, 4)}`);

        // -----------------------------------------------------
        // 3. ПОЛУЧЕНИЕ ДОМАШНЕГО ЗАДАНИЯ
        // -----------------------------------------------------

        let classConfig = null;
        let groupKey = GROUP; 

        // 1. Преобразуем имя группы в формат ключа (например, "class5_1")
        groupKey = groupKey
            .toLowerCase()
            .replace(/[^\d\-\/\_]/g, ''); 

        // 2. Приводим все разделители к единому стандарту: подчеркиванию.
        groupKey = groupKey
            .replace(/-/g, '_')   
            .replace(/\//g, '_'); 

        // 3. Удаляем лишние подчеркивания в начале, конце и повторяющиеся
        groupKey = groupKey.replace(/_+/g, '_'); 
        groupKey = groupKey.replace(/^_|_$/g, '');

        // 4. Добавляем префикс "class"
        groupKey = 'class' + groupKey; 

        console.log('🔑 Ожидаемый ключ конфигурации:', groupKey);

        // 5. Ищем конфигурацию по сформированному ключу
        classConfig = classes[groupKey]; 

        if (!classConfig) {
          console.warn(`Не найдена конфигурация таблицы ДЗ для ключа: ${groupKey} (Ориг. группа: ${GROUP})`);
        }

        if (classConfig && classConfig.homework) {
            const classHomeworkMap = classConfig.homework; 

            // Перебираем обработанные уроки и добавляем поля ДЗ
            processedLessons = processedLessons.map(lesson => {
                if (!lesson.subject) {
                    return lesson;
                }
              
                // 1. Формируем ключ для поиска ДЗ (нормализованное имя предмета)
                const subjectKey = lesson.subject.toLowerCase();

                // 2. Ищем запись ДЗ
                const homeworkEntry = classHomeworkMap[subjectKey];
              
                // 3. Присоединяем ДЗ, используя вашу новую структуру
                if (homeworkEntry) {
                    lesson.hometask = homeworkEntry.hometask || null;
                    lesson.homeworkDate = homeworkEntry.date || null;
                    lesson.homeworkMeta = homeworkEntry.metadata || null;
                
                    // Логирование для отладки
                    console.log(`✅ ДЗ найдено для ${lesson.subject}: ${lesson.hometask}`);
                } else {
                    // Инициализируем поля, если ДЗ нет
                    lesson.hometask = null;
                    lesson.homeworkDate = null;
                    lesson.homeworkMeta = null;
                }
              
                return lesson;
            });
        }        
        // -----------------------------------------------------
        // 4. ФИНАЛЬНАЯ СБОРКА 
        // -----------------------------------------------------

        const finalSchedule = processedLessons.map((lesson, index) => {
            // ИСПРАВЛЕНИЕ 2: Гарантируем строковые значения для Vue
            const time = String(TIMES[index] || '').trim();
            
            return {
                lesson: index + 1, 
                time: time,
                subject: String(lesson.subject || '').trim(),
                room: String(lesson.room || '').trim(),
                metadata: String(lesson.metadata || '').trim(),
                hometask: String(hometasks[index] || '').trim()
            };
        });
        console.log('Уроки:', JSON.stringify(processedLessons));
        console.log('Домашние задания:', JSON.stringify(homeworkArray));
        return { schedule: finalSchedule, GROUPS, selectedGroup: GROUP };

    } catch (error) {
        console.error('⚠️ Критическая ошибка при обработке расписания:', error.message);
        
        // --- РЕЗЕРВНАЯ ЗАГРУЗКА ---
        try {
            // Предполагаем, что dayConfig — это объект с метаданными для вызова getRange
            const backupData = await getRange(dayConfig, 'D22'); 
            const message = Array.isArray(backupData) ? String(backupData[0] || '').trim() : String(backupData || '').trim();

            if (message) {
                 console.log('✅ Загружено запасное сообщение из D22:', message);
                 
                 const backupSchedule = [{
                     lesson: 1, 
                     time: "", 
                     subject: message, 
                     room: "", 
                     metadata: "Сообщение", 
                     hometask: "" 
                 }];
                 
                 return { schedule: backupSchedule, GROUPS, selectedGroup: GROUP || null };
            }
        } catch (e) {
            console.error('❌ Не удалось загрузить запасное сообщение из D22:', e.message);
        }

        // Возврат пустого расписания при полной ошибке
        return { schedule: [], GROUPS, selectedGroup: GROUP || null };
    }
}

// 3. Функция для получения расписания на всю неделю

async function getWeekSchedule() {
  const weekSchedule = [];
  const daydatas = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница'];
  
  // Берем конфигурацию первого дня для загрузки общего списка групп
  const dayConfig = days[`day0`]; 
  
  let GROUPS = [];
  let GROUP = getCookie('selectedGroup');
  
  try {
      const elemGROUPS_raw = await getRange(dayConfig, 'D28:AZ28');
      const secondGROUPS_raw = await getRange(dayConfig, 'D4:AZ4');
      
      // БЕЗОПАСНАЯ ФИЛЬТРАЦИЯ
      GROUPS = [...(elemGROUPS_raw || []), ...(secondGROUPS_raw || [])]
          .map(g => String(g || '').trim())
          .filter(g => g !== '');
          
      if (!GROUP || !GROUPS.includes(GROUP)) {
        GROUP = GROUPS[0];
        setCookie('selectedGroup', GROUP, 365);
      }
      
  } catch (error) {
      console.error('Ошибка загрузки списка групп для недели:', error);
      // Если не смогли загрузить группы, недельное расписание не сработает
      return { weekSchedule: [], GROUPS: [], selectedGroup: null };
  }
  
  // Загружаем расписание для каждого дня
  for (let dayIndex = 0; dayIndex < daydatas.length; dayIndex++) {
    // Вызываем getSchedule для каждого дня
    const dayData = await getSchedule(dayIndex); 
    
    weekSchedule.push({
      daydata: daydatas[dayIndex],
      schedule: dayData.schedule
    });
  }
  
  return { weekSchedule, GROUPS, selectedGroup: GROUP };
}

