const moviesContainer = document.getElementById("movies-container");
const currentMovieTitle = document.getElementById("movie-title");
const popupContainer = document.getElementById("popup");

const API_KEY = "36a67f53faf163e8cc24b63c891d70c0";
// let movieTitle;
let movieID;
let currentMovie = {};

const getUpcomingMovies = async () => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
    );

    const movies = await res.json();

    return movies.results;
  } catch (error) {
    console.error(error);
  }
};

// getUpcomingMovies();

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

const getMovieInfo = async (movieID) => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movieID}?api_key=${API_KEY}&language=en-US`
    );

    const movieInfo = await res.json();

    return movieInfo;
  } catch (error) {
    console.error(error);
  }
};

const getSimilarMovies = async (movieID) => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movieID}/similar?api_key=${API_KEY}&language=en-US&page=1`
    );

    const movies = await res.json();

    console.log(movies);
    return movies;
  } catch (error) {
    console.error(error);
  }
};

const movieCard = (title, backdrop_path, id) => {
  return `
        <div class="movie-card" onclick="togglePopup(${id})">
            <div class="movie-card-content">
              <img src="http://image.tmdb.org/t/p/w500${backdrop_path}" alt=${backdrop_path}>
              <h3>${title}</h3>
            </div>
        </div>
          `;
};

const displayMovies = async () => {
  try {
    const movies = await getUpcomingMovies();
    console.log(movies);
    const mappedMovies = movies.map(({ title, backdrop_path, id }) => {
      return movieCard(title, backdrop_path, id);
    });

    moviesContainer.innerHTML = mappedMovies.join("");
  } catch (error) {
    console.error(error);
  }
};

displayMovies();

const searchMovie = async () => {};

const popupContent = (
  title,
  overview,
  popularity,
  backdrop_path,
  vote_count,
  vote_average
) => {
  return `
    <div class="popup-content">
      <div>
        <h2>Title:</h2>
        <h3>${title}</h3>

        
        <h2>Overview:</h2>
        <p>${overview}</p> 
        
        <h2>Popularity</h2>
        <h5>${popularity}</h5>
        
        <h2>Votes:</h2>
        <p>${vote_count}</p>

        <h2>Vote average:</h2>
        <p>${vote_average}</p>
      </div>
      <img src="http://image.tmdb.org/t/p/w500${backdrop_path}">
    </div>
    
  `;
};

const togglePopup = async (id) => {
  const popupContainer = document.getElementById("popup-container");
  const overlay = document.getElementById("overlay");
  const similiarMoviesContainer = document.getElementById("similar-movies");

  popup.style.display = "block";
  overlay.style.display = "block";
  console.log(id);
  currentMovie = await getMovieInfo(id);

  // currentMovieTitle.textContent = currentMovie.title;
  popupContainer.innerHTML = popupContent(
    currentMovie.title,
    currentMovie.overview,
    currentMovie.popularity,
    currentMovie.backdrop_path,
    currentMovie.vote_count,
    currentMovie.vote_average
  );

  const similarMovies = await getSimilarMovies(id);

  console.log(similarMovies);

  const mappedMovies = similarMovies.results.map(
    ({ title, backdrop_path, id }) => {
      return movieCard(title, backdrop_path, id);
    }
  );

  similiarMoviesContainer.innerHTML = mappedMovies.join("");

  console.log(currentMovie);
};

const closePopup = () => {
  const popup = document.getElementById("popup");
  const overlay = document.getElementById("overlay");

  popup.style.display = "none";
  overlay.style.display = "none";
};
