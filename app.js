////////////////////app.js//////////////////////
new Vue({
  el: '#app',
  data: {
    schedule: [],
    GROUPS: [],
    selectedGroup: '',
    selectedDate: new Date().toISOString().split('T')[0],
    loading: false
  },
  methods: {
    formatDate(dateStr) {
      const date = new Date(dateStr);
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString('ru-RU', options);
    },
    
    async loadSchedule() {
      this.loading = true;
      try {
        const data = await getSchedule(this.selectedDate);
        this.schedule = data.schedule || [];
        this.GROUPS = data.GROUPS || [];
        this.selectedGroup = data.selectedGroup || '';
        
        // Сохраняем выбор в куки
        if (this.selectedGroup) {
          setCookie('selectedGroup', this.selectedGroup, 365);
        }
      } catch (error) {
        console.error('Ошибка загрузки расписания:', error);
        this.schedule = [];
      } finally {
        this.loading = false;
      }
    }
  },
  mounted() {
    this.loadSchedule();
  }
});
