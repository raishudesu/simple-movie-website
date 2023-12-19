const API_KEY = "36a67f53faf163e8cc24b63c891d70c0";

const getUpcomingMovies = async () => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
    );

    const movies = await res.json();

    console.log(movies);
  } catch (error) {
    console.log(error);
  }
};

getUpcomingMovies();

let movieTitle;

const getMovieByName = async () => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${movieTitle}`
    );

    const movie = await res.json();

    console.log(movie);
  } catch (error) {
    console.log(error);
  }
};
