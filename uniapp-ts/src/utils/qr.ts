import encodeQr from 'qr'
import 'fast-text-encoding'

export function url2QrBase64(url: string) {
  const svg = encodeQr(url, 'gif', { scale: 4 })
  const svgBase64 = uni.arrayBufferToBase64(svg.buffer as ArrayBuffer)
  const img = `data:image/gif;base64,${svgBase64}`
  return img
}
