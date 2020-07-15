const form = document.querySelector('#form');
const inputValue = document.querySelector('#form-input');

form.addEventListener('submit' , (e) => {
    e.preventDefault();
    const searchText = inputValue.value ;
    getmovies(searchText);
    inputValue.value = '';
});

function getmovies(searchText){
    axios.get(`http://www.omdbapi.com/?&apikey=9a76a740&s=${searchText}`)
    .then(res => {
        let moviesArr = res.data.Search ;
        const movieListContainer = document.querySelector('.movielist-container');
        let output = '' ;
        moviesArr.forEach(movieArr => {
            const row = `<div class = movie-list>
                            <img src= '${movieArr.Poster}' alt = 'Poster Not Available'>
                            <p class = 'title'>${movieArr.Title}</p>
                            <a href = 'movie.html'  class = 'btn' onclick = 'movieId("${movieArr.imdbID}")'>More Details</a>
                        </div>`
            output += row ;
            console.log(movieArr.imdbID);
        });
        movieListContainer.innerHTML = output ;
    })
    .catch(err => {
        alert('NO RESULT FOUND');
        document.querySelector('.movielist-container').innerHTML = '';
    });
}

function movieId(id){
    sessionStorage.setItem('movieid', id);
    window.location = movie.html;
    return false;
}

function getmovie(){
    let movieid = sessionStorage.getItem('movieid');

    axios.get(`http://www.omdbapi.com/?&apikey=9a76a740&i=${movieid}`)
    .then(res => {
       let movie = res.data ;
        const movieShowcase = document.querySelector('.movie-showcase');
        let output = `<div class = 'movie-big-info'>
                        <img src = '${movie.Poster}'>
                            <div class = 'movie-info'>
                                <h2>Tittle : ${movie.Title}</h2>
                                <p class = 'actors'>Actors : ${movie.Actors}</p>
                                <p class = 'dir'>Director : ${movie.Director}</p>
                                <p class = 'writer'>Writer : ${movie.Writer}</p>
                                <p class = 'genre'>Genre : ${movie.Genre}</p>
                                <p class = 'lang'>Lanuage : ${movie.Language}</p>
                                <p class = 'release'>Released Date : ${movie.Released}</p>
                                <p class = 'plot'>Plot : ${movie.Plot}</p>
                                <p class = 'rating'>Rating : ${movie.imdbRating}</p>
                                <a href = 'index.html'  class = 'btn'>Back to Home</a>
                            </div>
                    </div>`
        movieShowcase.innerHTML = output ;
    })
    .catch(err => alert(err));

}












