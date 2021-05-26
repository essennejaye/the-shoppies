const movieSearch = async (searchName) => {
const apiKey = process.env.REACT_APP_API_KEY;
try {
  const response = await fetch(
    `https://www.omdbapi.com/?s=${searchInput}&apikey=${apiKey}`
  );
  const items = await response.json();
  if (!items || !items['Search']) {
    return false;
  }
  return items;
}
 catch (err) {
  console.error("Problem: " + err.response);
}
}

export { movieSearch };