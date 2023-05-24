export default function validUrl(url) {
  if (typeof url !== 'string') return false
  const imdb = 'https://www.imdb.com/list/ls'
  const letterboxd = 'https://letterboxd.com'
  const nums = /ls[0-9]{9}(\/|)$/
  if (url.startsWith(letterboxd)) return true
  return url.startsWith(imdb) && nums.test(url)
}
