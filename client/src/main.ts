import { createApp } from 'vue'
import './style.css'
import './styles/grimoire-vivant.css'
import './themes/alliance.css'
import './themes/horde.css'
import './themes/demons.css'
import './themes/arcane.css'
import App from './App.vue'
import { router } from './router'

createApp(App).use(router).mount('#app')
