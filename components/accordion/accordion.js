Component({
  lifetimes: {
    attached: function () {
      this.setData({
        type: this.properties.type,
        title: this.properties.title,
        subChannel: this.properties.subChannel
      })
    },
    // detached: function () {}
  },
  properties: {
    type: String,
    title: String,
    subChannel: Array
  },
  data: {
    isOpen: true
  },
  methods: {
    toggleAccordion: function () {
      this.setData({
        isOpen: !this.data.isOpen
      })
    }
  }
})