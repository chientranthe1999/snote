import Cookies from 'js-cookie';
const TOKEN_KEY = "SNOTE_TOKEN"
export const setToken = (val: string) => {
  Cookies.set(TOKEN_KEY, val);
}

export const getToken = () => {
  return Cookies.get(TOKEN_KEY)
}