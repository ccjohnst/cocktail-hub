import React, { useState, useEffect } from 'react'

import useIsMount from './firstRender'

// Import components, functions and variables
import { CocktailItem } from './CocktailItem'
import { color } from '../global/variables'

// Import React spinners
import ClipLoader from 'react-spinners/ClipLoader'

export const RandomCocktail = () => {
  // State variable for holding retrieved API info
  const [randomApi, setRandomApi] = useState()

  // initiate isMount
  const isMount = useIsMount()

  // State hook for loading
  const [loading, setLoading] = useState(false)

  /* useEffect hook to dictate loading of the API when page loads
    and when randomise button is clicked */
  useEffect(() => {
    // const url = `https://www.thecocktaildb.com/api/json/v2/${process.env.API_KEY}/random.php`
    const searchParam = `random.php`

    // If isMount true, then it is  first render and can fetch API data
    if (isMount) {
      const fetchData = async () => {
        const url = `.netlify/functions/get-data?param=${searchParam}`

        try {
          const response = await fetch(url).then(res => res.json())
          setRandomApi(response)
        } catch (error) {
          console.error('error', error)
        }
      }

      fetchData()
    }
    // Else if not load and randomApi is blank from click event, get a new random drink
    else if (!randomApi) {
      setLoading(true)
      const fetchData = async () => {
        const url = `.netlify/functions/get-data?param=${searchParam}`

        try {
          const response = await fetch(url).then(res => res.json())
          setRandomApi(response)
          setLoading(false)
        } catch (error) {
          console.error('error', error)
        }
      }
      fetchData()
    }
  }, [randomApi])

  return (
    <>
      <ClipLoader loading={loading} color={color} />

      {/* If RandomAPI true then show intructions and ingrdients */}
      {randomApi && <CocktailItem apiInfo={randomApi} />}
      <button onClick={() => setRandomApi()}>Randomise</button>
    </>
  )
}
