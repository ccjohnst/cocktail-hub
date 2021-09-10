import React, { useRef, useState, useEffect } from 'react'

// Custom hook to indicate whether current render is first render
const useIsMount = () => {
  const isMountRef = useRef(true)
  useEffect(() => {
    isMountRef.current = false
  }, [])
  return isMountRef.current
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

// Function to display cocktail items
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

  const inputHandler = e => {
    const value = e.target.value

    setInput(value)
  }

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
    // TODO: prevent useEffect from occuring on first render
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`

    // If isMount not true, then it is not first render and can fetch API data
    if (!isMount) {
      const fetchData = async () => {
        try {
          const response = await fetch(url)
          const json = await response.json()
          setApiInfo(json)
          setSearched(true)
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
      {/* <h3>{apiInfo && apiInfo.drinks[0].strDrink}</h3> */}

      {/* <span className="image main">
        {apiInfo && <img src={apiInfo.drinks[0].strDrinkThumb} alt="" />}
      </span> */}

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
    const url = `https://www.thecocktaildb.com/api/json/v1/1/random.php`

    // If isMount true, then it is  first render and can fetch API data
    if (isMount) {
      const fetchData = async () => {
        try {
          const response = await fetch(url)
          const json = await response.json()
          setRandomApi(json)
        } catch (error) {
          console.log('error', error)
        }
      }

      fetchData()
    } else if (!randomApi) {
      const fetchData = async () => {
        try {
          const response = await fetch(url)
          const json = await response.json()
          setRandomApi(json)
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

  useEffect(() => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`

    // If isMount true, then it is  first render and can fetch API data
    if (isMount) {
      const fetchData = async () => {
        try {
          const response = await fetch(url)
          const json = await response.json()
          // Set state to array of the json drinks categories
          setCategories(oldData => [...oldData, json.drinks])
        } catch (error) {
          console.log('error', error)
        }
      }

      fetchData()
    }
  }, [categories])

  useEffect(() => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${selectedCategory}`

    // If isMount false, then it is not first render and can fetch API data
    if (!isMount) {
      const fetchData = async () => {
        try {
          const response = await fetch(url)
          const json = await response.json()
          // Set state to array of the json drinks list
          setCocktailList(oldData => [json.drinks])
        } catch (error) {
          console.log('error', error)
        }
      }

      fetchData()
    }
  }, [selectedCategory])

  // useEffect hook for handling fetching data of selected cocktails
  useEffect(() => {
    // TODO: prevent useEffect from occuring on first render
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${selectedCocktailID}`

    // If isMount not true, then it is not first render and can fetch API data
    if (!isMount) {
      const fetchData = async () => {
        try {
          const response = await fetch(url)
          const json = await response.json()
          setCocktailID(json)
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
  const displayCategories = api => {
    return api[0].map((cata, index) => (
      <option value={cata.strCategory} key={cata.strCategory}>
        {cata.strCategory}
      </option>
    ))
  }

  const handleButton = e => {
    setSelectedCocktailID(e.target.id)
    console.log(e.target.id)
  }

  // Function to hide
  const handleHide = e => {
    setCocktailID()
    setSelectedCocktailID()
  }
  const displayCocktailList = api => {
    return (
      <>
        {api[0].map((cata, index) => (
          <li key={cata.idDrink}>
            <h4>{cata.strDrink}</h4>

            <img src={cata.strDrinkThumb} height="125px" width="125px"></img>

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

  // Array holding common ingredients
  const commonIngredients = [
    'Gin',
    'Whiskey',
    'Vodka',
    'Rum',
    'Tequila',
    'Brandy',
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
          Select from popular categories:
        </label>
        <select name="categories" id="category-select">
          <option value="" disabled selected>
            {' '}
            - Please select an option -{' '}
          </option>
          {commonIngredients.map(ingredient => (
            <option value={ingredient}>{ingredient}</option>
          ))}
        </select>
      </>
    )
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
    // TODO: prevent useEffect from occuring on first render
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchTerm}`

    // If isMount not true, then it is not first render and can fetch API data
    if (!isMount) {
      const fetchData = async () => {
        try {
          const response = await fetch(url)
          const json = await response.json()
          setApiInfo(json)
          setSearched(true)
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

  // Otherwise, return regular form and drinks details
  return (
    <>
      {apiInfo && similarItems(apiInfo)}
      {searchForm()}

      {commonIngredientList()}
    </>
  )
}
