import request from "./request"

// 登录
export const LoginAPI = (params) => request.post('http://kumanxuan1.f3322.net:8360/admin/auth/login', params)
// 获取登录用户信息
export const getUserByToken = () => request.post('http://kumanxuan1.f3322.net:8360/admin/auth/getUserByToken')
// 商品详情
export const getGoodsDataAPI = (params) => request.get('http://kumanxuan1.f3322.net:8360/admin/goods', { params })
// 查询商品接口
export const getQueryGoodsAPI = (params) => request.get('http://kumanxuan1.f3322.net:8360/admin/goods', { params })