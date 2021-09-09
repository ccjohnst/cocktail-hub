module.exports = {
  siteMetadata: {
    title: 'Cocktail Hub - Search Cocktails',
    author: 'Christopher Johnston',
    description: 'A Gatsby.js web-app for searching and finding cocktails',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'Cocktail-Hub',
        short_name: 'Cocktails',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/cocktail.png', // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-sass',
    'gatsby-plugin-offline',
  ],
}
