import type { UniappRequestAdapter } from '@alova/adapter-uniapp'
import type { VueHookType } from 'alova/vue'
import type { ApiResponse } from './types'
import UniAdapter from '@alova/adapter-uniapp'
import { createAlova } from 'alova'
import { createServerTokenAuthentication } from 'alova/client'
import { BASE_URL } from '@/constants/config'
import { useToast } from '@/libs/hooks/useToast'
import { ApiError } from './types'

const toast = useToast()

const { onAuthRequired, onResponseRefreshToken } = createServerTokenAuthentication<
  VueHookType,
  UniappRequestAdapter
>({
  assignToken: (method) => {
    // token 注入
  },
  refreshTokenOnSuccess: {
    isExpired: async (response) => {
      const resp = response as unknown as UniNamespace.RequestSuccessCallbackResult
      const res = resp.data as ApiResponse
      // token 过期判断
      return false
    },
    handler: async () => {
      // 刷新token逻辑
    },
  },
})

export const alova = createAlova({
  baseURL: BASE_URL,
  ...UniAdapter(),
  beforeRequest: onAuthRequired(),
  responded: onResponseRefreshToken(async (response, method) => {
    if (method.config.requestType === 'upload') {
      const resp = response as UniNamespace.UploadFileSuccessCallbackResult
      const data = JSON.parse(resp.data) as ApiResponse
      if (data.code !== 200) {
        throw new ApiError(data.code, data.msg || '上传失败')
      }
      return data.data
    }

    if (method.config.requestType === 'download') {
      const resp = response as UniNamespace.DownloadSuccessData
      if (resp.statusCode !== 200) {
        throw new ApiError(500, '下载失败')
      }
      return resp
    }

    const resp = response as UniNamespace.RequestSuccessCallbackResult
    const res = resp.data as ApiResponse
    if (res.code === 401) {
      // 登录过期处理
      throw new ApiError(res.code, res.msg)
    }

    if (res.code !== 200) {
      toast.add({
        severity: 'error',
        summary: '请求错误',
        detail: res.msg,
        life: 3000,
      })
      throw new ApiError(res.code, res.msg)
    }
    return res
  }),
})
