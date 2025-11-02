////////////////////app.js//////////////////////
new Vue({
  el: '#app',
  data: {
    schedule: [],
    weekSchedule: [],
    GROUPS: [],
    selectedGroup: '',
    selectedDay: String(((new Date().getDay() + 6) % 7 + 1) % 7), // Следующий день
    loading: false,
    failMode: false,
    daysData: days,
    classesData: classes
  },
  computed: {
    isWeekView() {
      return this.selectedDay === 'all';
    }
  },
  methods: {
    async loadSchedule() {
      this.loading = true;
      try {
        const data = await getSchedule(this.selectedDay === 'all' ? 'all' : parseInt(this.selectedDay));
        
        // Проверяем флаг FAIL
        if (FAIL) {
          this.failMode = true;
          return;
        }
        
        if (this.selectedDay === 'all') {
          this.weekSchedule = data.weekSchedule || [];
          this.schedule = [];
        } else {
          this.schedule = data.schedule || [];
          this.weekSchedule = [];
        }
        
        this.GROUPS = data.GROUPS || [];
        this.selectedGroup = data.selectedGroup || '';
        
        if (this.selectedGroup) {
          setCookie('selectedGroup', this.selectedGroup, 365);
        }
      } catch (error) {
        console.error('Ошибка загрузки расписания:', error);
        this.failMode = true;
      } finally {
        this.loading = false;
      }
    }
  },
  mounted() {
    this.loadSchedule();
  }
});
