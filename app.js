////////////////////app.js//////////////////////
//      Получение и вывод данных. VUE 3       //
////////////////////////////////////////////////

const { createApp } = Vue;

createApp({
    data() {
        return {
            weekSchedule: [],  // Итоговый массив из 7 дней
            GROUPS: [],        // Список доступных классов
            selectedGroup: '', // Выбранный класс
            loading: false,    // Спиннер

            // Данные для фолбэка (из settings.js)
            daysData: typeof days !== 'undefined' ? days : {},
            classesData: typeof classes !== 'undefined' ? classes : {}
        }
    },

    methods: {
        /**
         * 1. Инициализация списка групп
         */
        async initGroups() {
            if (typeof INITIAL_FAIL_MODE !== 'undefined' && INITIAL_FAIL_MODE) return;

            try {
                // Грузим группы из "понедельника" (day0), так как списки везде одинаковые
                const groups = await getGroupsList(0);

                if (!groups || groups.length === 0) {
                    console.warn("Группы не загрузились.");
                    return;
                }

                this.GROUPS = groups;

                // Восстановление из куки
                const cookieGroup = getCookie('selectedGroup');
                if (cookieGroup && this.GROUPS.includes(cookieGroup)) {
                    this.selectedGroup = cookieGroup;
                } else {
                    this.selectedGroup = this.GROUPS[0];
                }
            } catch (e) {
                console.error("Ошибка инициализации групп", e);
            }
        },

        /**
         * 2. Основная функция загрузки (7 дней подряд)
         */
        async loadSchedule() {
            if (!this.selectedGroup) return;

            this.loading = true;
            this.weekSchedule = []; // Очищаем перед загрузкой

            // Сохраняем выбор
            setCookie('selectedGroup', this.selectedGroup, 365);

            try {
                // Генерируем структуру недели (даты, имена дней)
                const rollingWeek = this.generateDates();

                // Создаем массив промисов для параллельной загрузки
                const loadPromises = rollingWeek.map(async (dayObj) => {
                    // dayObj.sheetIndex: 0=Пн, 1=Вт ... 4=Пт, -1=Выходной
                    if (dayObj.sheetIndex >= 0 && dayObj.sheetIndex <= 4) {
                        try {
                            const data = await getSchedule(dayObj.sheetIndex, this.selectedGroup);
                            dayObj.schedule = data.schedule || [];
                        } catch (e) {
                            console.warn(`Не удалось загрузить данные для ${dayObj.dayName}`);
                            dayObj.schedule = [];
                        }
                    } else {
                        // Выходной
                        dayObj.schedule = [];
                    }
                    return dayObj;
                });

                // Ждем выполнения всех запросов
                this.weekSchedule = await Promise.all(loadPromises);

            } catch (error) {
                console.error('App: Критическая ошибка загрузки:', error);
            } finally {
                this.loading = false;
            }
        },

        /**
         * Утилита: Генерация массива дат на 7 дней вперед
         */
        generateDates() {
            const result = [];
            const today = new Date();

            const dayNames = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
            //const monthNames = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

            for (let i = 0; i < 7; i++) {
                // Создаем копию даты и сдвигаем на i дней
                const currentDate = new Date(today);
                currentDate.setDate(today.getDate() + i);

                const jsDay = currentDate.getDay(); // 0 (Вс) ... 6 (Сб)
                const dateNum = currentDate.getDate();
                //const monthName = monthNames[currentDate.getMonth()];

                // Преобразуем JS день недели в индекс таблицы (0=Пн...4=Пт)
                // Вс(0) -> -1, Сб(6) -> -1
                let sheetIndex = -1;
                if (jsDay >= 1 && jsDay <= 5) {
                    sheetIndex = jsDay - 1; // Пн(1)->0, Вт(2)->1 ...
                }

                result.push({
                    dayName: dayNames[jsDay],       // "Понедельник"
                    day: dateNum,                   // "13"
                    sheetIndex: sheetIndex,         // Индекс для запроса к API
                    schedule: []                    // Сюда потом положим уроки
                });
            }
            return result;
        }
    },

    async mounted() {
        await this.initGroups();
        if (this.selectedGroup) {
            this.loadSchedule();
        }
    }
}).mount('#app');