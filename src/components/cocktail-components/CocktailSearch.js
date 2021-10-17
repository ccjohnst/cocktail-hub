import React, { useRef, useState, useEffect } from 'react'

import useIsMount from './firstRender'

// Import components, functions and variables
import { CocktailItem } from './CocktailItem'
import { color } from '../global/variables'

// Import react spinners
import ClipLoader from 'react-spinners/ClipLoader'

export const CocktailSearch = () => {
  // initiate misMount
  const isMount = useIsMount()

  // State variable for handling text input
  const [input, setInput] = useState('')

  // State variable for holding submitted cocktail name
  const [searchTerm, setSearchTerm] = useState('')

  // State variable for holding retrieved API info
  const [apiInfo, setApiInfo] = useState()

  // State variable for whether something has been searched
  const [searched, setSearched] = useState(false)

  // State hook for Loading
  const [loading, setLoading] = useState(false)

  // Handle text input on search
  const inputHandler = e => {
    const value = e.target.value

    setInput(value)
  }

  // Refs to handle ReactToPrint
  const componentRef = useRef()

  // Handle submitted search value
  const handleSubmit = e => {
    e.preventDefault()
    const value = input
    setSearchTerm(value)
  }

  // Function to contain form
  const searchForm = error => {
    return (
      <form>
        <label>Search:</label>
        <input type="text" onChange={inputHandler}></input>
        <button onClick={handleSubmit}>Submit</button>
        {/* If error is true, display error msg */}
        {error && (
          <p className="error-message">
            Could not find cocktail. Please search again.
          </p>
        )}
      </form>
    )
  }
  useEffect(() => {
    // parameter that contains search query
    const searchParam = 'search.php?s='

    // If isMount not true, then it is not first render and can fetch API data
    if (!isMount) {
      const fetchData = async () => {
        const url = `.netlify/functions/get-data?param=${searchParam}&id=${searchTerm}`
        setLoading(true)

        try {
          const response = await fetch(url).then(res => res.json())
          setApiInfo(response)
          setSearched(true)
          setLoading(false)
        } catch (error) {
          console.error('error', error)
        }
      }

      fetchData()
    } else {
      return null
    }
  }, [searchTerm])

  // Function used to display cocktails with simmiliar name if more than 1
  const similarItems = api => {
    const data = api.drinks
    if (data.length > 1) {
      return (
        <div className="similiar-items">
          <h4>View similar items</h4>
          <ul>
            {data.map(item => (
              <li>
                <a onClick={() => setSearchTerm(item.strDrink)}>
                  {item.strDrink}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )
    }
  }

  // If first time searching, display below form
  if (searched === false) {
    return (
      <>
        <ClipLoader loading={loading} color={color} />
        {searchForm()}
      </>
    )
  }

  // Error If something has been searched and no drink found, display the below
  if (searched === true && apiInfo.drinks === null) {
    return (
      <>
        <ClipLoader loading={loading} color={color} />
        {searchForm(true)}
      </>
    )
  }
  // Otherwise, return regular form and drinks details
  return (
    <div ref={componentRef}>
      <ClipLoader loading={loading} color={color} />

      {apiInfo && <CocktailItem apiInfo={apiInfo} />}

      {apiInfo && similarItems(apiInfo)}
      {searchForm()}
    </div>
  )
}
