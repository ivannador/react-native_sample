// a library to wrap and simplify api calls
import apisauce from 'apisauce'

const create = (baseURL = 'INSERT_VALUE_HERE') => {

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

  const subscribePush =
    (token, os) =>
      api.post(
        '/endpoint/subscription',
        {token: token, os: os}
      )

  return {
    subscribePush
  }
}

export default {
  create
}
