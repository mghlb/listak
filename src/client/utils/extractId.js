export function extractId(url) {
  url = url.split('/')
  const match = url.find(val => /^ls[0-9]{9}$/.test(val))
  return match
}
