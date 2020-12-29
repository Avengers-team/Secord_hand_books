const db = wx.cloud.database()
const bookList = db.collection('bookList')
const _ = db.command

Page({
  data:{
    books:[]
  },

  TimeId:-1,
  handleInput(e){
    const {value}=e.detail;
    if(!value.trim()){
      return;
    }
    clearTimeout(this.TimeId);
    this.TimeId=setTimeout(()=>{
      this.searchbook(value);
    },1000);
  },

  searchbook(bookName){
    let that=this
    bookList.where({
      bookName:bookName
    })
    .get({
      success(res) {
        that.setData({
          books : res.data
        })
      }
    })
  }
})