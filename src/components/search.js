import React, { useRef, useState, useEffect } from 'react'
import { css } from "@emotion/react";
import BarLoader from "react-spinners/BarLoader"


const color = "#ffffff"
// Custom hook to indicate whether current render is first render
const useIsMount = () => {
  const isMountRef = useRef(true)
  useEffect(() => {
    isMountRef.current = false
  }, [])
  return isMountRef.current
}

// // Global state hook for loading
// const [loading, setLoading ] = useState(false)

// Component for displaying loading icon
const Loader = (loadingState) => {
  return(
   <p>loading...</p> 
  )
}

// Function to create list items for measurements and ingredients
const ingredients = api => {
  return (
    <>
      {api.strIngredient1 && (
        <li>
          {' '}
          {api.strMeasure1} {api.strIngredient1}
        </li>
      )}
      {api.strIngredient2 && (
        <li>
          {' '}
          {api.strMeasure2} {api.strIngredient2}
        </li>
      )}
      {api.strIngredient3 && (
        <li>
          {' '}
          {api.strMeasure3} {api.strIngredient3}
        </li>
      )}
      {api.strIngredient4 && (
        <li>
          {' '}
          {api.strMeasure4} {api.strIngredient4}
        </li>
      )}
      {api.strIngredient5 && (
        <li>
          {api.strMeasure5} {api.strIngredient5}
        </li>
      )}
      {api.strIngredient6 && (
        <li>
          {' '}
          {api.strMeasure6} {api.strIngredient6}
        </li>
      )}
      {api.strIngredient7 && (
        <li>
          {' '}
          {api.strMeasure7} {api.strIngredient7}
        </li>
      )}
      {api.strIngredient8 && (
        <li>
          {' '}
          {api.strMeasure8} {api.strIngredient8}
        </li>
      )}
      {api.strIngredient9 && (
        <li>
          {' '}
          {api.strMeasure9} {api.strIngredient9}
        </li>
      )}
      {api.strIngredient10 && (
        <li>
          {' '}
          {api.strMeasure10} {api.strIngredient10}
        </li>
      )}
      {api.strIngredient11 && (
        <li>
          {' '}
          {api.strMeasure11} {api.strIngredient11}
        </li>
      )}
      {api.strIngredient12 && (
        <li>
          {' '}
          {api.strMeasure12} {api.strIngredient12}
        </li>
      )}
      {api.strIngredient13 && (
        <li>
          {' '}
          {api.strMeasure13} {api.strIngredient13}
        </li>
      )}
      {api.strIngredient14 && (
        <li>
          {' '}
          {api.strMeasure14} {api.strIngredient14}
        </li>
      )}
      {api.strIngredient15 && (
        <li>
          {' '}
          {api.strMeasure15} {api.strIngredient15}
        </li>
      )}
    </>
  )
}

// Function to display cocktail items passed to apiInfo param
const cocktailItem = apiInfo => {
  return (
    <>
      <h3>{apiInfo.drinks[0].strDrink}</h3>
      <span className="image main">
        <img src={apiInfo.drinks[0].strDrinkThumb} alt="" />
      </span>
      <h4>Instructions</h4>
      <p>{apiInfo.drinks[0].strInstructions}</p>
      <h4>Ingredients</h4>
      <ol>{ingredients(apiInfo.drinks[0])}</ol>
    </>
  )
}

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
  const [loading, setLoading ] = useState(false)

  // Handle text input on search
  const inputHandler = e => {
    const value = e.target.value

    setInput(value)
  }

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
        {error && <p>Could not find cocktail. Please search again</p>}
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
          console.log('error', error)
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
        <>
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
        </>
      )
    }
  }

  // If first time searching, display below form
  if (searched === false) {
    return <>{searchForm()}</>
  }

  // Error If something has been searched and no drink found, display the below
  if (searched === true && apiInfo.drinks === null) {
    return <>{searchForm(true)}</>
  }
  // Otherwise, return regular form and drinks details
  return (
    <>
    {/* {loading ?   <Loader loadingState={loading}/> : null } */}
      <BarLoader loading={loading}  color={color}/>
    
      {apiInfo && <>{cocktailItem(apiInfo)}</>}

      {apiInfo && similarItems(apiInfo)}
      {searchForm()}
    </>
  )
}

export const RandomCocktail = () => {
  // State variable for holding retrieved API info
  const [randomApi, setRandomApi] = useState()

  // initiate isMount
  const isMount = useIsMount()

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
          console.log('error', error)
        }
      }

      fetchData()
    } else if (!randomApi) {
      const fetchData = async () => {
        const url = `.netlify/functions/get-data?param=${searchParam}`

        try {
          const response = await fetch(url).then(res => res.json())
          setRandomApi(response)
        } catch (error) {
          console.log('error', error)
        }
      }
      fetchData()
    }
  }, [randomApi])

  return (
    <>
      <h3>{randomApi && randomApi.drinks[0].strDrink}</h3>

      <span className="image main">
        {randomApi && <img src={randomApi.drinks[0].strDrinkThumb} alt="" />}
      </span>
      {/* If RandomAPI true then show intructions and ingrdients */}
      {randomApi && (
        <>
          <h4>Instructions</h4>
          <p>{randomApi.drinks[0].strInstructions}</p>
        </>
      )}
      {randomApi && (
        <>
          <h4>Ingredients</h4>
          <ol>{ingredients(randomApi.drinks[0])}</ol>
        </>
      )}
      <button onClick={() => setRandomApi()}>Randomise</button>
    </>
  )
}

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

  const [reset, setReset] = useState(false)

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
          console.log('error', error)
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
      const fetchData = async () => {
        try {
          const response = await fetch(url).then(res => res.json())
          // Set state to array of the json drinks list
          setCocktailList(oldData => [response.drinks])
        } catch (error) {
          console.log('error', error)
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
          console.log('error', error)
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
  const displayCocktailList = api => {
    return (
      <>
        {api[0].map((cata, index) => (
          <li key={cata.idDrink}>
            <h4>{cata.strDrink}</h4>

            <img src={cata.strDrinkThumb} height="125px" width="125px"></img>
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
            {/* Only show selected cocktail if CocktailID is true */}
            {cocktailID && (
              <div className="view-cocktail">
                {cata.idDrink === cocktailID.drinks[0].idDrink &&
                  cocktailItem(cocktailID)}
              </div>
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

      <ul className="ingredient-list">
        {cocktailList.length > 0 && displayCocktailList(cocktailList)}
      </ul>
    </>
  )
}

// Search by ingredient component
export const IngredientSearch = () => {
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

  const [selectedIngredient, setSelectedIngredient] = useState()

  const [ingredient, setIngredient] = useState([])

  // Array holding common ingredients
  const commonIngredients = [
    'Gin',
    'Whiskey',
    'Bourbon',
    'Scotch',
    'Vodka',
    'Rum',
    'Tequila',
    'Brandy',
    'Blended Whiskey',
  ]

  const inputHandler = e => {
    const value = e.target.value

    setInput(value)
  }

  const handleSubmit = e => {
    e.preventDefault()

    const value = input
    setSearchTerm(value)
  }

  const commonIngredientList = () => {
    return (
      <>
        <label for="ingredient-category-select">
          Select from popular Ingredients:
        </label>
        <select
          name="ingredients"
          id="ingredient-select"
          onChange={e => handleSelectChange(e)}
        >
          <option value="" disabled selected>
            {' '}
            - Please select an option -{' '}
          </option>
          {commonIngredients.map(ing => (
            <option value={ing}>{ing}</option>
          ))}
        </select>
      </>
    )
  }

  const handleSelectChange = e => {
    setSelectedIngredient(e.target.value)
    console.log(selectedIngredient)
  }
  // Function to contain form
  const searchForm = error => {
    return (
      <form>
        <label>Search:</label>
        <input type="text" onChange={inputHandler}></input>
        <button onClick={handleSubmit}>Submit</button>
        {/* If error is true, display error msg */}
        {error && <p>Could not find cocktail. Please search again</p>}
      </form>
    )
  }

  // useEffect hook to fetch API data for all cocktails for our selected ingredient
  useEffect(() => {
    const searchParam = `filter.php?i=`
    const url = `.netlify/functions/get-data?param=${searchParam}&id=${selectedIngredient}`
    // If isMount false, then it is not first render and can fetch API data
    if (!isMount) {
      const fetchData = async () => {
        try {
          const response = await fetch(url).then(res => res.json())
          // Set state to array of the json drinks list
          setIngredient(oldData => [response.drinks])
        } catch (error) {
          console.log('error', error)
        }
      }

      fetchData()
    }
  }, [selectedIngredient])

  const displayCocktailList = api => {
    return (
      <>
        {api[0].map((cata, index) => (
          <li key={cata.idDrink}>
            <h4>{cata.strDrink}</h4>

            <img src={cata.strDrinkThumb} height="125px" width="125px"></img>
          </li>
        ))}
      </>
    )
  }

  // Otherwise, return regular form and drinks details
  return (
    <>
      {commonIngredientList()}
      <ul className="ingredient-list">
        {ingredient.length > 0 && displayCocktailList(ingredient)}
      </ul>
    </>
  )
}
