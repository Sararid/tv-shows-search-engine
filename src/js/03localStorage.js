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
