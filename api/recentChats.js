import server from './http'

export async function getAll() {
  await new Promise(res => setTimeout(() => res(), 1000))    // REQUEST TO SERVER
  if (Math.random() < 0) throw new Error('Error on getRecentChats')  // REQUEST TO SERVER
  return [
    { id: 1, title: "Туса" },
    { id: 2, title: "Учёба" },
    { id: 3, title: "Работа" },
    { id: 4, title: "Просто разговоры" },
  ]
}

export async function remove() {
  await new Promise(res => setTimeout(() => res(), 1000))    // REQUEST TO SERVER
  if (Math.random() < 0.5) throw new Error('Error on removeRecentChats')  // REQUEST TO SERVER
  return true
}

export async function add(data) {
  await new Promise(res => setTimeout(() => res(), 1000))    // REQUEST TO SERVER
  if (Math.random() < 0) throw new Error('Error on Add recent chat')  // REQUEST TO SERVER
  return { ...data, title: 'title ' + Math.floor(100000 + Math.random() * 900000), id: data.id }
}
