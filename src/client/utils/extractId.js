export default function extractId(url) {
  url = url.split('/')
  let match = ''
  if (url.includes('letterboxd.com')) {
    url = url.slice(3)
    if (url.length > 3) match = url.join('/').slice(0, -1)
    else match = url.join('/')
  } else {
    match = url.find(val => /^ls[0-9]{9}$/.test(val))
  }

  return match
}
