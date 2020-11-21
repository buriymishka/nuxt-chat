import server from './http'

export async function loadChat(id) {
  await new Promise(res => setTimeout(() => res(), 1000))    // REQUEST TO SERVER
  if (Math.random() < 0) throw new Error('Error on Loading chat')  // REQUEST TO SERVER
  let users = [
    {id: 1, name: 'Pasha'},
    {id: 2, name: 'Zena1'},
    {id: 3, name: 'Leva'},
    {id: 4, name: 'Olja'},
  ]
  let messages = [
    { content: 'Привет', ownerId: 2 },
    { content: 'Привет от меня', ownerId: 1 },
    { content: 'как дела', ownerId: 3 },
    { content: 'хорошо', ownerId: 4 },
    { content: 'что?', ownerId: 2 },
    { content: 'Привет', ownerId: 2 },
    { content: 'Привет от меня', ownerId: 1 },
    { content: 'как дела', ownerId: 3 },
    { content: 'хорошо', ownerId: 4 },
    { content: 'что?', ownerId: 2 },
  ]
  return { users, messages, id, title: 'Мой супер чат' }
}

export async function sendMessage(message) {
  await new Promise(res => setTimeout(() => res(), 200))    // REQUEST TO SERVER
  if (Math.random() < 0) throw new Error('Error on Sending message')  // REQUEST TO SERVER

  return { ...message }
}
