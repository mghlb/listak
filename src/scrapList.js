import fetch from 'node-fetch'
import {parse} from 'node-html-parser'

export default async function scrapList(link) {
  const letterboxd = 'https://letterboxd.com'
  const list = []
  let h1 = ''

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const res = await fetch(link)
    const page = await res.text()
    const document = parse(page)
    h1 = document.querySelector('.title-1')
    const documentList = document.querySelector('.film-list')
    const films = documentList.querySelectorAll('li')

    for (let film of films) {
      film = film.querySelector('div')
      const title = film.childNodes[1].getAttribute('alt')

      const filmLink = `${letterboxd}${film.getAttribute('data-target-link')}`
      const page = await fetch(filmLink)
      const res = await page.text()
      const filmPage = parse(res)

      const meta = filmPage.querySelectorAll('meta')
      const description = meta
        .find(e => e.getAttribute('property') === 'og:description')
        .getAttribute('content')

      const director = meta
        .find(e => e.getAttribute('name') === 'twitter:data1')
        .getAttribute('content')

      const rating = meta
        .find(e => e.getAttribute('name') === 'twitter:data2')
        ?.getAttribute('content')
        .substring(0, 4)

      let releaseYear = meta
        .find(e => e.getAttribute('property') === 'og:title')
        .getAttribute('content')

      releaseYear = releaseYear.substring(releaseYear.length - 6)

      const item = {
        title,
        releaseYear,
        director,
        rating,
        description
      }

      list.push(item)
    }

    const nextButton = document.querySelector('.next')
    const href = nextButton.getAttribute('href')
    if (href) link = `${letterboxd}${href}`
    else break
  }

  return {title: h1, items: list}
}
