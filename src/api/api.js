import axios from 'axios'
axios.defaults.withCredentials = true

let base = ''
if (process.env.NODE_ENV === 'production') {
  base = 'http://106.12.85.98:8090'
} else if (process.env.NODE_ENV === 'development') {
  base = 'http://localhost:8090'
}

// 用户相关
export const requestLogin = params => { return axios.post(`${base}/user/login`, params).then(res => res.data) }
export const addUser = params => { return axios.post(`${base}/user/add`, params).then(res => res.data) }
export const registerUser = params => { return axios.post(`${base}/user/register`, params).then(res => res.data) }
export const updateUser = params => { return axios.post(`${base}/user/update`, params).then(res => res.data) }
export const getUserList = params => { return axios.get(`${base}/user/list`, params).then(res => res.data) }
export const delUser = params => { return axios.delete(`${base}/user/delete`, params).then(res => res.data) }
// 项目相关
export const getProject = params => { return axios.get(`${base}/project/list`, params).then(res => res.data) }
export const getProjectCheck = params => { return axios.get(`${base}/project/querylist`, params).then(res => res.data) }
export const addProject = params => { return axios.post(`${base}/project/add`, params).then(res => res.data) }
export const delProject = params => { return axios.delete(`${base}/project/delete`, params).then(res => res.data) }
export const updateRelations = params => { return axios.post(`${base}/relation/update`, params).then(res => res.data) }
// 标签相关
export const getTagList = params => { return axios.get(`${base}/tag/list`, params).then(res => res.data) }
export const addTag = params => { return axios.post(`${base}/tag/add`, params).then(res => res.data) }
export const updateTag = params => { return axios.post(`${base}/tag/update`, params).then(res => res.data) }
export const delTag = params => { return axios.delete(`${base}/tag/delete`, params).then(res => res.data) }
export const getMenuList = params => { return axios.get(`${base}/tag/menu`, params).then(res => res.data) }
// api相关
export const addApi = params => { return axios.post(`${base}/api/add`, params).then(res => res.data) }
export const updateApi = params => { return axios.post(`${base}/api/update`, params).then(res => res.data) }
export const delApi = params => { return axios.delete(`${base}/api/delete`, params).then(res => res.data) }
export const getApi = params => { return axios.get(`${base}/api/get`, params).then(res => res.data) }
// 验证相关
export const getCheck = params => { return axios.get(`${base}/check/get`, params).then(res => res.data) }
export const doCheck = params => { return axios.post(`${base}/check/check`, params).then(res => res.data) }
