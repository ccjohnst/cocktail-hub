const axios = require('axios')

// Function to retrieve using secret API key
exports.handler = async function(event, context) {
  console.log(event)
  console.log(context)

  try {
    // Destructure param and id from the stringParameters
    const { param, id } = event.multiValueQueryStringParameters

    const APIURL = process.env.API_URL
    const APIKEY = process.env.API_KEY

    // Tenary to determine what URL needs to be if certain parameters present
    const url = id
      ? `${APIURL}${APIKEY}/${param}${id}`
      : `${APIURL}${APIKEY}/${param}`

    const response = await axios.get(url)

    const drinkData = response.data

    return {
      statusCode: 200,
      body: JSON.stringify(drinkData),
    }
  } catch (err) {
    return {
      statusCode: 404,
      body: err.toString(),
    }
  }
}
