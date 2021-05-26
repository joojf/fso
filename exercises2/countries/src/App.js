import React, { useEffect, useState } from 'react'
import axios from 'axios'
//import Countries from './components/Countries'
//import Filter from './components/Filter'

const Countries = ({ filter, countries }) => {
  const countriesToShow = countries.filter(country =>
    country.name.toLowerCase().includes(filter.toLowerCase()))

  if (countriesToShow.length === 1) {
    return (
      countriesToShow.map(country =>
        <div key={country.numericCode}>
          <h1>{country.name}</h1>
          <p>capital {country.capital}</p>
          <p>population {country.population}</p>
          <h2>languages</h2>
          <ul>
            {country.languages.map(language =>
              <li>{language.name}</li>)}
          </ul>
          <img src={country.flag} heigth="200" width="200" />
        </div>)
    )
  }
  else if (countriesToShow.length <= 10) {
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
