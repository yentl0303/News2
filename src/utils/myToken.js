//  1.保存token
export function setToken (name, value) {
  window.localStorage.setItem(name, JSON.stringify(value))
}
//  2.保存token
export function getToken (name) {
  return JSON.parse(window.localStorage.getItem(name))
}
//  3.清除token
export function removeToken (name) {
  window.localStorage.removeItem(name)
}
