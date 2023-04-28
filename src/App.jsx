import listakLogo from './assets/logo.webp'
import './App.css'

function App() {
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
        />
      </div>
    </>
  )
}

export default App
