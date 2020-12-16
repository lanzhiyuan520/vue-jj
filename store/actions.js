import { loginRequest } from "@/common/apiRequest";

const actions = {
  login ({commit},playload) {
    return new Promise((resolve, reject) => {
      loginRequest(playload).then(res => {
        if (res.code === 0) {
          commit('setUserInfo',res.data)
          resolve(res)
        }
      })
    })
  }
}

export default actions
