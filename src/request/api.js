import request from "./request"

export const LoginAPI = (params) => request.post('http://kumanxuan1.f3322.net:8360/admin/auth/login', params)