import React, { useState, useEffect } from 'react'

import useIsMount from './firstRender'

// Import components, functions and variables
import { CocktailItem } from './CocktailItem'
import { commonIngredients } from './ingredients'
import { color } from '../global/variables'

// Import react spinners
import Creatable from 'react-select/creatable'
import ClipLoader from 'react-spinners/ClipLoader'

export const IngredientSearch = () => {
  // TODO: - homogenise react-select CSS styling

  // initiate misMount
  const isMount = useIsMount()

  // state hook for selected ingredient value
  const [selectedIngredient, setSelectedIngredient] = useState('')

  // State hook for ingredient array
  const [ingredientArray, setIngredientArray] = useState([])

  // state hook for selected ingredient API result
  const [ingredient, setIngredient] = useState([])

  // State hook for loading
  const [loading, setLoading] = useState(false)

  // State hook for holding value of clicked cocktail button ID to avoid infinite loop
  const [selectedCocktailID, setSelectedCocktailID] = useState()

  // State hook for cocktail ID
  const [cocktailID, setCocktailID] = useState()

  // State hook for handling reset on 'hide' button click
  const [reset, setReset] = useState(false)

  const handleSelectChange = e => {
    // Empty array to hold all selected values
    const allItems = []

    // Map through selected values and add to array
    e.map(ing => {
      allItems.push(ing.value)
    })

    // Set ingredientArray to a stringified version of the allItems array
    setIngredientArray(allItems.join())
  }

  // useEffect hook to set selectedIngredient state hook when ingredient array is updated
  useEffect(() => {
    if (!isMount) {
      setSelectedIngredient(ingredientArray)
    }
  }, [ingredientArray])

  // useEffect hook to fetch API data for all cocktails for our selected ingredient
  useEffect(() => {
    const searchParam = `filter.php?i=`
    // If isMount false, then it is not first render and can fetch API data
    const url = `.netlify/functions/get-data?param=${searchParam}&id=${selectedIngredient}`

    if (!isMount) {
      const fetchData = async () => {
        setLoading(true)
        try {
          const response = await fetch(url).then(res => res.json())
          // Set state to array of the json drinks list
          setIngredient(oldData => [response.drinks])
          setLoading(false)
        } catch (error) {
          console.error('error', error)
        }
      }

      fetchData()
    }
  }, [selectedIngredient])

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

  // Display list of all cocktails found by ingredient
  const displayCocktailList = api => {
    if (api[0] === 'None Found') {
      return (
        <p className="error-message">
          No cocktails containing {selectedIngredient.replace(/,/g, ' & ')} were
          found.
        </p>
      )
    } else if (api !== 'None found') {
      return (
        <>
          {api[0].map((cata, index) => (
            <li key={cata.idDrink}>
              <h4>{cata.strDrink}</h4>

              <img src={cata.strDrinkThumb} height="125px" width="125px"></img>

              {cocktailID && (
                <div className="view-cocktail">
                  {cata.idDrink === cocktailID.drinks[0].idDrink && (
                    <CocktailItem apiInfo={cocktailID} />
                  )}
                </div>
              )}
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
  }

  // Otherwise, return regular form and drinks details
  return (
    <>
      <ClipLoader loading={loading} color={color} />
      <label>Select your ingredients</label>
      <Creatable
        className="ingredient-select"
        onChange={e => handleSelectChange(e)}
        isMulti
        options={commonIngredients}
      />

      <ul className="ingredient-list">
        {ingredient.length > 0 && displayCocktailList(ingredient)}
      </ul>
    </>
  )
}
