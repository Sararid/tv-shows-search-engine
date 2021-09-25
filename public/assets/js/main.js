'use strict';

const userInput = document.querySelector('.js_inputUser');
const searchBtn = document.querySelector('.js_btn');
const seriesListHtml = document.querySelector('.js_movielist');
const favoriteListHtml = document.querySelector('.js_favoriteList');
const placeholderImage = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
const errorMessage = document.querySelector('.js_errorMessage');

let listSeries = [];
let favoriteSeries = [];


function handleApiFetch(e) {
  e.preventDefault();

  fetch(`https://api.tvmaze.com/search/shows?q=:${userInput.value}`)
    .then(response => response.json())

    .then(dataShows => {
      listSeries = dataShows.map(data => {
        return {
          id: data.show.id,
          name: data.show.name,
          image: data.show.image
        };
      });

      renderListShow();

    })

    .catch(error => errorMessage.innerHTML = `Ha sucedido un error: ${error}`);
}


function renderListShow() {
  seriesListHtml.innerHTML = '';

  for (let eleInList of listSeries) {

    const movieName = eleInList.name;
    const movieId = eleInList.id;
    const newItemList = document.createElement('li');
    const img = document.createElement('img');
    const textName = document.createElement('p');
    const textField = document.createTextNode(movieName);
    newItemList.id = movieId;
    newItemList.className = 'styleList js_li';

    if (eleInList.image !== null) {
      let getImage = eleInList.image.medium;
      img.src = getImage;
    } else {
      img.src = placeholderImage;
    }

    img.alt = movieName;
    textName.appendChild(textField);
    newItemList.append(textName, img);
    seriesListHtml.appendChild(newItemList);

  }

  handleClickLi();
}

searchBtn.addEventListener('click', handleApiFetch);


'use strict';

function handleFav(e) {
  const clickedId = parseInt(e.currentTarget.id);
  const favFound = favoriteSeries.findIndex((fav) => {
    return fav.id === clickedId;
  });

  if (favFound === -1) {
    const showEle = listSeries.find((ele) => {
      return ele.id === clickedId;
    });
    favoriteSeries.push(showEle);

  } else {
    favoriteSeries.splice(favFound, 1);

  }

  renderFavList(); //esto pinta 
  setInLocalStorage(); //esto guarda 
}

function renderFavList() {
  favoriteListHtml.innerHTML = '';
  for (let fav of favoriteSeries) {
    const nameShow = fav.name;
    const image = fav.image;
    const id = fav.id;
    let getImage = '';
    const newItemList = document.createElement('li');
    const img = document.createElement('img');
    const textName = document.createElement('p');
    const textField = document.createTextNode(nameShow);
    newItemList.id = id;
    newItemList.className = "styleListFav js_li";

    const removeFav = document.createElement('i');
    removeFav.className = 'fas fa-times-circle styleRemove';

    if (image !== null) {
      getImage = image.medium;
      img.src = getImage;
    } else {
      img.src = placeholderImage;

    }
    img.alt = nameShow;
    textName.appendChild(textField);
    newItemList.append(textName, img, removeFav);
    favoriteListHtml.appendChild(newItemList);

  }
  handleClickLi();
}

function handleClickLi() {
  const liListener = document.querySelectorAll('.js_li');
  for (let eleLi of liListener) {
    eleLi.addEventListener('click', handleFav);
  }
}


'use strict';

function setInLocalStorage() {
  const stringList = JSON.stringify(favoriteSeries);
  localStorage.setItem('show', stringList);
}

function getInLocalStorage() {
  const localStorageShows = localStorage.getItem('show');
  favoriteSeries = JSON.parse(localStorageShows);
  if (favoriteSeries === null) {
    favoriteSeries = [];
  } else {
    renderFavList();
  }
}

getInLocalStorage();

//# sourceMappingURL=main.js.map
