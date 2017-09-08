var postsData = require('../../../data/posts-data.js')
var app = getApp();

// post-detail.js
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
    var postId = options.id;
    this.data.currentId = postId;
    this.setData({
      postData: postsData.postList[postId],
    });

    var postsCollected = wx.getStorageSync('postsCollected')
    if (postsCollected) {
      var postCollected = postsCollected[postId]
      this.setData({
        collected: postCollected
      })
    }
    else {
      postsCollected = {};
      postsCollected[postId] = false;
      wx.setStorage({
        key: 'postsCollected',
        data: postsCollected,
      })
    }
    this.setMusicMonitor();

    if (app.globalData.g_isPalyingMusic && app.g_currentMusic === postId) {
      var isPlayingMusic = "running";
    }
    else {
      var isPlayingMusic = "paused";
    }
    this.setData({
      isPlayingMusic: isPlayingMusic,
    })
  },

  setMusicMonitor: function () {
    var that = this;
    wx.onBackgroundAudioPlay(function () {
      app.globalData.g_isPalyingMusic = true;
      app.g_currentMusic = that.data.currentId
      that.setData({
        isPlayingMusic: "running"
      })
    })
    wx.onBackgroundAudioPause(function () {
      app.globalData.g_isPalyingMusic = false;
      app.g_currentMusic = null;
      that.setData({
        isPlayingMusic: "paused"
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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

  onCollectTap: function (event) {
    this.getPostsCollectedSyc();

    /*wx.showToast({
      title: postCollected ? '收藏成功' : '取消收藏',
      duration: 1000,
      icon: "success"
    })*/
  },

  getPostsCollectedAsy: function () {
    that = this;
    wx.getStorage({
      key: 'postsCollected',
      success: function (res) {
        var postsCollected = res.data;
        var postCollected = postsCollected[that.data.currentId];
        var postCollected = !postCollected
        postsCollected[that.data.currentId] = postCollected
        this.showModal(postsCollected, postCollected);
      },
    })
  },

  getPostsCollectedSyc: function () {
    var postsCollected = wx.getStorageSync('postsCollected')
    var postCollected = postsCollected[this.data.currentId];
    var postCollected = !postCollected
    postsCollected[this.data.currentId] = postCollected
    // 更新文章是否的缓存值
    this.showModal(postsCollected, postCollected);
  },

  showModal: function (postsCollected, postCollected) {
    var that = this;
    wx.showModal({
      title: '收藏',
      content: postCollected ? '取消收藏改文章?' : '收藏该文章',
      showCancel: "true",
      cancelColor: "#333",
      cancelText: "取消",
      confirmText: "确认",
      confirmColor: "#405f80",
      success: function (res) {
        if (res.confirm) {
          wx.setStorageSync('postsCollected', postsCollected)
          // 更新数据绑定变量，从而实现切换图片
          that.setData({
            collected: postCollected
          })
        }
      }
    })
  },

  showToast: function (postsCollected, postCollected) {
    wx.showToast({
      title: postCollected ? '收藏成功！' : '取消收藏！',
      icon: 'success',
      duration: 1000,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
    wx.setStorageSync('postsCollected', postsCollected)
    // 更新数据绑定变量，从而实现切换图片
    this.setData({
      collected: postCollected
    })
  },

  onShareTap: function (event) {
    var itemList = [
      "分享给微信好友",
      "分享到朋友圈",
      "分享到QQ",
      "分享到微博"
    ]
    wx.showActionSheet({
      itemList: itemList,
      itemColor: "#405f80",
      success: function (res) {
        //res.cancel 用户是不是点击了取消
        //res,tapIndex 数据元素的需要，从0开始
        wx.showModal({
          title: '用户' + itemList[res.tapIndex],
          content: '用户是否取消' + res.cancel + '现在还不能事项分享功能',
        })
      }
    })
  },

  /*onMusicTap: function (event) {
    var musicPlayed = this.data.played
    if (!musicPlayed) {
      wx.playBackgroundAudio({
        dataUrl: 'http://zhuxinghan.oss-cn-beijing.aliyuncs.com/weixin/others/music/50%20Ways%20To%20Say%20Goodbye.mp3',
        title: '50 ways to say goodbye'
      })
    }
    else{
      wx.pauseBackgroundAudio()
    }
    this.setData({
      played:!musicPlayed
    })
  }*/
  transform: function () {

  },

  onMusicTap: function (event) {
    var isPlayingMusic = this.data.isPlayingMusic;
    if (isPlayingMusic == "paused") {
      wx.playBackgroundAudio({
        dataUrl: this.data.postData.musci.backgroundMusicSrc,
        title: this.data.postData.musci.backgroundMusicTitle
      })
      app.globalData.g_isPalyingMusic = true;
      app.g_currentMusic = this.data.currentId;
      this.setData({
        isPlayingMusic: "running",
      })
    }
    else {
      wx.pauseBackgroundAudio();
      app.globalData.g_isPalyingMusic = false;
      app.g_currentMusic = null;
      this.setData({
        isPlayingMusic: "paused",
      })
    }
  },

})