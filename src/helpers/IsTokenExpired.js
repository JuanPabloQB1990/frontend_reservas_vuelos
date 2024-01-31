const isTokenExpired = (token) => {
  
  if (token == "") {
    return false;
  }

  const arrayToken = token.split('.')
  const tokenPayload = JSON.parse(atob(arrayToken[1]))
  
  if (Math.floor(new Date().getTime() /1000) >= tokenPayload?.exp || token == "") {
    return false;
  }
  
  return true;
}

export default isTokenExpired
