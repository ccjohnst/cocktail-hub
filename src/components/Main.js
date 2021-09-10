import PropTypes from 'prop-types'
import React from 'react'

import {
  CocktailSearch,
  RandomCocktail,
  CategorySearch,
  IngredientSearch,
} from './search'

class Main extends React.Component {
  render() {
    let close = (
      <div
        className="close"
        onClick={() => {
          this.props.onCloseArticle()
        }}
      ></div>
    )

    return (
      <div
        ref={this.props.setWrapperRef}
        id="main"
        style={this.props.timeout ? { display: 'flex' } : { display: 'none' }}
      >
        <article
          id="rep-search"
          className={`${this.props.article === 'rep-search' ? 'active' : ''} ${
            this.props.articleTimeout ? 'timeout' : ''
          }`}
          style={{ display: 'none' }}
        >
          <h2 className="major">Search By Name</h2>

          <CocktailSearch />
          {close}
        </article>

        <article
          id="rep-random"
          className={`${this.props.article === 'rep-random' ? 'active' : ''} ${
            this.props.articleTimeout ? 'timeout' : ''
          }`}
          style={{ display: 'none' }}
        >
          <h2 className="major">Random</h2>
          <RandomCocktail />
          {close}
        </article>

        <article
          id="rep-category"
          className={`${
            this.props.article === 'rep-category' ? 'active' : ''
          } ${this.props.articleTimeout ? 'timeout' : ''}`}
          style={{ display: 'none' }}
        >
          <h2 className="major">Find by Category</h2>
          <CategorySearch />
          {close}
        </article>

        <article
          id="rep-category"
          className={`${
            this.props.article === 'rep-ingredients' ? 'active' : ''
          } ${this.props.articleTimeout ? 'timeout' : ''}`}
          style={{ display: 'none' }}
        >
          <h2 className="major">Find by Ingredient</h2>
          <IngredientSearch />
          {close}
        </article>
      </div>
    )
  }
}

Main.propTypes = {
  route: PropTypes.object,
  article: PropTypes.string,
  articleTimeout: PropTypes.bool,
  onCloseArticle: PropTypes.func,
  timeout: PropTypes.bool,
  setWrapperRef: PropTypes.func.isRequired,
}

export default Main
