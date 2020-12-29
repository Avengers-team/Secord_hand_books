// pages/user/index.js
Page({
    data: {
        tabs: [{
            id: 0,
            value: "综合",
            isActive: true
        }, {
            id: 1,
            value: "价格",
            isActive: false
        }, {
            id: 2,
            value: "销量",
            isActive: false
        }]


    },
    //接口要的参数
    QueryParams: {
        query: "",
        cid: "",
        pagenum: 1,
        pagesize: 10
    },


    onLoad: function(options) {
        console.log(options);
        wx.showLoading({
            title: '加载中',
        })

        setTimeout(function() {
            wx.hideLoading()
        }, 2000)
    },
    handleTabsItemChange(e) {
        //获取被点击的标题索引
        const { index } = e.detail;
        //修改原数组
        let { tabs } = this.data;
        tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
        //赋值
        this.setData({
            tabs
        })
    },
    onPullDownRefresh() {
        console.log('%c' + "刷新", "color:red;font-size:100px;background-image:linear-gradient(to right,#094fff,pink)")

    }
})