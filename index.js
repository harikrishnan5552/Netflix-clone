
const apikey = 'f214be0e385f64ecffedf93350225fbf';
const apiEndpoint = 'https://api.themoviedb.org/3';
const imgPath='https://image.tmdb.org/t/p/original';

const apiPath = {
    fetchAllCategories:`${apiEndpoint}/genre/movie/list?api_key=${apikey}` ,
    fetchMovieList: (id) => `${apiEndpoint}/discover/movie?api_key=${apikey}&with_genres=${id}`,
    fetchTrending:`${apiEndpoint}/trending/all/day?api_key=${apikey}&language=en-US`,

}


// boost up the app
function init(){
    
    fetchAndBuildAllSection()
}


function fetchAndBuildAllSection(){
    fetch(apiPath.fetchAllCategories)
    .then(res=>res.json())
    .then(res=>{
        
        const categories = res.genres;
        console.log(res.genres[0])
        if(Array.isArray(categories)&&categories.length>0){
            categories.slice(0,9).forEach(category=>{
                fetchAndBuildMoviesSection(apiPath.fetchMovieList(category.id),category);
            })
        }
    })
    .catch(err=>console.error(err));
    
}
function fetchAndBuildMoviesSection(fetchUrl,category){
    console.log(category.name)
   return fetch(fetchUrl)
    .then(res=>res.json())
    .then(res=>{
        const movies = res.results;
        if(Array.isArray(movies)&&movies.length>0){
         BuildMoviesSection(movies,category.name);
        }
        console.log(movies)
        return movies;
    })
    .catch(err=>console.log(err));
}
function BuildMoviesSection(list,categoryName){
    // 
    let moviesCont = document.getElementById('movies-cont');
    let moviesListHtml = list.map(item =>{
        return`
        <img class="movie-item" src="${imgPath}${item.backdrop_path}" alt="${item.title}" >
        `
    }).join('');
    const moviesSectionHTML=`
            <h2 class="movies-sec-heading">${categoryName}<span class="explore">Explore All</span></h2>
            <div class="movies-row">
            ${moviesListHtml}    
            </div>`
             
    // console.log(moviesListHtml);
    const div= document.createElement('div');
    div.className='movies-section';
    div.innerHTML=moviesSectionHTML;

    // append html into movies container
    moviesCont.append(div);
}

window.addEventListener('load',function(){
init();
})