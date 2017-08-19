import './assets/css/style.css'

import {sayHello} from './autre'
sayHello()

import Vue from 'vue'
import App from './App.vue'

new Vue({
	el: '#app',
  	render: h => h(App)
})