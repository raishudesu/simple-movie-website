const API_KEY = "36a67f53faf163e8cc24b63c891d70c0";
let movieTitle;
let movieID;

const getUpcomingMovies = async () => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
    );

    const movies = await res.json();

    console.log(movies);
  } catch (error) {
    console.error(error);
  }
};

getUpcomingMovies();

const getMovieByName = async () => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${movieTitle}`
    );

    const movie = await res.json();

    console.log(movie);
  } catch (error) {
    console.error(error);
  }
};

const getMovieInfo = async () => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movieID}?api_key=${API_KEY}&language=en-US`
    );

    const moveInfo = await res.json();

    console.log(moveInfo);
  } catch (error) {
    console.error(error);
  }
};

const getSimilarMovies = async () => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movieID}/similar?api_key=${API_KEY}&language=en-US&page=1`
    );

    const movies = await res.json();

    console.log(movies);
  } catch (error) {
    console.error(error);
  }
};
