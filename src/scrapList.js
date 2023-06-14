import fetch from 'node-fetch'
import {parse} from 'node-html-parser'

const letterboxd = 'https://letterboxd.com'

export default async function scrapList(id) {
  const link = `${letterboxd}/${id}`
  const res = await fetch(link)
  const page = await res.text()
  const document = parse(page)
  let h1 = document.querySelector('.title-1').text
  let pagesPromises = []

  if (document.querySelector('.pagination')) {
    let pages = parseInt(document.querySelector('.paginate-page > a').text)
    pagesPromises = range(2, pages).map(page => getPage(`${link}/page/${page}`))
  }

  const list = await Promise.all([getFilms(document), ...pagesPromises])

  return {title: h1, items: list.flat()}
}

async function getPage(link) {
  const res = await fetch(link)
  const page = await res.text()
  const document = parse(page)
  return await getFilms(document)
}

async function getFilms(document) {
  const documentList = document.querySelector('.film-list')
  const films = documentList.querySelectorAll('li')

  return await Promise.all(films.map(film => getFilmDetails(film)))
}

async function getFilmDetails(filmList) {
  const film = filmList.querySelector('div')
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

  return {
    title,
    year,
    director,
    rating
  }
}

function range(start, end) {
  return new Array(end - start + 1).fill(undefined).map((_, i) => i + start)
}
