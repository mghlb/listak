export default function validUrl(url) {
  if (typeof url !== 'string') return false
  const imdb = 'https://www.imdb.com/list/ls'
  const letterboxd = 'https://www.letterboxd.com'
  const nums = /ls[0-9]{9}(\/|)$/
  return (url.startsWith(imdb) || url.startsWith(letterboxd)) && nums.test(url)
}
