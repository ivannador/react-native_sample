// a library to wrap and simplify api calls
import apisauce from 'apisauce'

const create = (baseURL = 'INSERT_VALUE') => {

  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    },
    // 10 second timeout...
    timeout: 10000
  })

  const loginUser =
    (email, latitude, longitude) =>
      api.post(
        '/auth/loginsimple',
        {email: email, latitude: latitude, longitude: longitude}
      )

  const getInterests =
    (token) =>
      api.get(
        '/interest',
        {},
        {headers: {Authorization: 'Bearer ' + token}}
      )

  return {
    // a list of the API functions from step 2
    loginUser,
    getInterests,
  }
}

// let's return back our create method as the default.
export default {
  create
}
