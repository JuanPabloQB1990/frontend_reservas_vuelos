

const isTokenExpired = (token) => {
  if (token == undefined) {
    return true;
  }
  
  console.log(token);
  const arrayToken = token.split('.')
  const tokenPayload = JSON.parse(atob(arrayToken[1]))
  console.log(tokenPayload);
  Math.floor(new Date().getTime() /1000) >= tokenPayload?.exp
  return false
}

export default isTokenExpired
