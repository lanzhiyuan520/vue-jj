import Vue from "vue";
import Message from "./message";

let instance = null;
let MessageConstructor = Vue.extend(Message);

let init = () => {
  instance = new MessageConstructor();
  instance.$mount();
  document.body.appendChild(instance.$el);
};

let caller = (options) => {
  if (!instance) {
    init(options);
  }
  instance.showMessage(options);
};

export default {
  install: (vue) => {
    vue.prototype.$message = caller;
  }
};
