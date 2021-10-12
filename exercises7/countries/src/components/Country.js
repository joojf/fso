import React from 'react'

const Country = ({ country }) => {

    if (!country) {
        return null
    } else {
        console.log(country)
      return (
        <div>
          <h3>{country.name.common}</h3>
          <div>capital {country.capital[0]}</div>
          <div>population {country.population}</div>
          <img src={country.flags.svg} height='100' alt={country.name.common} />
        </div>
      )
    }

}

export default Country