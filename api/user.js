import server from './http'

export async function login(data) {
  return await server.post('user/signin', data)
}

export async function signUp(data) {
  return await server.post('user/signup', data)
}

export async function recover(data) {
  return await server.post('user/recover', data)
}

export async function logout() {
  return await server.post('user/logout')
}

export async function load() {
  return await server.get('user/load')
}

export async function update(data) {
  return await server.post('user/update', data)
}
