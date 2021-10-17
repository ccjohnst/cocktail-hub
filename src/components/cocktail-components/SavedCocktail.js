import React, { useState, useEffect, useContext } from 'react'

import useIsMount from './firstRender'

// Import components, functions and variables
import { CocktailItem } from './CocktailItem'

// Import global context which contain saved items localstorage
import { Context } from '../global/Store'

// Component to display saved Cocktails
export const SavedCocktails = () => {
  const isMount = useIsMount()

  // Import the context and provide to UseContext hook as an argument
  const [state, dispatch] = useContext(Context)

  // State hook for setting ID data to be used for fetching API data
  const [idData, setIdData] = useState()

  // State hook for containing retrieved API data
  const [retrievedData, setRetrievedData] = useState()

  // State hook for handling reset on 'hide' button click
  const [reset, setReset] = useState(false)

  useEffect(() => {
    // parameter that contains search query
    const searchParam = 'search.php?s='

    // If reset is true, return nothing as hide button has been selected
    // else if isMount not true, then it is not first render and can fetch API data
    if (reset) {
      return null
    } else if (!isMount) {
      const fetchData = async () => {
        const url = `.netlify/functions/get-data?param=${searchParam}&id=${idData}`

        try {
          const response = await fetch(url).then(res => res.json())
          setRetrievedData(response)
        } catch (error) {
          console.error('error', error)
        }
      }

      fetchData()
    } else {
      return null
    }
  }, [idData])

  // Handle hide cocktail functionality by setting idData state to false
  const hideCocktail = e => {
    setIdData()
    setRetrievedData()
    setReset(true)
  }

  // Handle view button functionality by setting idData state to id
  const handleButton = e => {
    setIdData(e.target.id)
    setReset(false)
  }

  // function to return all saved cocktails
  const allSavedItems = i => {
    // remove duplicates from array
    const newData = new Set(i)

    // transform returned set back into array
    const returnedData = [...newData]

    return (
      <ul className="saved-list">
        {returnedData.map(ele => (
          <li className="saved-item" id={ele}>
            <h3 className="saved-one">{ele}</h3>
            {retrievedData && retrievedData.drinks[0].strDrink === ele && (
              <CocktailItem apiInfo={retrievedData} />
            )}
            {retrievedData !== undefined ? (
              retrievedData.drinks[0].strDrink === ele ? (
                <button
                  className="saved-two"
                  id={ele}
                  onClick={e => hideCocktail(e)}
                >
                  Hide
                </button>
              ) : (
                <button id={ele} onClick={e => handleButton(e)}>
                  View
                </button>
              )
            ) : (
              <button id={ele} onClick={e => handleButton(e)}>
                View
              </button>
            )}
          </li>
        ))}
      </ul>
    )
  }
  // if there are saved cocktails in state, then display all Saved items
  return (
    <>
      {state.ids.length > 0 ? (
        allSavedItems(state.ids)
      ) : (
        <p className="error-message">No saved cocktails found</p>
      )}
    </>
  )
}
