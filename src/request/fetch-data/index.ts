import { appRequest } from '..'
export type Response<T> = {
  msg: string
  data: T
}
export type List = {
  id: string
  title: string
  content: string
} | null

export const fetchList = () => {
  return appRequest<Response<List[]>>('/list', { method: 'get' })
}

export const updateDetail = (id: string, body: List) => {
  return appRequest<Response<List>>(`/detail/${id}`, { method: 'put', body: JSON.stringify(body) })
}

export const getDetail = (id: string) => {
  return appRequest<Response<List>>(`/detail/${id}`, { method: 'get' })
}
