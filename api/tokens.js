import server from './http'

export async function refresh() {
  return await server.get('tokens/refresh')
}

