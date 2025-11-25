////////////////////api.js//////////////////////
//     Получение данных из таблиц и куки      //
////////////////////////////////////////////////

// --- Вспомогательные функции ---

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

// --- УТИЛИТЫ ---

const requestCache = new Map(); // Кеш для запросов

// Корректный парсер CSV (не ломается от переносов строк внутри ячеек)
function parseCSV(text) {
    const rows = [];
    let currentRow = [];
    let currentCell = '';
    let inQuotes = false;

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const nextChar = text[i + 1];

        if (char === '"') {
            if (inQuotes && nextChar === '"') {
                currentCell += '"'; // Экранированная кавычка
                i++;
            } else {
                inQuotes = !inQuotes;
            }
        } else if (char === ',' && !inQuotes) {
            currentRow.push(currentCell.trim());
            currentCell = '';
        } else if ((char === '\r' || char === '\n') && !inQuotes) {
            if (char === '\r' && nextChar === '\n') i++;
            currentRow.push(currentCell.trim());
            rows.push(currentRow);
            currentRow = [];
            currentCell = '';
        } else {
            currentCell += char;
        }
    }
    if (currentCell || currentRow.length) {
        currentRow.push(currentCell.trim());
        rows.push(currentRow);
    }
    return rows;
}

function a1ToIndex(cell) {
  if (typeof cell !== 'string' || cell.trim() === '') return null;
  const match = cell.match(/^([A-Z]+)(\d+)$/);
  if (!match) return null;

  const colLetters = match[1];
  const rowNumber = parseInt(match[2], 10);

  let colIndex = 0;
  for (let i = 0; i < colLetters.length; i++) {
    colIndex = colIndex * 26 + (colLetters.charCodeAt(i) - 'A'.charCodeAt(0) + 1);
  }

  return { row: rowNumber - 1, col: colIndex - 1 };
}

// Функция расширения диапазона вправо (C3:C10 -> C3:D10)
function getNextColumn(rangeString) {
  const parts = rangeString.split(':');
  const start = parts[0];
  const end = parts.length > 1 ? parts[1] : parts[0];

  // Магия инкремента буквы (работает даже для Z -> AA)
  const incrementCol = (colStr) => {
      let chars = colStr.split('');
      let i = chars.length - 1;
      while (i >= 0) {
          if (chars[i] !== 'Z') {
              chars[i] = String.fromCharCode(chars[i].charCodeAt(0) + 1);
              return chars.join('');
          }
          chars[i] = 'A';
          i--;
      }
      return 'A' + chars.join('');
  };

  const newEnd = end.replace(/([A-Z]+)(\d+)/, (match, col, row) => {
      return incrementCol(col) + row;
  });

  return `${start}:${newEnd}`;
}


// --- GET RANGE ---

async function getRange(sheetConfig, range, mode = null) {
  const logName = sheetConfig.name || sheetConfig.id || 'Неизвестная таблица';

  const processData = (data) => {
    if (!mode) return data;

    const flatData = (Array.isArray(data) ? data.flat(Infinity) : [data])
      .filter(cell => cell && String(cell).trim() !== '');

    if (flatData.length === 0) return '';

    // Проверяем, передан ли объект с searchText
    // mode может быть: 'first', 'last', { type: 'first', searchText: '...' }, { type: 'last', searchText: '...' }
    const modeType = typeof mode === 'string' ? mode : mode?.type;
    const searchText = typeof mode === 'object' ? mode?.searchText : null;

    if (modeType === 'first') {
      if (searchText) {
        // Ищем первую ячейку, содержащую searchText
        const found = flatData.find(cell => 
          String(cell).toLowerCase().includes(String(searchText).toLowerCase())
        );
        return found || '';
      }
      return flatData[0];
    }

    if (modeType === 'last') {
      if (searchText) {
        // Ищем последнюю ячейку, содержащую searchText
        let found = '';
        for (let i = flatData.length - 1; i >= 0; i--) {
          if (String(flatData[i]).toLowerCase().includes(String(searchText).toLowerCase())) {
            found = flatData[i];
            break;
          }
        }
        return found;
      }
      return flatData[flatData.length - 1];
    }

    return data;
  };

  // 1. API (с кешированием)
  if (sheetConfig.api) {
    try {
      const cacheKey = `api_${sheetConfig.id}_${range}`;
      // Если запрос уже летит, возвращаем тот же промис
      if (!requestCache.has(cacheKey)) {
          const promise = fetch(
            `https://sheets.googleapis.com/v4/spreadsheets/${sheetConfig.id}/values/${range}?key=${sheetConfig.api}`
          ).then(res => res.ok ? res.json() : Promise.reject(res));
          requestCache.set(cacheKey, promise);
          // Удаляем из кеша через 10 сек, чтобы можно было обновить
          setTimeout(() => requestCache.delete(cacheKey), 10000);
      }

      const data = await requestCache.get(cacheKey);
      let result = data.values || [];

      // Логика одной колонки
      const rangeParts = range.split(':');
      const isSingleColumn = rangeParts[0].replace(/\d+/g, '') === (rangeParts[1] || '').replace(/\d+/g, '');

      if (result.length > 0 && isSingleColumn) {
        result = result.map(row => row[0] || '');
      }
      return processData(result);

    } catch (error) {
      console.warn(`API сбой для [${logName}]:`, error);
      // Если API упал, идем в Proxy, удалив ошибочный кеш
      requestCache.delete(`api_${sheetConfig.id}_${range}`);
    }
  }

  // 2. Proxy (CSV)
  console.log(`Proxy запрос для [${logName}], диапазон: ${range}`);

  try {
    const [startCell, endCell] = range.split(':');
    const start = a1ToIndex(startCell);
    const end = a1ToIndex(endCell || startCell);

    if (!start || !end) throw new Error('Неверный формат диапазона');

    // КЛЮЧЕВОЕ УЛУЧШЕНИЕ: Кешируем весь лист целиком
    // Мы качаем файл один раз, а потом режем из него куски
    const sheetCacheKey = `csv_${sheetConfig.id}_${sheetConfig.gid}`;

    if (!requestCache.has(sheetCacheKey)) {

      // Формируем запрос к воркеру с параметрами
      const proxyUrl = `${WORKER_HOST}?id=${sheetConfig.id}&gid=${sheetConfig.gid}`;

      console.log(`Запрос к Worker: ${proxyUrl}`);

      const promise = fetch(proxyUrl)
      .then(res => {
          if (!res.ok) throw new Error(`Ошибка Worker: ${res.status}`);
          return res.text();
      })
      .then(text => parseCSV(text));

      requestCache.set(sheetCacheKey, promise);

      // а этот нужен просто чтобы не дергать сеть при переключении вкладок браузера туда-сюда.
      setTimeout(() => requestCache.delete(sheetCacheKey), 20000);
  }

    // Ждем (или берем готовый) результат парсинга
    const rows = await requestCache.get(sheetCacheKey);

    // Вырезаем нужный диапазон из памяти
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

    let finalResult = result;
    const isSingleRow = start.row === end.row;
    const isSingleColumn = start.col === end.col;

    if (isSingleColumn) finalResult = result.map(row => row[0] || '');
    else if (isSingleRow) finalResult = result[0];

    return processData(finalResult);

  } catch (error) {
    console.error(`Ошибка getRange [${logName}]:`, error);
    throw error;
  }
}


// --- ОСНОВНЫЕ ФУНКЦИИ ---

async function getGroupsList(dayIndex) {
    const realDayIndex = (dayIndex === 'all' || dayIndex === 'undefined') ? 0 : dayIndex;
    const dayConfig = (typeof days !== 'undefined') ? days[`day${realDayIndex}`] : null;

    if (!dayConfig) return [];

    try {
        // ПАРАЛЛЕЛЬНЫЙ ЗАПУСК (Promise.all)
        // Благодаря кешированию выше, первый запрос начнет скачивание CSV,
        // а остальные два просто "подцепятся" к этому же процессу.
        // Экономия трафика: 3x. Ускорение: 3x.
        const [topGroups, bottomGroups, middleGroups] = await Promise.all([
            getRange(dayConfig, 'D4:AZ4'),
            getRange(dayConfig, 'D28:AZ28'),
            getRange(dayConfig, 'B18:Z18')
        ]);

        return [
            ...(topGroups || []),
            ...(bottomGroups || []),
            ...(middleGroups || [])
        ]
        .map(g => String(g || '').trim())
        .filter(g => g !== '');
    } catch (e) {
        console.error("Ошибка getGroupsList:", e);
        return [];
    }
}


async function getSchedule(dayIndex, groupName) {

  // Очищаем весь кеш перед загрузкой нового дня
  requestCache.clear();

  if (dayIndex === 'all') return await getWeekSchedule(groupName);
  if (!groupName) throw new Error("Группа не указана");

  // Обратите внимание: убедитесь, что переменная days доступна!
  // Если она в другом файле, всё ок.
  const dayConfig = (typeof days !== 'undefined') ? days[`day${dayIndex}`] : null;
  if (!dayConfig) return { schedule: [] }; // Защита от null

  let processedLessons = [];
  let TIMES = [];

  try {
      // А. КООРДИНАТЫ (Запускаем параллельно для скорости)
      const [rowTopRaw, rowBotRaw, rowMidRaw] = await Promise.all([
           getRange(dayConfig, 'D4:AZ4'),
           getRange(dayConfig, 'D28:AZ28'),
           getRange(dayConfig, 'B18:Z18')
      ]);

      const rowTop = (rowTopRaw || []).map(g => String(g || '').trim());
      const rowBot = (rowBotRaw || []).map(g => String(g || '').trim());
      const rowMid = (rowMidRaw || []).map(g => String(g || '').trim());

        let groupIndex = -1;
        let startRow, endRow, baseAscii;

        if (rowTop.includes(groupName)) {
            groupIndex = rowTop.indexOf(groupName);
            baseAscii = 68; // D
            startRow = 5; endRow = 16;
        } else if (rowBot.includes(groupName)) {
            groupIndex = rowBot.indexOf(groupName);
            baseAscii = 68; // D
            startRow = 19; endRow = 30;
        } else if (rowMid.includes(groupName)) {
            groupIndex = rowMid.indexOf(groupName);
            baseAscii = 66; // B
            startRow = 5; endRow = 16;
        } else {
            return { schedule: [] };
        }

        const column = String.fromCharCode(baseAscii + groupIndex);

        // Б. УРОКИ
        const lessonsRange = `${column}${startRow}:${column}${endRow}`;
        const LESSONSandROOMS = await getRange(dayConfig, lessonsRange);

        let firstlessonNUM = LESSONSandROOMS.findIndex(item => String(item || '').trim());
        let lastlessonNUM = -1;
        for (let i = LESSONSandROOMS.length - 1; i >= 0; i--) {
            if (String(LESSONSandROOMS[i] || '').trim()) {
                lastlessonNUM = i;
                break;
            }
        }
        if (firstlessonNUM === -1 || lastlessonNUM === -1) return { schedule: [] };

        TIMES = await getRange(dayConfig, `C${startRow + firstlessonNUM}:C${startRow + lastlessonNUM}`);
        const relevantLessons = LESSONSandROOMS.slice(firstlessonNUM, lastlessonNUM + 1); 
        processedLessons = processSubjects(relevantLessons, TIMES); 

        // Д. ДОМАШНЕЕ ЗАДАНИЕ (Исправленное создание ключа)

        // 1. Нормализуем имя группы: "10 - 1" -> "10_1"
        // Заменяем любую последовательность не-цифр на одно подчеркивание
        let rawKey = groupName.toLowerCase().replace(/\D+/g, '_').replace(/^_|_$/g, '');
        let groupKey = 'class' + rawKey;

        // ДИАГНОСТИКА ДЛЯ КОНСОЛИ
        console.log(`🔎 ДЗ: Ищу конфиг для группы "${groupName}" -> Ключ: "${groupKey}"`);

        const classConfig = classes[groupKey];

        if (classConfig) {
            const homeworkPromises = processedLessons.map(async lesson => {
                lesson.hometask = null;
                if (!lesson.subject) return lesson;

                const subjectNameOnly = lesson.subject.replace(/[\d\/\.\,\(\)\s]*$/, '').toLowerCase().trim();
                const canonicalName = REVERSE_MAP_DATA.map[subjectNameOnly];

                let subjectConfig = null;
                for (const key in classConfig) {
                    if (classConfig[key]?.name === canonicalName) {
                        subjectConfig = classConfig[key];
                        break;
                    }
                }

                if (subjectConfig?.range) {
                    try {
                        const fetchConfig = {
                            id: classConfig.sheetId,
                            api: classConfig.api,
                            gid: subjectConfig.gid,
                            name: `${groupName} — ${subjectConfig.name} (ДЗ)`
                        };

                        const expandedRange = getNextColumn(subjectConfig.range);
                        const rawRows = await getRange(fetchConfig, expandedRange); // Ищем сразу и дату, и текст

                        if (Array.isArray(rawRows) && rawRows.length > 0) {
                            const validRows = rawRows.filter(row => row && row[0] && String(row[0]).trim() !== '');
                            if (validRows.length > 0) {
                                let targetRow = (subjectConfig.mode === 'first') ? validRows[0] : validRows[validRows.length - 1];
                                if (targetRow) {
                                    lesson.hometask = {
                                        metadata: String(targetRow[0] || '').trim(),
                                        task: String(targetRow[1] || '').trim()
                                    };
                                }
                            }
                        }
                    } catch (e) {
                        console.warn(`Ошибка ДЗ для предмета ${canonicalName}:`, e);
                    }
                }
                return lesson;
            });
            processedLessons = await Promise.all(homeworkPromises);
        } else {
             console.warn(`⚠️ ВНИМАНИЕ: В settings.js нет ключа "${groupKey}", поэтому ДЗ не грузится!`);
        }

        // Е. ФИНАЛ
        const finalSchedule = processedLessons.map((lesson, index) => ({
            lesson: index + 1,
            time: String(TIMES[index] || '').trim(),
            subject: String(lesson.subject || '').trim(),
            room: String(lesson.room || '').trim(),
            metadata: String(lesson.metadata || '').trim(),
            hometask: lesson.hometask?.task || lesson.hometask?.metadata || ''
      }));

      return { schedule: finalSchedule };

    } catch (error) {
      console.error(`Ошибка загрузки [${groupName}]:`, error.message);
      // Бросаем ошибку дальше, чтобы интерфейс понял, что надо включить failMode
      throw error;
    }
}

async function getWeekSchedule(groupName) {
  const weekSchedule = [];
  const daynames = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница'];
  if (!groupName) return { weekSchedule: [] };

  for (let i = 0; i < daynames.length; i++) {
    const dayData = await getSchedule(i, groupName);
    weekSchedule.push({
      dayName: daynames[i],
      schedule: dayData.schedule
    });
  }
  return { weekSchedule };
}
