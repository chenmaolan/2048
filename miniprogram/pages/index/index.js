Page({

  /**
   * 页面的初始数据
   */
  data: {
    row:[
      // [2,2,2,2],
      // [2,2,2,2],
      // [2,2,2,2],
      // [2,2,2,2]
    ]
  },
  // 初始化游戏
  init(){
      let arr=[];
      for(let i=0;i<4;i++){
        arr[i]=[];
        for(let j=0;j<4;j++){
          arr[i][j]="";
        }
      }
      this.randomFun(arr)
      this.setData({
        row:arr
      })
  },
  //随机数
  randomFun(cell){
    var value=Math.random()<0.8?2:4;//随机数2或4
    var nNum=[];//统计有多少没有数字的格子
    var count=0;
    for(let i=0;i<4;i++){
      for(let j=0;j<4;j++){
        if(cell[i][j]==""){
          nNum[count++]={i,j}//记录没有数字的格子坐标至nNum里
        } 
      }
    }
    if(count>0){//从没有数字的数组中随机挑选一个格子进行赋值
      var currentCell=parseInt(Math.random()*(nNum.length-1));
      cell[nNum[currentCell].i][nNum[currentCell].j]=value;
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.init()
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
    
  }
})