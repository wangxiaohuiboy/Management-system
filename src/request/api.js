import request from "./request"

export const LoginAPI = (params) => request.post('http://kumanxuan1.f3322.net:8360/admin/auth/login', params)

export const getUserByToken = () => request.post('http://kumanxuan1.f3322.net:8360/admin/auth/getUserByToken')

export const getGoodsDataAPI = (params) => request.get('http://kumanxuan1.f3322.net:8360/admin/goods',{params})