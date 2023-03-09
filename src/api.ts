const url: string = import.meta.env.VITE_API_URL

const register = async (user) => {
  const data = await fetch(`${url}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
  return await data.json()
}

const login = async (user) => {
  const data = await fetch(`${url}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
  return await data.json()
}

const logout = async () => {
  const token = localStorage.getItem('token') || ''
  const data = await fetch(`${url}/logout`, {
    method: 'POST',
    headers: {
      Authorization: `${token}`
    }
  })
  localStorage.removeItem('token')
  return await data.json()
}

export default {
  register,
  login,
  logout
}
