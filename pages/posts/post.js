var postsData = require('../../data/posts-data.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
        postList: postsData.postList
    });
  },



  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },

  onPostTap:function(event){
    var postId = event.currentTarget.dataset.postid;
    //console.log(postId);

    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId,
    })
  },
  onSwiperTap: function (event) {
    //target 是当前点击的组件，currentTarget当前事件捕获的组件
    //target这里是指的image，currentTarget指的是swiper
    var postId = event.target.dataset.postid;
    //console.log(postId);

    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId,
    })
  }
})