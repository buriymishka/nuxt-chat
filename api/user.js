import server from './http'

export async function login(data) {
  await new Promise(res => setTimeout(() => res(), 1000))    // REQUEST TO SERVER
  if (Math.random() < 0.1) throw new Error('Error on login')  // REQUEST TO SERVER
  return {
    name: 'Mihail',
    id: 2,
    image: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460',
    email: 'Misdfsdfs@mail.not'
  }
}

export async function signUp(data) {
  await new Promise(res => setTimeout(() => res(), 1000))    // REQUEST TO SERVER
  if (Math.random() < 0.1) throw new Error('Error on signUp')  // REQUEST TO SERVER
  return {
    name: 'Mihail',
    id: 2,
    image: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460',
    email: 'Misdfsdfs@mail.not'
  }
}

export async function recover(data) {
  await new Promise(res => setTimeout(() => res(), 1000))    // REQUEST TO SERVER
  if (Math.random() < 0.1) throw new Error('Error on recover')  // REQUEST TO SERVER
  return true
}

export async function logout() {
  await new Promise(res => setTimeout(() => res(), 1000))    // REQUEST TO SERVER
  if (Math.random() < 0.1) throw new Error('Error on logout')  // REQUEST TO SERVER
  return true
}

export async function load() {
  await new Promise(res => setTimeout(() => res(), 1000))    // REQUEST TO SERVER
  if (Math.random() < 0) throw new Error('Error on Load user')  // REQUEST TO SERVER
  return {
    name: 'Mihail',
    id: 2,
    image: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460',
    email: 'Mis@mail.not'
  }
}

export async function update(data) {
  let fd = new FormData()

  fd.append('name', data.name)
  fd.append('email', data.email)
  if (data.image) { fd.append('image', data.image, data.image.name) }
  fd.append('oldPassword', data.oldPassword)
  fd.append('newPassword', data.newPassword)

  await new Promise(res => setTimeout(() => res(), 1000))    // REQUEST TO SERVER
  if (Math.random() < 0.1) throw new Error('Error on update user')  // REQUEST TO SERVER
  return {
    name: 'Mihail',
    image: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460',
    email: 'mmm@mail.not'
  }
}
