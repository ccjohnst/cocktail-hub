import PropTypes from 'prop-types'
import React from 'react'
import cocktail from '../images/cocktails.svg'

const Header = props => (
  <header id="header" style={props.timeout ? { display: 'none' } : {}}>
    <div className="logo ">
      <span className="icon ">
        <img className="drink-logo" src={cocktail}></img>
      </span>
    </div>
    <div className="content">
      <div className="inner">
        <h1>Cocktail Hub</h1>
        <p>
          A one-stop shop for cocktails. Use the search, random and category
          buttons below to find a cocktail for you.
          <br /> Powered by{' '}
          <a
            href="https://www.thecocktaildb.com/api.php"
            rel="noreferrer"
            target="_blank"
          >
            TheCocktailDB API
          </a>{' '}
        </p>
      </div>
    </div>
    <nav>
      <ul>
        <li>
          <button
            onClick={() => {
              props.onOpenArticle('rep-search')
            }}
          >
            Search
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              props.onOpenArticle('rep-random')
            }}
          >
            Random
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              props.onOpenArticle('rep-category')
            }}
          >
            Categories
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              props.onOpenArticle('rep-ingredients')
            }}
          >
            Ingredients
          </button>
        </li>
      </ul>
    </nav>
  </header>
)

Header.propTypes = {
  onOpenArticle: PropTypes.func,
  timeout: PropTypes.bool,
}

export default Header
