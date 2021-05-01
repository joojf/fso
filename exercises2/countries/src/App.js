import React, { useState, useEffect } from 'react'
import axios from 'axios'

useEffect(() => {
  axios
    .get('https://restcountries.eu/rest/v2/all').then(response => {
      setCountries(response.data)
    })
}, [])

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  const handleChange = () => {

  }

  const countriesToShow = countries.filter(country =>
    country.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h1>Hello world!</h1>
      country to search:<input value={filter} onChange={handleChange} />
    </div>
  )
}

export default App
