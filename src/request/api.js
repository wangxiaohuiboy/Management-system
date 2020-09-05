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
// 上传图片
export const uploadNewPicAPI = (params) => request.post('http://kumanxuan1.f3322.net:8360/admin/upload/goodNewPic', params)
// 运营数据
export const getStatDataAPI = () => request.get('http://kumanxuan1.f3322.net:8360/admin/stat')
// 编辑/新增商品
export const editorNewGoodAPI = (params) => request.post('http://kumanxuan1.f3322.net:8360/admin/goods/store', params)
// 查询属性列表
export const getQueryAttributeAPI = (params) => request.get('http://kumanxuan1.f3322.net:8360/admin/attribute', { params })
// 查询分类接口
export const getCategoryAPI = () => request.get('http://kumanxuan1.f3322.net:8360/admin/category')
// 查询专题列表
export const getQueryTopicAPI = (params) => request.get('http://kumanxuan1.f3322.net:8360/admin/topic', { params })
// 专题详情
export const getProjectDetailsAPI = (params) => request.get('http://kumanxuan1.f3322.net:8360/admin/topic/info', { params })
//编辑/新增专题
export const editorNewTopicAPI = (params) => request.post("http://kumanxuan1.f3322.net:8360/admin/topic/store", params)
// 查询订单列表
export const QueryOrderListAPI = (params) => request.get("http://kumanxuan1.f3322.net:8360/admin/order", { params })
// 品牌详情
export const GetBrandDetailsAPI = (params) => request.get('http://kumanxuan1.f3322.net:8360/admin/brand/info', { params })
// 新增/编辑品牌详情
export const NewEditGoodBrandAPI = (params) => request.post('http://kumanxuan1.f3322.net:8360/admin/brand/store', params)
// 属性详情
export const GetAttributeDetailsAPI = (params) => request.get("http://kumanxuan1.f3322.net:8360/admin/attribute/info", { params })
// 查询顶级分类
export const QueryTopClassificationAPI = () => request.get("http://kumanxuan1.f3322.net:8360/admin/category/topCategory")
// 分类详情
export const GetClassificationDetailsAPI = (params) => request.get("http://kumanxuan1.f3322.net:8360/admin/category/info", { params }
)
// 编辑/新增分类
export const EditorNewClassificationAPI = (params) => request.post("http://kumanxuan1.f3322.net:8360/admin/category/store", params)
//编辑/新增属性
export const EditorNewAttributeAPI = (params) => request.post('http://kumanxuan1.f3322.net:8360/admin/attribute/store', params) 