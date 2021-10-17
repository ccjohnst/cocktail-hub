import React, { useContext, useRef } from 'react'

// Import reactToPrint library package
import { useReactToPrint } from 'react-to-print'

// Import React icons
import { RiPrinterLine } from '@react-icons/all-files/ri/RiPrinterLine'
import { RiHeart2Line } from '@react-icons/all-files/ri/RiHeart2Line'
import { RiHeart3Fill } from '@react-icons/all-files/ri/RiHeart3Fill'

// Import global context which contain saved items localstorage
import { Context } from '../global/Store'

// Import components, functions and variables
import { ingredients } from './ingredients'

// Component to display cocktail items passed to apiInfo param
export const CocktailItem = ({ apiInfo }) => {
  const [state, dispatch] = useContext(Context)

  // Refs to handle ReactToPrint
  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })

  // function to handle save icon
  const handleSave = e => {
    dispatch({
      type: 'ADD_ID',
      payload: e.currentTarget.id,
    })
  }

  const handleDelete = e => {
    dispatch({
      type: 'REMOVE_ID',
      payload: e.currentTarget.id,
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
      {state.ids.includes(apiInfo.drinks[0].strDrink) ? (
        <button
          id={apiInfo.drinks[0].strDrink}
          className="action-buttons"
          onClick={e => handleDelete(e)}
        >
          <RiHeart3Fill />
        </button>
      ) : (
        <button
          id={apiInfo.drinks[0].strDrink}
          className="action-buttons"
          onClick={e => handleSave(e)}
        >
          <RiHeart2Line />
        </button>
      )}
    </div>
  )
}
