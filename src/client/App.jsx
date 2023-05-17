import './App.css'
import listakLogo from './assets/logo.webp'
import {useState, useEffect} from 'react'
import validUrl from './utils/validator.js'
import extractId from './utils/extractId.js'
import {CSVLink} from 'react-csv'

function App() {
  const [link, setLink] = useState('')
  const [csv, setCsv] = useState({title: '', items: []})
  const baseUrl = 'http://localhost:3000'

  useEffect(() => {
    const getData = async (url = link) => {
      const id = extractId(url)
      const res = await fetch(baseUrl + `/${id}`)
      const data = await res.json()
      setCsv({
        title: data.title,
        // eslint-disable-next-line no-unused-vars
        items: data.items.map(({image, ...item}) => item)
      })
    }

    if (validUrl(link)) getData()
  }, [link])

  return (
    <>
      <img src={listakLogo} alt="Listak-logo" className="logo" />
      <div className="input-container">
        <label htmlFor="list-link">Paste link of list: </label>
        <input
          type="url"
          name="list-link"
          id="list-link"
          className="input-field"
          value={link}
          onChange={event => setLink(event.target.value)}
        />
      </div>
      <div>{csv.title}</div>
      <CSVLink data={csv.items} filename={csv.title}>
        <button className="button-5">Save file</button>
      </CSVLink>
    </>
  )
}

export default App
