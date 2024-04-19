interface IFailedQueue {
  resolve: (value?: A) => void
  reject: (error?: A) => void
}

import axios from 'axios'
import { serverConfig } from './config'
import Cookies from 'universal-cookie'

const API_URL = serverConfig.api
const defaultOptions = {}
const cookies = new Cookies()

let isRefreshing = false
let failedQueue: IFailedQueue[] = []

const processQueue = (error: A, token = null) => {
  failedQueue.forEach((prom: A) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })
  failedQueue = []
}

axios.interceptors.request.use(async (config) => {
  const token = await cookies.get('access_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

function getNotAuthApi(path: string, options: A = {}, apiURL?: string) {
  return axios.get(`${apiURL || API_URL}/${path.replace(/ ^\//, '')}`, {
    ...defaultOptions,
    ...options,
    headers: {
      ...options.headers
    }
  })
}

function getApiWithParams(path: string, params?: object, options: A = {}, apiURL?: string) {
  return axios.get(`${apiURL || API_URL}/${path.replace(/^\//, '')}`, {
    ...defaultOptions,
    ...options,
    params: params || {},
    headers: {
      ...options.headers
    }
  })
}

function postApi(path: string, data: A, options: A = {}) {
  return axios.post(`${API_URL}/${path.replace(/^\//, '')}`, data, {
    ...defaultOptions,
    ...options,
    headers: {
      ...options.headers
    }
  })
}

function putApi(path: string, data: A, options: A = {}) {
  return axios.put(`${API_URL}/${path.replace(/^\//, '')}`, data, {
    ...defaultOptions,
    ...options,
    headers: {
      ...options.headers
    }
  })
}

function patchApi(path: string, data: A, options: A = {}) {
  return axios.patch(`${API_URL}/${path.replace(/^\//, '')}`, data, {
    ...defaultOptions,
    ...options,
    headers: {
      ...options.headers
    }
  })
}

function deleteWithParams(path: string, data?: A, options: A = {}) {
  return axios.delete(`${API_URL}/${path.replace(/^\//, '')}`, {
    ...defaultOptions,
    ...options,
    params: {
      ...data
    },
    headers: {
      ...options.headers
    }
  })
}

// const handleLogout = async () => {
//   const cookies = new Cookies(null)
//   cookies.remove('access_token')
//   cookies.remove('refresh_token')
//   window.location.pathname = ROUTE.LOGIN
// }

function handleErrorStatus(error: A) {
  const status = error?.status || error?.response?.status || error?.data?.messages || null
  switch (status) {
    case 401:
      // Case no need to refresh token
      // handleLogout()
      return error
    case 403: {
      return error
    }
    case 404:
      return error
    case 200:
    case 201:
    case 204:
    case 400:
    case 422:
      return error
    case 500:
      return error
    default:
      return error
  }
}

const refreshAccessToken = async () => {
  try {
    const { data }: A = await axios.post('https://api.escuelajs.co/api/v1/auth/refresh-token', {
      refreshToken: cookies.get('refresh_token')
    })
    cookies.set('access_token', data?.access_token || '')
    cookies.set('refresh_token', data?.refresh_token || '')
    processQueue(null, data.access_token)
  } catch (error) {
    return error
  }
}

axios.interceptors.response.use(
  (response) => {
    const data = response?.data
    return handleErrorStatus({ ...response, data })
  },
  async (error) => {
    const originalRequest = error.config

    if (error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then((token) => {
            originalRequest.headers['Authorization'] = 'Bearer ' + token
            return axios(originalRequest)
          })
          .catch((err) => {
            return Promise.reject(err)
          })
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        await refreshAccessToken()
        return axios(originalRequest)
      } catch (refreshError) {
        processQueue(refreshError, null)
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(handleErrorStatus(error.response))
  }
)

axios.interceptors.request.use(
  (config) => {
    const newConfig = { ...config }
    if (newConfig.headers && newConfig.headers['Content-Type'] === 'multipart/form-data') return newConfig
    return newConfig
  },
  (error) => {
    return Promise.reject(error)
  }
)

const Api = {
  post: postApi,
  put: putApi,
  delete: deleteWithParams,
  patch: patchApi,
  getNotAuth: getNotAuthApi,
  getWithParams: getApiWithParams
}

export default Api
