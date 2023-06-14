const PORT = process.env.PORT || 3000

let baseUrl
if (process.env.NODE_ENV === 'development') {
  baseUrl = process.env.BASE_URL
}

export {PORT, baseUrl}
