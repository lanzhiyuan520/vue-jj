import loginModel from './loginModel'
import Vue from 'vue'
let instance;

const loadingConstructor = Vue.extend(loginModel)

const $showLoginModel = () => {
  if (!instance) {
    instance = new loadingConstructor()
    instance.visibility = true
    instance.$mount()
    document.body.appendChild(instance.$el)
  } else {
    if (instance.visibility) return;
    instance.visibility = true
  }
  return instance
}
const $closeLoginModel = () => {
  instance.visibility = false
}

const install = Vue => {
  Vue.prototype.$showLoginModel = $showLoginModel
  Vue.prototype.$closeLoginModel = $closeLoginModel
}

export default install
