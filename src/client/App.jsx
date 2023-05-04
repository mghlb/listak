import {useState, useEffect} from 'react'
import listakLogo from './assets/logo.webp'
import './App.css'
import validUrl from './utils/validator'
import extractId from './utils/extractId'

function App() {
  const [link, setLink] = useState('')
  const [body, setBody] = useState('')
  const baseUrl = 'http://localhost:3000'

  useEffect(() => {
    const getData = async (url = link) => {
      const id = extractId(url)
      const data = await fetch(baseUrl + `/${id}`)
      setBody(data)
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
        <img src={body} alt="" />
      </div>
    </>
  )
}

export default App
