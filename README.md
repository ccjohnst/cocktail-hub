# Cocktail Hub

A web-app for searching and finding cocktail recipes and ingredients. Users can search cocktails via the search function, get a random selection, or search via categories.

## Rationale

Having taken up cocktail making as a lockdown hobby, I was finding it difficult to find a good central source of cocktail recipes and found myself regularly switching between multiple sites to find the recipes I was looking for. I recently stumbled upon [TheCocktailDB's API](https://www.thecocktaildb.com/api.php) which seemed to be an incredibly comprehensive database of cocktails and decided to consume the API within my own front-end web-app.

Because I'd often be using the web-app via a mobile browser, a responsive design was of paramount importance. I stumbled upon the [Dimension Template](https://html5up.net/) by HTML5, which has great responsive design out of the box and I therefore chose to use it as a template and adapted it to be fit for purpose for Cocktail Hub.

I chose Gatsby as my sub-framework of choice, partly out of familiarity, but mostly because of the ability to use the site as a Progressive Web Application for ease of use on my smartphone by installing it as a PWA app. It also helps that GatsbyJS has fantastic plugin support should I need it in the future.

A second 'testing' branch exists in order for me to develop and test new features before merging into the 'master' branch in order to minimise any disruption to the live site.

## Deployment

To deploy Cocktail Hub, I decided to use [Netlify](https://www.netlify.com/) for a number of reasons. Firstly, Netlify allows for easy deployment of GatsbyJS web-apps which allows me to spend more time improving rhe codebase. Secondly, having purchased an upgraded API key to enhance the Cocktail Hub's functionality, [Netlify's Functions](https://www.netlify.com/products/functions/) allows me to easily deploy server-side code to serve as a proxy for requests made to the CocktailDB's API with my secret key.

## Challenges

Error handling was made difficult by the server returning a '200 OK' status response when the API was queried for cocktails that did not exist in the database. Instead, a response body of 'drinks: null' or 'drinks: not found' would be sent. This meant that I had to implement conditionals that would render whether an error message would display depending on the response of the returned body for the 'drinks' object, rather than using status codes which would be more elegant.

In order to implement global state within Gatsby, it was necessary to create a 'Store' component, which would contain the global state. The Store component which accepts the a context object we import and create in Store.js. To access this global state within the application, we call the 'useContext()' hooks within the application's components.

## Getting started

```
nvm use 12.13.1 # To ensure good compatibility
git clone https://github.com/ccjohnst/cocktail-hub
cd cocktail-hub
npm install
npm start
```

## Future features

- ~~Create a search via ingredient function.~~ **Complete**
- Refactor code within search components to be more DRY
- Implement a toggle using a REGEX script to turn the imperial measurements into metric.
- ~~Implement a feature that allows users to save cocktails via localstorage.~~ **Complete**
- Implement user authentication and a login system in which users can save cocktails to their account.

## Built with

- [React](https://reactjs.org/)
- [GatsbyJS](https://www.gatsbyjs.com/)
- [TheCocktailDB's API](https://www.thecocktaildb.com/api.php)
- [React Select](https://react-select.com/home)
- [React Spinners](https://www.npmjs.com/package/react-spinners)
- [React Icons](https://react-icons.github.io/react-icons/)
- [react-to-print](https://www.npmjs.com/package/react-to-print)
- [Node Sass](https://www.npmjs.com/package/node-sass)
- [Dimension Template](https://html5up.net/) - Template

# APIs Reference

A reference point for how the components/APIs function within this web application.

The business logic for this application can be found within the [/srs/components/cocktail-components/](/src/components/cocktail-components/) folder.

## Cocktail Components - Reference Guide

### Cocktail Item - [/src/components/cocktail-components/CocktailItem.js](/src/components/cocktail-componenets/CocktailItem.js)

```js
<CocktailItem />
```

A standarised component to render a cocktail item when passed with retrieved API information. Used within most most cocktail components.

This component has a save and print button, which allows for saving the the cocktail item to local storage and allows the user to print/save as PDF.

#### Props

- `apiInfo={}` - A prop to pass down retrieved API information so it can be displayed as a cocktail item.

<br>

### Category Search - [/src/components/cocktail-components/CategorySearch.js](/src/components/cocktail-componenets/CategorySearch.js)

```js
<CategorySearch />
```

A component that queries the API for a list of all categories and displays them as a drop down selection list. Upon selection of any of the categories, the component returns a list of all cocktails that fall within the category. By clicking the 'View' button on a particular cocktail entry, a CocktailItem component is generated using the selected cocktail's ID as the prop.

<br>

### Cocktail Search - [/src/components/cocktail-components/CocktailSearch.js](/src/components/cocktail-componenets/CocktailSearch.js)

```js
<CocktailSarch />
```

A component that returns an input form in which users can search specific cocktails. After a search term is submitted, the API is queried and if a match is found, the CocktailItem component generates the entry. If the search term could be multiple different cocktails (e.g. searching 'Gin' returns multiple results), the first result is used and a list of items with similiar names is returned.

<br>

### IngredientSearch - [/src/components/cocktail-components/IngredientSearch.js](/src/components/cocktail-componenets/IngredientSearch.js)

```js
<IngredientSearch />
```

This component utilises the react-select package and populates itself with a list of hard-coded predefined common ingredients. The user can also input their own ingredients to search. If multiple ingredients are searched, the component will query the API for cocktails that contain all of the listed ingredients within the cocktail's ingredient list.

<br>

### Random Cocktail - [/src/components/cocktail-components/RandomCocktail.js](/src/components/cocktail-componenets/RandomCocktail.js)

```js
<RandomCocktail />
```

A component that returns a random cocktail upon page load. By clicking the randomise button, the component queries the API again to retrieve another random cocktail, which is passed to the CocktailItem component for display.

<br>

### Saved Cocktails - [/src/components/cocktail-components/SavedCocktail.js](/src/components/cocktail-componenets/SavedCocktails.js)

```js
<SavedCocktails />
```

The SavedCocktails component accesses the global persistant state set up in [/src/components/global/Store.js](/src/components/global/Sotre.js) and returns a list of the names of all cocktails saved into local storage. A view button is generated which when clicked renders a CocktailItem with the retrieved API information. If there are no cocktails saved, an error message is generated.

<br>
