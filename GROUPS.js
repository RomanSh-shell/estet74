function getAllGroups() {
  const spreadsheet = SpreadsheetApp.openById('1rnYBzXaWr9dI1u8haxakKDiz7KK0IzjJ');
  const sheet = spreadsheet.getActiveSheet();
  
  // Получаем строку 4 начиная с колонки D и до конца
  const middleSchoolRange = sheet.getRange('D4:4');
  const middleSchoolRow = middleSchoolRange.getValues()[0];
  
  // Получаем строку 18 начиная с колонки D и до конца
  const primarySchoolRange = sheet.getRange('D18:18');
  const primarySchoolRow = primarySchoolRange.getValues()[0];
  
  // Функция для извлечения классов до первой пустой ячейки
  const extractGroups = (row) => {
    const groups = [];
    for (let i = 0; i < row.length; i++) {
      if (!row[i] || row[i] === '') break; // Останавливаемся на пустой ячейке
      groups.push(row[i].toString().trim());
    }
    return groups;
  };
  
  // Извлекаем классы из обеих строк
  const middleSchoolGroups = extractGroups(middleSchoolRow);
  const primarySchoolGroups = extractGroups(primarySchoolRow);
  
  // Объединяем результаты
  const allGroups = [...middleSchoolGroups, ...primarySchoolGroups];
  
  return allGroups;
}

// Использование:
const GROUPS = getAllGroups();
console.log('Все классы:', GROUPS);