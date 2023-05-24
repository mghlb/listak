import fetch from 'node-fetch'
import {parse} from 'node-html-parser'

export default async function scrapList(id) {
  const letterboxd = 'https://letterboxd.com'
  const list = []
  let h1 = ''

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const res = await fetch(`${letterboxd}/${id}`)
    const page = await res.text()
    const document = parse(page)
    h1 = document.querySelector('.title-1').textContent
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

      const director = meta
        .find(e => e.getAttribute('name') === 'twitter:data1')
        .getAttribute('content')

      const rating = meta
        .find(e => e.getAttribute('name') === 'twitter:data2')
        ?.getAttribute('content')
        .substring(0, 4)

      let year = meta
        .find(e => e.getAttribute('property') === 'og:title')
        .getAttribute('content')

      year = year.substring(year.length - 6)

      const item = {
        title,
        year,
        director,
        rating
      }

      list.push(item)
    }

    const nextButton = document.querySelector('.next')
    if (!nextButton) break
    const href = nextButton.getAttribute('href')
    if (href) id = href.slice(1)
    else break
  }

  return {title: h1, items: list}
}
