import React from 'react'

const Countries = ({ filter, countries, show }) => {
    const countriesToShow = countries.filter((country) =>
        country.name.toLowerCase().includes(filter.toLowerCase())
    )

    if (countriesToShow.length === 1) {
        return countriesToShow.map((country) => (
            <div key={country.numericCode}>
                <h1>{country.name}</h1>
                <p>capital {country.capital}</p>
                <p>population {country.population}</p>
                <h2>languages</h2>
                <ul>
                    {country.languages.map((language) => (
                        <li>{language.name}</li>
                    ))}
                </ul>
                <img src={country.flag} heigth="200" width="200" />
            </div>
        ))
    } else if (countriesToShow.length <= 10) {
        return countriesToShow.map((country) => (
            <div>
                <p key={country.numericCode}>
                    {country.name}{' '}
                    <button value={country.name} onClick={show}>
                        show
                    </button>
                </p>
            </div>
        ))
    } else {
        return <div>too many matches, specify another filter</div>
    }
}

export default Countries
