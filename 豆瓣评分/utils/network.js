import {
  globalUrls
} from "urls.js"
const network = {
  getMovieList: function(params) {
    params.type = "movie";
    this.getItemList(params);
  },

  getTVList: function(params) {
    params.type = "tv";
    this.getItemList(params);
  },

  getShowList: function(params) {
    params.type = "show";
    this.getItemList(params);
  },

  getItemList: function(params) {
    var url = "";
    if (params.type === "movie") {
      url = globalUrls.movieList;
    } else if (params.type === "tv") {
      url = globalUrls.tvList;
    } else {
      url = globalUrls.showList;
    }
    var count = params.count ? params.count : 7;
    wx.request({
      url: url,
      data: {
        count: count
      },
      success: function(res) {
        var items = res.data.subject_collection_items;
        var itemsCount = items.length;
        var left = itemsCount % 3;
        if (left === 2) {
          items.push(null);
        }
        if (params && params.success) {
          params.success(items);
        }
      }
    });
  },

  getItemDetail: function(params) {
    var type = params.type;
    var id = params.id;
    var url = "";
    if (type === 'movie') {
      url = globalUrls.movieDetail + id;
    } else if (type === 'tv') {
      url = globalUrls.tvDetail + id;
    } else {
      url = globalUrls.showDetail + id;
    }
    wx.request({
      url: url,
      success: function(res) {
        var item = res.data;
        if (params.success) {
          params.success(item);
        }
      }
    });
  },

  getItemTags: function(params) {
    var type = params.type;
    var id = params.id;
    var url = "";
    if (type === 'movie') {
      url = globalUrls.movieTags(id);
    } else if (type === 'tv') {
      url = globalUrls.tvTags(id);
    } else {
      url = globalUrls.showTags(id);
    }
    wx.request({
      url: url,
      success: function(res) {
        var tags = res.data.tags;
        if (params.success) {
          params.success(tags);
        }
      }
    });
  },

  getItemComments: function(params) {
    var type = params.type;
    var id = params.id;
    var start = params.start ? params.start : 0;
    var count = params.count ? params.count : 3;
    var url = "";
    if(type === 'movie'){
      url = globalUrls.movieComments(id,start,count);
    }else if(type === 'tv'){
      url = globalUrls.tvComments(id,start,count);
    }else{
      url = globalUrls.showComments(id,start,count);
    }
    wx.request({
      url: url,
      success:function(res){
        var data = res.data;
        if(params.success){
          params.success(data);
        }
      }
    })
  },

  getSearch:function(params){
    var q = params.q;
    var url = globalUrls.searchUrl(q);
    wx.request({
      url: url,
      success:function(res){
        var subjects = res.data.subjects;
        if(params.success){
          params.success(subjects);
        }
      }
    })
  }
}

export {
  network
}