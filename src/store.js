import Vue from 'vue'
import Vuex from 'vuex'
import api from './api'
import { util } from './utils'
// import User from './store/user'

Vue.use(Vuex)

export default new Vuex.Store({
  // modules: {
  //   User
  // }
  state: {
    userInfo: {},
    projectList: [],
    userList: [],
    allProjectList: [],
    tagList: [],
    menuList: [],
    apiInfo: {},
    checkInfo: {}
  },
  mutations: {
    updateUser (state, item) {
      state.userInfo = item
    },
    updateProjectList (state, item) {
      state.projectList = item
    },
    updateUserList (state, item) {
      state.userList = item
    },
    getAllProjectList (state, item) {
      state.allProjectList = item
    },
    updateTagList (state, item) {
      state.tagList = item
    },
    updateMenuList (state, item) {
      state.menuList = item
    },
    updateApi (state, item) {
      state.apiInfo = item
    },
    updateCheck (state, item) {
      state.checkInfo = item
    }
  },
  getters: {
    userInfo: state => state.userInfo,
    projectList: state => state.projectList,
    userList: state => state.userList,
    allProjectList: state => state.allProjectList,
    tagList: state => state.tagList,
    menuList: state => state.menuList,
    apiInfo: state => state.apiInfo,
    checkInfo: state => state.checkInfo
  },
  actions: {
    // 用户相关
    updateUser (context, item) {
      context.commit('updateUser', item)
    },
    loginByUsername (context, item) {
      return new Promise((resolve, reject) => {
        api.requestLogin(item).then(res => {
          if (res.code === 200) {
            util.setCookie('userInfo', res.data)
            resolve()
          } else {
            reject()
          }
        })
      })
    },
    updatePwd (context, item) {
      return new Promise((resolve, reject) => {
        api.updatePwd(item).then(res => {
          if (res.code === 200) {
            resolve()
          } else {
            reject(res)
          }
        }).catch(res => {
          reject(res)
        })
      })
    },
    getUserList (context, item) {
      return new Promise((resolve, reject) => {
        api.getUserList(item).then(res => {
          if (res.code === 200) {
            context.commit('updateUserList', res.list)
            resolve()
          } else {
            reject()
          }
        })
      })
    },
    delUser (context, item) {
      return new Promise((resolve, reject) => {
        api.delUser(item).then(res => {
          if (res.code === 200) {
            resolve()
          } else {
            reject()
          }
        })
      })
    },
    addUser (context, item) {
      return new Promise((resolve, reject) => {
        api.addUser(item).then(res => {
          if (res.code === 200) {
            resolve()
          } else {
            reject()
          }
        })
      })
    },
    registerUser (context, item) {
      return new Promise((resolve, reject) => {
        api.registerUser(item).then(res => {
          if (res.code === 200) {
            resolve()
          } else {
            reject(res)
          }
        })
      })
    },
    updateUserInfo (context, item) {
      return new Promise((resolve, reject) => {
        api.updateUser(item).then(res => {
          if (res.code === 200) {
            resolve()
          } else {
            reject()
          }
        })
      })
    },
    // api相关
    addApi (context, item) {
      return new Promise((resolve, reject) => {
        api.addApi(item).then(res => {
          if (res.code === 200) {
            resolve(res.id)
          } else {
            reject()
          }
        })
      })
    },
    delApi (context, item) {
      return new Promise((resolve, reject) => {
        api.delApi(item).then(res => {
          if (res.code === 200) {
            resolve(res)
          } else {
            reject()
          }
        })
      })
    },
    updateApi (context, item) {
      return new Promise((resolve, reject) => {
        api.updateApi(item).then(res => {
          if (res.code === 200) {
            resolve()
          } else {
            reject()
          }
        })
      })
    },
    getApi (context, item) {
      return new Promise((resolve, reject) => {
        api.getApi(item).then(res => {
          if (res.code === 200) {
            context.commit('updateApi', res.apiInfo)
            resolve()
          } else {
            reject()
          }
        })
      })
    },
    // 项目相关
    getProjectList (context, item) {
      return new Promise((resolve, reject) => {
        api.getProject(item).then(res => {
          if (res.code === 200) {
            context.commit('updateProjectList', res.list)
            resolve()
          } else {
            reject()
          }
        })
      })
    },
    addProject (context, item) {
      return new Promise((resolve, reject) => {
        api.addProject(item).then(res => {
          if (res.code === 200) {
            resolve()
          } else {
            reject()
          }
        })
      })
    },
    updateProject (context, item) {
      return new Promise((resolve, reject) => {
        api.updateProject(item).then(res => {
          if (res.code === 200) {
            resolve()
          } else {
            reject()
          }
        })
      })
    },
    delProject (context, item) {
      return new Promise((resolve, reject) => {
        api.delProject(item).then(res => {
          if (res.code === 200) {
            resolve()
          } else {
            reject()
          }
        })
      })
    },
    getProjectCheck (context, item) {
      return new Promise((resolve, reject) => {
        api.getProjectCheck(item).then(res => {
          if (res.code === 200) {
            context.commit('getAllProjectList', res.list)
            resolve(res.checkedList)
          } else {
            reject()
          }
        })
      })
    },
    updateRelations (context, item) {
      return new Promise((resolve, reject) => {
        api.updateRelations(item).then(res => {
          if (res.code === 200) {
            resolve()
          } else {
            reject()
          }
        })
      })
    },
    // 类目相关
    getTagList (context, item) {
      return new Promise((resolve, reject) => {
        api.getTagList(item).then(res => {
          if (res.code === 200) {
            context.commit('updateTagList', res.list)
            resolve()
          } else {
            reject()
          }
        })
      })
    },
    addTag (context, item) {
      return new Promise((resolve, reject) => {
        api.addTag(item).then(res => {
          if (res.code === 200) {
            resolve()
          } else {
            reject()
          }
        })
      })
    },
    updateTag (context, item) {
      return new Promise((resolve, reject) => {
        api.updateTag(item).then(res => {
          if (res.code === 200) {
            resolve()
          } else {
            reject()
          }
        })
      })
    },
    delTag (context, item) {
      return new Promise((resolve, reject) => {
        api.delTag(item).then(res => {
          if (res.code === 200) {
            resolve()
          } else {
            reject()
          }
        })
      })
    },
    getMenuList (context, item) {
      return new Promise((resolve, reject) => {
        api.getMenuList(item).then(res => {
          if (res.code === 200) {
            const newArr = res.list.map(r => {
              return {
                id: r.id,
                title: r.name,
                icon: 'document',
                list: r.apiList.map(d => {
                  return {
                    name: d.name,
                    id: d.id,
                    path: `/api/id/${d.id}`
                  }
                })
              }
            })
            context.commit('updateMenuList', newArr)
            resolve()
          } else {
            reject()
          }
        })
      })
    },
    // 校验相关
    getCheck (context, item) {
      return new Promise((resolve, reject) => {
        api.getCheck(item).then(res => {
          if (res.code === 200) {
            const data = {
              img: res.img
            }
            context.commit('updateCheck', data)
            resolve()
          } else {
            reject()
          }
        })
      })
    },
    doCheck (context, item) {
      return new Promise((resolve, reject) => {
        api.doCheck(item).then(res => {
          console.log(`success: ${res}`)
        }).catch(res => {
          console.log(`error: ${res}`)
        })
      })
    }
  }
})
