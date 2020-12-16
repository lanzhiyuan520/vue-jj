const state = {
  navList : [
    {
      title : '全部',
      type : 0,
      path : '/all'
    },
    {
      title : '前端',
      type : 1,
      path : '/frontend'
    },
    {
      title : '后端',
      type : 2,
      path : '/backend'
    },
    {
      title : '其他',
      type : 3,
      path : '/other'
    },
  ],
  showRight : true,
  userInfo : JSON.parse(localStorage.getItem('user') || '{}')
}

export default state
