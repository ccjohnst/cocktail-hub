import React from 'react'

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

export { ingredients, commonIngredients }
