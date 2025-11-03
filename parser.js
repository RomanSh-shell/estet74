////////////////////parser.js//////////////////////
// Создаём обратную карту для быстрого поиска
const REVERSE_MAP_DATA = (() => {
  const map = {};
  const allVariants = [];
  
  for (const [normaldata, variantList] of Object.entries(SUBJECT_MAP)) {
    const lowerNormal = normaldata.toLowerCase();
    allVariants.push(lowerNormal);
    map[lowerNormal] = normaldata;
    
    variantList.forEach(variant => {
      const lowerVariant = variant.toLowerCase();
      allVariants.push(lowerVariant);
      map[lowerVariant] = normaldata;
    });
  }
  
  return { map, allVariants };
})();

// Вспомогательные функции
function levenshteinDistance(a, b) {
  const matrix = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      matrix[i][j] = b[i - 1] === a[j - 1] 
        ? matrix[i - 1][j - 1]
        : Math.min(matrix[i - 1][j - 1], matrix[i][j - 1], matrix[i - 1][j]) + 1;
    }
  }
  return matrix[b.length][a.length];
}

function findClosestMatch(input, options, maxDistance = 2) {
  if (!input || typeof input !== 'string') return null;
  if (!options || options.length === 0) return null;
  if (options.includes(input)) return input;
  
  let minDistance = Infinity;
  let closestOption = null;
  
  for (const option of options) {
    const distance = levenshteinDistance(input, option);
    if (distance < minDistance && distance <= maxDistance) {
      minDistance = distance;
      closestOption = option;
    }
  }
  
  return closestOption;
}

function cleanProblematicAbbreviations(str) {
  if (!str || typeof str !== 'string') return '';
  return str.trim().replace(/\.яз|\.ра|-ра/gi, '');
}

// ШАГ 2: Разбиение на subject, metadata, room
function parseSubjectParts(str) {
  if (!str || typeof str !== 'string') {
    return { subject: '', metadata: '', room: '' };
  }
  
  const cleanedStr = cleanProblematicAbbreviations(str);
  
  const patterns = [
    {
      regex: /^(.+?)\(([^)]+)\)(.+)$/,
      handler: (match) => ({
        subject: match[1].trim(),
        metadata: match[2].trim(),
        room: match[3].trim()
      })
    },
    {
      regex: /^(.+?)([А-ЯЁ]{1,3})(\d+[а-яё]?)$/u,
      handler: (match) => ({
        subject: match[1].trim(),
        metadata: match[2].trim(),
        room: match[3].trim()
      })
    },
    {
      regex: /^(.+?)\.(.+)$/,
      handler: (match) => ({
        subject: match[1].trim(),
        metadata: '',
        room: match[2].trim()
      })
    },
    {
      regex: /^(.+?)(\d+[а-яё]?|\d+\/\d+)$/u,
      handler: (match) => match[1].trim() ? ({
        subject: match[1].trim(),
        metadata: '',
        room: match[2].trim()
      }) : null
    }
  ];
  
  for (const pattern of patterns) {
    const match = cleanedStr.match(pattern.regex);
    if (match) {
      const parsed = pattern.handler(match);
      if (parsed) return parsed;
    }
  }
  
  return { subject: str, metadata: '', room: '' };
}

// ШАГ 3: Исправление опечаток
function correctTypos(parts) {
  const result = { ...parts };
  
  if (result.subject) {
    const closest = findClosestMatch(
      result.subject.toLowerCase(), 
      REVERSE_MAP_DATA.allVariants,
      2
    );
    if (closest) {
      result.subject = closest;
    }
  }
  
  if (result.metadata) {
    const closest = findClosestMatch(
      result.metadata.toLowerCase(), 
      REVERSE_MAP_DATA.allVariants,
      2
    );
    if (closest) {
      result.metadata = closest;
    }
  }
  
  if (result.room) {
        // Если содержит цифру, мы считаем это номером кабинета и не исправляем.
        if (!/\d/.test(result.room)) { 
            const closest = findClosestMatch(
                result.room.toLowerCase(),
                REVERSE_MAP_DATA.allVariants,
                2
            );
            if (closest) {
                // Если найдено ближайшее совпадение в списке предметов,
                // заменяем нечисловой кабинет на исправленное название.
                result.room = closest; 
            }
        }
    }

    return result;
}

// ШАГ 4: Приведение к полному виду
function expandAbbreviations(parts) {
  const result = { ...parts };
  
  if (result.subject) {
    const lowerSubject = result.subject.toLowerCase();
    if (REVERSE_MAP_DATA.map[lowerSubject]) {
      result.subject = REVERSE_MAP_DATA.map[lowerSubject];
    }
  }
  
  if (result.metadata) {
    const lowerMetadata = result.metadata.toLowerCase();
    if (REVERSE_MAP_DATA.map[lowerMetadata]) {
      result.metadata = REVERSE_MAP_DATA.map[lowerMetadata];
    }
  }
  
  if (result.room) {
    const lowerRoom = result.room.toLowerCase();
    if (REVERSE_MAP_DATA.map[lowerRoom]) {
      result.room = REVERSE_MAP_DATA.map[lowerRoom];
    }
  }
  
  return result;
}

// Главная функция обработки
function processSubjects(subjectArray) {
  if (!Array.isArray(subjectArray)) {
    console.warn('processSubjects: ожидается массив');
    return [];
  }
  
  return subjectArray.map(subject => {
    if (!subject || typeof subject !== 'string' || !subject.trim()) {
      return { subject: '', metadata: '', room: '' };
    }
    
    return expandAbbreviations(correctTypos(parseSubjectParts(subject)));
  });
}
