import { useState, useEffect } from 'react'

export const useField = (type) => {
    const [value, setValue] = useState('')
  
    const onChange = (event) => {
      setValue(event.target.value)
    }
  
    return {
      type,
      value,
      onChange
    }
  }
  
export const useCountry = (name) => {
    const [country, setCountry] = useState(null)

    useEffect(() => {
        const fetchCountry = async () => {
            const response = await fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
            const data = await response.json()
            setCountry(data[0])
        }
        fetchCountry()
    }, [name])
  
    return country
}