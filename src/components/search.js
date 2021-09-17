import { CONDITIONAL_TYPES } from '@babel/types'
import React, {
  useRef,
  useState,
  useEffect,
  isValidElement,
  createContext,
  useContext,
} from 'react'

import Creatable from 'react-select/creatable'
import ClipLoader from 'react-spinners/ClipLoader'

import { useReactToPrint } from 'react-to-print'
import { RiPrinterLine } from '@react-icons/all-files/ri/RiPrinterLine'
import { RiSave3Line } from '@react-icons/all-files/ri/RiSave3Line'

import { Context } from '../components/global/Store'
const color = '#ffffff'
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
    <ol className="ingredient-list-items">
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
    </ol>
  )
}

// Component to display saved Cocktail
const SavedCocktails = () => {
  // Import the context and provide to UseContext hook as an argument
  const [state, dispatch] = useContext(Context)

  return <>{state.ids.length > 0 && state.ids.map(ele => <p>{ele}</p>)}</>
}

// Component to display saved Cocktail list

// Component to display cocktail items passed to apiInfo param
const CocktailItem = ({ apiInfo }) => {
  const [state, dispatch] = useContext(Context)

  // Refs to handle ReactToPrint
  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })

  // function to handle save icon
  const handleSave = e => {
    console.log(e)
    localStorage.setItem('id', e.target.id)
    dispatch({
      type: 'ADD_ID',
      payload: e.target.id,
    })
  }

  return (
    <div className="cocktail" ref={componentRef}>
      <h3>{apiInfo.drinks[0].strDrink}</h3>
      <span className="image main">
        <img src={apiInfo.drinks[0].strDrinkThumb} alt="" />
      </span>
      <h4>Instructions</h4>
      <p>{apiInfo.drinks[0].strInstructions}</p>
      <h4>Ingredients</h4>
      {ingredients(apiInfo.drinks[0])}
      <button className="action-buttons" onClick={handlePrint}>
        <RiPrinterLine />
      </button>
      <button
        id={apiInfo.drinks[0].idDrink}
        className="action-buttons"
        onClick={e => handleSave(e)}
        data-name={apiInfo.drinks[0].strDrink}
      >
        <RiSave3Line />
      </button>
    </div>
  )
}

export const CocktailSearch = () => {
  // initiate misMount
  const isMount = useIsMount()

  const [state, dispatch] = useContext(Context)

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
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })

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
      {state && <SavedCocktails />}
      {apiInfo && similarItems(apiInfo)}
      {searchForm()}
    </div>
  )
}

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
          console.log('error', error)
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
          console.log('error', error)
        }
      }
      fetchData()
    }
  }, [randomApi])

  return (
    <>
      <ClipLoader loading={loading} color={color} />
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
      setLoading(true)
      const fetchData = async () => {
        try {
          const response = await fetch(url).then(res => res.json())
          // Set state to array of the json drinks list
          setCocktailList(oldData => [response.drinks])
          setLoading(false)
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

// Search by ingredient component
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

  // Array holding common ingredients
  const commonIngredients = [
    { value: 'Gin', label: 'Gin' },
    { value: 'Whiskey', label: 'Whiskey' },
    { value: 'Bourbon', label: 'Bourbon' },
    { value: 'Scotch', label: 'Scotch' },
    { value: 'Vodka', label: 'Vodka' },
    { value: 'Rum', label: 'Rum' },
    { value: 'Tequila', label: 'Tequila' },
    { value: 'Brandy', label: 'Brandy' },
    { value: 'Blended Whiskey', label: 'Blended Whiskey' },
  ]

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
          console.log('error', error)
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
          console.log('error', error)
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
