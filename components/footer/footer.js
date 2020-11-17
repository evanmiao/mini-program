Component({
  data: {
    shop: [{
      name: "1688",
      link: "https://zhiyuygxny.1688.com/?spm=a26",
      imgUrl: "https://www.zhyuanyu.com/wp-content/themes/zhyuanyu/skin/mobile/images/1688.jpg"
    }, {
      name: "天猫",
      link: "https://shop198909209.taobao.com",
      imgUrl: "https://www.zhyuanyu.com/wp-content/themes/zhyuanyu/skin/mobile/images/tm.jpg"
    }, {
      name: "淘宝",
      link: "https://shop124595614.taobao.com",
      imgUrl: "https://www.zhyuanyu.com/wp-content/themes/zhyuanyu/skin/mobile/images/tb.jpg"
    }, {
      name: "京东",
      link: "https://mall.jd.com/index-699718.html",
      imgUrl: "https://www.zhyuanyu.com/wp-content/themes/zhyuanyu/skin/mobile/images/jd.jpg"
    }]
  },
  methods: {
    tap: function (e) {
      var that = this
      var index = e.target.dataset.itemIndex
      wx.showModal({
        content: '确定要跳转' + that.data.shop[index].name + '店铺吗',
        showCancel: true,
        success: function(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: "/pages/out/out?url=" + that.data.shop[index].link
            })
          } else if (res.cancel) {
            console.log('取消')
          }
        }
      })
    }
  }
})