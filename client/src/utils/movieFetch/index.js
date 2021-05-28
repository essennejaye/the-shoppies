export const movieFetch = async (searchName) => {
  const apiKey = process.env.REACT_APP_API_KEY;
  try {
    const response = await fetch(
      `https://www.omdbapi.com/?s=${searchName}&apikey=${apiKey}`
    );
    const obj = await response.json();
    if (!obj || !obj['Search'])
    {
      const errorMessage = `We're sorry.\nThere were no selections found with that search term!\nPlease try again.`
      return errorMessage;
    }
    return obj.Search;
  }
  catch (err) {
    console.error("Problem: " + err.response);
    const errorMessage = `Internal server error.\n Please try again!`
    return errorMessage;
  }
}

