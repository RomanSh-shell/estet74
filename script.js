new Vue({
    el: '#app',
    data: {
        selectedDate: new Date().toISOString().split('T')[0],
        selectedGroup: '10А',
        GROUPS: ['10А', '10Б', '10В', '11А', '11Б', '9А', '9Б'],
        // Массив синонимов для предметов
        SUBJECT_SYNONYMS: {
            'Английский язык': ['Англ.яз', 'Английский', 'English', 'Анг.яз'],
            'Физкультура': ['Физ-ра', 'Физическая культура', 'Физра'],
            'Русский язык': ['Рус.яз', 'Русский', 'Русский язык'],
            'Математика': ['Матем', 'Математика'],
            'Статистика': ['Матем(С)', 'Математика(С)','Матем(В)', 'Математика(В)','Матем(ВиС)', 'Математика(ВиС)','ВиС','Вероятность'],
            'Геометрия': ['Матем(Г)', 'Математика(Г)', 'Геом'],
            'Алгебра': ['Матем(А)', 'Математика(Г)', 'Алг'],
            'Литература': ['Литер', 'Лит-ра'],
            'История': ['История', 'Истор'],
            'География': ['География', 'Геогр'],
            'Биология': ['Биология', 'Биол'],
            'Химия': ['Химия'],
            'Психология': ['Психол','Психолог'],
            'Физика': ['Физика'],
            'Информатика': ['Информатика', 'Информ'],
            'Обществознание': ['Обществ'],
            'Технология': ['Технология', 'Технол'],
            'Рисование': ['ИЗО', 'Изобразительное искусство'],
            'Музыка': ['Музыка'],
            'ОБЖ': ['ОБЖ', 'Основы безопасности жизнедеятельности'],
            'Начальные классы': ['Началка', 'Нач. классы', 'НК'],
        },
        TEACHERS: [
            {
                name: "Столповских Марина Михайловна",
                position: "Учитель начальных классов",
                experience: "Пед стаж: 21 год",
                image: "/images/photo/stolpovskih.webp",
                study: "Начальные классы",
                groups: [1, 2, 3, 4]
            },
            {
                name: "Жираншина Светлана Григорьевна",
                position: "Учитель начальных классов",
                experience: "Пед. стаж: 6 лет",
                image: "/images/photo/zhiranshina.webp",
                study: "Начальные классы",
                groups: [1, 2, 3, 4]
            },
            {
                name: "Мухаматнурова Диляра Галиулловна",
                position: "Учитель начальных классов",
                experience: "Пед. стаж: 13 лет",
                achievements: "Награждена Грамотой Законодательного собрания Челябинской области...",
                image: "/images/photo/muhamatnurova.webp",
                study: "Начальные классы",
                groups: [1, 2, 3, 4]
            },
            {
                name: "Фокина Анастасия Алексеевна",
                position: "Учитель начальных классов",
                experience: "Пед. стаж: 6 лет",
                image: "/images/photo/fokina.webp",
                study: "Начальные классы",
                groups: [1, 2, 3, 4]
            },
            {
                name: "Семененко Ирина Равильевна",
                position: "Педагог группы продленного дня",
                experience: "Пед. стаж: 12 лет",
                image: "/images/photo/semenenko.webp",
                study: "ГПД",
                groups: [1, 2, 3, 4]
            },
            {
                name: "Немоляева Елена Владимировна",
                position: "Учитель русского языка и литературы, логопед-дефектолог",
                experience: "Пед стаж: 14 лет",
                category: "первая",
                achievements: "Эксперт ЕГЭ, ОГЭ",
                image: "/images/photo/svyazhenina.webp",
                study: "Русский язык",
                groups: [5, 6, 7, 8]
            },
            {
                name: "Рязанова Лидия Миратовна",
                position: "Учитель русского языка и литературы",
                experience: "Пед. стаж: 14 лет",
                category: "первая",
                image: "/images/photo/ryazanova2.webp",
                study: "Русский язык",
                groups: [9, 10, 11]
            },
            {
                name: "Дубовец Ирина Владимировна",
                position: "Учитель русского языка и литературы",
                experience: "Пед. стаж: 31 год",
                achievements: "Кандидат педагогических наук",
                image: "/images/photo/dubovec.webp",
                study: "Литература",
                groups: [5, 6, 7]
            },
            {
                name: "Пашнина Ольга Александровна",
                position: "Учитель русского языка и литературы",
                experience: "Пед стаж: 17 лет",
                category: "первая",
                achievements: "Эксперт ЕГЭ, ОГЭ",
                image: "/images/photo/Pashnina.webp",
                study: "Литература",
                groups: [8, 9, 10, 11]
            },
            {
                name: "Васильева Ольга Михайловна",
                position: "Учитель английского языка",
                experience: "Пед стаж: 14 лет",
                image: "/images/photo/vasileva.webp",
                study: "Английский язык",
                groups: [1, 2, 3, 4, 5]
            },
            {
                name: "Федосеева Наталья Константиновна",
                position: "Учитель английского языка",
                experience: "Пед стаж: 5 лет",
                image: "/images/photo/fedoseeva.webp",
                study: "Английский язык",
                groups: [6, 7, 8, 9, 10, 11]
            },
            {
                name: "Рязанова Галина Михайловна",
                position: "Учитель математики",
                experience: "Пед стаж: 36 лет",
                category: "высшая",
                image: "/images/photo/ryazanova.webp",
                study: "Математика",
                groups: [5, 6, 7]
            },
            {
                name: "Редько Юрий Израйлевич",
                position: "Учитель математики",
                experience: "Пед стаж: 39 лет",
                category: "высшая",
                achievements: "Почетный работник образования",
                image: "/images/photo/redko.webp",
                study: "Математика",
                groups: [8, 9, 10, 11]
            },
            {
                name: "Купцова Александра Сергеевна",
                position: "Учитель математики и информатики",
                experience: "Пед. стаж: 14 лет",
                image: "/images/photo/kupcova.webp",
                study: "Информатика",
                groups: [7, 8, 9, 10, 11]
            },
            {
                name: "Шарапова Елена Ивановна",
                position: "Учитель истории и обществознания",
                experience: "Пед стаж: 10 лет",
                category: "первая",
                image: "/images/photo/sharapova.webp",
                study: "История",
                groups: [5, 6, 7, 8]
            },
            {
                name: "Малева Марина Александровна",
                position: "Учитель истории и обществознания",
                experience: "Пед. стаж: 20 лет",
                category: "высшая",
                achievements: "Диплом лауреата премии Губернатора работникам образования...",
                image: "/images/photo/maleva.webp",
                study: "Обществознание",
                groups: [9, 10, 11]
            },
            {
                name: "Чесанova Елена Анатольевна",
                position: "Учитель физики и астрономии",
                experience: "Пед. стаж: 26 лет",
                achievements: "Почётные грамоты Министерства образования...",
                image: "/images/photo/chesanova.webp",
                study: "Физика",
                groups: [7, 8, 9]
            },
            {
                name: "Белоусова Екатерина Павловна",
                position: "Учитель химии и биологии",
                experience: "Пед стаж: 17 лет",
                category: "первая",
                image: "/images/photo/belousova.webp",
                study: "Химия",
                groups: [8, 9, 10, 11]
            },
            {
                name: "Илюшина Физия Гатиятулловна",
                position: "Учитель географии и биологии",
                experience: "Пед. стаж: 19 лет",
                category: "высшая",
                image: "/images/photo/ilushina.webp",
                study: "Биология",
                groups: [5, 6, 7]
            },
            {
                name: "Желтова Елена Вячеславовна",
                position: "Учитель ИЗО и технологии",
                experience: "Пед стаж: 14 лет",
                category: "высшая",
                image: "/images/photo/arzamasceva.webp",
                study: "ИЗО",
                groups: [1, 2, 3, 4, 5]
            },
            {
                name: "Агафонова Ольга Анатольевна",
                position: "Учитель музыки",
                experience: "Пед стаж: 24 года",
                category: "первая",
                image: "/images/photo/agafonova.webp",
                study: "Музыка",
                groups: [1, 2, 3, 4, 5, 6, 7]
            },
            {
                name: "Темченкова Ольга Леонидовна",
                position: "Учитель физической культуры",
                experience: "Пед. стаж: 18 лет",
                image: "/images/photo/temchenkova.webp",
                study: "Физическая культура",
                groups: [8, 9, 10, 11]
            }
        ],
        LESSONS: [
            { date: '2024-01-15', group: '10А', lesson: 1, time: "08:00-08:45", subject: "Математика", room: "12" },
            { date: '2024-01-15', group: '10А', lesson: 2, time: "08:55-09:40", subject: "Физика", room: "24" },
            { date: '2024-01-15', group: '10А', lesson: 3, time: "10:00-10:45", subject: "Информатика", room: "15" },
            { date: '2024-01-15', group: '10А', lesson: 4, time: "11:05-11:50", subject: "История", room: "33" },
            { date: '2024-01-15', group: '10А', lesson: 5, time: "12:00-12:45", subject: "Англ.яз", room: "18" },
            { date: '2024-01-15', group: '10А', lesson: 6, time: "12:55-13:40", subject: "Рус.яз", room: "10/1" },
            { date: '2024-01-15', group: '10Б', lesson: 1, time: "08:00-08:45", subject: "Литература", room: "22" },
            { date: '2024-01-15', group: '10Б', lesson: 2, time: "08:55-09:40", subject: "Англ.яз", room: "18" },
            { date: '2024-01-16', group: '10А', lesson: 1, time: "08:00-08:45", subject: "Химия", room: "31" },
            { date: '2024-01-16', group: '10А', lesson: 2, time: "08:55-09:40", subject: "Биология", room: "29" },
            { date: '2024-01-16', group: '10А', lesson: 3, time: "10:00-10:45", subject: "Физкультура", room: "спортзал" },
            { date: '2024-01-16', group: '10А', lesson: 4, time: "11:05-11:50", subject: "География", room: "27" },
            { date: '2024-01-16', group: '10А', lesson: 5, time: "12:00-12:45", subject: "Математика", room: "12" },
            { date: '2024-01-16', group: '10А', lesson: 6, time: "12:55-13:40", subject: "Рус.яз", room: "10/1" }
        ],
        HOMETASK: [
            {
                subject: "Русский язык",
                quarter: "1 ЧЕТВЕРТЬ 2024-25 УЧЕБНОГО ГОДА",
                assignments: [
                    { date: "2024-01-15", task: "Упр.41(орфограммы)" },
                    { date: "2024-01-16", task: "Упр.45(орфограммы)" },
                    { date: "2024-01-17", task: "Упр.50(орфограммы,основы,разборы)" },
                    { date: "2024-01-18", task: "Упр.52(орфограммы,разборы)" },
                    { date: "2024-01-19", task: "Подготовиться к контрольной работе" }
                ]
            },
            {
                subject: "Математика",
                quarter: "1 ЧЕТВЕРТЬ 2024-25 УЧЕБНОГО ГОДА",
                assignments: [
                    { date: "2024-01-15", task: "не задано" },
                    { date: "2024-01-16", task: "А: Таблица 2. Варианты 4-6" },
                    { date: "2024-01-17", task: "Г: с.228 №926, 933" },
                    { date: "2024-01-18", task: "А: 4 примера в тетр." },
                    { date: "2024-01-19", task: "Г: №929, 930, 936, закончить 937" }
                ]
            },
            {
                subject: "Английский язык",
                quarter: "1 ЧЕТВЕРТЬ 2024-25 УЧЕБНОГО ГОДА",
                assignments: [
                    { date: "2024-01-15", task: "Стр. 45-46, упр. 5а, 6b" },
                    { date: "2024-01-16", task: "Подготовить рассказ о хобби" },
                    { date: "2024-01-17", task: "Выучить слова по теме 'Еда'" },
                    { date: "2024-01-18", task: "Стр. 52-53, прочитать текст" },
                    { date: "2024-01-19", task: "Повторить времена глаголов" }
                ]
            },
            {
                subject: "История",
                quarter: "1 ЧЕТВЕРТЬ 2024-25 УЧЕБНОГО ГОДА",
                assignments: [
                    { date: "2024-01-15", task: "Прочитать §12-13" },
                    { date: "2024-01-16", task: "Подготовить доклад о Петре I" },
                    { date: "2024-01-17", task: "Ответить на вопросы стр. 89" },
                    { date: "2024-01-18", task: "Составить таблицу реформ" },
                    { date: "2024-01-19", task: "Повторить даты к контрольной" }
                ]
            }
        ]
    },
    computed: {
        filteredLessons() {
            return this.LESSONS.filter(lesson => 
                lesson.date === this.selectedDate && 
                lesson.group === this.selectedGroup
            ).sort((a, b) => a.lesson - b.lesson);
        }
    },
    methods: {
        formatDate(dateString) {
            const options = { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            };
            return new Date(dateString).toLocaleDateString('ru-RU', options);
        },
        // Получение стандартного названия предмета по синониму
        getStandardSubjectName(subjectName) {
            for (const [standardName, synonyms] of Object.entries(this.SUBJECT_SYNONYMS)) {
                if (synonyms.includes(subjectName) || standardName === subjectName) {
                    return standardName;
                }
            }
            return subjectName;
        },
        // Получение учителя по предмету (с учетом синонимов)
        getTeacherBySubject(subjectName) {
            const standardName = this.getStandardSubjectName(subjectName);
            
            // Сначала ищем учителя с точным совпадением
            let teacher = this.TEACHERS.find(t => 
                this.getStandardSubjectName(t.study) === standardName
            );
            
            // Если не нашли, ищем частичное совпадение
            if (!teacher) {
                teacher = this.TEACHERS.find(t => 
                    this.getStandardSubjectName(t.study).includes(standardName) || 
                    standardName.includes(this.getStandardSubjectName(t.study))
                );
            }
            
            return teacher || null;
        },
        // Получение домашнего задания по предмету (с учетом синонимов)
        getHometaskForSubject(subjectName) {
            const standardName = this.getStandardSubjectName(subjectName);
            const hometaskSubject = this.HOMETASK.find(h => h.subject === standardName);
            
            if (!hometaskSubject) return null;
            
            const assignment = hometaskSubject.assignments.find(a => a.date === this.selectedDate);
            return assignment ? assignment.task : null;
        }
    },
    mounted() {
        console.log('Компонент расписания загружен');
    }
});