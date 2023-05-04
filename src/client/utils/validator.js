export default function validUrl(url) {
  if (typeof url !== 'string') return false
  const urlCheck = 'https://www.imdb.com/list/ls'
  return url.startsWith(urlCheck)
}
