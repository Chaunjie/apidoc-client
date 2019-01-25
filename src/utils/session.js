export default {
  getItem (name) {
    return sessionStorage.getItem(name)
  },
  setItem (name, value) {
    sessionStorage.setItem(name, value)
  }
}
