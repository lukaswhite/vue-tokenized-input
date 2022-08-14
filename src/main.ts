import Vue from 'vue'
import App from './App.vue'
import './scss/styles.scss'

import TokenizedInputPlugin from './index'

Vue.use(TokenizedInputPlugin)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
