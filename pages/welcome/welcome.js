Page({
    onTag:function(){
        //wx.navigateTo({
        //  url:"../posts/post"
        //});

        wx.navigateTo({
          url: '../posts/post',
        })
    },

    onUnload: function () {
      console.log('onUnload')
    },

    onHide: function () {
      console.log('onHide')
    }
})