import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Countries from './components/Countries'
import Filter from './components/Filter'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all').then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleShow = (event) => {
    event.preventDefault()
    setFilter(event.target.value)
  }

  return (
    <div>
      <Filter value={filter} onChange={(event) => setFilter(event.target.value)} />
      <Countries filter={filter} countries={countries} show={handleShow} />
    </div>
  )
}

export default App
