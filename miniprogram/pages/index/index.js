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
      //创建二维数组
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
  touchstartX:0,//触摸起始
  touchstartY:0,
  touchendX:0,//触摸结束
  touchendY:0,
  driection:0,//方向 1 上,2 下 ,3 坐,4 右
  touchstart(e){//获取触摸起始坐标
    // console.log(e,e.touches[0].clientX);
    let t = e.touches[0];
    this.touchstartX=t.clientX
    this.touchstartY=t.clientY
  },
  touchmove(e){//获取移动坐标
    // console.log(e)
    let t=e.touches[0];
    this.touchendX=t.clientX;
    this.touchendY=t.clientY;
  },
  touchend(e){//触摸结束后判断方向
    // console.log(e);
    let x=this.touchendX-this.touchstartX;
    let abX=Math.abs(x);//获取绝对值,差值的大小判断横向纵向
    let y=this.touchendY-this.touchstartY;
    let abY=Math.abs(y);
    let arr=this.data.row;
    if(abX > abY && this.touchendX != 0){//横向
      if(x > 0){//向右滑动
        this.driection=4;
        this.concentrate(arr);
        console.log(this.driection)
      }else if(x < 0){//向左
        this.driection=3;
        this.concentrate(arr);
        console.log(this.driection)
      }
    }else if(abY > abX && this.touchendY != 0){//纵向 屏幕y坐标为由上向下递增
      if (y > 0) {//向下滑动
        this.driection = 2;
        this.concentrate(arr);
        console.log(this.driection)
      } else if (y < 0) {//向上
        this.driection = 1;
        this.concentrate(arr);
        console.log(this.driection)
      }
    }
    this.setData({
      row:arr
    })
    // console.log(x,y,this.driection)
  },
  //所有函数统一
  concentrate(arr){
    console.log(arr)
    arr=this.changeArr(arr);//转换方向
    console.log(arr)
    this.mergeNum(arr);//合并相同值
    console.log(arr)
    this.moveNum(arr);//位移
    console.log(arr)
    arr=this.reChange(arr);//转换回去
    console.log(arr)
    this.randomFun(arr);
    console.log(arr)
    if(this.gameOver(arr)){
      wx.showModal({
        title: '2048',
        content: '游戏结束',
        confirmText:'重新开始',
        success:function(res){
          if(res.confirm){
            this.init();
          }
        }
      })
    }
    return arr
  },
  //相同数值合并
  mergeNum(arr){
    for(let i=0;i<4;i++){
      for(let j=0;j<4;j++){
        if(arr[i][j] !== ""){//排除空格
          if((j+1)<4 && arr[i][j]==arr[i][j+1]){
            arr[i][j]+=arr[i][j+1];//相同值相加
            arr[i][j+1]="";//相加后重新赋值为空
            j++;//跳过这两个坐标的后面开始,减少循环次数
          }else{
            for(let k=j+1;k<4;k++){
              if(arr[i][k]!=""){//排除后面空格
                if(arr[i][j]==arr[i][k]){
                  arr[i][j]+=arr[i][k];
                  arr[i][k]="";
                  j=k;//跳过已经合并过的位置
                }else{
                  j=k-1;//两个数不相等且不为空从后面开始
                }
                break;
              }
            }
          }
        } 
      }
    }
    console.log('me')
  },
  //位移 数与数 数与边有空格则按顺序位移
  moveNum(arr){
    for(let i=0 ; i<4 ; i++){
      let count=0;
      for(let j=0 ; j<4 ;j++){
        if(arr[i][j] != ""){//
          arr[i][count++]=arr[i][j];// count先取值后相加 //把当前值赋值到前面
          if((count-1) != j){//如果当前值的位置与赋值的位置相同则不清空否则清除原位置的值
            arr[i][j]=""
          }
        }
      }
    }
    console.log('mo')
  },
  //将数组根据滑动方向排列数组按照统一方向进行合并与位移再移回原来的位置, 统一向左
  changeArr(arr){
    let res=[[],[],[],[]];
    for(let i=0 ; i<4 ; i++){
      for(let j=0 ; j<4 ;j++){
        if(this.driection==1){//上
          res[i][j]=arr[j][i]
        }else if(this.driection==2){//下
          res[i][j] = arr[3-j][i];
        }else if(this.driection==3){//左 原数组不改变
          res[i][j]=arr[i][j]
        }else if(this.driection==4){//右
          res[i][j]=arr[3-j][i]
        }
      }
    }
    console.log('ch')
    return res;
  },
  //数组转换回去
  reChange(changeArr){
    let res=[[],[],[],[]];
    for(let i=0 ; i<4 ;i++){
      for(let j=0 ; j<4 ; j++){
        if(this.driection==1){
          res[i][j] = changeArr[j][i]
        }else if(this.driection==2){
          res[i][j] = changeArr[j][3-i]
        }else if(this.driection==3){
          res[i][j] = changeArr[i][3-j]
        }else if(this.driection==4){
          res[i][j] = changeArr[i][j]
        }
      }
    }
    console.log('re')
    return res ;
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
    console.log('rd')
  },
  // 游戏结束
  gameOver(arr){
    let isOver=true;
    for(let i=0;i<4;i++){
      for(let j=0;j<4;j++){
        if (arr[i][j] == "") {//判断是否有空格
          isOver=false;
        }
      }
    }
    if (isOver) {//没有空格则判断上下左右是否有相同的数字
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          if ((j+1)<4 && arr[i][j] == arr[i][j + 1]) {//左右是否相等
            return false
          }
          if ((j + 1) < 4 && arr[i][j] == arr[i + 1][j]) {//上下是否相等
            return false
          }
        }
      }
      return true
    }
    console.log('ov')
    return false
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