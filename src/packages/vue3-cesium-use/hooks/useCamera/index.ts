import * as Cesium from 'cesium'
import { ref } from 'vue'
import { getViewer } from '../useViewer'
import { heightToLevel } from '../../utils/helper'

export const useCamera = () => {
  const viewer = getViewer()

  const cameraInfo = ref<{
    heading?: number
    pitch?: number
    roll?: number
    height?: number
    level?: number
  }>({}) // 相机参数

  cameraInfo.value = {
    heading: Cesium.Math.toDegrees(viewer.camera.heading),
    pitch: Cesium.Math.toDegrees(viewer.camera.pitch),
    roll: Cesium.Math.toDegrees(viewer.camera.roll),
    height: viewer.camera.positionCartographic.height,
    level: heightToLevel(cameraInfo.value.height || 0)
  }

  // 相机变化事件
  viewer.camera.changed.addEventListener(() => {
    cameraInfo.value = {
      heading: Cesium.Math.toDegrees(viewer.camera.heading),
      pitch: Cesium.Math.toDegrees(viewer.camera.pitch),
      roll: Cesium.Math.toDegrees(viewer.camera.roll),
      height: viewer.camera.positionCartographic.height,
      level: heightToLevel(cameraInfo.value.height || 0)
    }
  })

  return { cameraInfo }
}
