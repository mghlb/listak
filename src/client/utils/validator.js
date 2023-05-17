export default function validUrl(url) {
  if (typeof url !== 'string') return false
  const urlCheck = 'https://www.imdb.com/list/ls'
  const nums = /ls[0-9]{9}$/
  return url.startsWith(urlCheck) && nums.test(url)
}
