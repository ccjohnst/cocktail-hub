import React, { useState, useEffect } from 'react'

import useIsMount from './firstRender'

// Import components, functions and variables
import { CocktailItem } from './CocktailItem'
import { color } from '../global/variables'

// Import React spinners
import ClipLoader from 'react-spinners/ClipLoader'

export const CategorySearch = () => {
  // Initiate isMount
  const isMount = useIsMount()

  // State hook for retrieved category list from API
  const [categories, setCategories] = useState([])

  // State hook for selected category
  const [selectedCategory, setSelectedCategory] = useState()

  // State hook for holding selected cocktail list
  const [cocktailList, setCocktailList] = useState([])

  // State hook for holding value of clicked cocktail button ID to avoid infinite loop
  const [selectedCocktailID, setSelectedCocktailID] = useState()

  // State hook for holding ID of 'View Cocktail' item
  const [cocktailID, setCocktailID] = useState()

  // State to reset cocktail list to hide
  const [reset, setReset] = useState(false)

  // State for loading status
  const [loading, setLoading] = useState(false)

  // useEffect hook for retrieving list of all cocktails from API
  useEffect(() => {
    const searchParam = `list.php?c=list`
    const url = `.netlify/functions/get-data?param=${searchParam}`

    // If isMount true, then it is  first render and can fetch API data
    if (isMount) {
      const fetchData = async () => {
        try {
          const response = await fetch(url).then(res => res.json())
          // Set state to array of the json drinks categories
          setCategories(oldData => [...oldData, response.drinks])
        } catch (error) {
          console.error('error', error)
        }
      }

      fetchData()
    }
  }, [categories])

  // useEffect hook for retrieving cocktails within selected category
  useEffect(() => {
    const searchParam = `filter.php?c=`
    const url = `.netlify/functions/get-data?param=${searchParam}&id=${selectedCategory}`
    // If isMount false, then it is not first render and can fetch API data

    if (!isMount) {
      setLoading(true)
      const fetchData = async () => {
        try {
          const response = await fetch(url).then(res => res.json())
          // Set state to array of the json drinks list
          setCocktailList(oldData => [response.drinks])
          setLoading(false)
        } catch (error) {
          console.error('error', error)
        }
      }

      fetchData()
    }
  }, [selectedCategory])

  // useEffect hook for handling fetching data of selected cocktails
  useEffect(() => {
    const searchParam = `lookup.php?i=`

    /*If reset is true, return null to avoid fetching an invalid API due to cocktailID being false,
      otherwise if isMount not true, then it is not first render and can fetch API data
      */
    if (reset) {
      return null
    } else if (!isMount) {
      const url = `.netlify/functions/get-data?param=${searchParam}&id=${selectedCocktailID}`

      const fetchData = async () => {
        try {
          const response = await fetch(url).then(res => res.json())
          setCocktailID(response)
        } catch (error) {
          console.error('error', error)
        }
      }

      fetchData()
    } else {
      return null
    }
  }, [selectedCocktailID])

  // Handle selected option
  const handleSelectChange = e => {
    setSelectedCategory(e.target.value)
  }

  // Function to display all categories as options
  const displayCategories = api => {
    return api[0].map((cata, index) => (
      <option value={cata.strCategory} key={cata.strCategory}>
        {cata.strCategory}
      </option>
    ))
  }

  // Handle's the 'view' button and ensures reset is false. Sets cocktail ID to target id
  const handleButton = e => {
    setSelectedCocktailID(e.target.id)
    setReset(false)
  }

  // Function to hide cocktail and sets cocktailID to be blank
  const handleHide = e => {
    setCocktailID()
    setSelectedCocktailID()
    setReset(true)
  }

  // DIsplay all cocktails within category
  const displayCocktailList = api => {
    return (
      <>
        {api[0].map((cata, index) => (
          <li key={cata.idDrink}>
            <h4>{cata.strDrink}</h4>

            <img src={cata.strDrinkThumb} height="125px" width="125px"></img>
            {/* Only show selected cocktail if CocktailID is true */}
            {cocktailID && (
              <div className="view-cocktail">
                {cata.idDrink === cocktailID.drinks[0].idDrink && (
                  <CocktailItem apiInfo={cocktailID} />
                )}
              </div>
            )}
            {/* If cocktail ID is not undefined and therefore has been set for viewing
              show the hide button, else show the vew button */}
            {cocktailID !== undefined ? (
              cata.idDrink === cocktailID.drinks[0].idDrink ? (
                <button id={cata.idDrink} onClick={e => handleHide(e)}>
                  Hide
                </button>
              ) : (
                <button id={cata.idDrink} onClick={e => handleButton(e)}>
                  View
                </button>
              )
            ) : (
              <button id={cata.idDrink} onClick={e => handleButton(e)}>
                View
              </button>
            )}
          </li>
        ))}
      </>
    )
  }

  return (
    <>
      <label for="category-select">Choose a category:</label>
      <select
        name="categories"
        id="category-select"
        onChange={e => handleSelectChange(e)}
      >
        <option value="" disabled selected>
          {' '}
          - Please select an option -{' '}
        </option>
        {categories.length > 0 && displayCategories(categories)}
      </select>
      <ClipLoader loading={loading} color={color} />
      <div className="ingredient-list">
        {cocktailList.length > 0 && displayCocktailList(cocktailList)}
      </div>
    </>
  )
}
