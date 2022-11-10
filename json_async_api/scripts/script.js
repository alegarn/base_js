const filmName = document.getElementById('filmName');
const formSubmit = document.getElementById("submit");
const movieList = document.getElementById('movie-container');

const scrollArea =  document.querySelector(".scrollArea");


var options = {
  root: document.querySelector('#scrollArea'),
  threshold: 0.50
};

function replaceImgLink(entry) {
  const htmlImg = entry.target.getElementsByClassName("img-fluid")[0];
  const url = window.location.href;
  htmlImg.src = `${htmlImg.src}`.replace(`${url}+++`, "");
};

function buildModal(event, modal) {

  const title = event.target.parentNode.querySelector(".card-title");

  modal.style.display = "block";

  fetch(`http://www.omdbapi.com/?i=${ID}&apikey=${API_KEY}&type=movie&r=json&t=${title.textContent}&plot=full`).then((response) => { return response.json(); })
  .then((response) => {
    const modalBody = modal.querySelector(".modal-body");

    buildModalBody(modalBody, response);

  })
  .catch((error) => { console.error(error); });

};


function buildModalBody(modal, json) {
  const genre = modal.childNodes[1];
  genre.textContent = `${json.Genre}`;

  const plot = modal.childNodes[3];
  plot.textContent = `${json.Plot}`;

  const director =  modal.childNodes[5];
  director.textContent = `${json.Director}`;

  const runtime = modal.childNodes[7];
  runtime.textContent = `${json.Runtime}`;
};

function closeModal(modal) {
  const span = modal.querySelector(".close");
  span.onclick = function() {
    modal.style.display = "none";
  };
};


const observer = new IntersectionObserver(entries => {

  entries.forEach(entry => {

    if (entry.isIntersecting) {

      replaceImgLink(entry);

      const htmlBtn = entry.target.querySelector(".popup");
      const modal = entry.target.querySelector(".modal");
      

      htmlBtn.addEventListener("click", (btn) => {
        buildModal(btn, modal)
      });

      closeModal(modal);
    };
    
    entry.target.classList.toggle("show", entry.isIntersecting);

  });

}, options);



const movieObserver = new IntersectionObserver(entries => {

  const lastMovie = entries[0];
  if (!lastMovie.isIntersecting) return;

  movieObserver.unobserve(lastMovie.target);
  movieObserver.observe(document.querySelector(".slide-card:last-child"));

}, options);


function movieHtmlReturn(movie) {
  let movieSection = document.createElement("div");

  movieSection.innerHTML = `\
    <div class="row g-0"> \
      <div class="col-md-4"> \
        <img src="+++${movie.Poster}" class="img-fluid rounded-start"> \
      </div> \
      <div class="col-md-8 center"> \
        <div class="card-body"> \ 
          <h5 class="card-title">${movie.Title}</h5> \
          <p class="card-text">${movie.Year}</p> \
          <div class="btn btn-primary popup">Read more</div> \ 
        </div> \
      </div> \
    </div> \
      \
    <div class="modal position-absolute top-50 start-50 translate-middle"> \
      <div class="modal-content"> \
        <div class="modal-header"> \
          <span class="close">&times;</span> \
          <h2 class="title">${movie.Title}</h2> \
        </div> \
        <div class="modal-body"> \
          <p class="genre"></p>
          <p class="plot"></p> \
          <p class="director"></p>
          <p class="runtime"></p>
        </div> \
        <div class="modal-footer"> \
          <h3>Year: ${movie.Year}</h3> \
        </div> \
      </div> \
    </div> \
    `;
    
    return(movieSection)
};



function renderMovie(scrollArea, returnedList) {

  returnedList.forEach(movie => {
    
    const newSection = movieHtmlReturn(movie);
    newSection.classList.add("slide-card");
    scrollArea.append(newSection);

  });

};

function observeAllCards() {
  const scrollCards = document.querySelectorAll(".slide-card");

    scrollCards.forEach( card => {
      observer.observe(card);
    });
};

let callbackSubmitFunction = formSubmit.addEventListener('click', (e) => {

  const submitName =filmName.value;

  fetch(`http://www.omdbapi.com/?i=${ID}&apikey=${API_KEY}&type=movie&r=json&page=5&s=${submitName}&plot=full`).then((response) => { return response.json(); })
  .then((response) => {

    const returnedList = response.Search;

    renderMovie(scrollArea, returnedList);

    observeAllCards();

    movieObserver.observe(document.querySelector(".slide-card:last-child"));
    
  })
  .catch((error) => { console.error(error); });
  console.log(e.target);

});

