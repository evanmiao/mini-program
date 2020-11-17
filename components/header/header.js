Component({
  data: {
    showSidebar: false
  },
  methods: {
    toggleSidebar: function () {
      this.setData({
        showSidebar: !this.data.showSidebar
      })
    }
  }
})