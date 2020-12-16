const mutations = {
  changRight : (state,{ flag }) => {
    state.showRight = flag
  },
  setUserInfo : (state,info) => {
    state.userInfo = info
    console.log(state.userInfo)
  },
  exit : (state) => {
    state.userInfo = {}
    localStorage.removeItem('user')
  }
}
export default mutations
