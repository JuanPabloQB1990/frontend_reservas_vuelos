

const isTokenExpired = (token) => {
  if (token == undefined) {
    return true;
  }
  
  const arrayToken = token.split('.')
  const tokenPayload = JSON.parse(atob(arrayToken[1]))
  Math.floor(new Date().getTime() /1000) >= tokenPayload?.exp
  return false
}

export default isTokenExpired
