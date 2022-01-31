import { API_URL } from "./constants"

export const authProvider = {
  login: ({ username, password }) => {
    const request = new Request(`${API_URL}/auth/login`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: new Headers({ "Content-Type": "application/json" }),
    })
    return fetch(request)
      .then((response) => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText)
        }
        return response.json()
      })
      .then(({ token }) => {
        localStorage.setItem("token", token)
      })
  },
  checkError: (error) => {
    const status = error.status
    if (status === 401 || status === 403) {
      localStorage.removeItem("token")
      return Promise.reject()
    }
    // other error code (404, 500, etc): no need to log out
    return Promise.resolve()
  },
  checkAuth: () => {
    return localStorage.getItem("token") ? Promise.resolve() : Promise.reject()
  },
  logout: () => {
    localStorage.removeItem("token")
    return Promise.resolve()
  },
  getPermissions: () => {
    return Promise.resolve()
  },
}
