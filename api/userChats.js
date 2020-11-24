import server from './http'

export async function create(data) {
  return await server.post('chats/create', data)
}

export async function update(data) {
  await server.post('chats/update', data)
  return {...data}
}

export async function join(data) {
  return await server.post('chats/join', data)
}

export async function getAll() {
  return await server.get('chats/getAll')
}

export async function remove(id) {
  return await server.post('chats/remove', {id})
}

export async function loadById(id) {
  return await server.get(`chats/loadById/${id}`)
}
