// pages/comment/comment.js
import {
  network
} from "../../utils/network.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    total: 0,
    start: 1,
    count: 20
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    that.setData(options);
    that.getComments(1);
  },

  getComments: function(start) {
    var that = this;
    var type = that.data.type;
    var id = that.data.id;
    if(start > that.data.start){
      that.setData({
        nextLoading:true
      });
    }else{
      that.setData({
        perLoading:true
      });
    }
    network.getItemComments({
      type: type,
      id: id,
      start: start,
      count: 10,
      success: function(data) {
        var total = data.total;
        var comments = data.interests;
        that.setData({
          start: start,
          total: total,
          comments: comments,
          nextLoading:false,
          perLoading:false
        });
        wx.pageScrollTo({
          scrollTop: 0,
        })
      }
    });
  },

  onItemTapEvent: function(event) {
    wx.navigateBack({});
  },

  onPrePageTap: function(event) {
    var that = this;
    var count = that.data.count;
    var oldStart = that.data.start;
    if(oldStart - count >0){
      var start = oldStart - count;
      that.getComments(start);
    }
  },

  onNextPageTap: function(event) {
    var that = this;
    var oldStart = that.data.start;
    var start = that.data.count + oldStart;
    that.getComments(start);
  },
})