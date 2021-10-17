function isTokenExpired(token) {
  const currentTime = Math.floor(Date.now() / 1000);
  return token >= currentTime;
}

export default isTokenExpired;
