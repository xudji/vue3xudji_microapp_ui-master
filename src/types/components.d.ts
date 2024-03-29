import XtxSwiper from '@/components/XtxSwiper.vue'
import XtxTemp from '@/components/XtxTemp.vue'

declare module 'vue' {
  export interface GlobalComponents {
    XtxSwiper: typeof XtxSwiper
    XtxTemp: typeof XtxGuess
  }
}

// 组件实例类型
export type XtxGuessInstance = InstanceType<typeof XtxTemp>
export type XtxSwiperInstance = InstanceType<typeof XtxSwiper>
