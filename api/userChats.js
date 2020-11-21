import server from './http'

export async function create(data) {
  await new Promise(res => setTimeout(() => res(), 1000))    // REQUEST TO SERVER
  if(Math.random() < 0.2) throw new Error('Error on Creating chat')  // REQUEST TO SERVER
  return {...data, id: Math.random()}
}

export async function update(data) {
  await new Promise(res => setTimeout(() => res(), 1000))    // REQUEST TO SERVER
  if(Math.random() < 0.2) throw new Error('Error on Updating chat')  // REQUEST TO SERVER
  return {...data}
}

export async function join(data) {
  await new Promise(res => setTimeout(() => res(), 1000))    // REQUEST TO SERVER
  if(Math.random() < 0.2) throw new Error('Error on Joining to chat')  // REQUEST TO SERVER
  return {...data, id: Math.random()}
}

export async function getAll() {
  await new Promise(res => setTimeout(() => res(), 1000))    // REQUEST TO SERVER
  if(Math.random() < 0) throw new Error('Error on loading UserChats')  // REQUEST TO SERVER
  return [
    { id: 34, title: 'Мой супер чат1', password: '12342bsdf3' },
    { id: 2, title: 'Мой супер чат2', password: '12df3' },
    { id: 12, title: 'Мой супер чат3', password: 'nnnn3' },
    { id: 56, title: 'Мой супер чат4', password: 'mbkfm' }
  ]
}

export async function remove(id) {
  await new Promise(res => setTimeout(() => res(), 1000))    // REQUEST TO SERVER
  if(Math.random() < 0.5) throw new Error('Error on Removing chat')  // REQUEST TO SERVER
  return true
}

export async function loadById(id) {
  await new Promise(res => setTimeout(() => res(), 1000))    // REQUEST TO SERVER
  if(Math.random() < 0) throw new Error('Error on Loading chat by id')  // REQUEST TO SERVER
  return { id: 34, title: 'Мой супер чат1', password: '12342bsdf3' }
}
