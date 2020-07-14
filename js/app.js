const form = document.querySelector('#form');
const inputValue = document.querySelector('#form-input');

form.addEventListener('submit' , (e) => {
    e.preventDefault();
    const searchText = inputValue.value ;

    getmovies(searchText);
});

function getmovies(searchText){
    console.log(searchText);

    axios.get(`http://www.omdbapi.com/?&apikey=9a76a740&s=${searchText}`)
    .then(res => {
        let moviesArr = res.data.Search ;
        console.log(res);
        // console.log(res.data.Search);
        const movieListContainer = document.querySelector('.movielist-container');
        let output = '' ;
        moviesArr.forEach(movieArr => {
            const row = `<div class = movie-list>
                            <img src= '${movieArr.Poster}' alt = 'Poster Not Available'>
                            <p class = 'title'>${movieArr.Title}</p>
                            <a href = 'movie.html' class = 'btn'>More Details</a>
                        </div>`
            
            output += row ;
        });

        movieListContainer.innerHTML = output ;
    })
    .catch(err => console.log(err))
}