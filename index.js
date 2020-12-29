const DB=wx.cloud.database().collection("upload_list1")
let bookName = ""
let price = ""
let newCondition = ""


Page({
  data:{
    imags: [],
    shows: false, //控制下拉列表的显示隐藏，false隐藏、true显示
    selectDatas: ['全新', '九成新', '七成新', '五成新', '三成新'], //下拉列表的数据
    indexs: 0, //选择的下拉列 表下标,
  },

  // 上传图片云存储
  upload_images(){
    let that=this;
    wx.chooseImage({
      count: 9,
      sizeType: ['original'],
      sourceType: ['album', 'camera'],
      success(res){
        console.log("选择成功", res)
        for (var i = 0; i < res.tempFilePaths.length; i++){
          that.uploading(res.tempFilePaths[i])
        }
      }
    })
  },

  uploading(filepic){
    wx.cloud.uploadFile({
      cloudPath: 'upload1.0/' + new Date().getTime()+'.jpg',  //时间戳
      filePath: filepic,
      success:res =>{
        console.log("上传成功", res),
        //images[counter] = res.fileID,
        this.setData({
          //imga: res.fileID,
          //imga: images[0],
          imags : this.data.imags.concat(res.fileID)
        })
      },
      fail(res){
        console.log("上传失败", res)
      }
    })
  },

delete_images(image1){
  let that = this;
  let imags = this.data.imags;
  let index = "";
  imags.splice(index, 1);
  that.setData({
    imags: imags
  })
},

  //上传名字
  addBookName(event){
    bookName = event.detail.value
  },
  //添加价格
  addPrice(event){
    price = event.detail.value
  },

  addata(){
    DB.add({
      data:{
        bookName: bookName,
        price: price,
        images: this.data.imags,
        newCondition: this.data.selectDatas[this.data.indexs]
      },
      success(res){
        console.log("添加成功", res)
      },
      fail(res){
        console.log("添加失败", res)
      },
    })
  },

  // images_preview: function (event) {
  //   var src = event.currentTarget.dataset.src;//获取data-src
  //   var imgList = event.currentTarget.dataset.list;//获取data-list
  //   //图片预览
  //   wx.previewImage({
  //     current: src, // 当前显示图片的http链接
  //     urls: imgList // 需要预览的图片http链接列表
  //   })
  // }
  // 点击下拉显示框
  selectTaps() {
    this.setData({
      shows: !this.data.shows,
    });
  },
  // 点击下拉列表
  optionTaps(e) {
    let Indexs = e.currentTarget.dataset.index; //获取点击的下拉列表的下标
    console.log(Indexs)
    this.setData({
      indexs: Indexs,
      shows: !this.data.shows
    })
  }
})
