import lanButton from './button'
import lanInput from './input'
import loginModel from './login'
import message from './message'
import lanSkeleton from './skeleton'
const components = [
  lanButton,
  lanInput,
  lanSkeleton
]

const install = Vue => {
  Vue.use(loginModel)
  Vue.use(message)
  components.forEach(item => {
    Vue.component(item.name,item)
  })
}

export default {
  install
}
