import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Countries = ({ filter, countries }) => {
  const countriesToShow = countries.filter(country =>
    country.name.toLowerCase().includes(filter.toLowerCase()))

  if (countriesToShow.length <= 10) {
    return (
      countriesToShow.map(country =>
        <p key={country.numericCode}>{country.name}</p>
      )
    )
  }
  else {
    return (
      <div>
        too many matches, specify another filter
      </div>
    )
  }

}

const Filter = ({ value, onChange }) => {
  return (
    <div>
      find countries <input value={value} onChange={onChange} />
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all').then(response => {
        setCountries(response.data)
      })
  }, [])


  return (
    <div>
      <Filter value={filter} onChange={(event) => setFilter(event.target.value)} />
      <Countries filter={filter} countries={countries} />
    </div>
  )
}

export default App
