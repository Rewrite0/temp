import { Dimensions } from 'react-native';

/** 设计稿宽度 */
const DESIGN_WIDTH = 750;
/** 设备屏幕宽度 */
export const DEVICE_WIDTH = Dimensions.get('window').width;
/** 计算缩放比例 */
const scale = DEVICE_WIDTH / DESIGN_WIDTH;

/**
 * 将设计稿像素转换为实际显示单位
 * @param px 设计稿上的像素值
 * @returns 转换后的实际单位
 */
export const px = (px: number): number => {
  return px * scale;
};
