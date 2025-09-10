function getHomeworksUpToDate() {
  const spreadsheet = SpreadsheetApp.openById('1FMNCOHLbIRZrL822scLvZPiAvHnQY4bKr0YRGhNJ_n0');
  const sheets = spreadsheet.getSheets();
  const targetDate = '10.09'; // Укажите нужную дату в формате "дд.мм"
  
  const result = {};
  
  sheets.forEach(sheet => {
    const sheetName = sheet.getName();
    const data = sheet.getDataRange().getValues();
    const homeworks = [];
    
    // Пропускаем строки с заголовками и названиями четвертей
    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      
      // Проверяем, что строка содержит дату в нужном формате
      if (row[0] && row[1] && typeof row[1] === 'string' && row[1].includes('.')) {
        const dateStr = row[1].trim();
        const dayOfWeek = row[0].toString().trim();
        
        // Проверяем, не достигли ли мы целевой даты
        if (this.isDateBeforeOrEqual(dateStr, targetDate)) {
          const task = row[2] ? row[2].toString().trim() : '';
          
          homeworks.push({
            date: `${dayOfWeek} ${dateStr}`,
            task: task
          });
        } else {
          // Если дата превышает целевую, прекращаем обработку этого листа
          break;
        }
      }
    }
    
    result[sheetName] = homeworks;
  });
  
  // Форматируем результат в нужный вид
  const formattedResult = `const hometask = ${JSON.stringify(result, null, 2).replace(/"/g, "'")};`;
  
  Logger.log(formattedResult);
  return formattedResult;
}

// Вспомогательная функция для сравнения дат
function isDateBeforeOrEqual(dateStr, targetDateStr) {
  const [day, month] = dateStr.split('.').map(Number);
  const [targetDay, targetMonth] = targetDateStr.split('.').map(Number);
  
  // Сравниваем сначала месяцы, потом дни
  if (month < targetMonth) return true;
  if (month === targetMonth && day <= targetDay) return true;
  return false;
}