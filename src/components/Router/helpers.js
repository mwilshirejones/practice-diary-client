import { location } from './store.js'

export const getUrlParams = (pathname = '') => pathname.split('/') 

export function goTo(pathname = '') {
  location.update(loc => loc = pathname)
  window.history.pushState({}, null, pathname)
}
