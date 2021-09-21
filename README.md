# Cocktail Hub

A web-app for searching and finding cocktail recipes and ingredients. Users can search cocktails via the search function, get a random selection, or search via categories.

## Rationale

Having taken up cocktail making as a lockdown hobby, I was finding it difficult to find a good central source of cocktail recipes and found myself regularly switching between multiple sites to find the recipes I was looking for. I recently stumbled upon [TheCocktailDB's API](https://www.thecocktaildb.com/api.php) which seemed to be an incredibly comprehensive database of cocktails and decided to consume the API within my own front-end web-app.

Because I'd often be using the web-app via a mobile browser, a responsive design was of paramount importance. I stumbled upon the [Dimension Template](https://html5up.net/) by HTML5, which has great responsive design out of the box and I therefore chose to use it as a template and adapted it to be fit for purpose for Cocktail Hub.

I chose Gatsby as my sub-framework of choice, partly out of familiarity, but mostly because of the ability to use the site as a Progressive Web Application for ease of use on my smartphone by installing it as a PWA app. It also helps that GatsbyJS has fantastic plugin support should I need it in the future.

A second 'testing' branch exists in order for me to develop and test new features before merging into the 'master' branch in order to minimise any disruption to the live site.

## Deployment

To deploy Cocktail Hub, I decided to use [Netlify](https://www.netlify.com/) for a number of reasons. Firstly, Netlify allows for easy deployment of GatsbyJS web-apps which allows me to spend more time improving rhe codebase. Secondly, having purchased an upgraded API key to enhance the Cocktail Hub's functionality, [Netlify's Functions](https://www.netlify.com/products/functions/) allows me to easily deploy server-side code to serve as a proxy for requests made to the CocktailDB's API with my secret key.

## Getting started

```
nvm use 12.13.1 # To ensure good compatibility
git clone https://github.com/ccjohnst/cocktail-hub
cd cocktail-hub
npm install
npm start
```

## Future features

- Refactor code within search components to be more DRY
- Implement a toggle using a REGEX script to turn the imperial measurements into metric.
- Implement a feature that allows users to save cocktails via localstorage.
- Implement user authentication and a login system in which users can save cocktails to their account.

## Built with

- [React](https://reactjs.org/)
- [GatsbyJS](https://www.gatsbyjs.com/)
- [TheCocktailDB's API](https://www.thecocktaildb.com/api.php)
- [Dimension Template](https://html5up.net/) - Template
