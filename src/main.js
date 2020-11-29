import { BootstrapVue } from 'bootstrap-vue';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap/dist/css/bootstrap.css';
import Vue from 'vue';
import Vuelidate from 'vuelidate';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(Vuelidate);

// eslint-disable-next-line vue/require-name-property
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
