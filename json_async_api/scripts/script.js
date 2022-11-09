const filmName = document.getElementById('filmName');
const formSubmit = document.getElementById("submit");
const movieList = document.getElementById('movie-container');

const scrollArea =  document.querySelector(".scrollArea")




var options = {
  root: document.querySelector('#scrollArea'),
  rootMargin: '5px',
  threshold: 0.50
};


const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      console.log("callback observer (entry / card )");
      entry.target.classList.toggle("show", entry.isIntersecting);
    });
  
}, options);



const intersectionFilm = new IntersectionObserver(entries => {

  console.log("intersectionFilm");
  console.log(entries);
  console.log(entries[0].target);

  const lastMovie = entries[0];
  if (!lastMovie.isIntersecting) return;
  intersectionFilm.unobserve(lastMovie.target);
  intersectionFilm.observe(document.querySelector(".slide-card:last-child"));

}, options);


function renderMovie(scrollArea, returnedList) {
  returnedList.forEach(movie => {
    
    const newSection = document.createElement("div");
    newSection.innerHTML = `\
      <img src="${movie.Poster}" class="card-img-top" alt="..."> \
      <div class="card-body"> \
        <h5 class="card-title">${movie.Title}</h5> \
        <p class="card-text">${movie.Year}</p> \
        <div class="btn btn-primary popup">Read more</div> \
      </div>
`;
    newSection.classList.add("slide-card");

    scrollArea.append(newSection);
  })

  

};

let callbackFunction = formSubmit.addEventListener('click', (e) => {
  console.log(e.target);
  const submitName =filmName.value;
  fetch(`http://www.omdbapi.com/?i=${ID}&apikey=${API_KEY}&type=movie&r=json&page=5&s=${submitName}`).then((response) => { return response.json(); })
  .then((response) => {

    console.log(response); 
    const returnedList = response.Search;

    renderMovie(scrollArea, returnedList);

    intersectionFilm.observe(document.querySelector(".slide-card:last-child"));
    console.log(document.querySelector(".slide-card:last-child"));
    const scrollCards = document.querySelectorAll(".slide-card");
    scrollCards.forEach( card => {
      console.log(card);
      console.log("scrollCards");
      observer.observe(card);
    });
    
  })
  .catch((error) => { console.error(error); });
  console.log(e.target);

});