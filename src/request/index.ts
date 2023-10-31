export async function appRequest<T>(url: string, config: RequestInit) {
  config.headers = { 'Content-Type': 'application/json' }
  const res = await fetch(`http://localhost:4000${url}`, config)
  if (res.status === 200) {
    return res.json() as Promise<T>
  }
}
