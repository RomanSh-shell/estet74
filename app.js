////////////////////app.js//////////////////////
//      Получение и вывод данных. VUE.JS      //
////////////////////////////////////////////////

new Vue({
  el: '#app',
  
  // --- СОСТОЯНИЕ ПРИЛОЖЕНИЯ ---
  data: {
    schedule: [],      // Данные для одного дня
    weekSchedule: [],  // Данные для режима "Вся неделя"
    GROUPS: [],        // Список доступных классов (загружается первым)
    selectedGroup: '', // Текущий выбранный класс
    
    // Авто-выбор дня: Если сб/вс -> "Вся неделя", иначе текущий день недели (0-4)
    selectedDay: (() => {
        const todayIndex = new Date().getDay();
        return String(todayIndex >= 1 && todayIndex <= 5 ? todayIndex - 1 : "all");
    })(),
    
    loading: false,    // Индикатор загрузки (спиннер)
    failMode: INITIAL_FAIL_MODE, // Режим "только ссылки" при ошибках
    daysData: days,    // Из settings.js
    classesData: classes // Из settings.js
  },
  
  computed: {
    isWeekView() {
      return this.selectedDay === 'all';
    }
  },
  
  methods: {
    /**
     * ЭТАП 1: Инициализация списка групп.
     * Загружается быстро, чтобы пользователь мог видеть интерфейс 
     * и сменить класс, даже если расписание будет грузиться долго.
     */
    async initGroups() {
      if (INITIAL_FAIL_MODE) return;

      try {
          const groups = await getGroupsList(this.selectedDay);
          // Если массив пуст — считаем это сбоем
          if (!groups || groups.length === 0) {
              console.warn("Группы не загрузились (пустой список). Включаю FailMode.");
              this.failMode = true;
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
          console.error("App: Ошибка инициализации групп", e);
          this.failMode = true;
      }
  },

    /**
     * ЭТАП 2: Загрузка основного расписания.
     * Выполняется после initGroups или при смене фильтров.
     */
    async loadSchedule() {
      if (!this.selectedGroup) return; // Нечего грузить

      this.loading = true;

      // Ручной режим ошибки (если включен в settings.js)
      if (INITIAL_FAIL_MODE) { 
          this.failMode = true;
          this.loading = false;
          return;
      }
      
      // Запоминаем выбор пользователя на будущее
      setCookie('selectedGroup', this.selectedGroup, 365);
      
      try {
        // Вызываем "тяжелую" функцию из api.js, передавая ВЫБРАННУЮ группу
        const data = await getSchedule(
            this.selectedDay === 'all' ? 'all' : parseInt(this.selectedDay),
            this.selectedGroup
        );

        // Распределяем данные в зависимости от режима просмотра
        if (this.selectedDay === 'all') {
          this.weekSchedule = data.weekSchedule || [];
          this.schedule = [];
        } else {
          this.schedule = data.schedule || [];
          this.weekSchedule = [];
        }
        
        this.failMode = false; // Успех!

      } catch (error) {
        console.error('App: Ошибка загрузки расписания:', error);
        this.failMode = true; // Включаем запасной интерфейс со ссылками
      } finally {
        this.loading = false;
      }
    },
    
    // Обработчик смены дня в выпадающем списке (можно добавить доп. логику если надо)
    handleDayChange() {
        this.loadSchedule();
    }
  },
  
  /**
   * ЖИЗНЕННЫЙ ЦИКЛ: При запуске приложения
   */
  async mounted() {
    // 1. Сначала ждем загрузки списка классов
    await this.initGroups();
    
    // 2. Только если классы загрузились и выбран один из них — качаем расписание
    if (this.selectedGroup) {
        this.loadSchedule();
    }
  }
});