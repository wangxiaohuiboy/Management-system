import request from "./request"

// 登录
export const LoginAPI = (params) => request.post('http://kumanxuan1.f3322.net:8360/admin/auth/login', params)
// 获取登录用户信息
export const getUserByToken = () => request.post('http://kumanxuan1.f3322.net:8360/admin/auth/getUserByToken')
// 查询商品接口
export const getGoodsDataAPI = (params) => request.get('http://kumanxuan1.f3322.net:8360/admin/goods', { params })
// 商品详情
export const getGoodsDetailsAPI = (params) => request.get('http://kumanxuan1.f3322.net:8360/admin/goods/info', { params })
// 查询分类接口  
export const getQueryClassificationAPI = () => request.get('http://kumanxuan1.f3322.net:8360/admin/category')
// 查询品牌列表
export const getQueryBrandAPI = (params) => request.get('http://kumanxuan1.f3322.net:8360/admin/brand', { params })