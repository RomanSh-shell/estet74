// Основная функция для получения расписания (интеграционная)
function getSchedule(GROUP) {
  try {
    const lessons = getGroupSchedule(GROUP);
    
    if (lessons.length === 0) {
      return {
        success: false,
        message: `Класс "${GROUP}" не найден или нет уроков`,
        lessons: []
      };
    }
    
    return {
      success: true,
      message: `Найдено ${lessons.length} уроков для ${GROUP}`,
      lessons: lessons
    };
    
  } catch (error) {
    return {
      success: false,
      message: 'Ошибка при обработке расписания: ' + error.message,
      lessons: []
    };
  }
}

// Вспомогательные функции (должны быть в вашем скрипте)
function getGroupSchedule(groupName) {
  const spreadsheet = SpreadsheetApp.openById('1rnYBzXaWr9dI1u8haxakKDiz7KK0IzjJ');
  const sheet = spreadsheet.getActiveSheet();
  const data = sheet.getDataRange().getValues();
  
  const lessons = [];
  const date = '2025-09-08';
  
  let currentGroups = [];
  let timeSlots = [];
  let currentSection = 'middle';
  let targetGroupIndex = -1;
  
  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    if (row.every(cell => cell === '')) continue;
    
    if (row[0] === 'Ур.' && row[1] === 'Время' && row[2] === '5/1 класс') {
      currentGroups = row.slice(2).filter(cell => cell && cell !== '');
      timeSlots = [];
      currentSection = 'middle';
      targetGroupIndex = currentGroups.findIndex(g => 
        normalizeGroupName(g.toString(), currentSection) === normalizeGroupName(groupName, currentSection)
      );
      continue;
    }
    
    if (row[0] === 'Ур.' && row[1] === 'Время' && row[2] === '1 класс') {
      currentGroups = row.slice(2).filter(cell => cell && cell !== '');
      timeSlots = [];
      currentSection = 'primary';
      targetGroupIndex = currentGroups.findIndex(g => 
        normalizeGroupName(g.toString(), currentSection) === normalizeGroupName(groupName, currentSection)
      );
      continue;
    }
    
    if (row[0] && typeof row[0] === 'number' && row[1] && row[1].includes('-')) {
      const lessonData = {
        lesson: row[0],
        time: row[1],
        subjects: row.slice(2, 2 + currentGroups.length)
      };
      timeSlots.push(lessonData);
    }
  }
  
  if (targetGroupIndex === -1) return [];
  
  timeSlots.forEach(timeSlot => {
    const subject = timeSlot.subjects[targetGroupIndex];
    if (subject && subject !== '') {
      const subjectInfo = parseCompleteSubject(subject.toString());
      lessons.push({
        date: date,
        group: normalizeGroupName(groupName, currentSection),
        lesson: timeSlot.lesson,
        time: timeSlot.time,
        subject: subjectInfo.subject,
        room: subjectInfo.room,
        metadata: subjectInfo.metadata
      });
    }
  });
  
  return lessons;
}

function normalizeGroupName(groupName, section) {
  let normalized = groupName
    .replace(' класс', '')
    .replace('инд. ', 'инд.')
    .replace('дист. ', 'дист.')
    .trim()
    .toLowerCase();
  
  if (section === 'middle' && !normalized.includes('/')) {
    normalized = normalized.replace(' класс', '');
  }
  
  return normalized;
}

function parseCompleteSubject(subjectString) {
  const result = { subject: subjectString.trim(), room: '', metadata: '' };
  
  let match = subjectString.match(/^([А-Яа-яёЁA-Za-z\s\.\-]+)\(([^)]+)\)(\d*[а-яё]?)$/);
  if (match) {
    result.subject = match[1].trim();
    result.metadata = match[2].trim();
    result.room = match[3].trim();
    return result;
  }
  
  match = subjectString.match(/^([А-Яа-яёЁA-Za-z\s\.\-]+)\(([^)]+)\)$/);
  if (match) {
    result.subject = match[1].trim();
    result.metadata = match[2].trim();
    return result;
  }
  
  match = subjectString.match(/^([А-Яа-яёЁA-Za-z\s\.\-]+)\.([а-яё])$/);
  if (match) {
    result.subject = match[1].trim();
    result.room = match[2].trim();
    return result;
  }
  
  match = subjectString.match(/^([А-Яа-яёЁA-Za-z\s\.\-]+)(\d+[а-яё]?)$/);
  if (match) {
    result.subject = match[1].trim();
    result.room = match[2].trim();
    return result;
  }
  
  match = subjectString.match(/^([А-Яа-яёЁA-Za-z\s\.\-]+)\.(\d+[а-яё]?)$/);
  if (match) {
    result.subject = match[1].trim();
    result.room = match[2].trim();
    return result;
  }
  
  match = subjectString.match(/^([А-Яа-яёЁA-Za-z\s\.\-]+)([а-яё]{2,})$/);
  if (match) {
    result.subject = match[1].trim();
    result.metadata = match[2].trim();
    return result;
  }
  
  match = subjectString.match(/^([А-Яа-яёЁA-Za-z\s\.\-]+)\.([а-яё]{2,})$/);
  if (match) {
    result.subject = match[1].trim();
    result.metadata = match[2].trim();
    return result;
  }
  
  match = subjectString.match(/^([А-Яа-яёЁA-Za-z]+\.[А-Яа-яёЁA-Za-z]+)\.?(\d*[а-яё]?)$/);
  if (match) {
    result.subject = match[1].trim();
    if (match[2]) result.room = match[2].trim();
    return result;
  }
  
  return result;
}

// ==================== ИНТЕГРАЦИЯ В ВАШ КОД ====================

// Пример использования в вашем основном коде
function main() {
  // GROUP - переменная, которая приходит извне
  const GROUP = '5/1 класс'; // Например, из параметров или интерфейса
  
  // Получаем расписание
  const result = getSchedule(GROUP);
  
  if (result.success) {
    // Используем lessons в вашем формате
    const LESSONS = result.lessons;
    
    console.log(result.message);
    console.log('Уроки:', LESSONS);
    
    // Далее ваша логика обработки уроков...
    processLessons(LESSONS);
    
  } else {
    console.error(result.message);
  }
}

function processLessons(lessons) {
  // Ваша функция для обработки расписания
  lessons.forEach(lesson => {
    console.log(`Урок ${lesson.lesson}: ${lesson.subject} в ${lesson.room}`);
  });
}

// Альтернативный вариант - прямое получение массива
function getLessonsDirectly(GROUP) {
  return getGroupSchedule(GROUP);
}

// ==================== ТЕСТИРОВАНИЕ ====================

function testIntegration() {
  const testGroups = [
    '5/1 класс',
    '1 класс',
    'Герарди Е., инд. 6 кл.',
    'Несуществующий класс'
  ];
  
  testGroups.forEach(group => {
    console.log(`\n=== Тестирование: ${group} ===`);
    const result = getSchedule(group);
    
    if (result.success) {
      console.log(`Успех: ${result.message}`);
      console.log(`Найдено уроков: ${result.lessons.length}`);
    } else {
      console.log(`Ошибка: ${result.message}`);
    }
  });
}