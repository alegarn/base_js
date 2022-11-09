const filmName = document.getElementById('filmName');
const formSubmit = document.getElementById("submit");
const movieList = document.getElementById('movie-container');

const scrollArea =  document.querySelector(".scrollArea")


var options = {
  root: document.querySelector('#scrollArea'),
  threshold: 0.50
};


const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      console.log(entry.target);
      if (entry.isIntersecting) {
        const htmlImg = entry.target.getElementsByClassName("img-fluid")[0];
        console.log(htmlImg);
        const url = window.location.href;
        htmlImg.src = `${htmlImg.src}`.replace(`${url}+++`, "");

        const htmlbtn = entry.target.querySelector(".popup");
        const modal = entry.target.querySelector(".modal");
        const span = modal.querySelector(".close");
        console.log(htmlbtn);
        console.log(modal);
        console.log(span);

        htmlbtn.addEventListener("click", (btn) => {
          const title = btn.target.parentNode.querySelector(".card-title");

          modal.style.display = "block";
          fetch(`http://www.omdbapi.com/?i=${ID}&apikey=${API_KEY}&type=movie&r=json&t=${title.textContent}&plot=full`).then((response) => { return response.json(); })
          .then((response) => {
            const modalBody = modal.querySelector(".modal-body");
            console.log(modalBody);
            const genre = modalBody.childNodes[1];
            console.log(genre);
            genre.textContent = `${response.Genre}`;
            const director =  modalBody.childNodes[5];
            director.textContent = `${response.Director}`;
            const runtime = modalBody.childNodes[7];
            runtime.textContent = `${response.Runtime}`;
            const plot = modalBody.childNodes[3];
            plot.textContent = `${response.Plot}`;

          })
          .catch((error) => { console.error(error); });
          console.log(btn.target);
        })

        span.onclick = function() {
          modal.style.display = "none";
        }
      };
      
      entry.target.classList.toggle("show", entry.isIntersecting);

    });
  
}, options);



const intersectionFilm = new IntersectionObserver(entries => {

  const lastMovie = entries[0];
  if (!lastMovie.isIntersecting) return;

  intersectionFilm.unobserve(lastMovie.target);
  intersectionFilm.observe(document.querySelector(".slide-card:last-child"));

}, options);


function renderMovie(scrollArea, returnedList) {

  returnedList.forEach(movie => {
    
    const newSection = document.createElement("div");

    newSection.innerHTML = `\
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
            <h3>${movie.Year}</h3> \
          </div> \
        </div> \
      </div> \
      `;

    newSection.classList.add("slide-card");

    scrollArea.append(newSection);

  });

};

let callbackFunction = formSubmit.addEventListener('click', (e) => {

  const submitName =filmName.value;

  fetch(`http://www.omdbapi.com/?i=${ID}&apikey=${API_KEY}&type=movie&r=json&page=5&s=${submitName}&plot=full`).then((response) => { return response.json(); })
  .then((response) => {
    console.log(response);
    const returnedList = response.Search;

    renderMovie(scrollArea, returnedList);

    const scrollCards = document.querySelectorAll(".slide-card");

    scrollCards.forEach( card => {
      observer.observe(card);
    });

    intersectionFilm.observe(document.querySelector(".slide-card:last-child"));
    
  })
  .catch((error) => { console.error(error); });
  console.log(e.target);

});

