import { createSSRApp } from 'vue'
import App from './App.vue'
// 导入 pinia 实例
import pinia from './stores'
import './per.ts'
export function createApp() {
  // 创建 vue 实例
  const app = createSSRApp(App)

  // 使用 pinia
  app.use(pinia)

  return {
    app,
  }
}



