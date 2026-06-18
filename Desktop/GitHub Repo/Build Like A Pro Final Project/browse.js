// http://www.omdbapi.com/?apikey=84448407
// https://www.omdbapi.com/?i=tt3896198&apikey=84448407&s=

const searchInput = document.querySelector(".nav__input");
const moviesWrapper = document.querySelector("#movies");
const searchButton = document.querySelector(".nav__content--search");
let movies = [];


async function getMovies(searchTerm) {
    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=84448407&s=${searchTerm}`);
        const data = await response.json();
        
        if (data.Response === "False") {
            moviesWrapper.innerHTML = `<p>No Movies Found.</p>`;
            return;
        }
        
        movies = data.Search;
        displayMovies(movies);

    } catch(error) {
        console.log(error);
    }
}

searchButton.addEventListener("click", function() {
    const searchTerm = searchInput.value.trim();
    
    if (!searchTerm) {
        return;
    }

    getMovies(searchTerm);
});

searchInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        const searchTerm = searchInput.value.trim();

        if (!searchTerm) {
            return;
        }

        getMovies(searchTerm);
    }
});

/*

MOVIE SORT

*/

function displayMovies(movieList) {
    moviesWrapper.innerHTML = movieList.map(movie => {
        return `
            <div class="movie">
                <img class="movie__img" src="${movie.Poster}">
                <h3 class="movie__title">${movie.Title}</h3>
                <p class="movie__year">${movie.Year}</p>
            </div>`;
    }).join("");
}

function filterMovies(event) {
    const sortValue = event.target.value;

    if (sortValue === "A_TO_Z") {
        movies.sort((a, b) => a.Title.localeCompare(b.Title));
    }
    else if (sortValue === "Z_TO_A") {
        movies.sort((a, b) => b.Title.localeCompare(a.Title));
    }
    else if (sortValue === "OLDEST_TO_NEWEST") {
        movies.sort((a, b) => parseInt(a.Year) - parseInt(b.Year));
    }
    else if (sortValue === "NEWEST_TO_OLDEST") {
        movies.sort((a, b) => parseInt(b.Year) - parseInt(a.Year));
    }

    displayMovies(movies);
}

getMovies("movie");



