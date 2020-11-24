import server from './http'

export async function loadChat(id) {
  return await server.get(`chats/loadCurrentById/${id}`)


}

export async function sendMessage(message) {
  return await server.post('chats/sendMessage', message)
}
