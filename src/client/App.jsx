import './App.css'
import listakLogo from './assets/logo.webp'
import {useState, useEffect} from 'react'
import validUrl from './utils/validator.js'
import extractId from './utils/extractId.js'
import {CSVLink} from 'react-csv'

const App = () => {
  const [link, setLink] = useState('')
  const [csv, setCsv] = useState({title: '', items: []})
  const [spinner, setSpinner] = useState(false)
  const [listCache, setListCache] = useState(new Map())
  const [error, setError] = useState(false)
  const listCheck = csv.items.length > 0

  useEffect(() => {
    const id = extractId(link)
    const getData = async () => {
      setSpinner(true)
      try {
        const res = await fetch(import.meta.env.VITE_BASE_URL + `/${id}`)
        const data = await res.json()
        const listObj = {
          title: data.title,
          // eslint-disable-next-line no-unused-vars
          items: data.items.map(({image, fullTitle, index, ...item}) => item)
        }
        setCsv(listObj)
        setSpinner(false)
        setError(false)
        setListCache(listCache.set(id, listObj))
      } catch (error) {
        setSpinner(false)
        setError(true)
      }
    }

    if (listCache.has(id)) setCsv(listCache.get(id))
    if (validUrl(link) && !listCache.has(id)) getData()
  }, [link])

  function inputHandler(event) {
    setLink(event.target.value)
  }

  return (
    <>
      <img src={listakLogo} alt="Listak-logo" className="logo" />
      <div className="input-container">
        <label htmlFor="list-link">
          Paste link of IMDB or Letterboxd list:{' '}
        </label>
        <input
          type="url"
          placeholder="eg. imdb.com/list/ls012345678, letterboxd.com/user/list/listname"
          name="list-link"
          id="list-link"
          className="input-field"
          value={link}
          onChange={event => inputHandler(event)}
        />
      </div>
      {spinner && <div className="spinner">⏳</div>}
      {!spinner && listCheck && !error && (
        <CSVLink data={csv.items} filename={csv.title}>
          <button className="save-button">Save file</button>
        </CSVLink>
      )}
      {error && !spinner && (
        <div className="error-msg">Paste a proper url and retry...</div>
      )}
    </>
  )
}

export default App
