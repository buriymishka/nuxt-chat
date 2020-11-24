import server from './http'

export async function getAll() {
  return await server.get('user/loadRecentChats')
}

export async function remove(id) {
  await server.post('user/removeRecentChat', {id})
}

export async function add(id) {
  return await server.post('user/addRecentChat', {id})
}
