import React, { useState, useEffect } from 'react'
import axios from 'axios'

const DisplayFilter = (props) => {
  if (props.countries.length > 10) {
    return <p>too many matches, specify another filter.</p>;
  } else {
    return (
      <ul>
        {props.countries.map((country) => (
          <p key={country.numericCode}>country={country}</p>
        ))}
      </ul>
    );
  }
}


function App() {
  const [countries, setCountries] = useState([])
  const [countrySearch, setCountrySearch] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all').then(response => {
        setCountries(response.data)
      })
  }, [])

  const countriesFilter = (props) => {

    const match = props.countries.filter((country) =>
      country.name.toLowerCase().includes(props.countriesFilter.toLowerCase()),
    )

    if (props.countriesFilter.length === 0) {
      return null
    }

    if (match.length > 1) {
      return <DisplayFilter countries={match} />;
    } else if (match.length > 0) {
      const matchCountry = match[0];
      return <DisplayFilter country={matchCountry} />;
    } else {
      return <p>No matches</p>;
    }
  }

  return (
    <div>
      <h1>Hello world!</h1>
      country to search:<input value={countrySearch} onChange={(event) => setCountrySearch(event.target.value)} />
      <DisplayFilter countriesFilter={countrySearch} countries={countries} />
    </div>
  )
}

export default App
