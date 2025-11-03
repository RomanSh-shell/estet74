////////////////////settings.js//////////////////////
// Конфигурация таблиц Google Sheets
const days = {
  day0: {
    name: 'Расписание на понедельник',
    id: '1rnYBzXaWr9dI1u8haxakKDiz7KK0IzjJ',
    api: '',
    gid: '396671462'
  },
  day1: {
    name: 'Расписание на вторник',
    id: '17Oz-Ld6NHA57SEKCiuAWQNYYngJ3_7LB',
    api: '',
    gid: '1000062797'
  },
  day2: {
    name: 'Расписание на среду',
    id: '1Xt-HxVTrKzp4_3NcaBGbTYxKp_PGLeN2',
    api: '',
    gid: '1112063833'
  },
  day3: {
    name: 'Расписание на четверг',
    id: '1oessjK-CwC-p_Kf0y1be61ZRwHq4jd4l',
    api: '',
    gid: '820887987'
  },
  day4: {
    name: 'Расписание на пятницу',
    id: '1_m0C3uWV3XvPLAko0KZSJWq5JMMHe8HH',
    api: '',
    gid: '1260478207'
  }
};

const classes = {
  class5_1: {
    "Русский_язык": {
      "sheetId": "1mywfGN2EP0z2FIlWnmfVOwdbZoP1_I_tsTU0lqd5UfI",
      "gid": "0",
      "name": "Русский язык",
      "api": "NoAPIfor1mywfGN2EP0z2FIlWnmfVOwdbZoP1_I_tsTU0lqd5UfI"
    },
    "Литература": {
      "sheetId": "1mywfGN2EP0z2FIlWnmfVOwdbZoP1_I_tsTU0lqd5UfI",
      "gid": "329233048",
      "name": "Литература",
      "api": "NoAPIfor1mywfGN2EP0z2FIlWnmfVOwdbZoP1_I_tsTU0lqd5UfI"
    },
    "Английский_язык": {
      "sheetId": "1mywfGN2EP0z2FIlWnmfVOwdbZoP1_I_tsTU0lqd5UfI",
      "gid": "171674353",
      "name": "Английский язык",
      "api": "NoAPIfor1mywfGN2EP0z2FIlWnmfVOwdbZoP1_I_tsTU0lqd5UfI"
    },
    "Математика": {
      "sheetId": "1mywfGN2EP0z2FIlWnmfVOwdbZoP1_I_tsTU0lqd5UfI",
      "gid": "624656389",
      "name": "Математика",
      "api": "NoAPIfor1mywfGN2EP0z2FIlWnmfVOwdbZoP1_I_tsTU0lqd5UfI"
    },
    "Информатика": {
      "sheetId": "1mywfGN2EP0z2FIlWnmfVOwdbZoP1_I_tsTU0lqd5UfI",
      "gid": "1421083680",
      "name": "Информатика",
      "api": "NoAPIfor1mywfGN2EP0z2FIlWnmfVOwdbZoP1_I_tsTU0lqd5UfI"
    },
    "История": {
      "sheetId": "1mywfGN2EP0z2FIlWnmfVOwdbZoP1_I_tsTU0lqd5UfI",
      "gid": "801015494",
      "name": "История",
      "api": "NoAPIfor1mywfGN2EP0z2FIlWnmfVOwdbZoP1_I_tsTU0lqd5UfI"
    },
    "История_нашего_края": {
      "sheetId": "1mywfGN2EP0z2FIlWnmfVOwdbZoP1_I_tsTU0lqd5UfI",
      "gid": "2047340950",
      "name": "История нашего края",
      "api": "NoAPIfor1mywfGN2EP0z2FIlWnmfVOwdbZoP1_I_tsTU0lqd5UfI"
    },
    "География": {
      "sheetId": "1mywfGN2EP0z2FIlWnmfVOwdbZoP1_I_tsTU0lqd5UfI",
      "gid": "696023630",
      "name": "География",
      "api": "NoAPIfor1mywfGN2EP0z2FIlWnmfVOwdbZoP1_I_tsTU0lqd5UfI"
    },
    "Биология": {
      "sheetId": "1mywfGN2EP0z2FIlWnmfVOwdbZoP1_I_tsTU0lqd5UfI",
      "gid": "611403980",
      "name": "Биология",
      "api": "NoAPIfor1mywfGN2EP0z2FIlWnmfVOwdbZoP1_I_tsTU0lqd5UfI"
    }
  },
  class5_2: {
    "Русский_язык": {
      "sheetId": "1dYiQ0SiJGvlDGjyjfBIgMl1vgAdloSLf_kjkPlKSKOQ",
      "gid": "0",
      "name": "Русский язык",
      "api": "NoAPIfor1dYiQ0SiJGvlDGjyjfBIgMl1vgAdloSLf_kjkPlKSKOQ"
    },
    "Литература": {
      "sheetId": "1dYiQ0SiJGvlDGjyjfBIgMl1vgAdloSLf_kjkPlKSKOQ",
      "gid": "329233048",
      "name": "Литература",
      "api": "NoAPIfor1dYiQ0SiJGvlDGjyjfBIgMl1vgAdloSLf_kjkPlKSKOQ"
    },
    "Английский_язык": {
      "sheetId": "1dYiQ0SiJGvlDGjyjfBIgMl1vgAdloSLf_kjkPlKSKOQ",
      "gid": "171674353",
      "name": "Английский язык",
      "api": "NoAPIfor1dYiQ0SiJGvlDGjyjfBIgMl1vgAdloSLf_kjkPlKSKOQ"
    },
    "Математика": {
      "sheetId": "1dYiQ0SiJGvlDGjyjfBIgMl1vgAdloSLf_kjkPlKSKOQ",
      "gid": "624656389",
      "name": "Математика",
      "api": "NoAPIfor1dYiQ0SiJGvlDGjyjfBIgMl1vgAdloSLf_kjkPlKSKOQ"
    },
    "Информатика": {
      "sheetId": "1dYiQ0SiJGvlDGjyjfBIgMl1vgAdloSLf_kjkPlKSKOQ",
      "gid": "1421083680",
      "name": "Информатика",
      "api": "NoAPIfor1dYiQ0SiJGvlDGjyjfBIgMl1vgAdloSLf_kjkPlKSKOQ"
    },
    "История": {
      "sheetId": "1dYiQ0SiJGvlDGjyjfBIgMl1vgAdloSLf_kjkPlKSKOQ",
      "gid": "801015494",
      "name": "История",
      "api": "NoAPIfor1dYiQ0SiJGvlDGjyjfBIgMl1vgAdloSLf_kjkPlKSKOQ"
    },
    "История_нашего_края": {
      "sheetId": "1dYiQ0SiJGvlDGjyjfBIgMl1vgAdloSLf_kjkPlKSKOQ",
      "gid": "652732812",
      "name": "История нашего края",
      "api": "NoAPIfor1dYiQ0SiJGvlDGjyjfBIgMl1vgAdloSLf_kjkPlKSKOQ"
    },
    "География": {
      "sheetId": "1dYiQ0SiJGvlDGjyjfBIgMl1vgAdloSLf_kjkPlKSKOQ",
      "gid": "696023630",
      "name": "География",
      "api": "NoAPIfor1dYiQ0SiJGvlDGjyjfBIgMl1vgAdloSLf_kjkPlKSKOQ"
    },
    "Биология": {
      "sheetId": "1dYiQ0SiJGvlDGjyjfBIgMl1vgAdloSLf_kjkPlKSKOQ",
      "gid": "611403980",
      "name": "Биология",
      "api": "NoAPIfor1dYiQ0SiJGvlDGjyjfBIgMl1vgAdloSLf_kjkPlKSKOQ"
    }
  },
  class6_1: {
    "Русский_язык": {
      "sheetId": "1zov6d36gXBvqY5Z5p-iNppVFMidI-dDsOYwfLaOLG5w",
      "gid": "0",
      "name": "Русский язык",
      "api": "NoAPIfor1zov6d36gXBvqY5Z5p-iNppVFMidI-dDsOYwfLaOLG5w"
    },
    "Литература": {
      "sheetId": "1zov6d36gXBvqY5Z5p-iNppVFMidI-dDsOYwfLaOLG5w",
      "gid": "329233048",
      "name": "Литература",
      "api": "NoAPIfor1zov6d36gXBvqY5Z5p-iNppVFMidI-dDsOYwfLaOLG5w"
    },
    "Английский_язык": {
      "sheetId": "1zov6d36gXBvqY5Z5p-iNppVFMidI-dDsOYwfLaOLG5w",
      "gid": "171674353",
      "name": "Английский язык",
      "api": "NoAPIfor1zov6d36gXBvqY5Z5p-iNppVFMidI-dDsOYwfLaOLG5w"
    },
    "Математика": {
      "sheetId": "1zov6d36gXBvqY5Z5p-iNppVFMidI-dDsOYwfLaOLG5w",
      "gid": "624656389",
      "name": "Математика",
      "api": "NoAPIfor1zov6d36gXBvqY5Z5p-iNppVFMidI-dDsOYwfLaOLG5w"
    },
    "Информатика": {
      "sheetId": "1zov6d36gXBvqY5Z5p-iNppVFMidI-dDsOYwfLaOLG5w",
      "gid": "1421083680",
      "name": "Информатика",
      "api": "NoAPIfor1zov6d36gXBvqY5Z5p-iNppVFMidI-dDsOYwfLaOLG5w"
    },
    "История": {
      "sheetId": "1zov6d36gXBvqY5Z5p-iNppVFMidI-dDsOYwfLaOLG5w",
      "gid": "801015494",
      "name": "История",
      "api": "NoAPIfor1zov6d36gXBvqY5Z5p-iNppVFMidI-dDsOYwfLaOLG5w"
    },
    "География": {
      "sheetId": "1zov6d36gXBvqY5Z5p-iNppVFMidI-dDsOYwfLaOLG5w",
      "gid": "696023630",
      "name": "География",
      "api": "NoAPIfor1zov6d36gXBvqY5Z5p-iNppVFMidI-dDsOYwfLaOLG5w"
    },
    "Биология": {
      "sheetId": "1zov6d36gXBvqY5Z5p-iNppVFMidI-dDsOYwfLaOLG5w",
      "gid": "611403980",
      "name": "Биология",
      "api": "NoAPIfor1zov6d36gXBvqY5Z5p-iNppVFMidI-dDsOYwfLaOLG5w"
    }
  },
  class6_2: {
    "Русский_язык": {
      "sheetId": "1C_CxD9fUXJ5OtgiLmRwwGvIQd7MxE7uziAdWehGnkpU",
      "gid": "0",
      "name": "Русский язык",
      "api": "NoAPIfor1C_CxD9fUXJ5OtgiLmRwwGvIQd7MxE7uziAdWehGnkpU"
    },
    "Литература": {
      "sheetId": "1C_CxD9fUXJ5OtgiLmRwwGvIQd7MxE7uziAdWehGnkpU",
      "gid": "329233048",
      "name": "Литература",
      "api": "NoAPIfor1C_CxD9fUXJ5OtgiLmRwwGvIQd7MxE7uziAdWehGnkpU"
    },
    "Английский_язык": {
      "sheetId": "1C_CxD9fUXJ5OtgiLmRwwGvIQd7MxE7uziAdWehGnkpU",
      "gid": "171674353",
      "name": "Английский язык",
      "api": "NoAPIfor1C_CxD9fUXJ5OtgiLmRwwGvIQd7MxE7uziAdWehGnkpU"
    },
    "Математика": {
      "sheetId": "1C_CxD9fUXJ5OtgiLmRwwGvIQd7MxE7uziAdWehGnkpU",
      "gid": "624656389",
      "name": "Математика",
      "api": "NoAPIfor1C_CxD9fUXJ5OtgiLmRwwGvIQd7MxE7uziAdWehGnkpU"
    },
    "Информатика": {
      "sheetId": "1C_CxD9fUXJ5OtgiLmRwwGvIQd7MxE7uziAdWehGnkpU",
      "gid": "1421083680",
      "name": "Информатика",
      "api": "NoAPIfor1C_CxD9fUXJ5OtgiLmRwwGvIQd7MxE7uziAdWehGnkpU"
    },
    "История": {
      "sheetId": "1C_CxD9fUXJ5OtgiLmRwwGvIQd7MxE7uziAdWehGnkpU",
      "gid": "801015494",
      "name": "История",
      "api": "NoAPIfor1C_CxD9fUXJ5OtgiLmRwwGvIQd7MxE7uziAdWehGnkpU"
    },
    "География": {
      "sheetId": "1C_CxD9fUXJ5OtgiLmRwwGvIQd7MxE7uziAdWehGnkpU",
      "gid": "696023630",
      "name": "География",
      "api": "NoAPIfor1C_CxD9fUXJ5OtgiLmRwwGvIQd7MxE7uziAdWehGnkpU"
    },
    "Биология": {
      "sheetId": "1C_CxD9fUXJ5OtgiLmRwwGvIQd7MxE7uziAdWehGnkpU",
      "gid": "611403980",
      "name": "Биология",
      "api": "NoAPIfor1C_CxD9fUXJ5OtgiLmRwwGvIQd7MxE7uziAdWehGnkpU"
    }
  },
  class7_1: {
    "Русский_язык": {
      "sheetId": "1uufK-YSTwzuOsI1WD8Ay8kAgDI-owGQ6pofxTaxPU1s",
      "gid": "0",
      "name": "Русский язык",
      "api": "NoAPIfor1uufK-YSTwzuOsI1WD8Ay8kAgDI-owGQ6pofxTaxPU1s"
    },
    "Литература": {
      "sheetId": "1uufK-YSTwzuOsI1WD8Ay8kAgDI-owGQ6pofxTaxPU1s",
      "gid": "329233048",
      "name": "Литература",
      "api": "NoAPIfor1uufK-YSTwzuOsI1WD8Ay8kAgDI-owGQ6pofxTaxPU1s"
    },
    "Английский_язык": {
      "sheetId": "1uufK-YSTwzuOsI1WD8Ay8kAgDI-owGQ6pofxTaxPU1s",
      "gid": "171674353",
      "name": "Английский язык",
      "api": "NoAPIfor1uufK-YSTwzuOsI1WD8Ay8kAgDI-owGQ6pofxTaxPU1s"
    },
    "Математика": {
      "sheetId": "1uufK-YSTwzuOsI1WD8Ay8kAgDI-owGQ6pofxTaxPU1s",
      "gid": "624656389",
      "name": "Математика",
      "api": "NoAPIfor1uufK-YSTwzuOsI1WD8Ay8kAgDI-owGQ6pofxTaxPU1s"
    },
    "Информатика": {
      "sheetId": "1uufK-YSTwzuOsI1WD8Ay8kAgDI-owGQ6pofxTaxPU1s",
      "gid": "1421083680",
      "name": "Информатика",
      "api": "NoAPIfor1uufK-YSTwzuOsI1WD8Ay8kAgDI-owGQ6pofxTaxPU1s"
    },
    "История": {
      "sheetId": "1uufK-YSTwzuOsI1WD8Ay8kAgDI-owGQ6pofxTaxPU1s",
      "gid": "801015494",
      "name": "История",
      "api": "NoAPIfor1uufK-YSTwzuOsI1WD8Ay8kAgDI-owGQ6pofxTaxPU1s"
    },
    "География": {
      "sheetId": "1uufK-YSTwzuOsI1WD8Ay8kAgDI-owGQ6pofxTaxPU1s",
      "gid": "696023630",
      "name": "География",
      "api": "NoAPIfor1uufK-YSTwzuOsI1WD8Ay8kAgDI-owGQ6pofxTaxPU1s"
    },
    "Биология": {
      "sheetId": "1uufK-YSTwzuOsI1WD8Ay8kAgDI-owGQ6pofxTaxPU1s",
      "gid": "611403980",
      "name": "Биология",
      "api": "NoAPIfor1uufK-YSTwzuOsI1WD8Ay8kAgDI-owGQ6pofxTaxPU1s"
    },
    "Физика": {
      "sheetId": "1uufK-YSTwzuOsI1WD8Ay8kAgDI-owGQ6pofxTaxPU1s",
      "gid": "340190869",
      "name": "Физика",
      "api": "NoAPIfor1uufK-YSTwzuOsI1WD8Ay8kAgDI-owGQ6pofxTaxPU1s"
    }
  },
  class7_2: {
    "Русский_язык": {
      "sheetId": "14Kug6YztYre6iKs-qH47Paf-dwcJse0JW-zSLekhSxY",
      "gid": "0",
      "name": "Русский язык",
      "api": "NoAPIfor14Kug6YztYre6iKs-qH47Paf-dwcJse0JW-zSLekhSxY"
    },
    "Литература": {
      "sheetId": "14Kug6YztYre6iKs-qH47Paf-dwcJse0JW-zSLekhSxY",
      "gid": "329233048",
      "name": "Литература",
      "api": "NoAPIfor14Kug6YztYre6iKs-qH47Paf-dwcJse0JW-zSLekhSxY"
    },
    "Английский_язык": {
      "sheetId": "14Kug6YztYre6iKs-qH47Paf-dwcJse0JW-zSLekhSxY",
      "gid": "171674353",
      "name": "Английский язык",
      "api": "NoAPIfor14Kug6YztYre6iKs-qH47Paf-dwcJse0JW-zSLekhSxY"
    },
    "Математика": {
      "sheetId": "14Kug6YztYre6iKs-qH47Paf-dwcJse0JW-zSLekhSxY",
      "gid": "624656389",
      "name": "Математика",
      "api": "NoAPIfor14Kug6YztYre6iKs-qH47Paf-dwcJse0JW-zSLekhSxY"
    },
    "Информатика": {
      "sheetId": "14Kug6YztYre6iKs-qH47Paf-dwcJse0JW-zSLekhSxY",
      "gid": "1421083680",
      "name": "Информатика",
      "api": "NoAPIfor14Kug6YztYre6iKs-qH47Paf-dwcJse0JW-zSLekhSxY"
    },
    "История": {
      "sheetId": "14Kug6YztYre6iKs-qH47Paf-dwcJse0JW-zSLekhSxY",
      "gid": "801015494",
      "name": "История",
      "api": "NoAPIfor14Kug6YztYre6iKs-qH47Paf-dwcJse0JW-zSLekhSxY"
    },
    "География": {
      "sheetId": "14Kug6YztYre6iKs-qH47Paf-dwcJse0JW-zSLekhSxY",
      "gid": "696023630",
      "name": "География",
      "api": "NoAPIfor14Kug6YztYre6iKs-qH47Paf-dwcJse0JW-zSLekhSxY"
    },
    "Биология": {
      "sheetId": "14Kug6YztYre6iKs-qH47Paf-dwcJse0JW-zSLekhSxY",
      "gid": "611403980",
      "name": "Биология",
      "api": "NoAPIfor14Kug6YztYre6iKs-qH47Paf-dwcJse0JW-zSLekhSxY"
    },
    "Физика": {
      "sheetId": "14Kug6YztYre6iKs-qH47Paf-dwcJse0JW-zSLekhSxY",
      "gid": "340190869",
      "name": "Физика",
      "api": "NoAPIfor14Kug6YztYre6iKs-qH47Paf-dwcJse0JW-zSLekhSxY"
    }
  },
  class8_1: {
    "Русский_язык": {
      "sheetId": "11LKk9u8OyVdphPMA8dIVNGkz1EQVEYovFc_ZChayWtU",
      "gid": "0",
      "name": "Русский язык",
      "api": "NoAPIfor11LKk9u8OyVdphPMA8dIVNGkz1EQVEYovFc_ZChayWtU"
    },
    "Литература": {
      "sheetId": "11LKk9u8OyVdphPMA8dIVNGkz1EQVEYovFc_ZChayWtU",
      "gid": "329233048",
      "name": "Литература",
      "api": "NoAPIfor11LKk9u8OyVdphPMA8dIVNGkz1EQVEYovFc_ZChayWtU"
    },
    "Английский_язык": {
      "sheetId": "11LKk9u8OyVdphPMA8dIVNGkz1EQVEYovFc_ZChayWtU",
      "gid": "171674353",
      "name": "Английский язык",
      "api": "NoAPIfor11LKk9u8OyVdphPMA8dIVNGkz1EQVEYovFc_ZChayWtU"
    },
    "Математика": {
      "sheetId": "11LKk9u8OyVdphPMA8dIVNGkz1EQVEYovFc_ZChayWtU",
      "gid": "624656389",
      "name": "Математика",
      "api": "NoAPIfor11LKk9u8OyVdphPMA8dIVNGkz1EQVEYovFc_ZChayWtU"
    },
    "Информатика": {
      "sheetId": "11LKk9u8OyVdphPMA8dIVNGkz1EQVEYovFc_ZChayWtU",
      "gid": "1421083680",
      "name": "Информатика",
      "api": "NoAPIfor11LKk9u8OyVdphPMA8dIVNGkz1EQVEYovFc_ZChayWtU"
    },
    "История": {
      "sheetId": "11LKk9u8OyVdphPMA8dIVNGkz1EQVEYovFc_ZChayWtU",
      "gid": "801015494",
      "name": "История",
      "api": "NoAPIfor11LKk9u8OyVdphPMA8dIVNGkz1EQVEYovFc_ZChayWtU"
    },
    "Обществознание": {
      "sheetId": "11LKk9u8OyVdphPMA8dIVNGkz1EQVEYovFc_ZChayWtU",
      "gid": "835052542",
      "name": "Обществознание",
      "api": "NoAPIfor11LKk9u8OyVdphPMA8dIVNGkz1EQVEYovFc_ZChayWtU"
    },
    "География": {
      "sheetId": "11LKk9u8OyVdphPMA8dIVNGkz1EQVEYovFc_ZChayWtU",
      "gid": "696023630",
      "name": "География",
      "api": "NoAPIfor11LKk9u8OyVdphPMA8dIVNGkz1EQVEYovFc_ZChayWtU"
    },
    "Биология": {
      "sheetId": "11LKk9u8OyVdphPMA8dIVNGkz1EQVEYovFc_ZChayWtU",
      "gid": "611403980",
      "name": "Биология",
      "api": "NoAPIfor11LKk9u8OyVdphPMA8dIVNGkz1EQVEYovFc_ZChayWtU"
    },
    "Физика": {
      "sheetId": "11LKk9u8OyVdphPMA8dIVNGkz1EQVEYovFc_ZChayWtU",
      "gid": "340190869",
      "name": "Физика",
      "api": "NoAPIfor11LKk9u8OyVdphPMA8dIVNGkz1EQVEYovFc_ZChayWtU"
    },
    "Химия": {
      "sheetId": "11LKk9u8OyVdphPMA8dIVNGkz1EQVEYovFc_ZChayWtU",
      "gid": "1532686743",
      "name": "Химия",
      "api": "NoAPIfor11LKk9u8OyVdphPMA8dIVNGkz1EQVEYovFc_ZChayWtU"
    }
  },
  class8_2: {
    "Русский_язык": {
      "sheetId": "1wQ13kwq009UbhaVyTgVIx8XQY1PiuWQrr6KBOx4G52Q",
      "gid": "0",
      "name": "Русский язык",
      "api": "NoAPIfor1wQ13kwq009UbhaVyTgVIx8XQY1PiuWQrr6KBOx4G52Q"
    },
    "Литература": {
      "sheetId": "1wQ13kwq009UbhaVyTgVIx8XQY1PiuWQrr6KBOx4G52Q",
      "gid": "329233048",
      "name": "Литература",
      "api": "NoAPIfor1wQ13kwq009UbhaVyTgVIx8XQY1PiuWQrr6KBOx4G52Q"
    },
    "Английский_язык": {
      "sheetId": "1wQ13kwq009UbhaVyTgVIx8XQY1PiuWQrr6KBOx4G52Q",
      "gid": "171674353",
      "name": "Английский язык",
      "api": "NoAPIfor1wQ13kwq009UbhaVyTgVIx8XQY1PiuWQrr6KBOx4G52Q"
    },
    "Математика": {
      "sheetId": "1wQ13kwq009UbhaVyTgVIx8XQY1PiuWQrr6KBOx4G52Q",
      "gid": "624656389",
      "name": "Математика",
      "api": "NoAPIfor1wQ13kwq009UbhaVyTgVIx8XQY1PiuWQrr6KBOx4G52Q"
    },
    "Информатика": {
      "sheetId": "1wQ13kwq009UbhaVyTgVIx8XQY1PiuWQrr6KBOx4G52Q",
      "gid": "1421083680",
      "name": "Информатика",
      "api": "NoAPIfor1wQ13kwq009UbhaVyTgVIx8XQY1PiuWQrr6KBOx4G52Q"
    },
    "История": {
      "sheetId": "1wQ13kwq009UbhaVyTgVIx8XQY1PiuWQrr6KBOx4G52Q",
      "gid": "801015494",
      "name": "История",
      "api": "NoAPIfor1wQ13kwq009UbhaVyTgVIx8XQY1PiuWQrr6KBOx4G52Q"
    },
    "Обществознание": {
      "sheetId": "1wQ13kwq009UbhaVyTgVIx8XQY1PiuWQrr6KBOx4G52Q",
      "gid": "482148264",
      "name": "Обществознание",
      "api": "NoAPIfor1wQ13kwq009UbhaVyTgVIx8XQY1PiuWQrr6KBOx4G52Q"
    },
    "География": {
      "sheetId": "1wQ13kwq009UbhaVyTgVIx8XQY1PiuWQrr6KBOx4G52Q",
      "gid": "696023630",
      "name": "География",
      "api": "NoAPIfor1wQ13kwq009UbhaVyTgVIx8XQY1PiuWQrr6KBOx4G52Q"
    },
    "Биология": {
      "sheetId": "1wQ13kwq009UbhaVyTgVIx8XQY1PiuWQrr6KBOx4G52Q",
      "gid": "611403980",
      "name": "Биология",
      "api": "NoAPIfor1wQ13kwq009UbhaVyTgVIx8XQY1PiuWQrr6KBOx4G52Q"
    },
    "Физика": {
      "sheetId": "1wQ13kwq009UbhaVyTgVIx8XQY1PiuWQrr6KBOx4G52Q",
      "gid": "340190869",
      "name": "Физика",
      "api": "NoAPIfor1wQ13kwq009UbhaVyTgVIx8XQY1PiuWQrr6KBOx4G52Q"
    },
    "Химия": {
      "sheetId": "1wQ13kwq009UbhaVyTgVIx8XQY1PiuWQrr6KBOx4G52Q",
      "gid": "1532686743",
      "name": "Химия",
      "api": "NoAPIfor1wQ13kwq009UbhaVyTgVIx8XQY1PiuWQrr6KBOx4G52Q"
    }
  },
  class8_3: {
    "Русский_язык": {
      "sheetId": "1_Etr2b0OURFaJZAbXgj1l3TDKk7X0469CiMysGKEvsc",
      "gid": "0",
      "name": "Русский язык",
      "api": "NoAPIfor1_Etr2b0OURFaJZAbXgj1l3TDKk7X0469CiMysGKEvsc"
    },
    "Литература": {
      "sheetId": "1_Etr2b0OURFaJZAbXgj1l3TDKk7X0469CiMysGKEvsc",
      "gid": "329233048",
      "name": "Литература",
      "api": "NoAPIfor1_Etr2b0OURFaJZAbXgj1l3TDKk7X0469CiMysGKEvsc"
    },
    "Английский_язык": {
      "sheetId": "1_Etr2b0OURFaJZAbXgj1l3TDKk7X0469CiMysGKEvsc",
      "gid": "171674353",
      "name": "Английский язык",
      "api": "NoAPIfor1_Etr2b0OURFaJZAbXgj1l3TDKk7X0469CiMysGKEvsc"
    },
    "Математика": {
      "sheetId": "1_Etr2b0OURFaJZAbXgj1l3TDKk7X0469CiMysGKEvsc",
      "gid": "624656389",
      "name": "Математика",
      "api": "NoAPIfor1_Etr2b0OURFaJZAbXgj1l3TDKk7X0469CiMysGKEvsc"
    },
    "Информатика": {
      "sheetId": "1_Etr2b0OURFaJZAbXgj1l3TDKk7X0469CiMysGKEvsc",
      "gid": "1421083680",
      "name": "Информатика",
      "api": "NoAPIfor1_Etr2b0OURFaJZAbXgj1l3TDKk7X0469CiMysGKEvsc"
    },
    "История": {
      "sheetId": "1_Etr2b0OURFaJZAbXgj1l3TDKk7X0469CiMysGKEvsc",
      "gid": "801015494",
      "name": "История",
      "api": "NoAPIfor1_Etr2b0OURFaJZAbXgj1l3TDKk7X0469CiMysGKEvsc"
    },
    "Обществознание": {
      "sheetId": "1_Etr2b0OURFaJZAbXgj1l3TDKk7X0469CiMysGKEvsc",
      "gid": "820658772",
      "name": "Обществознание",
      "api": "NoAPIfor1_Etr2b0OURFaJZAbXgj1l3TDKk7X0469CiMysGKEvsc"
    },
    "География": {
      "sheetId": "1_Etr2b0OURFaJZAbXgj1l3TDKk7X0469CiMysGKEvsc",
      "gid": "696023630",
      "name": "География",
      "api": "NoAPIfor1_Etr2b0OURFaJZAbXgj1l3TDKk7X0469CiMysGKEvsc"
    },
    "Биология": {
      "sheetId": "1_Etr2b0OURFaJZAbXgj1l3TDKk7X0469CiMysGKEvsc",
      "gid": "611403980",
      "name": "Биология",
      "api": "NoAPIfor1_Etr2b0OURFaJZAbXgj1l3TDKk7X0469CiMysGKEvsc"
    },
    "Физика": {
      "sheetId": "1_Etr2b0OURFaJZAbXgj1l3TDKk7X0469CiMysGKEvsc",
      "gid": "340190869",
      "name": "Физика",
      "api": "NoAPIfor1_Etr2b0OURFaJZAbXgj1l3TDKk7X0469CiMysGKEvsc"
    },
    "Химия": {
      "sheetId": "1_Etr2b0OURFaJZAbXgj1l3TDKk7X0469CiMysGKEvsc",
      "gid": "1532686743",
      "name": "Химия",
      "api": "NoAPIfor1_Etr2b0OURFaJZAbXgj1l3TDKk7X0469CiMysGKEvsc"
    }
  },
  class9_1: {
    "Русский_язык": {
      "sheetId": "1FMNCOHLbIRZrL822scLvZPiAvHnQY4bKr0YRGhNJ_n0",
      "gid": "0",
      "name": "Русский язык",
      "api": "NoAPIfor1FMNCOHLbIRZrL822scLvZPiAvHnQY4bKr0YRGhNJ_n0"
    },
    "Литература": {
      "sheetId": "1FMNCOHLbIRZrL822scLvZPiAvHnQY4bKr0YRGhNJ_n0",
      "gid": "329233048",
      "name": "Литература",
      "api": "NoAPIfor1FMNCOHLbIRZrL822scLvZPiAvHnQY4bKr0YRGhNJ_n0"
    },
    "Английский_язык": {
      "sheetId": "1FMNCOHLbIRZrL822scLvZPiAvHnQY4bKr0YRGhNJ_n0",
      "gid": "171674353",
      "name": "Английский язык",
      "api": "NoAPIfor1FMNCOHLbIRZrL822scLvZPiAvHnQY4bKr0YRGhNJ_n0"
    },
    "Математика": {
      "sheetId": "1FMNCOHLbIRZrL822scLvZPiAvHnQY4bKr0YRGhNJ_n0",
      "gid": "624656389",
      "name": "Математика",
      "api": "NoAPIfor1FMNCOHLbIRZrL822scLvZPiAvHnQY4bKr0YRGhNJ_n0"
    },
    "Информатика": {
      "sheetId": "1FMNCOHLbIRZrL822scLvZPiAvHnQY4bKr0YRGhNJ_n0",
      "gid": "1421083680",
      "name": "Информатика",
      "api": "NoAPIfor1FMNCOHLbIRZrL822scLvZPiAvHnQY4bKr0YRGhNJ_n0"
    },
    "История": {
      "sheetId": "1FMNCOHLbIRZrL822scLvZPiAvHnQY4bKr0YRGhNJ_n0",
      "gid": "801015494",
      "name": "История",
      "api": "NoAPIfor1FMNCOHLbIRZrL822scLvZPiAvHnQY4bKr0YRGhNJ_n0"
    },
    "Обществознание": {
      "sheetId": "1FMNCOHLbIRZrL822scLvZPiAvHnQY4bKr0YRGhNJ_n0",
      "gid": "1518102440",
      "name": "Обществознание",
      "api": "NoAPIfor1FMNCOHLbIRZrL822scLvZPiAvHnQY4bKr0YRGhNJ_n0"
    },
    "География": {
      "sheetId": "1FMNCOHLbIRZrL822scLvZPiAvHnQY4bKr0YRGhNJ_n0",
      "gid": "696023630",
      "name": "География",
      "api": "NoAPIfor1FMNCOHLbIRZrL822scLvZPiAvHnQY4bKr0YRGhNJ_n0"
    },
    "Биология": {
      "sheetId": "1FMNCOHLbIRZrL822scLvZPiAvHnQY4bKr0YRGhNJ_n0",
      "gid": "611403980",
      "name": "Биология",
      "api": "NoAPIfor1FMNCOHLbIRZrL822scLvZPiAvHnQY4bKr0YRGhNJ_n0"
    },
    "Физика": {
      "sheetId": "1FMNCOHLbIRZrL822scLvZPiAvHnQY4bKr0YRGhNJ_n0",
      "gid": "340190869",
      "name": "Физика",
      "api": "NoAPIfor1FMNCOHLbIRZrL822scLvZPiAvHnQY4bKr0YRGhNJ_n0"
    },
    "Химия": {
      "sheetId": "1FMNCOHLbIRZrL822scLvZPiAvHnQY4bKr0YRGhNJ_n0",
      "gid": "1532686743",
      "name": "Химия",
      "api": "NoAPIfor1FMNCOHLbIRZrL822scLvZPiAvHnQY4bKr0YRGhNJ_n0"
    }
  },
  class9_2: {
    "Русский_язык": {
      "sheetId": "10mwDQQxPaDd8t00kwQn7e593SBeDB2YLHxjHbcsW-Mw",
      "gid": "0",
      "name": "Русский язык",
      "api": "NoAPIfor10mwDQQxPaDd8t00kwQn7e593SBeDB2YLHxjHbcsW-Mw"
    },
    "Литература": {
      "sheetId": "10mwDQQxPaDd8t00kwQn7e593SBeDB2YLHxjHbcsW-Mw",
      "gid": "329233048",
      "name": "Литература",
      "api": "NoAPIfor10mwDQQxPaDd8t00kwQn7e593SBeDB2YLHxjHbcsW-Mw"
    },
    "Английский_язык": {
      "sheetId": "10mwDQQxPaDd8t00kwQn7e593SBeDB2YLHxjHbcsW-Mw",
      "gid": "171674353",
      "name": "Английский язык",
      "api": "NoAPIfor10mwDQQxPaDd8t00kwQn7e593SBeDB2YLHxjHbcsW-Mw"
    },
    "Математика": {
      "sheetId": "10mwDQQxPaDd8t00kwQn7e593SBeDB2YLHxjHbcsW-Mw",
      "gid": "624656389",
      "name": "Математика",
      "api": "NoAPIfor10mwDQQxPaDd8t00kwQn7e593SBeDB2YLHxjHbcsW-Mw"
    },
    "Информатика": {
      "sheetId": "10mwDQQxPaDd8t00kwQn7e593SBeDB2YLHxjHbcsW-Mw",
      "gid": "1421083680",
      "name": "Информатика",
      "api": "NoAPIfor10mwDQQxPaDd8t00kwQn7e593SBeDB2YLHxjHbcsW-Mw"
    },
    "История": {
      "sheetId": "10mwDQQxPaDd8t00kwQn7e593SBeDB2YLHxjHbcsW-Mw",
      "gid": "801015494",
      "name": "История",
      "api": "NoAPIfor10mwDQQxPaDd8t00kwQn7e593SBeDB2YLHxjHbcsW-Mw"
    },
    "Обществознание": {
      "sheetId": "10mwDQQxPaDd8t00kwQn7e593SBeDB2YLHxjHbcsW-Mw",
      "gid": "370783621",
      "name": "Обществознание",
      "api": "NoAPIfor10mwDQQxPaDd8t00kwQn7e593SBeDB2YLHxjHbcsW-Mw"
    },
    "География": {
      "sheetId": "10mwDQQxPaDd8t00kwQn7e593SBeDB2YLHxjHbcsW-Mw",
      "gid": "696023630",
      "name": "География",
      "api": "NoAPIfor10mwDQQxPaDd8t00kwQn7e593SBeDB2YLHxjHbcsW-Mw"
    },
    "Биология": {
      "sheetId": "10mwDQQxPaDd8t00kwQn7e593SBeDB2YLHxjHbcsW-Mw",
      "gid": "611403980",
      "name": "Биология",
      "api": "NoAPIfor10mwDQQxPaDd8t00kwQn7e593SBeDB2YLHxjHbcsW-Mw"
    },
    "Физика": {
      "sheetId": "10mwDQQxPaDd8t00kwQn7e593SBeDB2YLHxjHbcsW-Mw",
      "gid": "340190869",
      "name": "Физика",
      "api": "NoAPIfor10mwDQQxPaDd8t00kwQn7e593SBeDB2YLHxjHbcsW-Mw"
    },
    "Химия": {
      "sheetId": "10mwDQQxPaDd8t00kwQn7e593SBeDB2YLHxjHbcsW-Mw",
      "gid": "1532686743",
      "name": "Химия",
      "api": "NoAPIfor10mwDQQxPaDd8t00kwQn7e593SBeDB2YLHxjHbcsW-Mw"
    }
  },
  class10_1: {
    "Русский_язык": {
      "sheetId": "1PeSWxzLIlDNhT2ujqQz0mKnCAdt0iSQyo_XQMMeN2-g",
      "gid": "0",
      "name": "Русский язык",
      "api": "NoAPIfor1PeSWxzLIlDNhT2ujqQz0mKnCAdt0iSQyo_XQMMeN2-g"
    },
    "Литература": {
      "sheetId": "1PeSWxzLIlDNhT2ujqQz0mKnCAdt0iSQyo_XQMMeN2-g",
      "gid": "329233048",
      "name": "Литература",
      "api": "NoAPIfor1PeSWxzLIlDNhT2ujqQz0mKnCAdt0iSQyo_XQMMeN2-g"
    },
    "Английский_язык": {
      "sheetId": "1PeSWxzLIlDNhT2ujqQz0mKnCAdt0iSQyo_XQMMeN2-g",
      "gid": "171674353",
      "name": "Английский язык",
      "api": "NoAPIfor1PeSWxzLIlDNhT2ujqQz0mKnCAdt0iSQyo_XQMMeN2-g"
    },
    "Математика": {
      "sheetId": "1PeSWxzLIlDNhT2ujqQz0mKnCAdt0iSQyo_XQMMeN2-g",
      "gid": "624656389",
      "name": "Математика",
      "api": "NoAPIfor1PeSWxzLIlDNhT2ujqQz0mKnCAdt0iSQyo_XQMMeN2-g"
    },
    "Информатика": {
      "sheetId": "1PeSWxzLIlDNhT2ujqQz0mKnCAdt0iSQyo_XQMMeN2-g",
      "gid": "1421083680",
      "name": "Информатика",
      "api": "NoAPIfor1PeSWxzLIlDNhT2ujqQz0mKnCAdt0iSQyo_XQMMeN2-g"
    },
    "История": {
      "sheetId": "1PeSWxzLIlDNhT2ujqQz0mKnCAdt0iSQyo_XQMMeN2-g",
      "gid": "801015494",
      "name": "История",
      "api": "NoAPIfor1PeSWxzLIlDNhT2ujqQz0mKnCAdt0iSQyo_XQMMeN2-g"
    },
    "Обществознание": {
      "sheetId": "1PeSWxzLIlDNhT2ujqQz0mKnCAdt0iSQyo_XQMMeN2-g",
      "gid": "370783621",
      "name": "Обществознание",
      "api": "NoAPIfor1PeSWxzLIlDNhT2ujqQz0mKnCAdt0iSQyo_XQMMeN2-g"
    },
    "География": {
      "sheetId": "1PeSWxzLIlDNhT2ujqQz0mKnCAdt0iSQyo_XQMMeN2-g",
      "gid": "696023630",
      "name": "География",
      "api": "NoAPIfor1PeSWxzLIlDNhT2ujqQz0mKnCAdt0iSQyo_XQMMeN2-g"
    },
    "Биология": {
      "sheetId": "1PeSWxzLIlDNhT2ujqQz0mKnCAdt0iSQyo_XQMMeN2-g",
      "gid": "611403980",
      "name": "Биология",
      "api": "NoAPIfor1PeSWxzLIlDNhT2ujqQz0mKnCAdt0iSQyo_XQMMeN2-g"
    },
    "Физика": {
      "sheetId": "1PeSWxzLIlDNhT2ujqQz0mKnCAdt0iSQyo_XQMMeN2-g",
      "gid": "340190869",
      "name": "Физика",
      "api": "NoAPIfor1PeSWxzLIlDNhT2ujqQz0mKnCAdt0iSQyo_XQMMeN2-g"
    },
    "Химия": {
      "sheetId": "1PeSWxzLIlDNhT2ujqQz0mKnCAdt0iSQyo_XQMMeN2-g",
      "gid": "1532686743",
      "name": "Химия",
      "api": "NoAPIfor1PeSWxzLIlDNhT2ujqQz0mKnCAdt0iSQyo_XQMMeN2-g"
    }
  },
  class10_2: {
    "Русский_язык": {
      "sheetId": "1-yU65SGDMPCSI59P4eVRNkcMtaxDdToGqG2-7Ay89Iw",
      "gid": "0",
      "name": "Русский язык",
      "api": "NoAPIfor1-yU65SGDMPCSI59P4eVRNkcMtaxDdToGqG2-7Ay89Iw"
    },
    "Литература": {
      "sheetId": "1-yU65SGDMPCSI59P4eVRNkcMtaxDdToGqG2-7Ay89Iw",
      "gid": "329233048",
      "name": "Литература",
      "api": "NoAPIfor1-yU65SGDMPCSI59P4eVRNkcMtaxDdToGqG2-7Ay89Iw"
    },
    "Английский_язык": {
      "sheetId": "1-yU65SGDMPCSI59P4eVRNkcMtaxDdToGqG2-7Ay89Iw",
      "gid": "171674353",
      "name": "Английский язык",
      "api": "NoAPIfor1-yU65SGDMPCSI59P4eVRNkcMtaxDdToGqG2-7Ay89Iw"
    },
    "Математика": {
      "sheetId": "1-yU65SGDMPCSI59P4eVRNkcMtaxDdToGqG2-7Ay89Iw",
      "gid": "624656389",
      "name": "Математика",
      "api": "NoAPIfor1-yU65SGDMPCSI59P4eVRNkcMtaxDdToGqG2-7Ay89Iw"
    },
    "Информатика": {
      "sheetId": "1-yU65SGDMPCSI59P4eVRNkcMtaxDdToGqG2-7Ay89Iw",
      "gid": "1421083680",
      "name": "Информатика",
      "api": "NoAPIfor1-yU65SGDMPCSI59P4eVRNkcMtaxDdToGqG2-7Ay89Iw"
    },
    "История": {
      "sheetId": "1-yU65SGDMPCSI59P4eVRNkcMtaxDdToGqG2-7Ay89Iw",
      "gid": "801015494",
      "name": "История",
      "api": "NoAPIfor1-yU65SGDMPCSI59P4eVRNkcMtaxDdToGqG2-7Ay89Iw"
    },
    "Обществознание": {
      "sheetId": "1-yU65SGDMPCSI59P4eVRNkcMtaxDdToGqG2-7Ay89Iw",
      "gid": "370783621",
      "name": "Обществознание",
      "api": "NoAPIfor1-yU65SGDMPCSI59P4eVRNkcMtaxDdToGqG2-7Ay89Iw"
    },
    "География": {
      "sheetId": "1-yU65SGDMPCSI59P4eVRNkcMtaxDdToGqG2-7Ay89Iw",
      "gid": "696023630",
      "name": "География",
      "api": "NoAPIfor1-yU65SGDMPCSI59P4eVRNkcMtaxDdToGqG2-7Ay89Iw"
    },
    "Биология": {
      "sheetId": "1-yU65SGDMPCSI59P4eVRNkcMtaxDdToGqG2-7Ay89Iw",
      "gid": "611403980",
      "name": "Биология",
      "api": "NoAPIfor1-yU65SGDMPCSI59P4eVRNkcMtaxDdToGqG2-7Ay89Iw"
    },
    "Физика": {
      "sheetId": "1-yU65SGDMPCSI59P4eVRNkcMtaxDdToGqG2-7Ay89Iw",
      "gid": "340190869",
      "name": "Физика",
      "api": "NoAPIfor1-yU65SGDMPCSI59P4eVRNkcMtaxDdToGqG2-7Ay89Iw"
    },
    "Химия": {
      "sheetId": "1-yU65SGDMPCSI59P4eVRNkcMtaxDdToGqG2-7Ay89Iw",
      "gid": "1532686743",
      "name": "Химия",
      "api": "NoAPIfor1-yU65SGDMPCSI59P4eVRNkcMtaxDdToGqG2-7Ay89Iw"
    }
  },
  class11_1: {
    "Русский_язык": {
      "sheetId": "1D7AjubNMiNcZuKU0aA7MOvxGHOD8RFKYH6WvtMGua0s",
      "gid": "0",
      "name": "Русский язык",
      "api": "NoAPIfor1D7AjubNMiNcZuKU0aA7MOvxGHOD8RFKYH6WvtMGua0s"
    },
    "Литература": {
      "sheetId": "1D7AjubNMiNcZuKU0aA7MOvxGHOD8RFKYH6WvtMGua0s",
      "gid": "329233048",
      "name": "Литература",
      "api": "NoAPIfor1D7AjubNMiNcZuKU0aA7MOvxGHOD8RFKYH6WvtMGua0s"
    },
    "Английский_язык": {
      "sheetId": "1D7AjubNMiNcZuKU0aA7MOvxGHOD8RFKYH6WvtMGua0s",
      "gid": "171674353",
      "name": "Английский язык",
      "api": "NoAPIfor1D7AjubNMiNcZuKU0aA7MOvxGHOD8RFKYH6WvtMGua0s"
    },
    "Математика": {
      "sheetId": "1D7AjubNMiNcZuKU0aA7MOvxGHOD8RFKYH6WvtMGua0s",
      "gid": "624656389",
      "name": "Математика",
      "api": "NoAPIfor1D7AjubNMiNcZuKU0aA7MOvxGHOD8RFKYH6WvtMGua0s"
    },
    "Информатика": {
      "sheetId": "1D7AjubNMiNcZuKU0aA7MOvxGHOD8RFKYH6WvtMGua0s",
      "gid": "1421083680",
      "name": "Информатика",
      "api": "NoAPIfor1D7AjubNMiNcZuKU0aA7MOvxGHOD8RFKYH6WvtMGua0s"
    },
    "История": {
      "sheetId": "1D7AjubNMiNcZuKU0aA7MOvxGHOD8RFKYH6WvtMGua0s",
      "gid": "801015494",
      "name": "История",
      "api": "NoAPIfor1D7AjubNMiNcZuKU0aA7MOvxGHOD8RFKYH6WvtMGua0s"
    },
    "Обществознание": {
      "sheetId": "1D7AjubNMiNcZuKU0aA7MOvxGHOD8RFKYH6WvtMGua0s",
      "gid": "370783621",
      "name": "Обществознание",
      "api": "NoAPIfor1D7AjubNMiNcZuKU0aA7MOvxGHOD8RFKYH6WvtMGua0s"
    },
    "География": {
      "sheetId": "1D7AjubNMiNcZuKU0aA7MOvxGHOD8RFKYH6WvtMGua0s",
      "gid": "696023630",
      "name": "География",
      "api": "NoAPIfor1D7AjubNMiNcZuKU0aA7MOvxGHOD8RFKYH6WvtMGua0s"
    },
    "Биология": {
      "sheetId": "1D7AjubNMiNcZuKU0aA7MOvxGHOD8RFKYH6WvtMGua0s",
      "gid": "611403980",
      "name": "Биология",
      "api": "NoAPIfor1D7AjubNMiNcZuKU0aA7MOvxGHOD8RFKYH6WvtMGua0s"
    },
    "Физика": {
      "sheetId": "1D7AjubNMiNcZuKU0aA7MOvxGHOD8RFKYH6WvtMGua0s",
      "gid": "340190869",
      "name": "Физика",
      "api": "NoAPIfor1D7AjubNMiNcZuKU0aA7MOvxGHOD8RFKYH6WvtMGua0s"
    },
    "Химия": {
      "sheetId": "1D7AjubNMiNcZuKU0aA7MOvxGHOD8RFKYH6WvtMGua0s",
      "gid": "1532686743",
      "name": "Химия",
      "api": "NoAPIfor1D7AjubNMiNcZuKU0aA7MOvxGHOD8RFKYH6WvtMGua0s"
    }
  },
  class11_2: {
    "Русский_язык": {
      "sheetId": "19WzVvOWy41xkinaKqjlGUmZu6htaGDLPuAstW-eeqVM",
      "gid": "0",
      "name": "Русский язык",
      "api": "NoAPIfor19WzVvOWy41xkinaKqjlGUmZu6htaGDLPuAstW-eeqVM"
    },
    "Литература": {
      "sheetId": "19WzVvOWy41xkinaKqjlGUmZu6htaGDLPuAstW-eeqVM",
      "gid": "329233048",
      "name": "Литература",
      "api": "NoAPIfor19WzVvOWy41xkinaKqjlGUmZu6htaGDLPuAstW-eeqVM"
    },
    "Английский_язык": {
      "sheetId": "19WzVvOWy41xkinaKqjlGUmZu6htaGDLPuAstW-eeqVM",
      "gid": "171674353",
      "name": "Английский язык",
      "api": "NoAPIfor19WzVvOWy41xkinaKqjlGUmZu6htaGDLPuAstW-eeqVM"
    },
    "Математика": {
      "sheetId": "19WzVvOWy41xkinaKqjlGUmZu6htaGDLPuAstW-eeqVM",
      "gid": "624656389",
      "name": "Математика",
      "api": "NoAPIfor19WzVvOWy41xkinaKqjlGUmZu6htaGDLPuAstW-eeqVM"
    },
    "Информатика": {
      "sheetId": "19WzVvOWy41xkinaKqjlGUmZu6htaGDLPuAstW-eeqVM",
      "gid": "1421083680",
      "name": "Информатика",
      "api": "NoAPIfor19WzVvOWy41xkinaKqjlGUmZu6htaGDLPuAstW-eeqVM"
    },
    "История": {
      "sheetId": "19WzVvOWy41xkinaKqjlGUmZu6htaGDLPuAstW-eeqVM",
      "gid": "801015494",
      "name": "История",
      "api": "NoAPIfor19WzVvOWy41xkinaKqjlGUmZu6htaGDLPuAstW-eeqVM"
    },
    "Обществознание": {
      "sheetId": "19WzVvOWy41xkinaKqjlGUmZu6htaGDLPuAstW-eeqVM",
      "gid": "370783621",
      "name": "Обществознание",
      "api": "NoAPIfor19WzVvOWy41xkinaKqjlGUmZu6htaGDLPuAstW-eeqVM"
    },
    "География": {
      "sheetId": "19WzVvOWy41xkinaKqjlGUmZu6htaGDLPuAstW-eeqVM",
      "gid": "696023630",
      "name": "География",
      "api": "NoAPIfor19WzVvOWy41xkinaKqjlGUmZu6htaGDLPuAstW-eeqVM"
    },
    "Биология": {
      "sheetId": "19WzVvOWy41xkinaKqjlGUmZu6htaGDLPuAstW-eeqVM",
      "gid": "611403980",
      "name": "Биология",
      "api": "NoAPIfor19WzVvOWy41xkinaKqjlGUmZu6htaGDLPuAstW-eeqVM"
    },
    "Физика": {
      "sheetId": "19WzVvOWy41xkinaKqjlGUmZu6htaGDLPuAstW-eeqVM",
      "gid": "340190869",
      "name": "Физика",
      "api": "NoAPIfor19WzVvOWy41xkinaKqjlGUmZu6htaGDLPuAstW-eeqVM"
    },
    "Химия": {
      "sheetId": "19WzVvOWy41xkinaKqjlGUmZu6htaGDLPuAstW-eeqVM",
      "gid": "1532686743",
      "name": "Химия",
      "api": "NoAPIfor19WzVvOWy41xkinaKqjlGUmZu6htaGDLPuAstW-eeqVM"
    }
  }
};

// Словарь синонимов предметов
const SUBJECT_MAP = {
  'Английский язык': ['Англ.яз', 'Английский', 'English', 'Анг.яз', 'Англ', 'Анг'],
  'Физкультура': ['Физ-ра', 'Физическая культура', 'Физра', 'Физ-культура', 'Физ'],
  'Русский язык': ['Рус.яз', 'Русский', 'Рус'],
  'Литература': ['Литер', 'Лит-ра', 'Лит'],
  'История': ['Истор'],
  'География': ['Геогр'],
  'Биология': ['Биол'],
  'Химия': [],
  'Психология': ['Психол', 'Психолог'],
  'Физика': [],
  'Информатика': ['Информ'],
  'Обществознание': ['Обществ', 'Обществозн'],
  'Технология': ['Технол'],
  'Рисование': ['ИЗО', 'Изобразительное искусство'],
  'Музыка': [],
  'Основы безопасности': ['ОБЖ', 'Основы безопасности жизнедеятельности'],
  'Начальные классы': ['Началка', 'Нач. классы', 'НК'],
  'Математика': ['Матем', 'Математ'],
  'Статистика': ['Вероятность и Статистика', 'ВиС', 'Вероятность', 'В', 'С'],
  'Геометрия': ['Геом', 'Г'],
  'Алгебра': ['Алг', 'А'],
  'Лекция': ['Лек', 'Л'],
  'Практика': ['Практ', 'Пр'],
  'Подготовка': ['Подг', 'П'],
  'Лабораторная': ['Лаб', 'ЛР'],
  'Контрольная': ['КР'],
  'Консультация': ['Конс', 'К'],
  'Зачёт': ['Зач', 'З'],
  'Экзамен': ['Экз'],
  'Столовая': ['стол', 'столовая'],
  'Спортзал': ['зал', 'спортзал', 'спорт'],
  'Актовый зал': ['актовый', 'акт', 'актзал'],
  'Лаборатория': ['лаб', 'лаборатория'],
  'Кабинет': ['каб', 'к'],
  'Мастерская': ['мастер', 'маст'],
  'Бассейн': ['бассейн', 'басс']
};
